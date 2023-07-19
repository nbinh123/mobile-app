import { StyleSheet, Text, View, Image, PanResponder, TouchableOpacity } from "react-native"
// import LinearGradient from "react-native-linear-gradient";
import { useNavigate, useParams } from "react-router-native";
import { useContext, useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesignIcon from "react-native-vector-icons/AntDesign"

import GlobalContext from "../../../../../hooks/useGlobalContext/GlobalContext";

import getAPI from "../../../../../server/axios/getAPI";
import putAPI from "../../../../../server/axios/putAPI"
import patchAPI from "../../../../../server/axios/patchAPI";

import AntDesign from "react-native-vector-icons/AntDesign"
import Button from "../../../../../components/Button/Button";
import Title from "../../../../../components/Title/Title";
import ButtonIcons from "../../../../../components/Button/ButtonIcons/ButtonIcons";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 35
    },
    tool: {
        position: "absolute",
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        height: "99%",
        // borderWidth: 1,
        // borderColor: "white"
    },
    decPage: {
        height: "8%",
        width: "30%",
        alignItems: "center"
    },
    incPage: {
        height: "8%",
        width: "30%",
        alignItems: "center"
    },
    viewPage: {
        height: "8%",
        width: "30%",
        alignItems: "center",
        justifyContent: "center",

    },
    numberOfPage: {
        fontSize: 22,
    },
    showProductsRegion: {
        width: "90%"
    },
    productTag: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "white",
        margin: 5,
        width: "100%",
        borderRadius: 8
    },
    tagImg: {
        width: 97,
        height: 97,
        borderRadius: 6.4,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0
    },
    in4s: {
        flex: 1
    },
    nameTagProduct: {
        width: "100%",
        paddingLeft: 22,
        fontSize: 14,
        color: "white",
        borderLeftWidth: 0.5,
        borderTopRightRadius: 7.5,
        borderBottomRightRadius: 0,
        paddingVertical: 3,
    },
    other: {
        position: "relative"
    },
    quanlity: {
        position: "relative",
        paddingHorizontal: 10,
        flexDirection: "row",
    },
    quanlityIcon: {
        padding: 7,
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: "white",
        borderRadius: 50
    },
    numberOfQuanlity: {
        alignItems: "center",
        justifyContent: "center"
    },
    price: {
        color: "white",
        paddingLeft: 11.5,
        paddingVertical: 8,
        fontSize: 13
    },
    submitQuanlity: {
        padding: 7,
        paddingHorizontal: 10
    },
})

