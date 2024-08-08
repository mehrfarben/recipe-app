import { useState, useEffect } from 'react';
import { fetchRecipes } from '../../api/index';
import { useLocation } from 'react-router-dom';
import RecipeCard from '../Molecules/RecipeCard';
import { Pagination, Text, SimpleGrid, Flex, Group, Title, Container, Card, Image } from '@mantine/core';
import SearchBar from '../Atoms/SearchBar';
import Panel from '../../assets/searchpanel.png';

const SearchPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('query') || '';

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetchRecipes(page, 12, '', searchTerm);
        setRecipes(response.data.recipes);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    getRecipes(currentPage);
  }, [searchTerm, currentPage]);

  return (

    <Container maw={{ base: '100%', lg: '80%' }} p={0}>
    <Card radius='lg' p={20}>
    <Card className='search-card' mt={10} mb={25} shadow="xl" withBorder radius="lg" h={{base:'20vh', xl:"30vh"}}>
          
          <Flex w='100%' h='100%' justify='center' direction='column' mb={30}>
          <Text ta='center' ff='Monarcha' c='#181818' fw={600} size='35px' mt={30} h='50%'>What are you looking for?</Text>
          <SearchBar w='60%'/>
          </Flex>

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
