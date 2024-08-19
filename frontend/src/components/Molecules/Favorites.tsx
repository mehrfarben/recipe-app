import { Text, Flex, Fieldset, Container } from "@mantine/core";
import RecipeCard from "./RecipeCard";
import { useAtom } from 'jotai';
import { favoriteRecipesAtom } from '../../utils/Atoms';

const Favorites = () => {
  const [favoriteRecipes] = useAtom(favoriteRecipesAtom);

  return (
    <Flex justify='center'>
      <Fieldset legend='Favorite Recipes' w='100%' mt={20} mb={20} radius='md' p={30}>
        {favoriteRecipes.length > 0 ? (
          <Container miw='100%' p={0}>
            <RecipeCard recipes={favoriteRecipes} />
          </Container>
        ) : (
          <Text>No favorite recipes found.</Text>
        )}
      </Fieldset>
    </Flex>
  );
};

export default Favorites;
