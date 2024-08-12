import { useState, useEffect } from 'react';
import { fetchRecipes } from '../../api/index';
import { useLocation } from 'react-router-dom';
import RecipeCard from '../Molecules/RecipeCard';
import { Pagination, Text, Flex, Group, Title, Container, Card, BackgroundImage } from '@mantine/core';
import SearchBar from '../Atoms/SearchBar/SearchBar';
import CesniLoader from '../Atoms/CesniLoader';
import SearchPanel from '../../assets/searchpanel.png'

const SearchPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('query') || '';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetchRecipes(page, 12, '', searchTerm);
        setRecipes(response.data.recipes);
        setTotalPages(response.data.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    getRecipes();
  }, [searchTerm, currentPage]);


  if (isLoading) {
    return <CesniLoader />;
  }

  return (

    <Container maw={{ base: '100%', lg: '80%' }} p={0}>
    <Card radius='lg' p={20}>
    <Card mt={10} mb={25} p={0} shadow="xl" withBorder radius="lg" h={{base:'20vh', xl:"30vh"}}>
      <BackgroundImage h='100%' src={SearchPanel}>
          
          <Flex w='100%' h='100%' justify='center' direction='column' mb={30}>
          <Text ta='center' ff='Monarcha' c='#181818' fw={600} size='35px' mt={30} h='50%'>What are you looking for?</Text>
          <SearchBar w='60%' />
          </Flex>

          </BackgroundImage>
      </Card>
    <Title p={25} fw={500} ff='Monarcha'>Search results for "{searchTerm}"</Title>
    
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
      </Card>
    </Container>
  );
};

export default SearchPage;
