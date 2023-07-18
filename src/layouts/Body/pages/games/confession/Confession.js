import { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import GlobalContext from "../../../../../hooks/useGlobalContext/GlobalContext";
import getAPI from "../../../../../server/axios/getAPI";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ButtonIcons from "../../../../../components/Button/ButtonIcons/ButtonIcons";


import { useNavigate } from "react-router-native"
import Title from "../../../../../components/Title/Title";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        position: "relative",
        justifyContent: "center"
    },
    title: {
        width: "100%",
        position: "relative",
    },
    createIcon: {
        position: "absolute",
        right: 13,
        bottom: 13,
        padding: 16,
        backgroundColor: "#4c4cfa",
        opacity: 0.8,
        borderRadius: 50,
        borderColor: "#4c4cfa"
    },
    textTitle: {
        color: "#c4c4ff",
        textAlign: "center",
        fontWeight: 500,
        fontSize: 18,
    },
    main: {
        width: "100%",
        marginTop: 22,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center"
    },
    confessionTag: {
        width: "20%",
        height: 60,
        marginHorizontal: 6.5,
        borderWidth: 1,
        borderColor: "#c4c4ff",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 13,
        borderRadius: 50
    }
})

function Confession() {

    const navigate = useNavigate()
    const { IP } = useContext(GlobalContext)
    const [confessionList, setConfessionList] = useState([])

    useEffect(() => {
        getAPI(`http://${IP}:5000/api/games/confession/get`, {}, setConfessionList)
    }, [])

    function ConfessionTag({ from, to, title, message, timestamp, index, id }) {

        const onReadConfession = () => {
            navigate(`/games/confession/read/${id}`)
        }

        return (
            <TouchableOpacity onPress={onReadConfession} style={styles.confessionTag}>
                <Text style={{ color: "white" }}>{index}</Text>
            </TouchableOpacity>
        )
    }
    const navigateCreating = () => {
        navigate("create")
    }

    return (
        <View style={styles.container}>
            <ButtonIcons handleClick={navigateCreating} icon={<MaterialCommunityIcons name="chat-plus" size={28} color={"#c4c4ff"} />} />
            <Title
                title={"Chào mừng đến với Confession."}
            />
            <View style={styles.main}>
                {confessionList.map((message, index) =>
                    <ConfessionTag
                        from={message?.from}
                        to={message?.to}
                        title={message?.title}
                        timestamp={message?.timestamp}
                        key={index}
                        index={index + 1}
                        id={message._id}
                    />)}

            </View>
            <Text style={[styles.confi, { color: "white" }]}>{confessionList.length === 0 ? "Đang tải..." : ""}</Text>
        </View>
    );
}

export default Confession;