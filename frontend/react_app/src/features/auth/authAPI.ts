// A mock function to mimic making an async request for data
import axios from "axios";

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

export function login({username, password}: {username: string, password: string}) {
    return axios.post<{key: string}>(`${API_SERVER}/api/auth/login/`, {username, password})
        .then(response => response.data);
}
