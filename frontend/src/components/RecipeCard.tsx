import { Card, Image, Text, Button, Group, ActionIcon, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconHeart } from '@tabler/icons-react';
import food from '../data/data.json'

function RecipeCard() {

  

  return (
    <Group ml="xl">

      {food.food.map((item) => (
    <Card key={item.id} shadow="sm" padding="md" m="sm" radius="md" w={300} h={400} withBorder>
      <Card.Section>
        <Image
          src={item.img}
          height={160}
          alt="Yemek"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{item.name}</Text>
      </Group>

    <Text
      style={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        WebkitLineClamp: 5,
        height: '210px',
        width: '100%',
      }}
      size='sm'
      c={"dimmed"}
    >
      {item.desc}
    </Text>
    

    <Flex w="100%" h={150} align="flex-end" justify="space-between">

      <Link to={`/recipe/${item.id}`}>
        <Button color="blue" radius="md" w="200px" m={5}>
        See full recipe
        </Button>
      </Link>

      <ActionIcon color='red' size={35} variant="outline" m={5}>
        <IconHeart/>
      </ActionIcon>

      </Flex>
    </Card>
    ))}
    
    </Group>
  );
}

export default RecipeCard