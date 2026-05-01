import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Decodes and validates the stored JWT token on application startup.
const getInitialAuth = () => {
  const token = localStorage.getItem("Asterisk_token");
  const user = JSON.parse(localStorage.getItem("Asterisk_user"));

  // Basic check for existence
  if (!token || !user) return { user: null, token: null };

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Manually decode the JWT payload to access expiration claim (exp)
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("Asterisk_token");
      localStorage.removeItem("Asterisk_user");
      return { user: null, token: null };
    }
  } catch {
    // If token is malformed, treat as unauthorized
    return { user: null, token: null };
  }
  return { user, token };
};

const initialAuth = getInitialAuth();

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);

      localStorage.setItem("Asterisk_token", response.token);
      localStorage.setItem("Asterisk_user", JSON.stringify(response.user));

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);

      localStorage.setItem("Asterisk_token", response.token);
      localStorage.setItem("Asterisk_user", JSON.stringify(response.user));

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.patch("/users/profile", userData);

      const currentUser =
        JSON.parse(localStorage.getItem("Asterisk_user")) || {};
      const updatedUser = { ...currentUser, ...response };

      localStorage.setItem("Asterisk_user", JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/me");

      const currentUser =
        JSON.parse(localStorage.getItem("Asterisk_user")) || {};
      const finalUser = { ...currentUser, ...response };

      localStorage.setItem("Asterisk_user", JSON.stringify(finalUser));
      return finalUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await api.patch("/users/password", passwordData);
      return response;
    } catch (error) {
      return rejectWithValue(error.details[1]);
    }
  },
);

const initialState = {
  user: initialAuth.user,
  token: initialAuth.token,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("Asterisk_token");
      localStorage.removeItem("Asterisk_user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
