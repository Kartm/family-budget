import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from '../../app/store';
import {getBudget, getBudgets} from './budgetAPI';
import {incrementByAmount, selectCount} from "../counter/counterSlice";
import {UserDetails} from "../auth/authSlice";


export interface Budget {
    id: string;
    name: string;
    created: string;
    modified: string;
    balance: number;
}

export interface Entry {
    id: string;
    description: string;
}

export interface BudgetShareAccess {
    id: string;
    user: UserDetails;
}

export interface BudgetDetails {
    id: string;
    name: string;
    created: string;
    modified: string;
    balance: number;
    share_accesses: BudgetShareAccess[];
    entries: Entry[];
}

export interface AuthState {
    isLoggedIn: boolean;
    isRegisterSuccess: boolean;
    budgets: Budget[],
    currentBudget: BudgetDetails | null;
}


const initialState: AuthState = {
    isLoggedIn: !!localStorage.getItem('key'),
    isRegisterSuccess: false,
    budgets: [],
    currentBudget: null,
};

export const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
        setBudgets(state, action: PayloadAction<Budget[]>) {
            state.budgets = action.payload;
        },
        setCurrentBudget(state, action: PayloadAction<BudgetDetails>) {
            state.currentBudget = action.payload;
        }
    },
});

export const {setBudgets, setCurrentBudget} = budgetSlice.actions;

export const selectBudgets = (state: RootState) => state.budget.budgets;
export const selectCurrentBudget = (state: RootState) => state.budget.currentBudget;

export const loadBudgets = createAsyncThunk(
    'budget/load-budgets',
    async (_, thunkAPI) => {
        const response = await getBudgets();

        if (response) {
            thunkAPI.dispatch(setBudgets(response))
        }

        return response;
    }
);

export const loadBudget = createAsyncThunk(
    'budget/load-budget',
    async ({budgetId}: {budgetId: string}, thunkAPI) => {
        const response = await getBudget(budgetId);

        if (response) {
            thunkAPI.dispatch(setCurrentBudget(response))
        }

        return response;
    }
);

export default budgetSlice.reducer;
