import { StyleSheet, Text, View } from "react-native"
import { Link } from "react-router-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // height: "10%",
        flex: 0.85,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    tag: {
        borderWidth: 0.5,
        borderColor: "#685eb0",
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderLeftWidth: 0
    },
    firstTag: {
        borderLeftWidth: 0
    },
    lastTag: {
        borderRightWidth: 0
    },
    titleTag: {
        fontSize: 10,
        color: "#685eb0"
    }
})

function Footer() {
    return (
        <View style={styles.container}>
            <Link to={"/"} style={[styles.tag, styles.firstTag]}>
                <>
                    <FontAwesome5 name="home" size={20} color={"#685eb0"} style={{ marginBottom: 3 }} />
                    <Text style={styles.titleTag}>Trang chủ</Text>
                </>
            </Link>
            <Link to={"/shop"} style={styles.tag}>
                <>
                    <Fontisto name="shopping-store" size={20} color={"#685eb0"} style={{ marginBottom: 3 }} />
                    <Text style={styles.titleTag}>Cửa hàng</Text>
                </>
            </Link>
            <Link to={"/connect"} style={styles.tag}>
                <>
                    <FontAwesome5 name="user-friends" size={20} color={"#685eb0"} style={{ marginBottom: 3 }}/>
                    <Text style={styles.titleTag}>Kết nối</Text>
                </>
            </Link>
            <Link to={"/games"} style={styles.tag}>
                <>
                    <FontAwesome5 name="gamepad" size={20} color={"#685eb0"} style={{ marginBottom: 3 }} />
                    <Text style={styles.titleTag}>Trò chơi</Text>
                </>
            </Link>
            <Link to={"/user"} style={[styles.tag, styles.lastTag]}>
                <>
                    <FontAwesome name="user" size={20} color={"#685eb0"} style={{ marginBottom: 3 }} />
                    <Text style={styles.titleTag}>Người dùng</Text>
                </>
            </Link>
        </View>
    );
}

export default Footer;