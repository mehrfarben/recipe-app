import { useState, useEffect } from 'react';
import { Card, Image, Text, Group, Flex, SimpleGrid, Container, Avatar, Rating, Badge, Fieldset } from '@mantine/core';
import { Link } from 'react-router-dom';
import Button from '../Atoms/CustomButton';
import LikeButton from '../Atoms/LikeButton';
import CustomText from '../Atoms/CustomText';
import { addRecipeToFavorites, fetchFavoriteRecipes, RecipeType } from '../../api';
import { formatDistanceToNow, parseISO } from 'date-fns';

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

  const formatTimeAgo = (timestamp) => {
    return formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
  };

  return (
    <Fieldset legend='Newest Recipes' mt={20} radius='md' p={30}>
      <SimpleGrid cols={{ base: 1, sm: 2, xl: 4 }}>
        {recipes.map((recipe) => (
          <Flex w='100%' key={recipe.name}>
            <Card w={330} h={400} shadow="md" padding="md" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={recipe.image}
                  h={200}
                  alt="Yemek"
                />
              </Card.Section>

                <Flex mih={50} align='center' justify='space-between'>
                <CustomText fw={500}>{recipe.name}</CustomText>
                <Text size='xs' c='dimmed'>{formatTimeAgo(recipe.createdAt)}</Text>
                </Flex>

                <Flex gap={5} mih={20} align='center'>
                <Badge color='green' variant='light' m={0}>{recipe.preptime}</Badge>
                <Badge color='red' variant='light' m={0}>{recipe.serving} Servings</Badge>
                <Badge color="#FF9505" variant="light">{recipe.category}</Badge>
                </Flex>

                  <Flex align='center' justify='space-between' mt={10} mih={60}>
                  <Flex align='center'>
                  <Avatar radius="xl" />
                  <Text ml={5}>{recipe.author || "Anon User"}</Text>
                  </Flex>
                  <Rating defaultValue={4} />
                  </Flex>


                <Flex justify='space-between' align='center' mih={60}>
                  <Link to={`/recipe/${recipe.recipeId}`}>
                    <Button w={200}>
                      See recipe detail
                    </Button>
                  </Link>

                  <LikeButton
                    isFavorite={favorites.includes(recipe.recipeId)}
                    onClick={() => handleToggleFavorite(recipe.recipeId)}
                  />
                  </Flex>
            </Card>
          </Flex>
        ))}
      </SimpleGrid>
    </Fieldset>
  );
};

export default RecipeCard;
