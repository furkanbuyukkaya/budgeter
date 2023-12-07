import axios from "axios";

// Change this with a firebase url - or any other url that returns id as promise
const BACKEND_URL = "https://something.firebaseio.com/";

// Adding data
export async function storeExpense(expenseData) {
  const response = await axios.post(BACKEND_URL + "expenses.json", expenseData);

  // Firebase uses "name" as id
  const id = response.data.name;
  return id;
}

// Getting data
export async function getExpenses() {
  const response = await axios.get(BACKEND_URL + "expenses.json");

  const expenses = [];

  // you can check data
  // console.log(response.data);
  for (const key in response.data) {
    const expenseObject = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObject);
  }

  return expenses;
}

// Replacing - Updating
export async function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `expenses/${id}.json`, expenseData);
}
export async function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `expenses/${id}.json`);
}
