import { memo, useContext, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"

import GlobalContext from "../../../../hooks/useGlobalContext/GlobalContext";
import Title from "../../../../components/Title/Title";
import Button from "../../../../components/Button/Button";
import putAPI from "../../../../server/axios/putAPI";
import getAPI from "../../../../server/axios/getAPI";

const styles = StyleSheet.create({
    container: {

    },
    main: {
        width: "100%",
        justifyContent: "center",
        marginTop: 22
    },
    line: {
        width: "100%",
    },
    textLine: {
        color: "#b5fafa",
        textAlign: "left",
        paddingLeft: 22,
        fontSize: 18,
        fontWeight: 400
    },
    configs: {
        width: "100%",
        alignItems: "center"
    },
    tagConfig: {
        position: "relative",
        paddingVertical: 22,
        // marginVertical: 13,
        flexDirection: "row",
        width: "90%",
        borderBottomWidth: 0.5,
        borderColor: "#c4c4fa",
        justifyContent: "center",
        alignItems: "center"
    },
    titleConfig: {
        flex: 3,
        borderBottomWidth: 0.5,
        borderColor: "#c4c4fa",
        color: "#c4c4ba"
    },
    submitIcon: {
        position: "absolute",
        right: "5%",
        aspectRatio: 1,
        borderRadius: 50,
        borderWidth: 0.5,
        padding: 4,
    }
})


function User() {

    const { userData, IP, setUserData } = useContext(GlobalContext)
    const [data, setData] = useState(null)
    useEffect(() => {
        getAPI(`http://${IP}:5000/api/user/get`, {
            id: userData._id
        }, null, async (userData) => {
            setData(userData.data)
        })
    }, [])



    const TagConfig = memo(({ title, data, nameKey }) => {

        const [newValue, setNewValue] = useState(data)
        const [primaryValue, setPrimaryValue] = useState(data)
        const inpRef = useRef()

        const update = (text) => {
            setNewValue(text)
            // kỹ thuật debounce
        }
        const onUpdateOnDatabase = async (e) => {
            // lấy ra giá trị của input
            // gọi API ở đây
            await putAPI(`http://${IP}:5000/api/user/info/update`, {
                id: userData._id,
                nameKey: nameKey,
                value: newValue
            })
            await getAPI(`http://${IP}:5000/api/user/get`, {
                id: userData._id
            }, null, async (userData) => {
                setNewValue(userData.data[nameKey])
                setPrimaryValue(userData.data[nameKey])
            })
            inpRef.current.blur()
        }

        return (
            <View style={styles.tagConfig}>
                <Text style={{
                    color: "white",
                    flex: 1,
                    paddingLeft: 18
                }}>{title}
                </Text>
                {nameKey !== "_id" ? (
                    <>
                        <TextInput
                            ref={inpRef}
                            onChangeText={(text) => update(text)}
                            style={styles.titleConfig}
                            value={newValue}>
                        </TextInput>
                        {newValue !== primaryValue ? (
                            <TouchableOpacity onPress={onUpdateOnDatabase} style={styles.submitIcon}>
                                <AntDesign name="check" size={18} color={"white"} />
                            </TouchableOpacity>
                        ) : ""}
                    </>
                ) : (
                    <Text style={styles.titleConfig} value={newValue}>
                        {newValue}
                    </Text>
                )}
            </View>
        )
    })


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Title
                title={"Người dùng"}
            />
            <View style={styles.main}>
                <View style={styles.line}>
                    <Text style={styles.textLine}>Thông tin người dùng</Text>
                </View>
                <View style={styles.configs}>
                    <TagConfig
                        title={"ID: "}
                        data={data?._id}
                        nameKey={"_id"}
                    />
                    <TagConfig
                        title={"Tên: "}
                        data={data?.name}
                        nameKey={"name"}
                    />
                    <TagConfig
                        title={"Địa chỉ: "}
                        data={data?.address}
                        nameKey={"address"}
                    />
                    <TagConfig
                        title={"Sinh nhật: "}
                        data={data?.birth}
                        nameKey={"birth"}
                    />
                    <TagConfig
                        title={"Thẻ tín dụng: "}
                        data={data?.credit_cart}
                        nameKey={"credit_cart"}
                    />
                    <TagConfig
                        title={"Email: "}
                        data={data?.email}
                        nameKey={"email"}
                    />
                    <TagConfig
                        title={"Nickname: "}
                        data={data?.nickname}
                        nameKey={"nickname"}
                    />
                    <TagConfig
                        title={"SĐT: "}
                        data={data?.phone}
                        nameKey={"phone"}
                    />
                    <TagConfig
                        title={"Giới tính: "}
                        data={data?.sex}
                        nameKey={"sex"}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

export default User;