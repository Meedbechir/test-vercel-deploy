/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { refreshAccessToken } from "../services/AuthServices";

const storedAccessToken = localStorage.getItem("accessToken");
const storedRefreshToken = localStorage.getItem("refreshToken");

// Action asynchrone pour le renouvellement du token
export const refreshTokenAsync = createAsyncThunk(
  "auth/refreshToken",
  async (refreshToken, { dispatch, rejectWithValue }) => {
    try {
      const response = await refreshAccessToken(refreshToken);
      dispatch(setToken(response)); // Utilisez la même action pour mettre à jour le token
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: storedAccessToken ? storedAccessToken : null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload.access;
      localStorage.setItem("accessToken", action.payload.access);
      localStorage.setItem("refreshToken", action.payload.refresh);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    // Ajoutez une gestionnaire pour l'action de renouvellement du token
    builder.addCase(refreshTokenAsync.fulfilled, (state, action) => {
      // Vous pouvez gérer les résultats du renouvellement ici si nécessaire
    });
    builder.addCase(refreshTokenAsync.rejected, (state, action) => {
      // Gérez les erreurs de renouvellement ici si nécessaire
    });
  },
});

export const { setUser, setToken, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
