import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {login, register} from './authAPI';
import {incrementByAmount, selectCount} from "../counter/counterSlice";

export interface AuthState {
  isLoggedIn: boolean;
  isRegisterSuccess: boolean;
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem('key'),
    isRegisterSuccess: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
      setIsRegisterSuccess: (state, action: PayloadAction<boolean>) => {
      state.isRegisterSuccess = action.payload;
    },
  },
});

export const { setLoggedIn, setIsRegisterSuccess } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRegisterSuccess = (state: RootState) => state.auth.isRegisterSuccess;

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({username, password}: {username: string, password: string}, thunkAPI) => {
    const response = await register({username, password});

    if(response) {
        thunkAPI.dispatch(setIsRegisterSuccess(true))
    }

    return response;
  }
);

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
