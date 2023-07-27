import { StyleSheet, Text, View } from "react-native"
import { useNavigate } from "react-router-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import Title from "../../../../components/Title/Title";
import ButtonIcons from "../../../../components/Button/ButtonIcons/ButtonIcons";
import { useContext, useEffect } from "react";
import GlobalContext from "../../../../hooks/useGlobalContext/GlobalContext";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",

    }
})

function Connect() {

    const navigate = useNavigate()

    const navigateToFindFriend = () => {
        navigate("find")
    }
    return (
        <View style={styles.container}>
            <Title
                title={"Kết nối"}
            />
            <ButtonIcons
                icon={<FontAwesome5 name="user-plus" size={17} color={"white"}/>}
                bottom={13}
                padding={16}
                handleClick={navigateToFindFriend}
            />
            <View style={styles.main}>
            </View>
        </View>
    );
}

export default Connect;