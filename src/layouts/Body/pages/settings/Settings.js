import { memo, useContext, useRef, useState, memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import GlobalContext from "../../../../hooks/useGlobalContext/GlobalContext";
import Button from "../../../../components/Button/Button";
import Title from "../../../../components/Title/Title";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    configButton: {
        position: "relative",
        height: "100%",
        aspectRatio: 1 / 1,
        flexDirection: "row"
    },
    mode: {
        position: "absolute",
        width: "100%"
    },
    left: {
        alignItems: "flex-start",
    },
    right: {
        alignItems: "flex-end"
    }
})

function Settings() {

    const { userData } = useContext(GlobalContext)
    const configList = useRef([
        {
            nameKey: 1,
            value: userData.config.onShareLocation,
            vn: "Chia sẻ vị trí cho mọi người"
        }, {
            nameKey: 2,
            value: userData.config.onReceiveFromStranger,
            vn: "Nhận tin nhắn từ người lạ"
        }, {
            nameKey: 3,
            value: userData.config.onGetPromoteNofications,
            vn: "Nhận thông báo ưu đãi"
        }
    ])


    const ConfigTag = memo(({ id, isTrue, nameKey }) => {

        const [on, setOn] = useState(isTrue)

        const onCheckNameKey = () => {
            let nameKey = ''
            switch (id) {
                case 1:
                    return "Chia sẻ vị trí với mọi người"
                    break;
                case 2:
                    return "Nhận tin nhắn từ người lạ"
                    break;
                case 3:
                    return "Nhận thông báo ưu đãi"
                    break;
                default:
                    break;
            }
        }

        const check = (isTrue === true ? styles.right : styles.left)
        const toogle = () => {
            setOn(!on)
        }

        return (
            <View style={[styles.configButton, styles.publicPhone]}>
                <View style={styles.nameKey}>
                    <Text>{nameKey}</Text>
                </View>
                <View style={[styles.mode, on]}>
                    <Button
                        title={""}
                        onClicked={toogle}
                    />
                </View>
            </View>
        )
    })



    return (
        <View style={styles.container}>
            <Title
                title={"Cài đặt"}
            />
            <View style={styles.config}>
                <View style={styles.public}>
                    {configList.current.map((configs) => {
                        return (
                            <ConfigTag
                                key={configs.nameKey}
                                isTrue={configs.value}
                                id={configs.nameKey}
                                nameKey={configs.vn}
                            />
                        )
                    })}
                </View>
            </View>
        </View>
    );
}

export default Settings;