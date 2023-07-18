import React, { useState, useRef, useEffect } from "react"
import { StyleSheet, Text, View, Animated, TouchableOpacity, Easing } from "react-native"
import FeatherIcon from "react-native-vector-icons/Feather"
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5"
import Button from "../Button/Button";

function Modal({ title, content, onShow = false, onHide, onOK }) {

    const showBefore = onShow ? "flex" : "none";
    const translateY = useRef(new Animated.Value(-500)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (onShow) {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: -500,
                    duration: 400,
                    // easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 400,
                    // easing: Easing.ease,
                    useNativeDriver: true,
                }),
            ]).start(() => onHide());
        }
    }, [onShow, onHide, translateY, opacity]);

    const handleOK = () => {
        onOK();
        onHide();
    };

    return (
        <>
            <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
                <View style={styles.main}>
                    <View style={styles.title}>
                        <Text style={styles.textTitle}>{title}</Text>
                        <TouchableOpacity style={styles.x} onPress={onHide}>
                            <FeatherIcon style={styles.skipIcon} name="x" size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.textContent}>{content}</Text>
                    </View>
                    <View style={styles.choose}>
                        {/* <TouchableOpacity onPress={handleOK}>
                            <Text>Đồng ý</Text>
                            <FeatherIcon name="check" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancel} onPress={onHide}>
                            <Text>Hủy bỏ</Text>
                            <FontAwesomeIcon name="trash-alt" />
                        </TouchableOpacity> */}
                        <Button
                            title={"Đồng ý"}
                            icon={<FeatherIcon name="check" size={17} />}
                            background="#88f4b1"
                            titleColor="#028b3b"
                            borderRadius={5}
                            marginHorizontal={0}
                            height={70}
                            paddingHorizontal={10}
                            onClicked={handleOK}
                            marginRight={0}
                            borderLeftWidth={0.5}
                        />
                        <Button
                            borderLeftWidth={0.5}
                            title={"Hủy bỏ"}
                            icon={<FontAwesomeIcon name="trash-alt" size={13} />}
                            background="#f589a4"
                            titleColor="#8a0123"
                            borderRadius={5}
                            marginHorizontal={5}
                            height={70}
                            paddingHorizontal={10}
                            onClicked={onHide}
                        />
                    </View>
                </View>
            </Animated.View>
            <View style={[styles.before, { display: showBefore }]}>
                <Text>before</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
        width: "100%",
        height: "25%",
        borderRadius: 10,
    },
    main: {
        width: "95%",
        height: "100%",
        // box-shadow: 1px 3px 10px #b5ffff,
        borderRadius: 10,
        padding: 5,
        alignItems: "center",
        position: "relative",
        opacity: 1,
        backgroundColor: "#c0f6ff",
        zIndex: 9999,
        paddingHorizontal: 18,
        paddingBottom: 13,
        borderWidth: 0
    },
    title: {
        width: "100%",
        padding: 4,
        position: "relative",
        flexDirection: "row",
        borderBottomWidth: 0.4,
    },
    textTitle: {
        fontSize: 18,
        padding: 5,
        paddingLeft: 5
    },
    x: {
        position: "absolute",
        width: "100%",
        height: "100%",
        padding: 5,
    },
    skipIcon: {
        position: "absolute",
        right: 0,
        bottom: 0,
        flex: 1
    },
    content: {
        width: "95%",
        height: "45%",
        marginTop: 8,
    },
    choose: {
        width: "100%",
        height: "30%",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    before: {
        backgroundColor: "gray",
        position: "absolute",
        zIndex: 1,
        width: "105%",
        height: "103%",
        opacity: 0.7,
        padding: 8,
    }
});

export default Modal;
