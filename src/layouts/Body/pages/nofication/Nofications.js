import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { useNavigate } from "react-router-native"
import GlobalContext from "../../../../hooks/useGlobalContext/GlobalContext";
import Title from "../../../../components/Title/Title";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 30
    },
    main: {
        // justifyContent: "center",
        alignItems: "center"
    },
    tag: {
        height: "18%",
        width: "97%",
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: "#c4c4fa",
        alignItems: "center",
        marginVertical: 5,
    },
    img: {
        flex: 1,
        alignItems: "center"
    },
    avatar: {
        height: "80%",
        aspectRatio: 1,
        borderRadius: 50,
        padding: 0,
    },
    info: {
        flex: 3.3
    },
    date: {
        color: "#b5ffff"
    },
    description: {
        color: "cyan"
    }
})

function Nofication() {

    const navigate = useNavigate()

    const { userData, socket, nofications } = useContext(GlobalContext)

    function NoficationTag({ date, description, avatar, url }) {

        const readInfo = () => {
            navigate(url)
        }

        return (
            <TouchableOpacity onPress={readInfo} style={styles.tag}>
                <View style={styles.img}>
                    <Image style={styles.avatar} source={{ uri: avatar }} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Title
                title={"Thông báo"}
                marginBottom={30}
            />
            <View style={styles.main}>
                {nofications.map((tag, index) => <NoficationTag
                    key={index}
                    date={tag?.date}
                    description={tag?.description}
                    avatar={tag?.avatar}
                    url={tag?.url}
                />)}
            </View>
        </View>
    );
}

export default Nofication;