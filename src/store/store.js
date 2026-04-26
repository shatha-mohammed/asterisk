import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import projectsReducer from "./slices/projectsSlice";
import clientsReducer from "./slices/clientsSlice";
import invoicesReducer from "./slices/invoicesSlice";
import expensesReducer from "./slices/expensesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    clients: clientsReducer,
    invoices: invoicesReducer,
    expenses: expensesReducer,
  },
});
