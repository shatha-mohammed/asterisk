import { createCrudSlice } from "../slices/createCrudSlice";

const clientsCrud = createCrudSlice({
  name: "clients",
  endpoint: "/clients",
});

export const {
  fetchAll: fetchClients,
  addOne: addClient,
  updateOne: updateClient,
  deleteOne: deleteClient,
} = clientsCrud.thunks;

export const { clearError } = clientsCrud.actions;

export default clientsCrud.reducer;
