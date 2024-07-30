import { useState, useEffect } from 'react';
import { Card, Image, Text, Button, Group, ActionIcon, Flex, Avatar, Rating, Container, SimpleGrid } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconHeart } from '@tabler/icons-react';
import { fetchRecipes } from '../api/index';
import {AddRecipe} from '../components/AddRecipe';
import { useDisclosure } from '@mantine/hooks';


const Recipes = () => {
  
  function removeNonAscii(str) {
    return str.replace(/[^\x00-\x7F]/g, '');
  }

  const [opened, { open, close }] = useDisclosure(false);
  type RecipeType = {
    id: number;
    name: string;
    image: string;
    description: string;
    preptime: string;
    prep: string;
    ingredients: string;
  };
  
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
  
    useEffect(() => {
      async function getRecipes(): Promise<void> {
        try {
          const { data } = await fetchRecipes();
          const recipes: RecipeType[] = data;
          setRecipes(recipes);
          console.log(recipes)
        } catch (error) {
          console.error(error);
        }
      }
  
      getRecipes();
    }, []);

  
  return (
      <Container maw="80%">
        <Flex justify="space-between" mb="md">
          <Text size="xl" fw={600} >Newest Recipes</Text>
          <Button mr={50} onClick={open}>Add New Recipe</Button>
          <AddRecipe opened={opened} open={open} close={close}></AddRecipe>

        </Flex>
  
        
        <SimpleGrid cols={{base:1 , sm:2, lg:3, xl:4}}>
          {recipes.map((recipe) => (
            <Container>
              <Card w={300} h={450} shadow="sm" padding="md" radius="md" withBorder>
                <Card.Section>
                  <Image
                    src={recipe.image}
                    height={160}
                    alt="Yemek"
                  />
                </Card.Section>
  
                <Group mt="md" mb="xs">
                  <Text fw={500}>{recipe.name}</Text>
                </Group>
  
                <Text
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    WebkitLineClamp: 5,
                    height: '210px',
                    width: '100%',
                  }}
                  size='sm'
                  c="dimmed"
                >
                  {recipe.description}
                </Text>
  
                <Flex mt={26} mb={10} align="center" justify="space-between">
                  <Group gap={4}>
                    <Avatar radius="xl" />
                    <Text>Author Name</Text>
                  </Group>
  
                  <Group>
                    <Rating defaultValue={4} />
                  </Group>
                </Flex>
  
                <Flex w="100%" align="flex-end" justify="space-between">
                  <Link to={`/recipe/${removeNonAscii(recipe.name)}`}>
                    <Button color="blue" radius="md" w="200px" m={5}>
                      See full recipe
                    </Button>
                  </Link>
  
                  <ActionIcon color='red' size={35} variant="outline" m={5}>
                    <IconHeart />
                  </ActionIcon>
                </Flex>
              </Card>
            </Container>
          ))}
        </SimpleGrid>
      </Container>
    );
  };

export default Recipes