import { useState, useRef, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"

function Button({
    display = "flex",
    opacity = 1,
    title,
    titleColor = "black",
    onClicked,
    borderColor = "black",
    height = 100,
    icon = null,
    background = "white",
    borderRadius = 0,
    margin = 0,
    marginHorizontal = 0,
    marginVertical = 0,
    padding = 0,
    paddingHorizontal = 0,
    paddingVertical = 0,
    fontSize,
    width,
    justifyContent = "center",
    alignItems = "center",
    marginRight = 5,
    borderWidth = 0.5,
    borderLeftWidth = 0
}) {
    const isSelectedWidth = (width ? width : "auto")
    const styles = StyleSheet.create({
        container: {
            display: display,
            borderWidth: 0.5,
            height: `${height}%`,
            flexDirection: "row",
            justifyContent: justifyContent,
            alignItems: alignItems,
            paddingHorizontal: 5,
            borderColor: borderColor,
            margin: margin,
            padding: padding,
            borderRadius: borderRadius,
            backgroundColor: background,
            marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,
            paddingHorizontal: paddingHorizontal,
            paddingVertical: paddingVertical,
            borderWidth: borderWidth,
            borderLeftWidth: borderLeftWidth,
            opacity: opacity,
            
        },
        textTitle: {
            marginRight: marginRight,
            color: titleColor,
            textAlign: "center",
            fontSize: fontSize
        }
    })

    return (
        <TouchableOpacity onPress={onClicked}>
            <View style={styles.container}>
                <Text style={styles.textTitle}>{title}</Text>
                {icon ? icon : ""}
            </View>
        </TouchableOpacity>
    );
}

export default Button;