import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

export type UserCredentials = {
    username: string;
    password: string;
  };

export const fetchRecipes = () => API.get('/recipes');
export const registerUser = (userData: UserCredentials) => API.post('/auth/register', userData);
export const loginUser = (userData: UserCredentials) => API.post('/auth/login', userData);