import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: {
    email: string | null;
  };
  isLoggedIn: boolean;
  token: string | null;
  isRefreshing: boolean;
};

const INITIAL_STATE: AuthState = {
  user: {
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.user.email = action.payload.email;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      AsyncStorage.setItem("authToken", action.payload.token);
      AsyncStorage.setItem("userEmail", action.payload.email);
    },
    logout: (state) => {
      state.user.email = null;
      state.token = null;
      state.isLoggedIn = false;
      AsyncStorage.removeItem("authToken");
      AsyncStorage.removeItem("userEmail");
    },
  },
});

export const selectLoggedIn = (state: { auth: AuthState }) =>
  state.auth.isLoggedIn;
export const selectUserEmail = (state: { auth: AuthState }) =>
  state.auth.user.email;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
