import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeById, RecipeType, submitRating, getUserRating } from '../../../api/index';
import { Card, Center, Flex, Image, Text, Title, SimpleGrid, List, Group, Paper, Rating, Avatar, Stack } from '@mantine/core';
import { IconClock, IconUsers, IconToolsKitchen2 } from '@tabler/icons-react';
import { parseISO, format } from 'date-fns';
import CommentForm from '../../Molecules/CommentForm';
import CommentList from '../../Molecules/CommentList';
import CesniLoader from '../../Atoms/CesniLoader';
import classes from './RecipeDetail.module.css';
import Hunger from '../../../assets/Hunger'
import HungerEmpty from '../../../assets/HungerEmpty'

const RecipeDetails: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshComments, setRefreshComments] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(0);
  const HungerIcon = (props) => <Hunger width={40} height={35} {...props} />;
  const HungerEmptyIcon = (props) => <HungerEmpty width={40} height={35} {...props} />;

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

const handleRatingChange = async (value: number) => {
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

  if (loading) return <CesniLoader/>;
  if (error) return <Center h='80vh'> <Text fw={700} size='xl'>{error}</Text></Center>;

  const formattedDate = recipe ? format(parseISO(recipe.createdAt), 'dd MMMM yyyy') : '';

  return (
    <Center>
      {recipe ? (
        <Card w={{base: '100%', md: '85%'}} p={{base: 0, md: '1%'}} mb={100} withBorder padding="xl" radius="lg" >

<Card.Section mt={20} px={{base: 20, md: 75}}>
<p className={classes.recipeTitle}>{recipe.name}</p>


<Flex w='100%' gap={20} justify='space-between' direction={{base: 'column', md: 'row'}}>
<Flex>

  <Group mr={{base: 5, md: 50}} justify='center' gap={10}>
  <Avatar className={classes.avatar}/>
  <Stack gap={0}>
    <p className={classes.upperText}>{recipe.author}</p>
    <p className={classes.lowerText}>{formattedDate}</p>
  </Stack>
  </Group>

  <Group className={classes.recipeDetails} gap={5}>
  <IconToolsKitchen2 stroke={1.5} size={30} />
  <Stack gap={0}>
    <p className={classes.upperText}>Category</p>
    <p className={classes.lowerText} >{recipe.category}</p>
  </Stack>
  </Group>


  <Group className={classes.recipeDetails} gap={5}>
    <IconClock stroke={1.5} size={30} />
    <Stack gap={0}>
      <p className={classes.upperText}>Prep Time</p>
      <p className={classes.lowerText} >{recipe.preptime}</p>
    </Stack>
  </Group>

  <Group className={classes.recipeDetails} gap={5}>
    <IconUsers stroke={1.5} size={30} />
    <Stack gap={0}>
      <p className={classes.upperText}>Serving Size</p>
      <p className={classes.lowerText} >{recipe.serving} Servings</p>
    </Stack>
  </Group>
</Flex>

  <Paper p={{base: 0,md:20}} radius='lg' shadow='md' withBorder>
    <Flex justify='center' align='center'>
  <p className={classes.ratingText}>{userRating ? `Your Rating:` : 'Rate This Recipe:'}</p>
  <Rating fullSymbol={<HungerIcon />} emptySymbol={<HungerEmptyIcon />} size='lg' value={userRating} onChange={handleRatingChange} />
  </Flex>
  </Paper>

</Flex>
</Card.Section>

<Card.Section p={{base: 20, md: 75}} pb={0}>
  <SimpleGrid cols={{ base: 1, xl: 2 }}>
    <Image h='100%' radius='lg' src={recipe.image} alt={recipe.name}></Image>

    <Flex justify='end'>
      <Paper p={40} w={{base:'100%', xl:'95%'}} radius='lg' shadow='lg' bg='rgba(255, 186, 9, 0.4)'>
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

<Card.Section px={{base: 0, md: 75}} py={{base: 0, md: 30}}>
  <Paper bg='transparent' p={30}>
<Text className={classes.description}>{recipe.description}</Text>
  </Paper>
</Card.Section>

<Card.Section p={{base: 20, md: 75}} pt={0}>
<Paper bg={'rgba(255, 3, 7, 0.4)'} p={40} radius='lg' shadow='lg'>
  <Flex w='90%' direction='column'>
      <Title mb={20} order={2}>Preparation Steps</Title>
          <List fw={700} type='ordered' listStyleType='decimal' center spacing='lg'>
              {recipe.prep.map((step, index) => (
                <List.Item key={index}>
                  <Text className={classes.prepstep} w='100%'>{step}</Text>
                </List.Item>
              ))}
          </List>
  </Flex>
</Paper>
</Card.Section>



              <Flex w='100%' direction='column' align='center' gap={20}>
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
