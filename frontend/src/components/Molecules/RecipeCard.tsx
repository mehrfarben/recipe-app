import { useState, useEffect } from 'react';
import { Card, Image, Text, Group, Flex, SimpleGrid, Avatar, Rating, Fieldset } from '@mantine/core';
import { Link } from 'react-router-dom';
import Button from '../Atoms/CustomButton';
import LikeButton from '../Atoms/LikeButton';
import CustomText from '../Atoms/CustomText';
import { addRecipeToFavorites, fetchFavoriteRecipes, RecipeType } from '../../api';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface RecipeCardProps {
  recipes: RecipeType[];
}

const RecipeCard = ({ recipes = [] }: RecipeCardProps) => {
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

  const formatTimeAgo = (timestamp: string) => {
    return formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
  };

  return (
    
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 2, xl: 3 }}>
        {recipes.map((recipe) => (
          <Flex my={15} w='100%' justify='center' key={recipe.recipeId}>
            <Card w={375} h={'100%'} shadow="md" padding="md" radius="lg" mx={5} withBorder>
              <Card.Section pos='relative'>
                <Image
                  src={recipe.image}
                  h={200}
                  alt="Recipe Image"
                />
                <LikeButton
                    isFavorite={favorites.includes(recipe.recipeId)}
                    onClick={() => handleToggleFavorite(recipe.recipeId)}
                />
              </Card.Section>

                <Flex mt={10} mih={30} align='center' justify='space-between'>
                <CustomText fw={500}>{recipe.name}</CustomText>
                <Text size='xs' c='dimmed'>{formatTimeAgo(recipe.createdAt)}</Text>
                </Flex>

                <Flex mt={5} mih={20} align='center'>
                <Rating value={recipe.averageRating} readOnly fractions={2} />
                <Text size='sm' ml={5}>{recipe.averageRating}</Text>
                </Flex>

                <Flex mt={20} justify='space-between' align='center' mih={60}>
                <Flex align='center'>
                  <Avatar radius="xl" />
                  <Text ml={5}>{recipe.author || "Anon User"}</Text>
                  </Flex> 
                  <Link to={`/recipe/${recipe.recipeId}`}>
                    <Button w={{ base: '130px', md: '150px' }}>
                      Read recipe
                    </Button>
                  </Link>
                </Flex>
            </Card>
          </Flex>
        ))}
      </SimpleGrid>

  );
};

export default RecipeCard;
