import { useEffect, useState } from "react";
import { fetchFavoriteRecipes, fetchRecipeById, RecipeType } from "../../api";
import { SimpleGrid, Card, Text, Image, Flex, Fieldset } from "@mantine/core";
import Button from "../Atoms/CustomButton";
import { Link } from "react-router-dom";

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
    <Fieldset legend='Favorite Recipes' w='80%' mt={20} radius='md' p={30}>
      <SimpleGrid cols={{base:1, sm: 2, md: 3, lg:4, xl: 5}}>
      {favoriteRecipes.length > 0 ? (
        favoriteRecipes.map(recipe => (
          <Card w={250} h={275} shadow="md" padding='md' radius='md' withBorder key={recipe.recipeId}>
            
            <Card.Section>
            <Image h={150} src={recipe.image} alt={recipe.name} />
            <Flex gap={10} direction="column" w='100%' justify='center' align='center'>
            <Text fw={700} size="lg" mt="sm">{recipe.name}</Text>

            <Link to={`/recipe/${recipe.recipeId}`}>
            <Button mt={15} w='100%'>See recipe detail</Button>
            </Link>
            </Flex>
            </Card.Section>
            
          </Card>
        ))
      ) 
      : (
        <p>No favorite recipes found.</p>
      )}
      </SimpleGrid>
      </Fieldset>
      </Flex>
  );
};

export default Favorites;
