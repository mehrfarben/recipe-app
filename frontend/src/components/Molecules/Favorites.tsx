import { Text, Flex, Fieldset, Container } from "@mantine/core";
import RecipeCard from "./RecipeCard";

const Favorites = ({ profileData, username }) => {

const favoriteList = (profileData.favorites)
const recipes = (profileData.recipes)
console.log(username)

  return (
    <Flex justify='center'>
      <Fieldset legend='Favorite Recipes' w='100%' mt={20} mb={20} radius='md' p={30}>
        {recipes.length > 0 ? (
          <Container miw='100%' p={0}>
            <RecipeCard favoriteList={favoriteList} recipes={recipes} username={username} /> 
          </Container>
        ) : (
          <Text>No favorite recipes found.</Text>
        )}
      </Fieldset>
    </Flex>
  );
};

export default Favorites;
