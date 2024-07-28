import { useState, useEffect } from 'react';
import { Card, Image, Text, Button, Group, ActionIcon, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconHeart } from '@tabler/icons-react';
import { fetchRecipes } from '../api/index';

type RecipeType = {
  id: number;
  name: string;
  img: string;
  desc: string;
};

function RecipeCard() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  useEffect(() => {
    async function getRecipes(): Promise<void> {
      try {
        const { data } = await fetchRecipes();
        const recipes: RecipeType[] = data[0].food;
        setRecipes(recipes);
      } catch (error) {
        console.error(error);
      }
    }

    getRecipes();
  }, []);

  return (
    <Group ml="xl">
      {recipes.map((recipe) => (
        <Card key={recipe.id} shadow="sm" padding="md" m="sm" radius="md" w={300} h={400} withBorder>
          <Card.Section>
            <Image
              src={recipe.img}
              height={160}
              alt="Yemek"
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
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
            c={"dimmed"}
          >
            {recipe.desc}
          </Text>

          <Flex w="100%" h={150} align="flex-end" justify="space-between">
            <Link to={`/recipe/${recipe.id}`}>
              <Button color="blue" radius="md" w="200px" m={5}>
                See full recipe
              </Button>
            </Link>

            <ActionIcon color='red' size={35} variant="outline" m={5}>
              <IconHeart />
            </ActionIcon>
          </Flex>
        </Card>
      ))}
    </Group>
  );
}

export default RecipeCard;
