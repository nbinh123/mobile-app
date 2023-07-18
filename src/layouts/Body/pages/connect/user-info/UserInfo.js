import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

function Info() {
    return (
        <View
            style={styles.container}>
            <Text>Info</Text>
        </View>
    );
}

export default Info;