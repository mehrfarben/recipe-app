import { useState, useEffect } from 'react';
import { Container, Pagination, Group, Fieldset } from '@mantine/core';
import { fetchRecipes } from '../../api/index';
import { RecipeType } from '../../api/index';
import RecipeCard from '../Molecules/RecipeCard';
import HeroSection from '../Molecules/HeroSection/HeroSection';
import CesniLoader from '../Atoms/CesniLoader';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Recipes = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getRecipes(page: number): Promise<void> {
      setLoading(true);
      try {
        const { data } = await fetchRecipes(page);
        setRecipes(data.recipes);
        setTotalPages(data.totalPages);
        setError(null);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch recipes');
      } finally {
        setLoading(false);
      }
    }

    getRecipes(currentPage);
  }, [currentPage]);

  useEffect(() => {

    socket.on('recipeAdded', (newRecipe: RecipeType) => {
      setRecipes((prevRecipes) => [newRecipe, ...prevRecipes]);
    });

    socket.on('recipeUpdated', (updatedRecipe: RecipeType) => {
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.recipeId === updatedRecipe.recipeId ? updatedRecipe : recipe
        )
      );
    });

    socket.on('recipeDeleted', (deletedRecipeId: number) => {
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.recipeId !== deletedRecipeId)
      );
    });

    return () => {
      socket.off('recipeAdded');
      socket.off('recipeUpdated');
      socket.off('recipeDeleted');
    };
  }, []);

  if (loading) {
    return <CesniLoader />;
  }

  return (
    <>
      <HeroSection />
      
      <Container maw={{ base: '100%', lg: '80%' }} p={20}>
        <Fieldset legend='Newest Recipes' mt={20} mb={50} radius='md' p={10} pt={30}>
          {error && <div>{error}</div>}
          <RecipeCard recipes={recipes} />
          <Group mt={50} justify='end'>
            <Pagination
              size='lg'
              total={totalPages}
              value={currentPage}
              onChange={setCurrentPage}
              color="#ff3131"
              withEdges
            />
          </Group>
        </Fieldset>
      </Container>
    </>
  );
};

export default Recipes;
