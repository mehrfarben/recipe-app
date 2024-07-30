import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export type UserCredentials = {
    identifier: string;
    email: string;
    username: string;
    password: string;
  };

export const fetchRecipes = () => API.get('/recipes');
export const registerUser = (userData: UserCredentials) => API.post('/auth/register', userData);
export const loginUser = (userData: UserCredentials) => API.post('/auth/login', userData);
export const createRecipe = (recipeData: any) => API.post('/recipes', recipeData);