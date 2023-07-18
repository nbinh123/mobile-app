import { memo, useContext, useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native"
import { useNavigate } from "react-router-native"

import { Hoshi, Sae } from 'react-native-textinput-effects';
import Button from "../../../../../../components/Button/Button";
import postAPI from "../../../../../../server/axios/postAPI";
import GlobalContext from "../../../../../../hooks/useGlobalContext/GlobalContext";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 22,
        flex: 1,
        justifyContent: "center"
    },
    title: {
        width: "100%"
    },
    textTitle: {
        color: "#c4c4ff",
        textAlign: "center",
        fontSize: 18,
        fontWeight: 500
    },
    main: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    fromTo: {
        width: "70%",
        flexDirection: "row",
    },
    message: {
        width: "70%"
    },
    short: {
        width: "50%"
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#c4c4ff",
        padding: 10,
        color: "#b5ffff",
        borderRadius: 5,

    },
    preview: {
        width: "100%",
        borderColor: "#c4c4ff",
        borderWidth: 1,
        padding: 13,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    messagePreview: {
        color: "#c4c4ff"
    },
    submit: {
        height: "15%",
        width: "100%",
        alignItems: "center",
        marginTop: 20,
    }
})

function CreateConfession() {

    const navigate = useNavigate()

    const { IP } = useContext(GlobalContext)
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [title, setTitle] = useState("")

    const InfomationConfession = memo(() => {

        const onCreateNewConfession = () => {

            const now = new Date()
            const local = now.toLocaleString('en-US', {
                timeZone: 'Asia/Ho_Chi_Minh'
            });

            const minutes = now.getMinutes()
            const hour = now.getHours()
            const day = now.getDay()
            const month = now.getMonth()
            const year = now.getFullYear()
            const UTC = now.getUTCDate()

            // lấy ra thời gian địa phương
            const localTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
            

            postAPI(`http://${IP}:5000/api/games/confession/send`, {
                from: from,
                to: to,
                title: title,
                message: message,
                timestamp: {
                    minutes: minutes,
                    hour: hour,
                    day: day,
                    month: month,
                    year: year,
                    UTC: UTC - 7,
                    fullTime: `${hour}h${minutes}m - ${day}/${month}/${year} - UTC:+${UTC}`
                }
            }, (data) => {
                if(data.status === 200){
                    navigate("/games/confession")
                }
            })
            
        }

        const [message, setMessage] = useState("")
        return (
            <View style={styles.message}>
                <TextInput
                    placeholder="Title:"
                    placeholderTextColor={"#c4c4ff"}
                    style={[styles.input, styles.titleMessage]}
                />
                <TextInput
                    placeholder="Writing the sweet messages on your mind ><"
                    placeholderTextColor={"#c4c4ff"}
                    style={[styles.input, styles.infoMessage]}
                    numberOfLines={1}
                    inputStyle={styles.input}
                    onChangeText={(text) => setMessage(text)}

                />
                <View style={styles.preview}>
                    <Text style={styles.messagePreview}>{message}</Text>
                </View>
                <View style={styles.submit}>
                    <Button
                        onClicked={onCreateNewConfession}
                        title={"Thêm"}
                        height={100}
                        width={50}
                        alignItems="center"
                        justifyContent="flex-end"
                        paddingHorizontal={20}
                        borderRadius={5}
                        borderColor="black"
                        background="#b5ffff"
                        titleColor="black"
                    />
                </View>
            </View>
        )
    })
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.textTitle}>Tạo mới - Confession</Text>
            </View>
            <View style={styles.main}>
                <View style={styles.fromTo}>
                    <TextInput
                        placeholder="From:"
                        placeholderTextColor={"#c4c4ff"}
                        style={[styles.input, styles.short]}
                    />
                    <TextInput
                        placeholder="To:"
                        placeholderTextColor={"#c4c4ff"}
                        style={[styles.input, styles.short]}
                    />
                </View>
                <InfomationConfession />
            </View>
        </View>
    );
}

export default CreateConfession;