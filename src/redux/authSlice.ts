import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string | null;
    name: string | null;
    email: string | null;
  };
  password: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    id: null,
    name: null,
    email: null,
  },
  password: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ id: string; name: string; email: string; password: string }>) {
      state.isAuthenticated = true;
      state.user = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      };
      state.password = action.payload.password;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = { id: null, name: null, email: null };
      state.password = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
