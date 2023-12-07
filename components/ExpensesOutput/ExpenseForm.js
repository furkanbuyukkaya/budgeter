import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import Input from "./Input";
import GlobalStyles from "../../constants/styles";
import { useState } from "react";
import Button from "../../ui/Button";

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },

    // not returned using getFormattedDate cause date won't work
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },

    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });
  const screenHeight = useWindowDimensions().height;

  // Computing property names for DRY code.
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    // validation
    const amoundIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amoundIsValid || !dateIsValid || !descriptionIsValid) {
      // could as well use AlertAPI
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amoundIsValid },

          date: { value: currentInputs.date.value, isValid: dateIsValid },

          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });

      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={{ marginTop: screenHeight / 8 }}>
      <Text style={styles.title}>Expense Report</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.inputRow}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.inputRow}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            keyboardType: "number-pad",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCorrect: false, --- default is true btw
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />

      {/* Checking is the form is invalid  */}
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - Check data please.
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        {/* cancel button */}
        <Button style={styles.buttonStyle} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        {/* confirm button */}
        <Button style={styles.buttonStyle} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputRow: {
    flex: 1,
  },
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: GlobalStyles.colors.gray50,
    marginBottom: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.gray50,
  },
  errorText: {
    fontWeight: "bold",
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    marginVertical: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ExpenseForm;
