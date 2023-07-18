import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Animated } from "react-native"
import Title from "../../../../../components/Title/Title";
import { useContext, useEffect, useState, memo, useCallback } from "react";
import GlobalContext from "../../../../../hooks/useGlobalContext/GlobalContext";
import putAPI from "../../../../../server/axios/putAPI";
import AntDesignIcon from "react-native-vector-icons/AntDesign"

function Bill() {

    const { userDataCurrent, IP } = useContext(GlobalContext)
    const [total, setTotal] = useState(0)
    const [cart, setCart] = useState([])
    const [submit, setSubmit] = useState(false)

    const request_bill = useCallback(() => {
        putAPI(`http://${IP}:5000/api/user/cart/pay`, {
            id: userDataCurrent.current._id,
            discount: userDataCurrent.current.cart.payment.discounted
        }, (response) => {
            setTotal(response.cart.payment.total)
            setCart(response.cart.order)
        })
    })
    useEffect(() => {
        request_bill()
    }, [])

    const TagProduct = memo(({ id, img, name, quanlity, price }) => {

        const [newQuanlity, setNewQuanlity] = useState(Number(quanlity))
        const [timer, setTimer] = useState(null)

        const incQuan = () => {
            setNewQuanlity(newQuanlity + 1)
            if (timer) {
                clearTimeout(timer)
            }
            const newTimer = setTimeout(() => {
                update()
            }, 2000)
            setTimer(newTimer)
        }
        const decQuan = () => {
            if (newQuanlity > 0) {
                setNewQuanlity(newQuanlity - 1)
                if (timer) {
                    clearTimeout(timer)
                }
                const newTimer = setTimeout(() => {
                    update()
                }, 2000)
                setTimer(newTimer)
            }
        }
        const update = async () => {
            // cập nhật số lượng
            await putAPI(`http://${IP}:5000/api/user/cart/update/create`, {
                id: userDataCurrent.current._id,
                idP: id,
                quanlity: newQuanlity
            })

            // cập nhật lại giá
            await putAPI(`http://${IP}:5000/api/user/cart/pay`, {
                id: userDataCurrent.current._id,
                discount: userDataCurrent.current.cart.payment.discounted
            }, (response) => {
                setTotal(response.cart.payment.total)
            })
        }
        return (
            <View key={id} style={styles.tagProduct}>
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
                    }}>{newQuanlity * price} vnđ</Text>
                </View>
            </View>
        )
    })

    const Submit = () => {

        // tạo biến động cho animation
        function onCheckOrders(){
            // xử lý thanh toán
            setSubmit(!submit)
        }
        const [submit, setSubmit] = useState(false)
        const now = (submit ? styles.isSubmit : styles.noSubmit)

        return (
            <TouchableOpacity onPress={onCheckOrders} style={[styles.checkOrder, now]}>
                <AntDesignIcon name="check" size={18} color={submit ? "green" : "white"} />
            </TouchableOpacity>
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
                {cart.map(product => {
                    return <TagProduct
                        key={product._id}
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
                }]}>Tổng:</Text>
                <View style={styles.summaryPrice}>
                    <Text style={{ color: "lightgreen", fontWeight: 900 }}>{total} vnđ</Text>
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
        borderColor: "white"
    },
    isSubmit: {
        backgroundColor: "lightgreen"
    },
    noSubmit: {
        backgroundColor: "transparent"
    }
})
export default Bill;