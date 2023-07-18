import { useContext, useEffect, useRef, useState, memo } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from "react-native"
import getAPI from "../../../../../server/axios/getAPI";
import GlobalContext from "../../../../../hooks/useGlobalContext/GlobalContext";
import Button from "../../../../../components/Button/Button";

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 30,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        width: "100%",
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    titleText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: 500,
        color: "#b5fe"
    },
    input: {
        width: "80%",
        height: 44,
        margin: 20,
        flexDirection: "row",
        justifyContent: "center",
    },
    textInput: {
        borderWidth: 0.5,
        height: "100%",
        paddingHorizontal: 13,
        borderRadius: 3,
        marginHorizontal: 5,
        borderColor: "#c4c4ff"
    },
    selectPlayer: {
        flexDirection: "row",
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "white"
    },
    choosePlayer: {
        width: "25%",
        margin: 0,
    },
    selectPlayerRegion: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        // borderWidth: 1
    },
    playerTag: {
        borderWidth: 0.3,
        paddingHorizontal: 13,
        paddingVertical: 8,
        marginHorizontal: 5,
        marginVertical: 5,
        
    },
    playerName: {
        width: "100%",
        textAlign: "center",
        color: "white"
    },
    region: {
        width: "100%",
        borderWidth: 0.55,
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        borderColor: "#b5ffff",
        borderRadius: 3
    },
    heroTag: {
        width: "20.1%",
        borderWidth: 1,
        marginTop: 8,
        borderColor: "#c4c4ff"
    },
    heroName: {
        fontSize: 12,
        textAlign: "center",
        paddingVertical: 10,
        color: "#c4c4ff"
    },
    isSelected: {
        backgroundColor: "lightgreen",
        borderColor: "lightgreen",
        borderRadius: 10
    },
    redGroup: {
        backgroundColor: "#f24160",
    },
    blueGroup: {
        backgroundColor: "#b5ffff"
    },
    ok: {
        color: "#c4c4ff"
    }
})
function RandomGame() {

    const { handleShowModal, IP, socket } = useContext(GlobalContext)
    const keyCurrent = useRef(0)
    const [listHeroes, setListHeroes] = useState([])
    const playerCurrent = useRef([])

    useEffect(() => {
        getAPI(`http://${IP}:5000/api/games/random/heroes/get`, {}, setListHeroes, (array) => {
            setListHeroes(shuffleArray(array))
        })
        function shuffleArray(array) {
            let currentIndex = array.length;
            let temporaryValue, randomIndex;

            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }
    }, [])

    function PickingHeroRegion() {

        const { handleShowModal } = useContext(GlobalContext)
        function TagHero({ id, name, special, index }) {


            const [show, setShow] = useState(false)
            const pickHero = () => {
                setShow(true)
            }
            const isSelected = show ? styles.isSelected : ""

            return (
                <TouchableOpacity onPress={pickHero} style={[styles.heroTag, isSelected]}>
                    <Text style={styles.heroName}>{show ? name : (special ? `${index}*` : index)}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <View style={styles.region}>
                {listHeroes.map((hero, index) => {
                    return (
                        <TagHero
                            name={hero.name}
                            index={index}
                            id={hero.id}
                            key={hero.id}
                            special={hero.name === "Flo"}
                        />
                    )
                })}
            </View>
        )
    }
    const SelectPlayerRegion = memo(({ list }) => {

        // danh sách người chơi
        const [players, setPlayers] = useState([])


        useEffect(() => {
            // nghe server trả danh sách người chơi và cập nhật
            socket.on("Server-send-playerList", (list) => {
                setPlayers(list)
            })
        })
        // xóa người chơi
        const onDeletePlayer = (id) => {
            // tìm index của người chơi đó theo id, vì id là độc nhất
            const index = players.findIndex(items => items.id === id)
            // copy mảng cũ
            const arr = [...players]
            // xóa đi phần tử đó
            arr.splice(index, 1)
            // gửi mảng mới lên server để cập nhật
            socket.emit("Client-send-playerList", arr)
            // cập nhật lại danh sách người chơi bằng mảng mới
            setPlayers(arr)
        }
        const onRandomPlayer = () => {

            function randomZeroOrOne() {
                // trả ra 0 hoặc 1 với xác xuất gần bằng nhau
                return String(Math.floor(Math.random() * 2))
            }
            // tạo một mảng mới
            const arr = [...players]
            arr.forEach(player => {
                player.group = randomZeroOrOne()
            })
            setPlayers(arr)
            console.log(arr)
        }
        function TagPlayer({ id, name, group }) {

            function classify(groupIndex){
                console.log(groupIndex)
                if(groupIndex === "1"){
                    return styles.redGroup
                }else{
                    if(groupIndex === "0"){
                        return styles.blueGroup
                    }else{
                        return {
                            color: "#c4c4ff"
                        }
                    }
                }
            }

            const isChoosen = classify(group)
            return (
                <TouchableOpacity onPress={() => onDeletePlayer(id)} style={[styles.playerTag, isChoosen]}>
                    <Text style={[styles.ok, isChoosen]}>{name}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <View style={styles.selectPlayer}>
                <ScrollView contentContainerStyle={styles.selectPlayerRegion}>
                    {players.map(player =>
                        <TagPlayer
                            id={player.id}
                            key={player.id}
                            name={player.name}
                            group={player.group ? player.group : ""}
                        />)}
                </ScrollView>
                <View style={styles.choosePlayer}>
                    <Button
                        title={"Chọn ngẫu nhiên"}
                        titleColor="black"
                        height={100}
                        fontSize={13}
                        background="transparent"
                        borderWidth={0}
                        borderLeftWidth={0.5}
                        onClicked={onRandomPlayer}
                        borderColor="white"
                    />
                </View>
            </View>
        )
    })
    const AddPlayer = memo(() => {

        const [players, setPlayers] = useState([])
        const inpPlayerRef = useRef()
        const [inpValue, setInpValue] = useState("")
        const onAdd = () => {
            let name = inpValue
            const handleAddPlayer = () => {
                setPlayers([...players, {
                    id: keyCurrent.current,
                    name: name,
                }])
                socket.emit("Client-send-playerList", [...players, {
                    id: keyCurrent.current,
                    name: name,
                }])
                inpPlayerRef.current.clear()
                keyCurrent.current += 1
            }
            // vấn đề là: khi show modal, component bị re-render lại, nên nó sẽ thiết lập players lại thành mảng rỗng, giống như trạng thái mặc định
            handleAddPlayer()
        }

        useEffect(() => {
            socket.on("Server-send-playerList", (list) => {
                setPlayers(list)
            })
        })

        return (
            <View style={styles.input}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Tạo danh sách người chơi"
                    onChangeText={text => setInpValue(text)}
                    ref={inpPlayerRef}
                    placeholderTextColor={"#c4c4ff"}    
                />
                <Button
                    title={"Thêm"}
                    height={100}
                    background="transparent"
                    paddingHorizontal={13}
                    borderRadius={5}
                    onClicked={onAdd}
                    marginRight={0}
                    borderWidth={0.5}
                    borderLeftWidth={0.5}
                    borderColor="#b5ffff"
                    titleColor="#c4c4ff"
                />
            </View>
        )
    })


    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Bóc thăm may mắn</Text>
            </View>
            <AddPlayer />
            <SelectPlayerRegion list={playerCurrent.current} />
            <ScrollView style={{ width: "100%", marginTop: 40 }}>
                <PickingHeroRegion />
            </ScrollView>
        </View>
    );
}

export default RandomGame;