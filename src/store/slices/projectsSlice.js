import { createCrudSlice } from "../slices/createCrudSlice";

const projectsCrud = createCrudSlice({
  name: "projects",
  endpoint: "/projects",
});

export const {
  fetchAll: fetchProjects,
  addOne: addProject,
  updateOne: updateProject,
  deleteOne: deleteProject,
} = projectsCrud.thunks;

export const { clearError } = projectsCrud.actions;

export default projectsCrud.reducer;
