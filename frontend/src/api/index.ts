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

export type RecipeType = {
  recipeId: number;
  name: string;
  image: string;
  description: string;
  preptime: string;
  prep: string[];
  ingredients: string[];
  category: string;
  serving: string;
  author: string;
};

export const fetchRecipes = (page = 1, limit = 12, author = '') => 
  API.get('/recipes', { params: { page, limit, author } });

export const fetchRecipeById = (id: number) => API.get(`/recipes/${id}`);

export const registerUser = (userData: UserCredentials) => API.post('/auth/register', userData);

export const loginUser = (userData: UserCredentials) => API.post('/auth/login', userData);

export const createRecipe = (recipeData: RecipeType) => API.post('/recipes', recipeData);

export const addRecipeToFavorites = (recipeId: number, username: string) => 
  API.post('/userdata/favorites', { username, recipeId });

export const fetchFavoriteRecipes = (username: string) => 
  API.get(`/userdata/favorites/${username}`);

export const fetchYourRecipes = (currentUser: string) => 
  API.get(`/recipes`, { params: { author: currentUser } });

export const addComment = (recipeId: number, username: string, comment: string) => 
  API.post('/comments', { recipeId, username, comment });

export const fetchComments = (recipeId: number) => API.get(`/comments/${recipeId}`);

export const deleteComment = (commentId: string) => API.delete(`/comments/${commentId}`);

export const getUserRating = (recipeId: string, username: string) => 
  API.get(`rating/user-rating`, { params: { recipeId, username } });

export const submitRating = (recipeId: string, username: string, rating: number) => 
  API.post(`rating/rate`, { recipeId, username, rating });
