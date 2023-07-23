import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native"
import { useParams } from "react-router-native";
import GlobalContext from "../../../../../hooks/useGlobalContext/GlobalContext";
import getAPI from "../../../../../server/axios/getAPI";

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

function Info() {

    const { userId } = useParams()
    const { IP } = useContext(GlobalContext)
    const [info, setInfo] = useState(null)
    useEffect(() => {
        getAPI(`http://${IP}:5000/api/user/get`, {
            id: userId
        }, () => {}, async (infomations) => {
            const data = infomations?.data
            setInfo(data)
        })
    }, [])

    return (
        <View
            style={styles.container}>
            <Text>Info</Text>
        </View>
    );
}

export default Info;