import { StyleSheet, Text, View } from "react-native"
import { Route, Routes } from "react-router-native";

// lấy các component phục vụ cho cơ chế route
import Homepage from "./pages/homepage/Homepage";
import User from "./pages/user/User";
import Settings from "./pages/settings/Settings";
import ListGame from "./pages/games/ListGame";
import RandomGame from "./pages/games/random/RandomGame";
import HighShooting from "./pages/games/highShooting/HighShooting";
import Confession from "./pages/games/confession/Confession";
import CreateConfession from "./pages/games/confession/create/CreateConfession";
import ReadConfession from "./pages/games/confession/read/ReadConfession";
import Shop from "./pages/shop/Shop";
import Cateory from "./pages/shop/category/Cateory";
import FindFriend from "./pages/connect/find/FindFriend";
import Info from "./pages/connect/user-info/UserInfo";
import Bill from "./pages/shop/bills/Bill";
import Connect from "./pages/connect/Connect";
import Nofication from "./pages/nofication/Nofications";

const styles = StyleSheet.create({
    container: {
        borderColor: "black",
        width: "100%",
        flex: 9,
        justifyContent: "center",
    }
})

function Body() {
    return (
        <View style={styles.container}>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/user" element={<User />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/games">
                    <Route path="" element={<ListGame />} />
                    <Route path="random" element={<RandomGame />} />
                    <Route path="high-shooting" element={<HighShooting />} />
                    <Route path="confession">
                        <Route path="" element={<Confession />} />
                        <Route path="create" element={<CreateConfession />} />
                        <Route path="read/:id" element={<ReadConfession />} />
                    </Route>
                </Route>
                <Route path="/shop">
                    <Route path="" element={<Shop />} />
                    <Route path=":type" element={<Cateory />} />
                    <Route path="bill" element={<Bill />} />
                </Route>
                <Route path="/connect">
                    <Route path="find">
                        <Route path="" element={<FindFriend />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path=":userId/info" element={<Info />} />
                    </Route>
                    <Route path="" element={<Connect />} />
                </Route>
                <Route path="/nofications">
                    <Route path="" element={<Nofication/>}/>
                </Route>
            </Routes>
        </View>
    );
}

export default Body;