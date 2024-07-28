import { Routes, Route } from "react-router-dom"
import Recipes from "../pages/Recipes"
import Favorites from "../pages/Favorites"
import Profile from "../pages/Profile"
import Register from "../components/Register"
import {Login} from "../components/Login"

const Router = () => {
  return (
    <div>
    <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
    </Routes>
    </div>
  )
}

export default Router