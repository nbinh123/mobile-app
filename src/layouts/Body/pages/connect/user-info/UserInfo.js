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
        width: "50%",
        height: 50,
        marginTop: 8
    },
    avatar: {
        width: "40%",
        aspectRatio: 1,
        borderRadius: 100
    },
    name: {
        color: "white",
        fontSize: 20,
        marginTop: 8
    }
})

function Info() {

    const { userId } = useParams()                                  // userId của người cần xem
    const { IP, userData, socket } = useContext(GlobalContext)      // IP server
    const iconSize = useRef(16)                                     // kích cỡ icon chung
    const [isRequestAddFriend, setIsRequestAddFriend] = useState(false)
    const [isFriend, setIsFriend] = useState(false)
    const defaultAvatar = useRef("https://media.istockphoto.com/id/1337144146/vi/vec-to/vector-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-h%E1%BB%93-s%C6%A1-h%C3%ACnh-%C4%91%E1%BA%A1i-di%E1%BB%87n-m%E1%BA%B7c-%C4%91%E1%BB%8Bnh.jpg?s=612x612&w=0&k=20&c=u24Lv6ta-n_-pQwnru8iwCaFysSloBwVs-LhtqxCSCw=")
    const [info, setInfo] = useState(null)
    const sexual = (info?.sex === "male" ? <FontAwesome color={"lightblue"} name="mars" size={iconSize.current} /> :
        (info?.sex === "female" ? <FontAwesome color={"pink"} name="venus" size={iconSize.current} /> :
            <FontAwesome color={"black"} name="question" size={iconSize.current} />))
    // GẶP VẤN ĐỀ Ở SEXUAL
    useEffect(() => {
        getAPI(`http://${IP}:5000/api/user/get`, {
            id: userId
        }, () => { }, async (infomations) => {
            const data = infomations.data
            setInfo(data)
            // nếu trong mảng friend của user có userId
            if (data.friends.includes(userData._id)) {
                setIsFriend(true)
            } else {
                setIsRequestAddFriend(data.waitingAddFriendResponse.includes(userData._id))
            }
        })
    }, [])
    const onRequestAddFriend = async () => {

        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
        // gọi API để thêm bạn
        // chỉ gọi API để lưu vào csdl nếu người dùng không online, nếu người dùng online thì gửi trực tiếp bằng socket
        socket.emit("Client-send-request-friend", info._id)
        socket.on("Server-send-status-request-friend", async (data) => {
            console.log(data)
            // nếu như server không có socketId của người dùng này ( nghĩa là họ không online ) thì vẫn lưu vào csdl nhưng status là false
            // gọi API để lưu vào csdl
            if (data.status !== 200) {
                // tạo thông báo cho người nhận lời mời kết bạn
                await postAPI(`http://${IP}:5000/api/user/nofication/create`, {
                    fromId: userData._id,
                    toId: info._id,
                    date: formattedTime,
                    avatar: userData.img ? userData.img : defaultAvatar.current,
                    status: 0,
                    description: `${userData.name ? userData.name : "Người dùng ẩn danh"} đã gửi cho bạn lời mời kết bạn!!`,
                    url: `/connect/find/${userData._id}/info`
                })
            } else {
                // server sẽ tự tạo date ( thời gian gửi )
                await postAPI(`http://${IP}:5000/api/user/nofications/create`, {
                    fromId: userData._id,
                    toId: info._id,
                    date: formattedTime,
                    avatar: userData.img ? userData.img : defaultAvatar.current,
                    status: 1,
                    decription: `${userData.name ? userData.name : "Người dùng ẩn danh"} đã gửi cho bạn lời mời kết bạn!!`
                })
                socket.emit("Client-refresh-nofications", data.socketId)
            }

            // thêm vào danh sách đợi chấp nhận lời mời kết bạn
            await postAPI(`http://${IP}:5000/api/user/friend/request`, {
                myId: userData._id,
                theirId: info._id
            }, async (data) => {
                setIsRequestAddFriend(data.waitingAddFriendResponse.includes(userData._id))
            })

        })

    }
    const onCancelRequestAddFriend = async () => {
        // gọi API để hủy lời mời kết bạn
        await postAPI(`http://${IP}:5000/api/user/friend/request/cancel`, {
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
                {
                    isFriend ? (
                        <Button
                            title={<Text style={{ margin: 0 }}>Các bạn đã là bạn bè  <FeatherIcon name="user-check" size={22} /></Text>}
                            marginRight={0}
                            justifyContent="center"
                            alignItems="center"
                            borderRadius={5}
                        />
                    ) : (!isRequestAddFriend ? (
                        <Button
                            title={<Text style={{ margin: 0 }}>Thêm bạn bè  <FeatherIcon name="user-plus" size={22} /></Text>}
                            onClicked={onRequestAddFriend}
                            marginRight={0}
                            justifyContent="center"
                            alignItems="center"
                            borderRadius={5}
                        />
                    ) : (
                        <Button
                            title={<Text style={{ margin: 0 }}>Hủy lời mời kết bạn  <FeatherIcon name="user-x" size={22} /></Text>}
                            onClicked={onCancelRequestAddFriend}
                            marginRight={0}
                            justifyContent="center"
                            alignItems="center"
                            borderRadius={5}
                        />
                    ))}
            </View>
        </View>
    );
}

export default Info;