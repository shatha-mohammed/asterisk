import { createCrudSlice } from "../slices/createCrudSlice";

const invoicesCrud = createCrudSlice({
  name: "invoices",
  endpoint: "/invoices",
});

export const {
  fetchAll: fetchInvoices,
  addOne: addInvoice,
  updateOne: updateInvoice,
  deleteOne: deleteInvoice,
} = invoicesCrud.thunks;

export const { clearError } = invoicesCrud.actions;

export default invoicesCrud.reducer;
