import { useEffect, useState } from "react";
import { fetchYourRecipes, RecipeType, deleteRecipe } from '../../api/index';
import { Card, Text, Image, Flex, Fieldset, Container, SimpleGrid } from '@mantine/core';
import Button from "../Atoms/CustomButton";
import RecipeEditButton from '../Atoms/RecipeEditButton';
import { Link } from "react-router-dom";

const YourRecipes = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    async function getYourRecipes(): Promise<void> {
      try {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const currentUser = userData.username;

        if (!currentUser) {
          console.error('No current user found');
          return;
        }

        const response = await fetchYourRecipes(currentUser);

        if (Array.isArray(response.data.recipes)) {
          setRecipes(response.data.recipes);
        } else {
          console.error('Fetched data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching your recipes:', error);
      }
    }

    getYourRecipes();
  }, [refresh]);

  const handleDeleteRecipe = async (recipeId: number) => {
    try {
      await deleteRecipe(recipeId);
      setRefresh(prev => !prev); 
    } catch (error) {
      console.error('Error deleting recipe', error);
    }
  };

  return (
    <Flex justify='center'>
      <Fieldset legend='Recipes By You' w='100%' mt={20} mb={20} radius='md' p={30}>
        {recipes.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
            {recipes.map((recipe) => (
              <Flex justify='center' key={recipe.recipeId}>
                <Card w={300} h='100%' shadow="md" padding='md' radius='md' withBorder>
                  <Card.Section>
                    <Image h={150} src={recipe.image} alt={recipe.name} />
                  </Card.Section>
                  <RecipeEditButton
                    recipeId={recipe.recipeId}
                    onDelete={handleDeleteRecipe}
                    recipe={recipe}
                  />
                  <Flex gap={10} direction="column" w='100%' justify='center' align='center'>
                    <Text fw={700} size="sm" mt={10}>{recipe.name}</Text>
                    <Link to={`/recipe/${recipe.recipeId}`}>
                      <Button size="xs" w='100%'>See recipe detail</Button>
                    </Link>
                  </Flex>
                </Card>
              </Flex>
            ))}
          </SimpleGrid>
        ) : (
          <Text>You haven't created any recipes yet.</Text>
        )}
      </Fieldset>
    </Flex>
  );
}

export default YourRecipes;
