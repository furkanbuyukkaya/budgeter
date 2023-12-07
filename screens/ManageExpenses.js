import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../ui/IconButton";
import GlobalStyles from "../constants/styles";
import { expensesContext } from "../store/expensesContext";
import ExpenseForm from "../components/ExpensesOutput/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import Loader from "../ui/Loader";
import LoaderFail from "../ui/LoaderFail";

const ManageExpenses = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const expensesCtx = useContext(expensesContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Couldn't delete expense - please try again later.");
    }
    setIsSubmitting(false);
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Couldn't save data - please try again later.");
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <LoaderFail message={error} />;
  }

  if (isSubmitting) {
    <Loader />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
        submitButtonLabel={isEditing ? "Update" : "Add"}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.gray50}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.gray900,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.gray100,
    alignItems: "center",
  },
});

export default ManageExpenses;
