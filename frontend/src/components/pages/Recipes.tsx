import { useState, useEffect } from 'react';
import { Container} from '@mantine/core';

import { fetchRecipes } from '../../api/index';
import AddRecipeButton from '../Atoms/AddRecipeButton';
import { RecipeType } from '../../api/index';
import RecipeCard from '../Molecules/RecipeCard';

const Recipes = () => {


    const [recipes, setRecipes] = useState<RecipeType[]>([]);
  
    useEffect(() => {
      async function getRecipes(): Promise<void> {
        try {
          const { data } = await fetchRecipes();
          const recipes: RecipeType[] = data;
          setRecipes(recipes);
        } catch (error) {
          console.error(error);
        }
      }
  
      getRecipes();
    }, []);

  
  return (
      <Container maw={{base: '100%', lg: '80%'}}>

        <AddRecipeButton />
  
        <RecipeCard recipes={recipes}/>

      </Container>
    );
  };

export default Recipes