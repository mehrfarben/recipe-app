import { Routes, Route } from "react-router-dom"
import Recipes from "../pages/Recipes"
import Favorites from "../pages/Favorites"
import Profile from "../pages/Profile"

const Router = () => {
  return (
    <div>
    <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />}/>
    </Routes>
    </div>
  )
}

export default Router