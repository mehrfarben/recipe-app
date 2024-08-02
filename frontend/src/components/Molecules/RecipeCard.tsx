import { useState, useEffect } from 'react';
import { Card, Image, Text, Group, Flex, SimpleGrid, Container, Avatar, Rating, Badge, Fieldset } from '@mantine/core';
import { Link } from 'react-router-dom';
import Button from '../Atoms/Button';
import LikeButton from '../Atoms/LikeButton';
import CustomFlex from '../Layout/CustomFlex';
import CustomText from '../Atoms/CustomText';
import { addRecipeToFavorites, fetchFavoriteRecipes, RecipeType } from '../../api';

interface RecipeCardProps {
  recipes: RecipeType[];
}

const RecipeCard = ({ recipes }: RecipeCardProps) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  
  useEffect(() => {
    const fetchFavorites = async () => {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const username = userData.username;
      if (username) {
        try {
          const response = await fetchFavoriteRecipes(username);
          setFavorites(response.data.favorites);
        } catch (error) {
          console.error('Error fetching favorite recipes', error);
        }
      }
    };

    fetchFavorites();
  }, []);

  const handleToggleFavorite = async (recipeId: number) => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const username = userData.username;

    if (!username) {
      console.error('Username not found in localStorage');
      return;
    }

    try {
      const response = await addRecipeToFavorites(recipeId, username);
      console.log(response.data.message); // Recipe added to or removed from favorites

      setFavorites((prevFavorites) => {
        if (prevFavorites.includes(recipeId)) {
          return prevFavorites.filter(id => id !== recipeId);
        } else {
          return [...prevFavorites, recipeId];
        }
      });
    } catch (error) {
      console.error(error.response?.data?.message || 'Error toggling recipe favorite status');
    }
  };

  return (
    <Fieldset legend='Newest Recipes' mt={20} radius='md' p={30}>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
        {recipes.map((recipe) => (
          <Container key={recipe.name}>
            <Card w={330} h={450} shadow="md" padding="md" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={recipe.image}
                  h={200}
                  alt="Yemek"
                />
              </Card.Section>

              <Group my={10}>
                <CustomText fw={500}>{recipe.name}</CustomText>
              </Group>

              <Group mb={10}>
                <Badge color='green' fw={700} variant='outline' m={0}>{recipe.preptime}</Badge>
              </Group>

              <CustomFlex overflow='hidden' wrap="wrap" gap={3} h="75%">
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                  ingredient ? <Badge key={index} color="#FF9505" variant="light" size='xs'>{ingredient}</Badge> : null
                ))}
              </CustomFlex>

              <Flex my={15} align="center" justify="space-between">
                <Group gap={4}>
                  <Avatar radius="xl" />
                  <Text >{recipe.author || "Anon User"}</Text>
                </Group>

                <Group>
                  <Rating defaultValue={4} />
                </Group>
              </Flex>

              <Flex h='100%' justify='end'>
                <Flex w="100%" align="center" justify="space-between">
                  <Link to={`/recipe/${recipe.recipeId}`}>
                    <Button>
                      See full recipe
                    </Button>
                  </Link>

                  <LikeButton 
                    isFavorite={favorites.includes(recipe.recipeId)}
                    onClick={() => handleToggleFavorite(recipe.recipeId)}
                  />
                </Flex>
              </Flex>
            </Card>
          </Container>
        ))}
      </SimpleGrid>
    </Fieldset>
  );
};

export default RecipeCard;
