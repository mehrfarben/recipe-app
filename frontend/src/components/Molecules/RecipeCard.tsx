import { useState, useEffect } from 'react';
import { Card, Image, Text, Flex, SimpleGrid, Avatar, Rating } from '@mantine/core';
import { Link } from 'react-router-dom';
import Button from '../Atoms/CustomButton/CustomButton';
import LikeButton from '../Atoms/LikeButton/LikeButton';
import { addRecipeToFavorites, RecipeType } from '../../api';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Hunger from '../../assets/Hunger'
import HungerEmpty from '../../assets/HungerEmpty'

interface RecipeCardProps {
  recipes: RecipeType[];
  username: string;
}

const RecipeCard = ({ favoriteList, recipes, username }: RecipeCardProps) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const handleToggleFavorite = async (recipeId: number) => {
    if (!username) {
      console.error('Username not found');
      return;
    }

    try {
      await addRecipeToFavorites(recipeId, username);
      setFavoriteIds((favoriteList) => {
        if (favoriteList.includes(recipeId)) {
          return favoriteList.filter(id => id !== recipeId);
        } else {
          return [...favoriteList, recipeId];
        }
      });
    } catch (error) {
      console.error('Error toggling favorite status', error);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    return formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
  };

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {recipes.map((recipe) => (
        <Flex my={15} w='100%' justify='center' key={recipe.recipeId}>
          <Card w={320} h={'100%'} shadow="md" padding="sm" radius="lg" mx={5} withBorder>
            <Card.Section pos='relative'>
              <Image
                src={recipe.image}
                h={200}
                alt="Recipe Image"
              />
              {username && (
                <LikeButton
                  isFavorite={favoriteIds.includes(recipe.recipeId)}
                  onClick={() => handleToggleFavorite(recipe.recipeId)}
                />
              )}
            </Card.Section>

            <Flex mt={10} mih={30} align='center' justify='space-between'>
              <Text fw={500} size='sm'>{recipe.name}</Text>
              {recipe.createdAt && (
                <Text size='xs' c='dimmed'>{formatTimeAgo(recipe.createdAt)}</Text>
              )}
            </Flex>

            <Flex mt={5} mih={20} align='center'>
              <Rating fullSymbol={Hunger} emptySymbol={HungerEmpty} size='xs' value={recipe.averageRating || 0} readOnly fractions={2} />
              <Text size='xs' ml={5}>{(recipe.averageRating || 0).toFixed(1)} </Text>
            </Flex>

            <Flex mt={20} justify='space-between' align='center' mih={60}>
              <Flex align='center'>
                <Avatar radius="xl" />
                <Text size='sm' ml={5}>{recipe.author || "Anon User"}</Text>
              </Flex>
              <Link to={`/recipe/${recipe.recipeId}`}>
                <Button size='xs' w={{ base: '120px', md: '130px' }}>
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
