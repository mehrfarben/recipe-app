import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeById, RecipeType, submitRating, getUserRating } from '../../api/index';
import { Card, Center, Flex, Image, Text, Title, SimpleGrid, List, Group, Paper, Rating, Loader, Avatar, Stack } from '@mantine/core';
import { IconClock, IconUsers, IconToolsKitchen2 } from '@tabler/icons-react';
import { parseISO, format } from 'date-fns';
import CommentForm from '../Molecules/CommentForm';
import CommentList from '../Molecules/CommentList';

const RecipeDetails: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: number }>();
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

  const formattedDate = recipe ? format(parseISO(recipe.createdAt), 'dd MMMM yyyy') : '';

  return (
    <Center>
      {recipe ? (
        <Card w={{base: '100%', md: '85%'}} withBorder padding="xl" radius="lg" >

<Card.Section mt={20} px={75}>
<Title ff={'Montserrat'} size={60} fw={600} mb={30}>{recipe.name}</Title>


<Flex w='100%' justify='space-between'>
<Flex gap={25}>

  <Group mr={50} gap={10}>
  <Avatar size='lg'/>
  <Stack gap={0}>
    <Text size='xl' fw={600}>{recipe.author}</Text>
    <Text size='md'>{formattedDate}</Text>
  </Stack>
  </Group>

  <Group className='recipe-details' gap={10}>
  <IconToolsKitchen2 stroke={1.5} size={40} />
  <Stack gap={0}>
    <Text size='md' fw={600}>Category</Text>
    <Text size='sm'>{recipe.category}</Text>
  </Stack>
  </Group>

  <Group className='recipe-details' gap={10}>
    <IconClock stroke={1.5} size={40} />
    <Stack gap={0}>
      <Text size='md' fw={600}>Prep Time</Text>
      <Text size='sm'>{recipe.preptime}</Text>
    </Stack>
  </Group>

  <Group className='recipe-details' gap={10}>
    <IconUsers stroke={1.5} size={40} />
    <Stack gap={0}>
      <Text size='md' fw={600}>Serving Size</Text>
      <Text size='sm'>{recipe.serving} Servings</Text>
    </Stack>
  </Group>
</Flex>

  <Paper p={20} radius='lg' shadow='md' withBorder>
    <Flex>
  <Text size='lg' fw={600} mr={10}>Rate this recipe:</Text>
  <Rating size='lg' value={userRating} onChange={handleRatingChange} />
  </Flex>
  </Paper>

</Flex>
</Card.Section>

<Card.Section p={75} pb={0}>
  <SimpleGrid cols={{ base: 1, lg: 2 }}>
    <Image h='100%' radius='lg' src={recipe.image} alt={recipe.name}></Image>

    <Flex justify='end'>
      <Paper p={40} w={{base:'100%', lg:'95%'}} radius='lg' shadow='lg' bg='rgba(255, 186, 9, 0.4)'>
        <Flex direction='column'>
            <Title ff={'Montserrat'} mb={10} order={1} fw={600}>Ingredients</Title>
              {recipe.ingredients.map((ingredient, index) => (
              <Text size='sm' className='ingredients' mt={15} key={index}>
                {ingredient}
              </Text>
              ))}
        </Flex>
      </Paper>
    </Flex>
  </SimpleGrid>
</Card.Section>

<Card.Section px={75} py={30}>
  <Paper bg='transparent' p={30}>
<Text>{recipe.description}</Text>
  </Paper>
</Card.Section>

<Card.Section p={75} pt={0}>
<Paper bg={'rgba(255, 3, 7, 0.4)'} p={40} radius='lg' shadow='lg'>
  <Flex w='90%' direction='column'>
      <Title mb={20} order={2}>Preparation Steps</Title>
          <List fw={700} type='ordered' listStyleType='decimal' center spacing='lg'>
              {recipe.prep.map((step, index) => (
                <List.Item key={index}>
                  <Text w='100%'>{step}</Text>
                </List.Item>
              ))}
          </List>
  </Flex>
</Paper>
</Card.Section>



              <Flex w='100%' direction='column' align='center' p={40} gap={20}>
              <CommentForm recipeId={recipeId} username={username} onCommentAdded={() => setRefreshComments(!refreshComments)} />
              <CommentList recipeId={recipeId} refresh={refreshComments} />
              </Flex>
              </Card>
      ) : (
        <div>Recipe not found.</div>
      )}
    </Center>
  );
};

export default RecipeDetails;
