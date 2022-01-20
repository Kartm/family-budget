// A mock function to mimic making an async request for data
import axios from "axios";
import {UserDetails} from "./authSlice";

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


export function getLoggedInUserDetailsApi() {
    return instance.get<UserDetails>(`${API_SERVER}/api/auth/details/`)
        .then(response => response.data);
}

export function login({username, password}: { username: string, password: string }) {
    return instance.post<{ key: string }>(`${API_SERVER}/api/auth/login/`, {username, password})
        .then(response => response.data);
}


export function register({username, password}: { username: string, password: string }) {
    return instance.post<{ key: string }>(`${API_SERVER}/api/auth/register/`, {username, password})
        .then(response => response.data);
}

