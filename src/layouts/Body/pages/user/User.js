import { useContext, useRef } from "react";
import { StyleSheet, Text, View } from "react-native"
import GlobalContext from "../../../../hooks/useGlobalContext/GlobalContext";
import Title from "../../../../components/Title/Title";

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

    const { userData, userDataCurrent } = useContext(GlobalContext)
    const TagConfig = ({ title, data }) => {
        return (
            <View style={styles.tagConfig}>
                <Text style={styles.titleConfig}>{title} <Text style={styles.textData}>{data}</Text></Text>
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
                    <TagConfig title={"ID: "} data={userData._id} />
                    <TagConfig title={"Tên: "} data={userData.name} />
                    <TagConfig title={"Địa chỉ: "} data={userData.address} />
                    <TagConfig title={"Sinh nhật: "} data={userData.birth} />
                    <TagConfig title={"Thẻ tín dụng: "} data={userData.credit_cart} />
                    <TagConfig title={"Email: "} data={userData.email} />
                    <TagConfig title={"Nickname: "} data={userData.nickname} />
                    <TagConfig title={"SĐT: "} data={userData.phone} />
                    <TagConfig title={"Giới tính: "} data={userData.sex} />
                </View>
            </View>
        </View>
    );
}

export default User;