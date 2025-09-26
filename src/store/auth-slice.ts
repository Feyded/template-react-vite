import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/user";

interface AuthState {
  user: User | null;
  wallet: number;
  isAdmin: boolean;
  loading: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  wallet: 0,
  isAdmin: false,
  loading: true,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isAdmin = action.payload?.role === "admin";
      state.wallet = action.payload?.wallet || 0;
      if (action.payload) {
        localStorage.setItem("token", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("token");
      }
    },
    setWallet(state, action: PayloadAction<number>) {
      state.wallet = action.payload;
    },
    login(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.wallet = action.payload.wallet;
      state.isAdmin = action.payload.role === "admin";
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.wallet = 0;
      localStorage.removeItem("token");
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    initializeAuth(state) {
      const tokenStr = localStorage.getItem("token");
      if (tokenStr) {
        try {
          const parsedUser: User = JSON.parse(tokenStr);
          state.user = parsedUser;
          state.wallet = parsedUser.wallet;
          state.isAdmin = parsedUser.role === "admin";
          state.isAuthenticated = true;
        } catch {
          localStorage.removeItem("token");
        }
      }
      state.loading = false;
    },
  },
});

export const { setUser, setWallet, login, logout, setLoading, initializeAuth } =
  authSlice.actions;
export default authSlice.reducer;
