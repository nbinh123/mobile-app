import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Animated } from "react-native"
import Title from "../../../../../components/Title/Title";
import { useContext, useEffect, useState, memo, useCallback } from "react";
import GlobalContext from "../../../../../hooks/useGlobalContext/GlobalContext";
import putAPI from "../../../../../server/axios/putAPI";
import getAPI from "../../../../../server/axios/getAPI";
import AntDesignIcon from "react-native-vector-icons/AntDesign"

function Bill() {

    const { userDataCurrent, IP } = useContext(GlobalContext)
    const [total, setTotal] = useState(0)
    const [cart, setCart] = useState([])
    const [promote, setPromote] = useState(userDataCurrent.current.cart.payment.discounted)
    const [submit, setSubmit] = useState(false)

    const request_bill = useCallback(async () => {

        await putAPI(`http://${IP}:5000/api/user/cart/pay`, {
            id: userDataCurrent.current._id,
            discount: promote
        }, (response) => {
            setPromote(response.cart.payment.discounted)
            setTotal(response.cart.payment.total)
            setCart(response.cart.order)
        })
    })
    useEffect(() => {
        request_bill()
    }, [])

    const TagProduct = memo(({ id, img, name, quanlity, price, index }) => {

        const [newQuanlity, setNewQuanlity] = useState(Number(quanlity))
        const [timer, setTimer] = useState(null)

        const incQuan = () => {
            setNewQuanlity(newQuanlity + 1)
            if (timer) {
                clearTimeout(timer)
            }
            const newTimer = setTimeout(async () => {
                await update("more")
            }, 700)
            setTimer(newTimer)
        }
        const decQuan = () => {
            if (newQuanlity > 0) {
                setNewQuanlity(newQuanlity - 1)
                if (timer) {
                    clearTimeout(timer)
                }
                const newTimer = setTimeout(async () => {
                    await update()
                }, 700)
                setTimer(newTimer)
            }
        }
        const update = async (type) => {
            // cập nhật số lượng
            await putAPI(`http://${IP}:5000/api/user/cart/update/quanlity`, {
                id: userDataCurrent.current._id,
                idP: id,
                quanlity: (type === "more" ? newQuanlity + 1 : newQuanlity - 1)
            })

            await request_bill()

            // cập nhật lại giá
            await putAPI(`http://${IP}:5000/api/user/cart/pay`, {
                id: userDataCurrent.current._id,
                discount: userDataCurrent.current.cart.payment.discounted
            }, (response) => {
                setTotal(response.cart.payment.total)
            })
        }
        return (
            <View key={index} style={styles.tagProduct}>
                <View style={styles.img}>
                    <Image
                        style={styles.tagImg}
                        source={{ uri: (img ? img : "https://phunugioi.com/wp-content/uploads/2022/02/Anh-Do-An-Cute-2.jpg") }}
                    />
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text>
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
                    </View>
                </View>
                <View style={styles.billProduct}>
                    <Text style={{
                        width: "100%",
                        color: "white",
                        textAlign: "center",
                        paddingVertical: 5
                    }}>{newQuanlity} x {price} = </Text>
                    <Text style={{
                        color: "white",
                        fontSize: 15,
                        width: "100%",
                        fontWeight: 900,
                        textAlign: "center"
                    }}>{(newQuanlity * price).toLocaleString('vi-VN')} vnđ</Text>
                </View>
            </View>
        )
    })

    const Submit = () => {
        function Promote() {

            const [promoteCode, setPromoteCode] = useState("")
            const [promodeCodeList, setPromoteCodeList] = useState([])
            useEffect(() => {
                getAPI(`http://${IP}:5000/api/user/get`, {
                    id: userDataCurrent.current._id
                }, () => { },
                    (response) => {
                        setPromoteCodeList(response.data.cart.promoteCodes)
                    })
            }, [])

            return (
                <View style={styles.promote}>
                    <Text style={{ color: "white" }}>Chọn mã khuyến mãi:</Text>
                    <TouchableOpacity onPress={() => console.log(promodeCodeList)}>
                        <Text>123456</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        // tạo biến động cho animation
        function onCheckOrders() {
            // xử lý thanh toán
            setSubmit(!submit)
        }
        const [submit, setSubmit] = useState(false)
        const now = (submit ? styles.isSubmit : styles.noSubmit)

        // bây giờ sẽ chia phương thức thanh toán và gọi API tạo 1 đơn hàng, sau đó xóa đi mảng sản phẩm
        return (
            <View style={styles.submit}>
                <Promote />
                <TouchableOpacity onPress={onCheckOrders} style={[styles.checkOrder, now]}>
                    <AntDesignIcon name="check" size={18} color={submit ? "green" : "white"} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Title
                title={"Đơn hàng của bạn"}
                marginBottom={22}
            />
            <View style={styles.header}>
                <Text style={styles.titleProduct}>Sản phẩm</Text>
                <Text style={styles.totalProduct}>Tổng:</Text>
            </View>
            <View style={styles.main}>
                {cart.map((product, index) => {
                    return <TagProduct
                        key={index}
                        id={product._id}
                        name={product.name}
                        quanlity={product.quanlity}
                        price={product.price}

                    />
                })}
            </View>
            <View style={styles.summary}>
                <Text style={[styles.totalProduct, {
                    flex: 1.96,
                    paddingVertical: 3,
                    paddingTop: 20
                }]}>Tổng {promote !== 0 ? <Text style={{ color: "lightgreen" }}>(-{promote}%)</Text> : ""}:</Text>
                <View style={styles.summaryPrice}>
                    {promote == 0 ? (
                        <Text style={{ color: "lightgreen", fontWeight: 900 }}>{total.toLocaleString('vi-VN')} vnđ</Text>
                    ) : (
                        <>
                            <Text style={{
                                color: "#8f998e",
                                fontWeight: 900,
                                fontSize: 10,
                                textDecorationLine: 'line-through'
                            }}>{(total / (promote / 100)).toLocaleString('vi-VN')} vnđ</Text>
                            <Text style={{ color: "lightgreen", fontWeight: 900 }}>{total.toLocaleString('vi-VN')} vnđ</Text>
                        </>
                    )}
                </View>
            </View>
            <Submit />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingVertical: 100
    },
    tagProduct: {
        width: "90%",
        flexDirection: "row",
        marginVertical: 5,
        borderWidth: 0.5,
        borderColor: "white",
        borderRadius: 7.3,
    },
    img: {

    },
    tagImg: {
        width: 60,
        height: 60,
        borderRadius: 6.4,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0
    },
    info: {
        flex: 1
    },
    quanlity: {
        position: "relative",
        paddingHorizontal: 13,
        flexDirection: "row",
    },
    quanlityIcon: {
        padding: 5,
        paddingHorizontal: 13,
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
    name: {
        fontSize: 13,
        paddingLeft: 18,
        paddingVertical: 3,
        color: "white"
    },
    billProduct: {
        borderLeftWidth: 0.5,
        borderLeftColor: "white",
        width: "34%"
    },
    header: {
        width: "90%",
        flexDirection: "row",
        borderWidth: 0.5,
        marginBottom: -10,
        borderColor: "white",
        borderBottomWidth: 0
    },
    titleProduct: {
        flex: 1.96,
        color: "white",
        textAlign: "center",
        fontSize: 15,
        fontWeight: 500,
        paddingVertical: 8,
        paddingBottom: 18,
    },
    totalProduct: {
        flex: 1,
        color: "white",
        textAlign: "center",
        fontSize: 15,
        fontWeight: 500,
        borderLeftWidth: 0.5,
        borderLeftColor: "white",
        paddingVertical: 8,
        paddingBottom: 18,
    },
    summary: {
        width: "90%",
        flexDirection: "row",
        borderWidth: 0.5,
        marginTop: -10,
        borderColor: "white",
        borderTopWidth: 0
    },
    summaryPrice: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: "white",
        position: "relative"
    },
    isSubmit: {
        backgroundColor: "lightgreen"
    },
    noSubmit: {
        backgroundColor: "transparent"
    }
})
export default Bill;