import { useContext, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Link, useNavigate } from "react-router-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import GlobalContext from "../../../../hooks/useGlobalContext/GlobalContext";
import Title from "../../../../components/Title/Title";

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    tagGame: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        margin: 3,
        borderColor: "#c4c4ff",
        borderRadius: 3
    },
    id: {
        flex: 0.3,
        alignItems: "center"
    },
    name: {
        flex: 2,
    },
    textName: {
        textAlign: "center",
        color: "#c4c4ff"
    },
    title: {
        width: "100%"
    },
    textTitles: {
        fontSize: 22,
        marginBottom: 22,
        textAlign: "center",
        color: "#c3c3ff",
        fontWeight: 700
    }
})

function ListGame() {

    const { handleShowModal } = useContext(GlobalContext)
    const navigate = useNavigate()

    const join = (name, url) => {
        function move(){
            navigate(url)
        }
        // handleShowModal("Thông báo!!", `Vào trò chơi <${name}> ?`, move)
        move()
    }

    const listGames = useRef([
        {
            id: 1,
            name: "Ngẫu nhiên đối tượng",
            url: "random"
        }, {
            id: 2,
            name: "Bắn súng tọa độ siêu cao",
            url: "high-shooting"
        }, {
            id: 3,
            name: "Gửi confession",
            url: "confession"
        }
    ])

    return (
        <View style={styles.container}>
            <Title
                title={"Danh sách trò chơi"}
                marginBottom={22}
            />
            {listGames.current.map(game => {
                return (
                    <TouchableOpacity key={game.id} onPress={() => join(game.name, game.url)}>
                        <View>
                            <View style={styles.tagGame}>
                                <View style={styles.id}>
                                    <Text><AntDesignIcon name="star" color={"salmon"} size={22} /></Text>
                                </View>
                                <View style={styles.name}>
                                    <Text style={styles.textName}>{game.name}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    );
}

export default ListGame;