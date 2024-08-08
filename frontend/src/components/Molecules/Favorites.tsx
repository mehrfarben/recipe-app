import { useEffect, useState } from "react";
import { fetchFavoriteRecipes, fetchRecipeById, RecipeType } from "../../api";
import { Card, Text, Flex, Fieldset, Container } from "@mantine/core";
import RecipeCard from "./RecipeCard";


const Favorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<RecipeType[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const username = userData.username;
      if (username) {
        try {
          const response = await fetchFavoriteRecipes(username);
          setFavoriteIds(response.data.favorites);
        } catch (error) {
          console.error('Error fetching favorite recipes', error);
        }
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const recipeDetails = await Promise.all(
        favoriteIds.map(id => fetchRecipeById(id))
      );
      setFavoriteRecipes(recipeDetails.map(res => res.data));
    };

    if (favoriteIds.length > 0) {
      fetchRecipeDetails();
    }
  }, [favoriteIds]);

  return (
    <Flex justify='center'>
      <Fieldset legend='Favorite Recipes' w='100%' mt={20} mb={20} radius='md' p={30}>
        {favoriteRecipes.length > 0 ? (
            <Container miw='100%' p={0}>

                <RecipeCard recipes={favoriteRecipes} />

            </Container>
        ) : (
          <Text>You don't have any favorite recipes.</Text>
        )}
      </Fieldset>
    </Flex>
  );
};

export default Favorites;
