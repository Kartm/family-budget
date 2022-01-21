import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from '../../app/store';
import {getLoggedInUserDetailsApi, login, register} from './authAPI';


export interface UserDetails {
    id: string;
    username: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    isRegisterSuccess: boolean;
    userDetails: UserDetails | null,
}


const initialState: AuthState = {
    isLoggedIn: !!localStorage.getItem('key'),
    isRegisterSuccess: false,
    userDetails: null,
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
        setUserDetails(state, action: PayloadAction<UserDetails>) {
            state.userDetails = action.payload;
        }
    },
});

export const {setLoggedIn, setIsRegisterSuccess, setUserDetails} = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRegisterSuccess = (state: RootState) => state.auth.isRegisterSuccess;
export const selectUserDetails = (state: RootState) => state.auth.userDetails;

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({username, password}: { username: string, password: string }, thunkAPI) => {
        const response = await register({username, password});

        if (response) {
            thunkAPI.dispatch(setIsRegisterSuccess(true))
        }

        return response;
    }
);

export const getLoggedInUserDetails = createAsyncThunk(
    'auth/get-logged-in-user-details',
    async (_, thunkAPI) => {
        const response = await getLoggedInUserDetailsApi();

        if (response) {
            thunkAPI.dispatch(setUserDetails(response))
        }

        return response;
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({username, password}: { username: string, password: string }, thunkAPI) => {
        const response = await login({username, password});

        if (response) {
            localStorage.setItem('key', response.key)
            thunkAPI.dispatch(setLoggedIn(true))
            thunkAPI.dispatch(getLoggedInUserDetails())
        }

        return response;
    }
);

export const logoutUser = (): AppThunk => (
    dispatch,
    getState
) => {
    localStorage.removeItem('key')
    dispatch(setLoggedIn(false))
};

export default authSlice.reducer;
