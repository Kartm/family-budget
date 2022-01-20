import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { login } from './authAPI';
import {incrementByAmount, selectCount} from "../counter/counterSlice";

export interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem('key'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoggedIn } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({username, password}: {username: string, password: string}, thunkAPI) => {
    const response = await login({username, password});

    if(response) {
        localStorage.setItem('key', response.key)
        thunkAPI.dispatch(setLoggedIn(true))
    }

    return response;
  }
);

export const logoutUser = (): AppThunk => (
  dispatch,
  getState
) => {
    localStorage.removeItem('key')
   dispatch( setLoggedIn(false))
};

export default authSlice.reducer;
