import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: User;
  password: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    id: null,
    fullname: "",
    email: "",
    username: '',
    password: ''
  },
  password: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = {
        id: action.payload.id,
        fullname: action.payload.fullname,
        email: action.payload.email,
        username: action.payload.username,
        password: action.payload.password
      };
      state.password = action.payload.password;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = {
        id: null,
        fullname: "",
        email: "",
        username: '',
        password: ''
      };
      state.password = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
