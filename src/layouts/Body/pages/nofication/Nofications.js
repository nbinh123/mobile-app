import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native"
import GlobalContext from "../../../../hooks/useGlobalContext/GlobalContext";
import Title from "../../../../components/Title/Title";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tag: {
        width: "90%",
        flexDirection: "row"
    },
    img: {
        flex: 1
    },
    info: {
        flex: 8
    }
})

function Nofication() {
    function NoficationTag({ date, decription, avatar }) {
        return (
            <View style={styles.tag}>
                <View style={styles.img}>
                    <Image source={{ uri: avatar }} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.decription}>{decription}</Text>
                </View>
            </View>
        )
    }

    const { userData, socket } = useContext(GlobalContext)
    const [nofications, setNofications] = useState([])

    useEffect(() => {

    }, [])
    useEffect(() => {
        socket.on("Someone-send-friend-request", (data) => {
            console.log(data)
            setNofications([...nofications, {
                from: data.id,
                decription: data.decription,
                avatar: data.avatar,
                date: data.date
            }])
        })
    })

    return (
        <View style={styles.container}>
            <Title
                title={"Thông báo"}
            />
            <View style={styles.main}>
                {nofications.map((tag, index) => <NoficationTag
                    key={index}
                    date={tag?.date}
                    decription={tag?.decription}
                    avatar={tag?.avatar}
                />)}
            </View>
        </View>
    );
}

export default Nofication;