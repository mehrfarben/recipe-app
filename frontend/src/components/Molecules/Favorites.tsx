import { useEffect, useState } from "react";
import { fetchFavoriteRecipes, RecipeType } from "../../api";
import { Text, Flex, Fieldset, Container } from "@mantine/core";
import RecipeCard from "./RecipeCard";
import CesniLoader from "../Atoms/CesniLoader";

const Favorites = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<RecipeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const username = userData.username;

  useEffect(() => {
    const fetchFavorites = async () => {
      if (username) {
        try {
          const response = await fetchFavoriteRecipes(username);
          setFavoriteRecipes(response.data.recipes);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching favorite recipes', error);
          setIsLoading(false);
        }
      }
    };

    fetchFavorites();
  }, [username]);

  if (isLoading) {
    return <CesniLoader />;
  }

  return (
    <Flex justify='center'>
      <Fieldset legend='Favorite Recipes' w='100%' mt={20} mb={20} radius='md' p={30}>
        {favoriteRecipes.length > 0 ? (
          <Container miw='100%' p={0}>
            <RecipeCard recipes={favoriteRecipes} />
          </Container>
        ) : (
          <Text>No favorite recipes found.</Text>
        )}
      </Fieldset>
    </Flex>
  );
};

export default Favorites;
