import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeById, RecipeType } from '../../api/index';
import { Card, Center, Flex, Image, Text, Badge, Title, SimpleGrid } from '@mantine/core';

const RecipeDetails: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetchRecipeById(recipeId);
        setRecipe(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recipe :(');
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <Center h='80vh'> <Text fw={700} size='xl'>{error}</Text></Center>;

  return (
    <Center >
      {recipe ? (
        <Card w='60%' shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section p={50}>
            <Flex direction='column' justify='center' align='center'>

          <Flex pos='relative' justify='center'>
          <Image mb={15} radius='lg' w='50%' src={recipe.image} alt={recipe.name}></Image>
          <Title c='white' pos='absolute' bottom={0} right={270} order={1} mb={15}>{recipe.name}</Title>
          </Flex>
            <Badge size='lg' color='green' my={15}>Preparation time: {recipe.preptime}</Badge>

          <Text>{recipe.description}</Text>
          
          <SimpleGrid mt={25} cols={2}>
            
        <Flex direction='column'>
          <Title ta='center' order={2}>Ingredients</Title>
                <ul>
                {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
                ))}
                </ul>
        </Flex>

        <Flex direction='column'>
          <Title ta='center' order={2}>Preparation Steps</Title>
                <ol>
                {recipe.prep.map((step, index) => (
                 <li key={index}>{step}</li>
                ))}
                 </ol>
        </Flex>

        </SimpleGrid>

          <Text mt={25}>Author: {recipe.author}</Text>
          </Flex>
        </Card.Section>
        </Card>
      ) : (
        <Text>No recipe found</Text>
      )}
    
    </Center>
  );
};

export default RecipeDetails;
