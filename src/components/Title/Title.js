import { StyleSheet, Text, View } from "react-native"

function Title({ title, color = "#c4c4ff", marginBottom = 0 }) {

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            position: "relative",
        },
        text: {
            color: color,
            textAlign: "center",
            fontWeight: 500,
            fontSize: 22,
            marginBottom: marginBottom,
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
}

export default Title;