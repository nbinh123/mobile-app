import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useNavigate } from "react-router-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import getAPI from "../../../../../server/axios/getAPI";
import Title from "../../../../../components/Title/Title";
import ButtonIcons from "../../../../../components/Button/ButtonIcons/ButtonIcons";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    main: {
        position: "relative"
    }
})

function FindFriend() {

    const [strangerList, setStrangerList] = useState([{
        name: "",
        _id: "",
        distance: "",
        avatar: "",
        onShareLocation: true,
    }])
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    

    useEffect(() => {
        // gọi API lấy danh sách những người ở gần
        // getAPI()
    }, [])
    function StrangerTag({ id, name, avatar, distance, onShare }) {
        const showInfo = (id) => {
            // ở đây truyền id lên param và chuyển hướng ( navigate )
            navigate(`${id}/info`)
        }
        // phải có share thì mới được hiển thị
        {
            onShare ? (
                <TouchableOpacity onPress={() => showInfo(id)} style={styles.strangerTags}>
                    
                </TouchableOpacity>
            ) : ""
        }
    }
    const navigateToUserSettings = () => {
        navigate("settings")
    }

    return (
        <View style={styles.container}>
            <Title
                title={"Tìm bạn xung quanh"}
            />
            <ButtonIcons
                icon={<FontAwesome5 size={22} color={"white"} name="user-cog"/>}
                backgroundColor="transparent"
                bottom={"87%"}
                borderColor="black"
                padding={16}
                handleClick={navigateToUserSettings}
            />
            <View style={styles.main}>
                {!show ? (
                    <View style={styles.showWrapperFriendButton}></View>
                ) : (
                    <View style={styles.wrapperFriend}>
                        {strangerList.map((person) => {
                            return <StrangerTag
                                key={person?._id}
                                id={person?._id}
                                avatar={person?.avatar}
                                distance={person?.distance}
                                onShare={person?.onShareLocation}
                            />
                        })}
                    </View>
                )}
            </View>
        </View>
    );
}

export default FindFriend;