import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

function Homepage() {
    return (
        <View
            style={styles.container}>
            <Text>Homepage</Text>
        </View>
    );
}

export default Homepage;