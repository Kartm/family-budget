import axios from "axios";
import {Budget, BudgetDetails, Entry, EntryCategory} from "./budgetSlice";
import {UserDetails} from "../auth/authSlice";

let API_SERVER = '';

switch (process.env.NODE_ENV) {
    case 'development':
        API_SERVER = 'http://localhost:8000';
        break;
    case 'production':
        API_SERVER = process.env.REACT_APP_API_SERVER!;
        break;
    default:
        API_SERVER = 'http://localhost:8000';
        break;
}

const instance = axios.create({
    baseURL: API_SERVER,
});

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('key');
        if (token) {
            config.headers!.Authorization = `Token ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export function apiGetUsers() {
    return instance.get<UserDetails[]>(`${API_SERVER}/api/auth/users/`)
        .then(response => response.data);
}

export function getBudgets({owner_id}: {owner_id?: string}) {
        let queryParams = owner_id ? `?owner_id=${owner_id}`:''

    return instance.get<{results: Budget[]}>(`${API_SERVER}/api/budgets/${queryParams}`)
        .then(response => response.data.results);
}

export function apiGetCategories() {
    return instance.get<EntryCategory[]>(`${API_SERVER}/api/categories/`)
        .then(response => response.data);
}

export function getBudget(budgetId: string) {
    return instance.get<BudgetDetails>(`${API_SERVER}/api/budgets/${budgetId}/`)
        .then(response => response.data);
}

export function apiCreateEntry(formData: {budget_id: string; category_id: string, description: string, amount: number}) {
    return instance.post<Entry>(`${API_SERVER}/api/entries/`, {budget_id: formData.budget_id, category_id: formData.category_id, description: formData.description, amount: formData.amount})
        .then(response => response.data);
}


