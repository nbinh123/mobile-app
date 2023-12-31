// import { StatusBar } from 'expo-status-bar';
import { useState, useCallback, useRef, useEffect } from "react"
import { ImageBackground, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { NativeRouter, Routes, Route } from 'react-router-native';
import io from "socket.io-client";

import GlobalContext from './src/hooks/useGlobalContext/GlobalContext';
import Body from './src/layouts/Body/Body';
import Footer from "./src/layouts/Footer/Footer";
import Login from "./src/layouts/Body/pages/login/Login";
import Register from "./src/layouts/Body/pages/register/Register";
import getAPI from "./src/server/axios/getAPI";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "101.5%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    paddingTop: 8,
    paddingHorizontal: 1,
    flexShrink: 0,
  },
});
const IP = "192.168.1.6"                           // địa chỉ IP của server, khi hosting chỉ cần thay đổi IP là tên mình đăng ký
const socket = io.connect(`http://${IP}:5000`)     // kết nối với server socket

export default function App() {

  // chức năng login và dữ liệu của người dùng
  const [isLogined, setIsLogined] = useState(false)
  const [userData, setUserData] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  // state vị trí của người dùng
  const [longitude, setLongitude] = useState(null)
  const [latitude, setLatitude] = useState(null)
  const [strangerList, setStrangerList] = useState([])
  // chức năng thông báo
  const [nofications, setNofications] = useState([])



  const userDataCurrent = useRef(null)

  const Main = () => {

    useEffect(() => {
      // lắng nghe real-time, xem có ai gửi thông báo tới không, nếu có thi gọi API để lấy
      socket.on("Server-refresh-nofications", async () => {
        // gọi API để thiết lập lại thông báo
        getAPI(`http://${IP}:5000/api/user/nofications/get`, {
          id: await userData._id
        }, setNofications)
      })
    },[])

    return (
      <>
        <Body />
        <Footer />
      </>
    )
  }
  const Authentication = () => {
    return (
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
    )
  }
  // gửi 1 thông điệp lên server để chia sẻ cho các user khác
  // theo dõi quá trình đăng nhập của user để lấy dữ liệu
  // Component này kiểm tra xem người dùng đã đăng nhập hay chưa

  // lắng nghe những lời mời kết bạn được gửi tới

  return (
    <GlobalContext.Provider value={{
      setIsLogined,   // kiểm tra người dùng đăng nhập hay chưa
      IP,             // IP của server của back-end
      socket,         // biến socket để sử dụng socket.io
      setUserData,    // thiết lập lại dữ liệu người dùng khi cần
      userData,       // dữ liệu người dùng
      userDataCurrent,// dữ liệu người dùng
      isAdmin,        // kiểm tra xem tài khoản đó có phải tài khoản admin không
      setIsAdmin,     // thiết lập tài khoản admin
      longitude,      // kinh độ của thiết bị 
      latitude,       // vĩ độ của thiết bị
      setLongitude,   // cập nhật kinh độ người dùng
      setLatitude,    // cập nhật vĩ độ người dùng
      strangerList,   // danh sách những người ở gần
      setStrangerList,// cập nhập danh sách những người ở gần
      nofications,    // những thông báo được gửi đến user
    }}>
      <ImageBackground
        source={{ uri: "https://topshare.vn/wp-content/uploads/2021/10/hinh-nen-mau-tim-cute-1-569x1024.gif" }}
        style={[styles.container, { backgroundColor: `rgba(0, 0, 0, 0.1)` }]}>
        <NativeRouter>
          {isLogined ? <Main /> : <Authentication />}
        </NativeRouter>
      </ImageBackground>
    </GlobalContext.Provider>
  );
}

