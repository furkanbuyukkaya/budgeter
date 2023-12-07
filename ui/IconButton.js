import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ icon, size, color, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    // borderRadius: 24,
    padding: 8,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});

export default IconButton;
