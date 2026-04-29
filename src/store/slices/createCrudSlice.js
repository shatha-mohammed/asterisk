import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export function createCrudSlice({ name, endpoint }) {
  // Fetch
  const fetchAll = createAsyncThunk(
    `${name}/fetchAll`,
    async (params, { rejectWithValue }) => {
      try {
        const response = await api.get(endpoint, { params });
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    },
  );

  // Add
  const addOne = createAsyncThunk(
    `${name}/addOne`,
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.post(endpoint, data);
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    },
  );

  // Update
  const updateOne = createAsyncThunk(
    `${name}/updateOne`,
    async ({ id, updatedData }, { rejectWithValue }) => {
      try {
        const response = await api.patch(`${endpoint}/${id}`, updatedData);
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    },
  );

  // Delete
  const deleteOne = createAsyncThunk(
    `${name}/deleteOne`,
    async (id, { rejectWithValue }) => {
      try {
        await api.delete(`${endpoint}/${id}`);
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

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      clearError: (state) => {
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        // Fetch All
        .addCase(fetchAll.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchAll.fulfilled, (state, action) => {
          state.isLoading = false;
          state.items = action.payload.data?.items || action.payload.data || [];
          state.pagination = action.payload.data?.pagination || null;
        })
        .addCase(fetchAll.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        })

        // Add
        .addCase(addOne.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(addOne.fulfilled, (state, action) => {
          state.isLoading = false;
          const newItem = action.payload?.data || action.payload;
          state.items.unshift(newItem);
        })
        .addCase(addOne.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        })

        // Update
        .addCase(updateOne.pending, (state) => {
          state.error = null;
        })
        .addCase(updateOne.fulfilled, (state, action) => {
          state.isLoading = false;
          const updatedItem = action.payload?.data || action.payload;
          const index = state.items.findIndex((item) => {
            if (updatedItem.id && item.id) return item.id === updatedItem.id;
            if (updatedItem._id && item._id)
              return item._id === updatedItem._id;
            return false;
          });

          if (index !== -1) {
            state.items[index] = updatedItem;
          }
        })
        .addCase(updateOne.rejected, (state, action) => {
          state.error = action.payload;
        })

        // Delete
        .addCase(deleteOne.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(deleteOne.fulfilled, (state, action) => {
          state.isLoading = false;
          state.items = state.items.filter((item) => {
            if (item.id) return item.id !== action.payload;
            if (item._id) return item._id !== action.payload;
            return true;
          });
        })
        .addCase(deleteOne.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
    },
  });

  return {
    reducer: slice.reducer,
    actions: slice.actions,
    thunks: { fetchAll, addOne, updateOne, deleteOne },
  };
}
