import { View, StyleSheet } from "react-native";
import { Caption } from "react-native-paper";

export const DefaultListEmpty = ({
    text,
}: {
    text: string;
}) =>
(
    <View style={styles.root}>
        <Caption style={{ color: 'black' }}>{text}</Caption>
    </View>
);

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 32,
    },

});