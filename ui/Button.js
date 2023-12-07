import { Pressable, StyleSheet, Text, View } from "react-native";
import GlobalStyles from "../constants/styles";

const Button = ({ children, onPress, mode, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => {
          return pressed && styles.pressed;
        }}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.accent200,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: GlobalStyles.colors.gray900,
    fontWeight: "bold",
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.gray100,
  },
  pressed: {
    opacity: 0.75,
    // backgroundColor: GlobalStyles.colors.fuchsia100,
    borderRadius: 4,
  },
});

export default Button;
