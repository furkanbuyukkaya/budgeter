import { ActivityIndicator, StyleSheet, View } from "react-native";
import GlobalStyles from "../constants/styles";

function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={GlobalStyles.colors.gray50} />
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
});

export default Loader;
