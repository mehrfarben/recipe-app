import { Card, Image, Text, Group, Flex, SimpleGrid, Container, Avatar, Rating, Badge } from '@mantine/core';
import { Link } from 'react-router-dom';
import Button from '../Atoms/Button';
import LikeButton from '../Atoms/LikeButton';
import CustomFlex from '../Layout/CustomFlex';
import CustomText from '../Atoms/CustomText';

interface RecipeCardProps {
  recipes: RecipeType[];
  removeNonAscii: (str: string) => string;
}

const RecipeCard = ({ recipes}: RecipeCardProps) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {recipes.map((recipe) => (
        <Container key={recipe.name}>
          <Card w={330} h={450} shadow="sm" padding="md" radius="md" withBorder>
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
                ingredient ? <Badge key={index} color="#ffba08" variant="light" size='xs'>{ingredient}</Badge> : null
              ))}
            </CustomFlex>

            <Flex my={15} align="center" justify="space-between">
              <Group gap={4}>
                <Avatar radius="xl" />
                <Text>{recipe.author || "Anon User"}</Text>
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

                <LikeButton />
              </Flex>
            </Flex>
          </Card>
        </Container>
      ))}
    </SimpleGrid>
  );
};

export default RecipeCard;
