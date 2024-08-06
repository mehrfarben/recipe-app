import { Routes, Route } from "react-router-dom";
import Recipes from "../components/pages/Recipes";
import Profile from "../components/pages/Profile";
import Register from "../components/Molecules/Register";
import RecipeDetail from "../components/pages/RecipeDetail";
import { AddRecipe } from "../components/Molecules/AddRecipe";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
        <Route path="/addrecipe" element={<AddRecipe />} />
      </Routes>
    </div>
  );
};

export default Router;
