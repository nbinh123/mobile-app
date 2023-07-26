import { useContext, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native"
import GlobalContext from "../../../../hooks/useGlobalContext/GlobalContext";
import Title from "../../../../components/Title/Title";
import Button from "../../../../components/Button/Button";
import putAPI from "../../../../server/axios/putAPI";

const styles = StyleSheet.create({
    container: {

    },
    main: {
        width: "100%",
        justifyContent: "center",
        marginTop: 22
    },
    line: {
        width: "100%",
    },
    textLine: {
        color: "#b5fafa",
        textAlign: "left",
        paddingLeft: 22,
        fontSize: 18,
        fontWeight: 400
    },
    configs: {

    }
})


function User() {

    const { userData, IP } = useContext(GlobalContext)



    const TagConfig = ({ title, data, nameKey }) => {

        const [newValue, setNewValue] = useState(data)
        const [timer, setTimer] = useState(null)
        const update = (text) => {
            setNewValue(text)
            // kỹ thuật debounce
            if(timer){
                clearTimeout(timer)
            }
            const newTimer = setTimeout(() => {
                // gọi API ở đây
                putAPI(`http://${IP}:5000/api/user/info/update`, {
                    id: userData._id,
                    nameKey: nameKey,
                    value: newValue
                })
            },2000)
            setTimer(newTimer)
        }

        return (
            <View style={styles.tagConfig}>
                <Text>{title}</Text>
                <TextInput onChangeText={(text) => update(text)} style={styles.titleConfig} value={newValue}></TextInput>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <Title
                title={"Người dùng"}
            />
            <View style={styles.main}>
                <View style={styles.line}>
                    <Text style={styles.textLine}>Thông tin người dùng</Text>
                </View>
                <View style={styles.configs}>
                    <TagConfig
                        title={"ID: "}
                        data={userData._id}
                        nameKey={"_id"}
                    />
                    <TagConfig
                        title={"Tên: "}
                        data={userData.name}
                        nameKey={"name"}
                    />
                    <TagConfig
                        title={"Địa chỉ: "}
                        data={userData.address}
                        nameKey={"address"}
                    />
                    <TagConfig
                        title={"Sinh nhật: "}
                        data={userData.birth}
                        nameKey={"birth"}
                    />
                    <TagConfig
                        title={"Thẻ tín dụng: "}
                        data={userData.credit_cart}
                        nameKey={"credit_cart"}
                    />
                    <TagConfig
                        title={"Email: "}
                        data={userData.email}
                        nameKey={"email"}
                    />
                    <TagConfig
                        title={"Nickname: "}
                        data={userData.nickname}
                        nameKey={"nickname"}
                    />
                    <TagConfig
                        title={"SĐT: "}
                        data={userData.phone}
                        nameKey={"phone"}
                    />
                    <TagConfig
                        title={"Giới tính: "}
                        data={userData.sex}
                        nameKey={"sex"}
                    />
                </View>
            </View>
        </View>
    );
}

export default User;