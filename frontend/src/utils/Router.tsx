import { Routes, Route } from "react-router-dom";
import Recipes from "../components/pages/Recipes";
import Favorites from "../components/pages/Favorites";
import Profile from "../components/pages/Profile";
import Register from "../components/Molecules/Register";
import RecipeDetail from "../components/pages/RecipeDetail";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
      </Routes>
    </div>
  );
};

export default Router;
