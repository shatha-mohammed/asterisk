import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/invoices", { params });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addInvoice = createAsyncThunk(
  "invoices/addInvoice",
  async (invoiceData, { rejectWithValue }) => {
    try {
      const response = await api.post("/invoices", invoiceData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateInvoice = createAsyncThunk(
  "invoices/updateInvoice",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/invoices/${id}`, updatedData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteInvoice = createAsyncThunk(
  "invoices/deleteInvoice",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/invoices/${id}`);
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

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch All Invoices
      .addCase(fetchInvoices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data.items;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add Invoice
      .addCase(addInvoice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Invoice
      .addCase(updateInvoice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Invoice
      .addCase(deleteInvoice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((i) => i.id !== action.payload);
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default invoicesSlice.reducer;
