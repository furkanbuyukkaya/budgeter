import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { expensesContext } from "../store/expensesContext";
import { getDateMinusDays } from "../utils/date";
import { getExpenses } from "../utils/http";
import Loader from "../ui/Loader";
import LoaderFail from "../ui/LoaderFail";

const RecentExpenses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const expensesCtx = useContext(expensesContext);

  useEffect(() => {
    async function fetchExpenses() {
      setIsLoading(true);
      try {
        const expenses = await getExpenses();
        expensesCtx.setExpense(expenses);
      } catch (error) {
        setError("Couldn't fetch expenses :(");
      }
      setIsLoading(false);
    }

    fetchExpenses();
  }, []);

  // Loader & error check

  if (error && !isLoading) {
    return <LoaderFail message={error} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const dateLastMonth = getDateMinusDays(today, 30);

    return expense.date >= dateLastMonth && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 30 Days"
      fallbackText="Not a single purchase in the last 30 days!"
    />
  );
};

export default RecentExpenses;
