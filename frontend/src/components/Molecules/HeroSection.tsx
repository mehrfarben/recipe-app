import { Flex, Image, Card, SimpleGrid, Text } from "@mantine/core";
import Bowl from '../../assets/bowl.png';
import SearchBar from "../Atoms/SearchBar";

const HeroSection = () => {
  return (
    <Flex justify="center">
      <Card mt={10} withBorder bg="secondary" radius="lg" w="80%" h={{base:'50vh', xl:"70vh"}}>
        <SimpleGrid h='75%' cols={2}>
          <Flex ml={50} mb={125} justify='center' direction='column'>
          <Text c='#101E13' size="8.5vh" fw={700}>Taste the World</Text>
          <Text c='#101E13' ml={10} mt={15} fs='italic' size="3vh" fw={300}>from the comfort of your home</Text>
          </Flex>

          <Flex h='100%' justify='center'>
          <Image src={Bowl}></Image>
          </Flex>
        </SimpleGrid>

    <SearchBar/>
      </Card>
    </Flex>
  );
};

export default HeroSection;
