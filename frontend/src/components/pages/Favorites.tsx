import { useEffect, useState } from "react";
import { fetchFavoriteRecipes } from "../../api";


const Favorites = () => {

  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const username = userData.username;
      if (username) {
        try {
          const response = await fetchFavoriteRecipes(username);
          setFavorites(response.data.favorites);
          console.log(response.data.favorites);
        } catch (error) {
          console.error('Error fetching favorite recipes', error);
        }
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>Favorites</div>
  )
}

export default Favorites