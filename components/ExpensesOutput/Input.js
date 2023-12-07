import { TextInput, StyleSheet, Text, View } from "react-native";
import GlobalStyles from "../../constants/styles";

const Input = ({ label, invalid, textInputConfig, style }) => {
  const inputStyles = [styles.input];

  // adding multilined style incase it has the prop
  textInputConfig &&
    textInputConfig.multiline &&
    inputStyles.push(styles.inputMultilined);

  // adding invalidInput for error message
  invalid && inputStyles.push(styles.invalidInput);

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 12,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.gray50,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.gray100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.gray900,
  },
  inputMultilined: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error100,
  },
});

export default Input;
