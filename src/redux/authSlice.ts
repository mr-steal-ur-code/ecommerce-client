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
    password: '',
    avatar: ''
  },
  password: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (action.payload.fullname) {
        state.user.fullname = action.payload.fullname;
      }
      if (action.payload.email) {
        state.user.email = action.payload.email;
      }
      if (action.payload.username) {
        state.user.username = action.payload.username;
      }
      if (action.payload.avatar) {
        state.user.avatar = action.payload.avatar;
      }
    },
    login(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = {
        id: action.payload.id,
        fullname: action.payload.fullname,
        email: action.payload.email,
        username: action.payload.username,
        password: action.payload.password,
        avatar: action.payload.avatar
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
        password: '',
        avatar: ''
      };
      state.password = null;
    },
  },
});

export const { updateUser, login, logout } = authSlice.actions;

export default authSlice.reducer;
