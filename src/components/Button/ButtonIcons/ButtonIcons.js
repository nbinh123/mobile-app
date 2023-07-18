import { StyleSheet, Text, View, TouchableOpacity } from "react-native"

function ButtonIcons({
    icon, 
    handleClick, 
    backgroundColor = "#4c4cfa",
    right = 13,
    bottom = 13, 
    padding = 16
}) {

    const styles = StyleSheet.create({
        container: {
            position: "absolute",
            right: right,
            bottom: bottom,
            padding: padding,
            backgroundColor: backgroundColor,
            opacity: 0.8,
            borderRadius: 50,
            borderColor: "#4c4cfa",
        }
    })

    return (
        <TouchableOpacity onPress={handleClick} style={styles.container}>
            {icon}
        </TouchableOpacity>
    );
}

export default ButtonIcons;