import { StyleSheet, Text, TextInput, View } from "react-native";
import { Link } from "react-router-native"
import { useContext, useState } from "react";
import * as Location from "expo-location"

import Button from "../../../../components/Button/Button";
import GlobalContext from "../../../../hooks/useGlobalContext/GlobalContext";
import postAPI from "../../../../server/axios/postAPI";
import getAPI from "../../../../server/axios/getAPI";
import axios from "axios";

const styles = StyleSheet.create({
    container: {
        padding: 1,
        borderColor: "b5ffff",
        borderRadius: 5,
        width: "100%",
        flex: 1,
    },
    title: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    textTitle: {
        fontSize: 23,
        fontWeight: "bold",
        color: "#c4c4ff",
    },
    form: {
        flex: 0.3,
        marginTop: 10,
    },
    inputs: {
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
        marginBottom: 0
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "#c4c4ff",
        color: "#c4c4ff",
        width: "80%",
        paddingHorizontal: 8,
        borderRadius: 3
    },
    register: {
        width: "100%",
        alignItems: "center",
    },
    linkRegis: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    titleRegis: {
        width: "100%",
        textAlign: "right",
        marginRight: 5,
    },
    submit: {
        flex: 1,
        width: "100%",
        alignItems: "center"
    },
})

function Login() {


    const { setIsLogined, IP, setUserData, setIsAdmin, setLongitude, setLatitude, socket, setStrangerList, strangerList } = useContext(GlobalContext)
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")
    const [info, setInfo] = useState({
        _id: "",
        status: 400
    })

    // useEffect này để xác thực người dùng cấp quyền truy cập
    // và lấy ra kinh độ và vĩ độ của người dùng
    const getCurrentLocation = async (id, name) => {
        try {
            const { coords } = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = coords;

            setLongitude(longitude)
            setLatitude(latitude)
            socket.emit("Client-request-strangers-location-first", {
                name: await name,
                myId: await id,
                mySocketId: socket.id,
                myLong: longitude,
                myLat: latitude,
                radius: 180, //(m)
                quantity: 5,
            })

            socket.emit("Client-send-socket-info", {
                id: await id,
                socketId: socket.id
            })
            socket.emit("Client-request-strangers-location")
            socket.on("Server-send-strangers-around", (arrStrangers) => {
                setStrangerList(arrStrangers)
                console.log(arrStrangers)
            })
            // Tiếp tục xử lý với thông tin kinh độ và vĩ độ
        } catch (error) {
            console.log('Không thể lấy thông tin vị trí:', error);
        }
    };
    // yêu cầu quyền truy cập vị trí để lấy vị trí

    async function connect(id, name) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Quyền truy cập vị trí bị từ chối!');
            return;
        } else {
            await getCurrentLocation(id, name)
        }
    }


    // Tiếp tục xử lý với quyền truy cập vị trí được cấp

    const submit = async () => {

        console.log("đăng nhập")
        async function log(id, status, name) {
            if (status === 200) {
                await getAPI(`http://${IP}:5000/api/user/get`, {
                    id: id
                }, () => { },
                    async (response) => {
                        if (response.data.administration === true) {
                            await setIsAdmin(true)
                        }
                        await setIsLogined(true)
                        // console.log(response)
                        await setUserData(response.data)
                        // if(await response.data.config.onShareLocation){
                        await connect(id, name)
                        // }
                    })
            }
        }
        await postAPI(`http://${IP}:5000/api/user/login`, {
            nickname: nickname,
            password: password
        }, async (data) => {
            await log(data.data[0]._id, data.status, data.data[0].name)
        })


        // axios.post(`http://${IP}:5000/api/user/login`, {
        //     nickname: nickname,
        //     password: password
        // }, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then(async (response) => {
        //         await log(response.data.data[0]._id, data.status)
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });

    }

    const getText = (text, channel) => {
        channel(text)
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.textTitle}>Đăng nhập</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.inputs}>
                    <TextInput
                        onChangeText={(text) => getText(text, setNickname)}
                        style={styles.input}
                        placeholder="Tài khoản"
                        placeholderTextColor={"#c4c4ff"}
                    />
                </View>
                <View style={styles.inputs}>
                    <TextInput
                        onChangeText={(text) => getText(text, setPassword)}
                        style={styles.input}
                        placeholder="Mật khẩu"
                        placeholderTextColor={"#c4c4ff"}
                    />
                </View>
            </View>
            <View style={styles.register}>
                <Link style={styles.linkRegis} to={"/register"}><Text style={[styles.titleRegis, { color: "#c4c4ff" }]}>Chưa có tài khoản?</Text></Link>
            </View>
            <View style={styles.submit}>
                <Button
                    title={"Đăng nhập"}
                    height={30}
                    marginVertical={10}
                    background="#c4c4ff"
                    paddingHorizontal={13}
                    paddingVertical={5}
                    borderRadius={8}
                    onClicked={submit}
                    borderLeftWidth={0.5}
                    borderColor="#c4c4ff"
                />
            </View>
        </View>
    );
}

export default Login;