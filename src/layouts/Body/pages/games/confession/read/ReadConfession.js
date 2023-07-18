import { useContext, useEffect, useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import GlobalContext from "../../../../../../hooks/useGlobalContext/GlobalContext"
import { useParams } from "react-router-native"
import getAPI from "../../../../../../server/axios/getAPI"
import Entypo from "react-native-vector-icons/Entypo"
import deleteAPI from "../../../../../../server/axios/deleteAPI"
import { useNavigate } from "react-router-native"
import ButtonIcons from "../../../../../../components/Button/ButtonIcons/ButtonIcons"

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        position: "relative",
        marginTop: 30
    },
    deleteIcon: {
        position: "absolute",
        right: 13,
        bottom: 13,
        padding: 16,
        backgroundColor: "#f24160",
        opacity: 0.5,
        borderRadius: 5
    },
    main: {

    },
    fromTo: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        height: 52
    },
    from: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",

    },
    arrows: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    to: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    textFrom: {
        color: "#c4c4ff",

    },
    textTo: {
        color: "#c4c4ff",

    },
    messageRegion: {
        width: "100%",
        paddingHorizontal: 20,
    },
    title: {
        width: "100%",
        paddingVertical: 13
    },
    textTitle: {
        textAlign: "left",
        color: "#b5ffff",
        fontWeight: 900,
        fontSize: 18,
        paddingHorizontal: 13
    },
    message: {
        marginTop: 5,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "white",
        padding: 13
    },
    allMessage: {
        color: "#c8c7fa",
    }
})

function ReadConfession() {

    const navigate = useNavigate()

    const { id } = useParams()
    const { IP } = useContext(GlobalContext)
    const [info, setInfo] = useState(null)

    useEffect(() => {
        getAPI(`http://${IP}:5000/api/games/confession/read/${id}`, {
            id: id
        }, setInfo)
    }, [])

    const { handleShowModal } = useContext(GlobalContext)

    const onDeleteConfession = () => {
        function handleDelete() {
            deleteAPI(`http://${IP}:5000/api/games/confession/delete/${id}`, {
                id: id
            }, (data) => {
                if(data.status === 200){
                    navigate("/games/confession")
                }
            })
        }
        handleShowModal("Lưu ý", "Bạn có chắc muốn xóa confession này?", handleDelete)
    }

    const Main = () => {
        return (
            <View style={styles.main}>
                <View style={styles.fromTo}>
                    <View style={styles.from}>
                        <Text style={styles.textFrom}>{info?.from !== "" ? info?.from : "Người bạn giấu tên"}</Text>
                    </View>
                    <View style={styles.arrows}>
                        <Entypo name="arrow-long-right" color={"#c4c4ff"} size={50} />
                    </View>
                    <View style={styles.to}>
                        <Text style={styles.textTo}>{info?.to !== "" ? info?.to : "Tất cả"}</Text>
                    </View>
                </View>
                <View style={styles.messageRegion}>
                    <View style={styles.title}>
                        <Text style={styles.textTitle}>{info?.title !== "" ? info?.title : "Không có tiêu đề"}</Text>
                    </View>
                    <View style={styles.message}>
                        <Text style={styles.allMessage}>{info?.message}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ButtonIcons backgroundColor={"#ff597b"} icon={<FontAwesome5 name="trash" size={28} color={"#c4c4ff"}/>} handleClick={onDeleteConfession}/>
            <Main />
        </View>
    );
}

export default ReadConfession;