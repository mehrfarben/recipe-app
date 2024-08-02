import { AppShell, Group, Button, Flex, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link} from 'react-router-dom';
import { IconUserCircle, IconHeart, IconHome2 } from '@tabler/icons-react';
import  Router  from '../../utils/Router';
import { Login } from '../Molecules/Login';
import Header from '../Molecules/Header';

function Home() {
  const [opened, { toggle }] = useDisclosure();


  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ width: 300, breakpoint: 'md', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header >
        <Flex align='center' h='100%'>
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="md" ml={25} />
        <Header/>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar bg='#f2f2f2' p="md" hiddenFrom='md'>
        <Link to="/">
        <Button leftSection={<IconHome2 size={30} />} justify="start" variant="subtle" color="rgba(128, 128, 128, 1)" size="md" w={"50%"} mt={"md"}>Home</Button>
        </Link>
        <Link to="/profile">
        <Button leftSection={<IconUserCircle size={30} />} justify="start" variant="subtle" color="rgba(128, 128, 128, 1)" size="md" w={"50%"} mt={"md"}>Profile</Button>
        </Link>
        <Link to="/favorites">
        <Button leftSection={<IconHeart size={30} />} justify="start" variant="subtle" color="rgba(128, 128, 128, 1)" size="md" w={"50%"} mt={"md"}>Favorites</Button>
        </Link>
        <Group pos="absolute" bottom={40} left={30}>
          <Login />
        </Group>
      </AppShell.Navbar>

      <AppShell.Main>
        <Router/>
      </AppShell.Main>
      
    </AppShell>
  );
}

export default Home