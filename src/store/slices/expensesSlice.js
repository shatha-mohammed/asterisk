import { createCrudSlice } from "../slices/createCrudSlice";

const expensesCrud = createCrudSlice({
  name: "expenses",
  endpoint: "/expenses",
});

export const {
  fetchAll: fetchExpenses,
  addOne: addExpense,
  updateOne: updateExpense,
  deleteOne: deleteExpense,
} = expensesCrud.thunks;

export const { clearError } = expensesCrud.actions;

export default expensesCrud.reducer;
