import { Routes, Route } from "react-router-dom"
import Recipes from "../pages/Recipes"
import Favorites from "../pages/Favorites"
import Profile from "../pages/Profile"
import Register from "../components/Register"

const Router = () => {
  return (
    <div>
    <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/register" element={<Register />}/>
    </Routes>
    </div>
  )
}

export default Router