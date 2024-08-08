import { useState, useEffect } from 'react';
import { Container, Pagination, Group, Loader, Flex, Fieldset } from '@mantine/core';
import { fetchRecipes } from '../../api/index';
import { RecipeType } from '../../api/index';
import RecipeCard from '../Molecules/RecipeCard';
import HeroSection from '../Molecules/HeroSection';

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

  if (loading) {
    return <Flex w='100%' h='100vh' justify='center' align='center'><Loader color='primary'/></Flex>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <HeroSection/>
    <Container maw={{ base: '100%', lg: '80%' }} p={0}>
    <Fieldset legend='Newest Recipes' mt={20} mb={50} radius='md' p={10} pt={30}>
      <RecipeCard recipes={recipes} />
      <Group my={30} justify='end'>
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
