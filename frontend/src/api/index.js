import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

export const fetchRecipes = () => API.get('/recipes');
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);