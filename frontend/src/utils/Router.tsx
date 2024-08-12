import { Routes, Route } from "react-router-dom";
import Recipes from "../components/Pages/Recipes";
import Profile from "../components/Pages/Profile";
import Register from "../components/Molecules/Register";
import RecipeDetail from "../components/Pages/RecipeDetail";
import { AddRecipe } from "../components/Molecules/AddRecipe";
import  SearchPage  from "../components/Pages/SearchPage";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
        <Route path="/addrecipe" element={<AddRecipe />} />
        <Route path="/edit-recipe" element={<AddRecipe />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
};

export default Router;
