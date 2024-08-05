import { useEffect, useState } from "react";
import { fetchYourRecipes, RecipeType } from '../../api/index';
import { Card, Text, Image, Flex, Fieldset } from '@mantine/core';
import  Button  from "../Atoms/CustomButton";
import { Carousel } from "@mantine/carousel";
import { Link } from "react-router-dom";

const YourRecipes = () => {
    const [recipes, setRecipes] = useState<RecipeType[]>([]);

    useEffect(() => {
        async function getYourRecipes(): Promise<void> {
          try {
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            const currentUser = userData.username;
            console.log('Current user:', currentUser);
            
            if (!currentUser) {
              console.error('No current user found');
              return;
            }
            
            console.log('Fetching recipes for user:', currentUser);
            const response = await fetchYourRecipes(currentUser);
            console.log('API Response:', response);
            console.log('Fetched data:', response.data);
            
            if (Array.isArray(response.data)) {
              setRecipes(response.data);
              console.log('Recipes set:', response.data.length);
              console.log('Recipe authors:', response.data.map(r => r.author));
            } else {
              console.error('Fetched data is not an array:', response.data);
            }
          } catch (error) {
            console.error('Error fetching your recipes:', error);
          }
        }
      
        getYourRecipes();
      }, []);


    return (
        <Flex justify='center'>
          <Fieldset legend='Recipes Created By You' w='100%' mt={20} mb={20} radius='md' p={30}>
            {recipes.length > 0 ? (
              <Carousel slideSize="25%" height={275} slideGap="md" controlSize={35} align='start' dragFree controlsOffset="xs">
                {recipes.map((recipe) => (
                  <Carousel.Slide key={recipe.recipeId}>
                    <Card w={250} h={275} shadow="md" padding='md' radius='md' withBorder>
                      <Card.Section>
                        <Image h={150} src={recipe.image} alt={recipe.name} />
                        <Flex gap={10} direction="column" w='100%' justify='center' align='center'>
                          <Text fw={700} size="lg" mt="sm">{recipe.name}</Text>
                          <Link to={`/recipe/${recipe.recipeId}`}>
                            <Button mt={15} w='100%'>See recipe detail</Button>
                          </Link>
                        </Flex>
                      </Card.Section>
                    </Card>
                  </Carousel.Slide>
                ))}
              </Carousel>
            ) : (
              <Text>You haven't created any recipes yet.</Text>
            )}
          </Fieldset>
        </Flex>
    );
}

export default YourRecipes;