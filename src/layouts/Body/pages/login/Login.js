import { StyleSheet, Text, TextInput, View } from "react-native";
import { Link } from "react-router-native"
import Button from "../../../../components/Button/Button";
import { useContext, useState } from "react";
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


    const { setIsLogined, IP, setUserData, userDataCurrent } = useContext(GlobalContext)
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")
    const [info, setInfo] = useState({
        _id: "",
        status: 400
    })

    const submit = async () => {

        console.log("đăng nhập")
        async function log(id, status) {
            if (status === 200) {
                await getAPI(`http://${IP}:5000/api/user/get`, {
                    id: id
                }, () => { },
                    async (response) => {
                        setIsLogined(true)
                        // console.log(response)
                        setUserData(response.data)
                        userDataCurrent.current = response.data
                    })
            }
        }
        await postAPI(`http://${IP}:5000/api/user/login`, {
            nickname: nickname,
            password: password
        }, async (data) => {
            await log(data.data[0]._id, data.status)
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