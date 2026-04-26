import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/clients", { params });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addClient = createAsyncThunk(
  "clients/addClient",
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await api.post("/clients", clientData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/clients/${id}`, updatedData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/clients/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  items: [],
  pagination: null,
  isLoading: false,
  error: null,
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch All Clients
      .addCase(fetchClients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data.items;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add Client
      .addCase(addClient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addClient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Client
      .addCase(updateClient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Client
      .addCase(deleteClient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default clientsSlice.reducer;
