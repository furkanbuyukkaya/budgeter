import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { expensesContext } from "../store/expensesContext";

const AllExpenses = () => {
  const expensesCtx = useContext(expensesContext);
  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expensesCtx.expenses}
      fallbackText="Your wallet's been enjoying a silent retreat!"
    />
  );
};

const styles = StyleSheet.create({});

export default AllExpenses;
