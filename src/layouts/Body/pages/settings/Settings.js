import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import GlobalContext from "../../../../hooks/useGlobalContext/GlobalContext";
import Button from "../../../../components/Button/Button";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    configButton: {
        position: "relative",
        width: "100%"
    },
    mode: {
        position: "absolute",
        width: "100%"
    },
    left: {
        left: 0
    },
    right: {
        right: 0
    }
})

function Settings() {

    const { userData } = useContext(GlobalContext)
    function ConfigTag({ id, key, isTrue }) {

        const check = (isTrue === true ? styles.right : styles.left)
        const toogle = (id) => {
            
        }

        return (
            <TouchableOpacity onPress={toogle} style={[styles.configButton, styles.publicPhone]}>
                <View style={[styles.mode, check]}>
                    <Button
                        title={""}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.textTitle}>Cài đặt</Text>
            </View>
            <View style={styles.config}>
                <View style={styles.public}>
                    <ConfigTag id={userData._id} key={"address"} isTrue={userData?.show?.address}/>
                    <ConfigTag id={userData._id} key={"phone"} isTrue={userData?.show?.phone}/>
                    <ConfigTag id={userData._id} key={"friend_list"} isTrue={userData?.show?.friend_list}/>
                </View>
            </View>
        </View>
    );
}

export default Settings;