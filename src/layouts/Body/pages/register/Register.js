import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Link, Navigate, useNavigate } from "react-router-native";
import Button from "../../../../components/Button/Button";
import { useContext, useRef, useState } from "react";
import GlobalContext from "../../../../hooks/useGlobalContext/GlobalContext";
import getAPI from "../../../../server/axios/getAPI";
import postAPI from "../../../../server/axios/postAPI";

import axios from "axios"

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderWidth: 1,
        flex: 1
    },
    title: {
        // flex: 1,
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    textTitle: {
        fontSize: 23,
        fontWeight: "bold"
    },
    form: {
        // flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    regisForms: {
        width: "45%",
        margin: 3
    },
    regisInput: {
        color: "white",
        width: "100%",
        marginTop: 18,
        border: 0,
        borderWidth: 0.5,
        fontSize: 14.5,
        borderRadius: 3,
        paddingHorizontal: 5,
    },
    login: {
        // flex: 0.2,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 8,                                          
        height: "7%"
    },
    submit: {
        // flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "7%"
    }
})

function Register() {

    const { IP } = useContext(GlobalContext)

    const [name, setName] = useState("")
    const [birth, setBirth] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [credit, setCredit] = useState("")
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")

    const getText = (text, channel) => {
        channel(text)
    }

    const handleRegister = () => {

        postAPI(`http://${IP}:5000/api/user/register`, {
            name: name,
            birth: birth,
            email: email,
            phone: phone,
            address: address,
            credit_card: credit,
            nickname: nickname,
            password: password,
        })
    }

    const { handleShowModal } = useContext(GlobalContext)
    const navigate = useNavigate()

    const handleNavigateToLogin = () => {
        function move() {
            navigate("/")
        }
        move()
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={-50}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.textTitle}>Đăng kí</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.regisForms}>
                        <TextInput
                            onChangeText={(text) => getText(text, setName)}
                            style={styles.regisInput}
                            name="name"
                            placeholder="Tên"
                        />
                    </View>
                    <View style={styles.regisForms}>
                        <TextInput
                            onChangeText={(text) => getText(text, setBirth)}
                            style={styles.regisInput}
                            name="birth"
                            type="number"
                            placeholder="Ngày sinh"
                        />
                    </View>
                    <View style={styles.regisForms}>
                        <TextInput
                            onChangeText={(text) => getText(text, setEmail)}
                            style={styles.regisInput}
                            name="email"
                            type="email"
                            placeholder="Email"
                        />
                    </View>
                    <View style={styles.regisForms}>
                        <TextInput
                            onChangeText={(text) => getText(text, setPhone)}
                            style={styles.regisInput}
                            name="phone"
                            type="text"
                            placeholder="Số điện thoại"
                        />
                    </View>
                    <View style={styles.regisForms}>
                        <TextInput
                            onChangeText={(text) => getText(text, setAddress)}
                            style={styles.regisInput}
                            name="address"
                            placeholder="Địa chỉ"
                        />
                    </View>
                    <View style={styles.regisForms}>
                        <TextInput
                            onChangeText={(text) => getText(text, setCredit)}
                            style={styles.regisInput}
                            name="credit_card"
                            placeholder="Thẻ tín dụng (không bắt buộc)"
                        />
                    </View>
                    <View style={styles.regisForms}>
                        <TextInput
                            onChangeText={(text) => getText(text, setNickname)}
                            style={styles.regisInput}
                            name="nickname"
                            type="password"
                            placeholder="Tên đăng nhập"
                        />
                    </View>
                    <View style={styles.regisForms}>
                        <TextInput
                            onChangeText={(text) => getText(text, setPassword)}
                            style={styles.regisInput}
                            name="password"
                            type="password"
                            placeholder="Mật khẩu"
                        />
                    </View>
                </View>
                <View style={styles.login}>
                    <Button
                        title={"Đã có tài khoản?"}
                        height={100}
                        paddingHorizontal={105}
                        background="transparent"
                        borderRadius={5}
                        onClicked={handleNavigateToLogin}
                    />
                    {/* color: #b5ffff; text-decoration: underline; cursor: pointer; */}
                </View>
                <View style={styles.submit}>
                    <Button
                        title={"Đăng kí"}
                        height={100}
                        paddingHorizontal={133}
                        background="transparent"
                        borderRadius={5}
                        marginVertical={3}
                        onClicked={handleRegister}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Register;