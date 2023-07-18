import { StyleSheet, Text, TextInput, View } from "react-native"
import Button from "../../../../../components/Button/Button"
import { useContext, useEffect, useRef, useState, memo } from "react"
import GlobalContext from "../../../../../hooks/useGlobalContext/GlobalContext"
// import useDebounce from "../../../../../hooks/useDebounce/useDebounce"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Title from "../../../../../components/Title/Title"

function HighShooting() {

    const { socket } = useContext(GlobalContext)

    const [typeHeight, setTypeHeight] = useState("less")
    const [windyWay, setWindyWay] = useState("forward")
    const [timer, setTimer] = useState(null)

    // lắng nghe sự lựa chọn độ cao của client
    const onChangeTypeHeight = (type) => {
        if (type !== typeHeight) {
            socket.emit("Client-send-differenceHeight", type)
            setTypeHeight(type)
        }
    }
    // lắng nghe sự lựa chọn hướng gió của client
    const onChangeWindyWay = (way) => {
        if (way !== windyWay) {
            socket.emit("Client-send-windyWay", way)
            setWindyWay(way)
        }
    }
    const sendDatasToServer = (type, value) => {
        const handleSend = () => {
            socket.emit("Client-send-data", {
                type: type,
                value: value
            })
        }
        if (timer) {
            clearTimeout(timer)
        }
        const newTimer = setTimeout(() => {
            handleSend()
        }, 1000)
        setTimer(newTimer)
    }
    // lắng nghe lực và góc của server trả vể và cập nhập UI

    function ResultRegion() {

        const [angle, setAngle] = useState(90)
        const [force, setForce] = useState(96.5)
        const arr = [1, 2, 3, 4, 5]

        useEffect(() => {
            socket.on("Server-send-AngleAndForce", (data) => {
                console.log(data)
                setAngle(data.angle)
                setForce(data.force)
            })
        })

        return (
            <View style={styles.resultRegion}>
                <View style={styles.titleResults}>
                    <View style={[styles.angle, { borderRightWidth: 0.5 }]}>
                        <Text style={styles.textResult}>Góc</Text>
                    </View>
                    <View style={styles.force}>
                        <Text style={styles.textResult}>Lực</Text>
                    </View>
                </View>
                {arr.map((tag, index) => {
                    return (
                        <View style={styles.tagResult} key={index}>
                            <View style={styles.childResult}>
                                <Text style={styles.icon}>{angle - index}<MaterialCommunityIcons name="angle-acute" /></Text>
                            </View>
                            <View style={styles.childResult}>
                                <Text style={styles.icon}>{force - index * 5}<MaterialIcons name="trending-up" /></Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Title
                title={"Phần mềm bắn siêu cao"}
            />
            <View style={styles.form}>
                <View style={styles.input}>
                    <View style={styles.select}>
                        <View style={styles.selectBtn}>
                            <Button
                                marginRight={0}
                                width={50}
                                height={100}
                                fontSize={10}
                                title={"Địch cao hơn"}
                                onClicked={() => onChangeTypeHeight("less")}
                                background={typeHeight === "less" ? "lightgreen" : "transparent"}

                            />
                        </View>
                        <View style={styles.selectBtn}>
                            <Button
                                marginRight={0}
                                width={50}
                                height={100}
                                fontSize={10}
                                title={"Địch thấp hơn"}
                                onClicked={() => onChangeTypeHeight("more")}
                                background={typeHeight === "more" ? "lightgreen" : "transparent"}
                            />
                        </View>
                    </View>
                    <TextInput
                        placeholder="Độ cao"
                        style={styles.textInput}
                        keyboardType="numeric"
                        onChangeText={(value) => sendDatasToServer("height", value)}
                    />
                </View>
                <View style={styles.input}>
                    <TextInput
                        placeholder="Khoảng cách"
                        style={styles.textInput}
                        keyboardType="numeric"
                        onChangeText={(value) => sendDatasToServer("distance", value)}
                    />
                </View>
                <View style={styles.input}>
                    <View style={styles.select}>
                        <View style={styles.selectBtn}>
                            <Button
                                marginRight={0}
                                width={50}
                                height={100}
                                fontSize={10}
                                title={"Gió thuận"}
                                onClicked={() => onChangeWindyWay("forward")}
                                background={windyWay === "forward" ? "lightgreen" : "transparent"}
                            />
                        </View>
                        <View style={styles.selectBtn}>
                            <Button
                                marginRight={0}
                                width={50}
                                height={100}
                                fontSize={10}
                                title={"Gió ngược"}
                                onClicked={() => onChangeWindyWay("reserve")}
                                background={windyWay === "reserve" ? "lightgreen" : "transparent"}
                            />
                        </View>
                    </View>
                    <TextInput
                        placeholder="Gió"
                        style={styles.textInput}
                        keyboardType="numeric"
                        onChangeText={(value) => sendDatasToServer("windy", value)}
                    />
                </View>
            </View>
            <ResultRegion />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {

    },
    title: {
        width: "100%",
        marginTop: 30,
        alignItems: "center",
    },
    textTitle: {
        fontSize: 22,
        fontWeight: 500,
        color: "#c4c4ff"
    },
    form: {
        flexDirection: "row",
        width: "100%",
        height: "30%",
        justifyContent: "space-around",
        marginTop: -30,
        marginBottom: 10
    },
    input: {
        justifyContent: "flex-end",
        width: "30%",
    },
    textInput: {
        borderWidth: 0.5,
        borderColor: "black",
        paddingHorizontal: 8,
        paddingVertical: 8,
        textAlign: "center",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopWidth: 0.3
    },
    select: {
        width: "100%",
        height: "32%",
        flexDirection: "row",
        justifyContent: "center",
    },
    selectBtn: {
        width: "50%",
        height: "100%",
        justifyContent: "flex-end"
    },
    resultRegion: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    titleResults: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-around",
        marginBottom: 20
    },
    angle: {
        borderBottomWidth: 0.5,
        paddingVertical: 20,
        width: "50%",
        borderBottomRightRadius: 15
    },
    force: {
        borderBottomWidth: 0.5,
        paddingVertical: 20,
        width: "50%",
        borderBottomLeftRadius: 15
    },
    textResult: {
        textAlign: "center",
        color: "#c4c4fa"
    },
    tagResult: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    childResult: {
        width: "40%",
        borderBottomWidth: 0.5,
        paddingVertical: 10
    },
    icon: {
        width: "100%",
        textAlign: "center",
        color: "#e7c3fa"
    }
})

export default HighShooting;