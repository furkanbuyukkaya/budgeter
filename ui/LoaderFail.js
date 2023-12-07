import { Text, StyleSheet, View } from "react-native";
import GlobalStyles from "../constants/styles";

function LoaderFail({ message }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.gray900,
  },
  text: {
    color: GlobalStyles.colors.gray50,
    textAlign: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default LoaderFail;
