import { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native"
import { useNavigate } from "react-router-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import EntypoIcon from "react-native-vector-icons/Entypo"

import getAPI from "../../../../../server/axios/getAPI";
import Title from "../../../../../components/Title/Title";
import ButtonIcons from "../../../../../components/Button/ButtonIcons/ButtonIcons";
import GlobalContext from "../../../../../hooks/useGlobalContext/GlobalContext";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    main: {
        position: "relative"
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    strangerTags: {
        borderWidth: 0.5,
        borderColor: "white",
        marginVertical: 15,
        padding: 10
    },
    tag: {
        flexDirection: "row"
    },
    name: {
        color: "white"
    },
    distance: {
        color: "white"
    },
    info: {
        justifyContent: "space-around",
        marginLeft: 8
    }
})

function FindFriend() {

    const defaultUri = useRef("https://media.istockphoto.com/id/1337144146/vi/vec-to/vector-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-h%E1%BB%93-s%C6%A1-h%C3%ACnh-%C4%91%E1%BA%A1i-di%E1%BB%87n-m%E1%BA%B7c-%C4%91%E1%BB%8Bnh.jpg?s=612x612&w=0&k=20&c=u24Lv6ta-n_-pQwnru8iwCaFysSloBwVs-LhtqxCSCw=")
    const { longitude, latitude, userData, socket, strangerList } = useContext(GlobalContext)
    const timerRef = useRef(0)
    // state ẩn hiện button show ra người dùng ở gần
    const [show, setShow] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        
    }, [])

    function StrangerTag({ id, name, avatar, distance, onShare }) {
        const showInfo = (id) => {
            // ở đây truyền id lên param và chuyển hướng ( navigate )
            navigate(`${id}/info`)
        }
        // phải có share thì mới được hiển thị
        return (
            onShare ? (
                <TouchableOpacity onPress={() => showInfo(id)} style={styles.strangerTags}>
                    <View style={styles.tag}>
                        <Image source={{ uri: avatar ? avatar : defaultUri.current }} style={styles.avatar}></Image>

                        <View style={styles.info}>  
                            <Text style={styles.name}>{name ? name : "Người dùng ẩn danh"}</Text>
                            <Text style={styles.distance}><EntypoIcon name="location-pin" size={18}/>{distance}m</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ) : ""
        )
    }
    const navigateToUserSettings = () => {
        navigate("/settings")
    }

    return (
        <View style={styles.container}>
            <Title
                title={"Tìm bạn xung quanh"}
                marginBottom={30}
            />
            <ButtonIcons
                icon={<FontAwesome5 size={22} color={"white"} name="user-cog" />}
                backgroundColor="transparent"
                bottom={"87%"}
                borderColor="black"
                padding={16}
                handleClick={navigateToUserSettings}
            />
            <View style={styles.main}>
                {show === false ? (
                    <View style={styles.showWrapperFriendButton}>
                        <Text>nút gì đây</Text>
                    </View>
                ) : (
                    <View style={styles.wrapperFriend}>
                        {strangerList.map((person, index) => {
                            return <StrangerTag
                                key={index}
                                id={person?.id}
                                name={person?.name}
                                avatar={person?.avatar}
                                distance={person?.distance}
                                onShare={true}
                            />
                        })}
                    </View>
                )}
            </View>
        </View>
    );
}

export default FindFriend;