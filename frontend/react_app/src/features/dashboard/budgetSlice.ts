import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from '../../app/store';
import {apiCreateEntry, apiGetCategories, apiGetUsers, getBudget, getBudgets} from './budgetAPI';
import {incrementByAmount, selectCount} from "../counter/counterSlice";
import {UserDetails} from "../auth/authSlice";


export interface Budget {
    id: string;
    name: string;
    created: string;
    modified: string;
    balance: number;
    owner: UserDetails;
}

export interface EntryCategory {
    id: string;
    name: string;
}

export interface Entry {
    id: string;
    description: string;
    amount: string;
    created: string;
    category: EntryCategory;
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
    categories: EntryCategory[],
    currentBudget: BudgetDetails | null;
    users: UserDetails[];
}


const initialState: AuthState = {
    isLoggedIn: !!localStorage.getItem('key'),
    isRegisterSuccess: false,
    budgets: [],
    categories: [],
    currentBudget: null,
    users: [],
};

export const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
        setBudgets(state, action: PayloadAction<Budget[]>) {
            state.budgets = action.payload;
        },
        setCategories(state, action: PayloadAction<EntryCategory[]>) {
            state.categories = action.payload;
        },
        setCurrentBudget(state, action: PayloadAction<BudgetDetails>) {
            state.currentBudget = action.payload;
        },
        setUsers(state, action: PayloadAction<UserDetails[]>) {
            state.users = action.payload;
        }
    },
});

export const {setUsers, setBudgets, setCategories, setCurrentBudget} = budgetSlice.actions;

export const selectUsers = (state: RootState) => state.budget.users;
export const selectBudgets = (state: RootState) => state.budget.budgets;
export const selectCategories = (state: RootState) => state.budget.categories;
export const selectCurrentBudget = (state: RootState) => state.budget.currentBudget;

export const loadUsers = createAsyncThunk(
    'budget/load-users',
    async (_, thunkAPI) => {
        const response = await apiGetUsers();

        if (response) {
            thunkAPI.dispatch(setUsers(response))
        }

        return response;
    }
);


export const loadBudgets = createAsyncThunk(
    'budget/load-budgets',
    async ({owner_id}: {owner_id: string}, thunkAPI) => {
        const response = await getBudgets({owner_id});

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

export const loadCategories = createAsyncThunk(
    'budget/load-categories',
    async (_, thunkAPI) => {
        const response = await apiGetCategories();

        if (response) {
            thunkAPI.dispatch(setCategories(response))
        }

        return response;
    }
);

export const createEntry = createAsyncThunk(
    'budget/create-entry',
    async (formData: {budget_id: string; category_id: string, description: string, amount: number}, thunkAPI) => {
        const response = await apiCreateEntry(formData);

        if (response) {
            thunkAPI.dispatch(loadBudget({budgetId: formData.budget_id}))
        }

        return response;
    }
);

export default budgetSlice.reducer;
