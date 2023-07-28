import { useContext, useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Image } from "react-native"
import { useParams } from "react-router-native";
import GlobalContext from "../../../../../hooks/useGlobalContext/GlobalContext";
import getAPI from "../../../../../server/axios/getAPI";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather"
import Button from "../../../../../components/Button/Button";
import postAPI from "../../../../../server/axios/postAPI";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 55
    },
    editFriend: {
        width: 60,
        height: 60
    },
    avatar: {
        width: "40%",
        aspectRatio: 1,
        borderRadius: 100
    },
    name: {
        color: "white",
        fontSize: 20
    }
})

function Info() {

    const { userId } = useParams()              // userId của người cần xem
    const { IP, userData, socket } = useContext(GlobalContext)    // IP server
    const iconSize = useRef(16)                 // kích cỡ icon chung
    const [isRequestAddFriend, setIsRequestAddFriend] = useState(false)
    const defaultAvatar = useRef("https://media.istockphoto.com/id/1337144146/vi/vec-to/vector-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-h%E1%BB%93-s%C6%A1-h%C3%ACnh-%C4%91%E1%BA%A1i-di%E1%BB%87n-m%E1%BA%B7c-%C4%91%E1%BB%8Bnh.jpg?s=612x612&w=0&k=20&c=u24Lv6ta-n_-pQwnru8iwCaFysSloBwVs-LhtqxCSCw=")
    const [info, setInfo] = useState(null)
    const sexual = (info?.sex === "male" ? <FontAwesome color={"red"} name="mars" size={iconSize.current} /> :
        (info?.sex === "female" ? <FontAwesome color={"pink"} name="venus" size={iconSize.current} /> :
            <FontAwesome color={"black"} name="question" size={iconSize.current} />))
            // GẶP VẤN ĐỀ Ở SEXUAL
    useEffect(() => {
        getAPI(`http://${IP}:5000/api/user/get`, {
            id: userId
        }, () => { }, async (infomations) => {
            const data = infomations.data
            setInfo(data)
            setIsRequestAddFriend(data.waitingAddFriendResponse.includes(userData._id))
        })
    }, [])
    const onRequestAddFriend = () => {
        // gọi API để thêm bạn
        // chỉ gọi API để lưu vào csdl nếu người dùng không online, nếu người dùng online thì gửi trực tiếp bằng socket
        socket.emit("Client-send-request-friend", info._id)
        socket.on("Server-send-status-request-friend", async (data) => {
            // nếu như server không có socketId của người dùng này ( nghĩa là họ không online )
            // thì gọi API để lưu vào csdl
            if (data.status !== 200) {
                postAPI(`http://${IP}:5000/api/user/friend/request`, {
                    myId: userData._id,
                    theirId: info._id
                }, async (data) => {
                    setIsRequestAddFriend(data.waitingAddFriendResponse.includes(userData._id))
                })
            } else {
                // server sẽ tự tạo date ( thời gian gửi )
                const currentTime = new Date();
                const formattedTime = currentTime.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
                socket.emit("Client-send-request-to-someone", {
                    theirId: data.socketId,
                    name: userData?.name,
                    fromId: userData._id,
                    avatar: info.img ? info.image : defaultAvatar.current,
                    date: formattedTime
                })
            }

        })

    }
    const onCancelRequestAddFriend = () => {
        // gọi API để hủy lời mời kết bạn
        postAPI(`http://${IP}:5000/api/user/friend/request/cancel`, {
            myId: userData._id,
            theirId: info._id
        }, async (data) => {
            setIsRequestAddFriend(data.waitingAddFriendResponse.includes(userData._id))
        })
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: info?.img ? info?.img : defaultAvatar.current }} style={styles.avatar}></Image>
            <View style={styles.info}>
                <Text style={styles.name}>{info?.name ? info?.name : "Người dùng ẩn danh"} {sexual}</Text>
            </View>
            <View style={styles.editFriend}>
                {!isRequestAddFriend ? (
                    <Button
                        title={<FeatherIcon name="user-plus" size={22} />}
                        onClicked={onRequestAddFriend}
                        marginRight={0}
                    />
                ) : (
                    <Button
                        title={<FeatherIcon name="user-x" size={22} />}
                        onClicked={onCancelRequestAddFriend}
                        marginRight={0}
                    />
                )}
            </View>
        </View>
    );
}

export default Info;