import { memo, useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import GlobalContext from "../../../../hooks/useGlobalContext/GlobalContext";
import Button from "../../../../components/Button/Button";
import Title from "../../../../components/Title/Title";
import putAPI from "../../../../server/axios/putAPI";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    configButton: {
        flexDirection: "row",
        width: "100%",
        height: 48,
        borderWidth: 0.5,
        borderColor: "#c4c4fa",
        alignItems: "center",
        paddingHorizontal: 13,
        marginVertical: 5,
        borderRadius: 5
    },
    nameKey: {
       width: "70%"
    },
    mode: {
        height: "60%",
        width: "22%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50
    },
    left: {
        alignItems: "flex-start",
        backgroundColor: "grey"
    },
    right: {
        alignItems: "flex-end",
        backgroundColor: "lightgreen"
    }
})

function Settings() {

    const { userData, IP } = useContext(GlobalContext)
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
        const isSelected = (on ? "flex-start" : "flex-end")

        const check = (isTrue === true ? styles.right : styles.left)
        const toogle = async () => {
            setOn(!on)
            // gọi API mỗi khi thay đổi setting
            await putAPI(`http://${IP}:5000/api/user/config/update`, {
                id: userData._id,
                which: Number(id),
                boo: (on === true ? 0 : 1)
            }, async (data) => {
                console.log(data.config)
            })
        }
        useEffect(() => {
            console.log(on + "  " + nameKey);
        },[[on]])

        return (
            <View style={[styles.configButton]}>
                <View style={styles.nameKey}>
                    <Text style={{ color: "white"}}>{nameKey}</Text>
                </View>
                <View style={[styles.mode, check]}>
                    <Button
                        title={""}
                        onClicked={toogle}
                        width={100}
                        height={100}                        
                        justifyContent={isSelected}
                        paddingHorizontal={13}
                        borderWidth={0}
                        borderRadius={50}
                        marginRight={3}
                    />
                </View>
            </View>
        )
    })



    return (
        <View style={styles.container}>
            <Title
                title={"Cài đặt kết nối"}
                marginBottom={13}
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