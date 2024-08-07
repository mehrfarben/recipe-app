import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeById, RecipeType, submitRating, getUserRating } from '../../api/index';
import { Card, Center, Flex, Image, Text, Title, SimpleGrid, List, Container, Group, Paper, Rating, Loader } from '@mantine/core';
import { IconInnerShadowLeft, IconClock, IconUserCircle, IconUsers, IconToolsKitchen2 } from '@tabler/icons-react';
import CommentForm from '../Molecules/CommentForm';
import CommentList from '../Molecules/CommentList';

const RecipeDetails: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshComments, setRefreshComments] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(0);

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

  useEffect(() => {
    const fetchUserRating = async () => {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const username = userData.username;
      if (username) {
        try {
          const response = await getUserRating(recipeId, username);
          setUserRating(response.data?.rating || 0);
        } catch (err) {
          console.error('Failed to fetch user rating');
        }
      }
    };

    fetchUserRating();
  }, [recipeId]);

  const handleRatingChange = async (value) => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const username = userData.username;
    if (username) {
      try {
        await submitRating(recipeId, username, value);
        setUserRating(value);
      } catch (err) {
        console.error('Failed to submit rating');
      }
    }
  };

  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const username = userData.username;

  if (loading) return <Flex w='100%' h='100vh' justify='center' align='center'><Loader color='primary'/></Flex>;
  if (error) return <Center h='80vh'> <Text fw={700} size='xl'>{error}</Text></Center>;

  return (
    <Center>
      {recipe ? (
        <Card pb={50} w={{base: '100%', lg: '70%', xl: '60%'}} shadow="lg" padding="xl" radius="md">
          <Card.Section p={50}>
            <Flex direction='column' justify='center' align='center'>
              <Flex w='100%' direction='column' align='center' justify='center' mb={30}>
                <Image w='80%' src={recipe.image} alt={recipe.name}></Image>
                <Container py={25} w='80%' bg='primary'>
                  <Title c='#f2f2f2' order={1}>{recipe.name}</Title>
                </Container>
              </Flex>
              <Flex mb={30} w='80%' justify='space-around' align='center'>
                <Group gap={5}>
                  <IconClock size={30} color='red'/>
                  <Text size='xl' fw={700} c='primary'>{recipe.preptime}</Text>
                </Group>
                <Group gap={5}>
                  <IconUsers size={30} color='#40c057'/>
                  <Text size='xl' fw={700} c='#40c057'>{recipe.serving} Servings</Text>
                </Group>
                <Group gap={5}>
                  <IconToolsKitchen2 size={30} color='#228be6'/>
                  <Text size='xl' fw={700} c='#228be6'>{recipe.category}</Text>
                </Group>
                <Group gap={5}>
                  <IconUserCircle size={30} color='#FF9505'/>
                  <Text size='xl' fw={700} c='#FF9505'>{recipe.author}</Text>
                </Group>
              </Flex>
              <Text mb={30} ta='left' w='85%'>{recipe.description}</Text>
              <SimpleGrid w='90%' mt={25} cols={{base: 1, lg: 2}}>

                <Paper p={25}>
                <Flex direction='column'>
                  <Title mb={20} order={2}>Ingredients</Title>
                  <List spacing='md' icon={<IconInnerShadowLeft size={20} color='red'/>}>
                    {recipe.ingredients.map((ingredient, index) => (
                      <List.Item key={index}>
                        <Text>{ingredient}</Text>
                      </List.Item>
                    ))}
                  </List>
                </Flex>
                </Paper>

                <Paper p={25}>
                <Flex w='90%' direction='column'>
                  <Title mb={20} order={2}>Preparation Steps</Title>
                  <List center spacing='md'>
                    {recipe.prep.map((step, index) => (
                      <List.Item key={index}>
                        <Text w='100%'>{step}</Text>
                      </List.Item>
                    ))}
                  </List>
                </Flex>
                </Paper>

              </SimpleGrid>
              <Flex mt={50} align='center'>
                <Text size='xl' fw={500} mr={10}>Rate this recipe:</Text>
              <Rating size='xl' value={userRating} onChange={handleRatingChange} />
              </Flex>
              <Flex mt={50} direction='column' w='90%'>
              <CommentForm recipeId={recipeId} username={username} onCommentAdded={() => setRefreshComments(!refreshComments)} />
              <CommentList recipeId={recipeId} refresh={refreshComments} />
              </Flex>
            </Flex>
          </Card.Section>
        </Card>
      ) : (
        <div>Recipe not found.</div>
      )}
    </Center>
  );
};

export default RecipeDetails;