function Cateory() {

    const { type } = useParams()
    const navigate = useNavigate()
    const { IP, userData, userDataCurrent } = useContext(GlobalContext)
    const [page, setPage] = useState(1)
    const [productList, setProductList] = useState([])
    const [maximumPage, setMaximumPage] = useState(1)

    useEffect(() => {
        getAPI(`http://${IP}:5000/api/shop/products/search`, {
            type: type
        }, () => { }, (products) => {
            const length = products.data.length
            // không dư
            if (length % 5 === 0) {
                // thì lấy phần nguyên
                setMaximumPage(Math.floor(length / 5))
            } else {
                setMaximumPage(Math.floor(length / 5 + 1))
            }
        })
    }, [])

    useEffect(() => {
        getAPI(`http://${IP}:5000/api/shop/products/search`, {
            type: type,
            page: page
        }, setProductList, (data) => setProductList(data.data))
    }, [page])

    const decreasePage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const increasePage = () => {
        setPage(page + 1)
        console.log(maximumPage)
    }

    const onNavigateToBill = () => {
        navigate("/shop/bill")
    }


    function ProductTag({ name, decription, price, quanlity, sold, image, types, idP }) {

        const linear = (type === "fast-food" ? ["white", "red"] : (
            type === "juice" ? ["white", "#b5ffff"] : (
                type === "fruit" ? ["white", "lightgreen"] : (
                    type === "dessert" ? ["white", "yellow"] : ["white", "black"]
                )
            )
        ))
        const [newQuanlity, setNewQuanlity] = useState(0)
        const incQuan = () => {
            setNewQuanlity(newQuanlity + 1)

        }
        const decQuan = () => {
            if (newQuanlity > 1) {
                setNewQuanlity(newQuanlity - 1)
            }
        }
        const submitQuan = async () => {
            if (newQuanlity !== 0) {

                // thêm vào danh sách sản phẩm
                // await patchAPI(`http://${IP}:5000/api/user/cart/update/create`, {
                //     id: userData._id,
                //     idP: idP,
                //     quanlity: newQuanlity
                // })
                // await getAPI(`http://${IP}:5000/api/user/get`, {
                //     id: data.id
                // }, () => {}, (data) => {

                // })
                await putAPI(`http://${IP}:5000/api/user/cart/update/create`, {
                    id: userDataCurrent.current._id,
                    idP: idP,
                    quanlity: newQuanlity
                })


                // chỉnh sửa só lượng của sản phẩm
                await putAPI(`http://${IP}:5000/api/user/cart/update/quanlity`, {
                    id: userData._id,
                    idP: idP,
                    quanlity: newQuanlity
                })
            }
        }

        return (
            <View style={styles.productTag}>
                <View style={styles.img}>
                    <Image
                        style={styles.tagImg}
                        source={{ uri: (image ? image : "https://phunugioi.com/wp-content/uploads/2022/02/Anh-Do-An-Cute-2.jpg") }}
                    />
                </View>
                <View style={styles.in4s}>
                    <LinearGradient
                        colors={linear}
                        start={{ x: 0, y: 0 }} // Điểm bắt đầu (trái giữa)
                        end={{ x: 1, y: 1 }} // Điểm kết thúc (phải giữa)
                        style={styles.nameTagProduct}>
                        <Text>{name}</Text>
                    </LinearGradient>
                    {/* info sẽ hiển thị ở đây */}
                    <View style={styles.other}>
                        <Text style={styles.price}>Giá: {price}vnđ</Text>
                        <View style={styles.quanlity}>
                            <TouchableOpacity onPress={decQuan}>
                                <View style={[styles.quanlityIcon, {
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0
                                }]}>
                                    <AntDesignIcon name="minus" size={17} color={"white"} />
                                </View>
                            </TouchableOpacity>
                            <View style={[styles.numberOfQuanlity, {
                                borderTopWidth: 0.5,
                                borderBottomWidth: 0.5,
                                borderColor: "white"
                            }]}>
                                <Text style={{ paddingHorizontal: 13, color: "white" }}>{newQuanlity}</Text>
                            </View>
                            <TouchableOpacity onPress={incQuan}>
                                <View style={[styles.quanlityIcon, {
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0
                                }]}>
                                    <AntDesignIcon name="plus" size={17} color={"white"} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={submitQuan}>
                                <View style={styles.submitQuanlity}>
                                    <AntDesignIcon name="check" size={18} color={"white"} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* làm sự kiện vuốt màn hình thay vì tool */}
            <View style={styles.tool}>
                <View style={styles.decPage}>
                    <Button
                        icon={<AntDesign size={22} name="left" />}
                        marginRight={0}
                        height={100}
                        justifyContent="flex-end"
                        alignItems="center"
                        paddingHorizontal={15}
                        background="transparent"
                        borderLeftWidth={0.5}
                        borderRadius={50}
                        opacity={0.5}
                        onClicked={decreasePage}
                        display={(page === 1 ? "none" : "flex")}
                    />
                </View>
                <View style={styles.viewPage}>
                    <ButtonIcons
                        icon={<FontAwesome5 name="shopping-cart" size={18.5} color={"white"} />}
                        backgroundColor="lightgreen"
                        right={"22%"}
                        bottom={0}
                        padding={14}
                        handleClick={onNavigateToBill}
                    />
                </View>
                <View style={styles.incPage}>
                    <Button
                        icon={<AntDesign size={22} name="right" />}
                        marginRight={0}
                        height={100}
                        justifyContent="flex-end"
                        alignItems="center"
                        paddingHorizontal={15}
                        background="transparent"
                        borderLeftWidth={0.5}
                        borderRadius={50}
                        opacity={0.5}
                        onClicked={increasePage}
                        display={(page === maximumPage ? "none" : "flex")}
                    />
                </View>
            </View>
            <Title
                title={type.toUpperCase()}
                marginBottom={15}
            />
            <View style={styles.showProductsRegion}>
                {productList.map((product, index) => {
                    return (
                        <ProductTag
                            key={product._id}
                            idP={product._id}
                            name={product.name}
                            quanlity={product.quanlity}
                            decription={product.decription}
                            image={product.img}
                            types={product.type}
                            price={product.price}
                        />
                    )
                })}
            </View>
        </View>
    );
}

export default Cateory;