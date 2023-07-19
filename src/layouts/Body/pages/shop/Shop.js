import { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import GlobalContext from "../../../../hooks/useGlobalContext/GlobalContext";
import getAPI from "../../../../server/axios/getAPI";

import { LinearGradient } from "expo-linear-gradient";
import { useNavigate } from "react-router-native";


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        position: "relative"
    },
    title: {
        width: "100%",
        alignItems: "center"
    },
    textTitle: {
        fontWeight: 700,
        fontSize: 22,
        color: "#c4c4fa"
    },
    main: {
        marginTop: 20,
        width: "70%",
        borderWidth: 1,
        alignItems: "center"
    },
    tagProduct: {
        width: "100%",
        alignItems: "center",
    },
    textTagTitle: {
        color: "white"
    }
})

function Shop() {

    const navigate = useNavigate()

    const { IP, userDataCurrent } = useContext(GlobalContext)
    const [productList, setProductList] = useState([])
    const [page, setPage] = useState(1)

    const typeCurrent = useRef([
        {
            title: "Trái cây",
            url: "fruit",
            image: ["green", "lightgreen"],
            color: "#123455"
        },
        {
            title: "Ăn vặt",
            url: "fast-food",
            image: ["red", "orange"],
            color: "#123455"
        }, {
            title: "Tráng miệng",
            url: "dessert",
            image: ["white", "#b5ffff"],
            color: "#123455"
        }, {
            title: "Nước ép trái cây",
            url: "juice",
            image: ["green", "lightgreen"],
            color: "#123455"
        }])



    useEffect(() => {
        getAPI(`http://${IP}:5000/api/shop/products/get`, {
            type: "all",
            page: page
        }, setProductList)
    }, [page])

    const TagProduct = ({ title, url, image = ["red", "blue"] }, textColor) => {

        const onNavigate = () => {
            navigate(url)
        }

        return (
            <TouchableOpacity onPress={onNavigate} style={styles.tagProduct}>
                <LinearGradient
                    colors={image}
                    style={{ width: "100%", alignItems: "center", paddingVertical: 13 }}
                >
                    <View style={styles.tagTitle}>
                        <Text style={styles.textTagTitle}>{title}</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.textTitle}>Danh mục sản phẩm</Text>
            </View>
            <View style={styles.main}>
                {typeCurrent.current.map((tag, index) => <TagProduct
                    key={index}
                    title={tag.title}
                    url={tag.url}
                    image={tag.image}
                    textColor={tag.color}
                />)}
            </View>
        </View>
    );
}

export default Shop;