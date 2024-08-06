import { AppShell, Group, Button, Flex, Burger, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUserCircle, IconHome2, IconLibraryPlus } from '@tabler/icons-react';
import  Router  from '../../utils/Router';
import { Login } from '../Molecules/Login';
import Header from '../Molecules/Header';
import Logo from "../../assets/logotexticon.png"
import DefaultLink from '../Atoms/DefaultLink';

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
        <Flex w='80%' justify='center' hiddenFrom='md'>
        <Image h={60} src={Logo} alt="logo" />
        </Flex>
        <Header/>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md" hiddenFrom='md'>

        <Button onClick={toggle} leftSection={<IconHome2 size={30} />} justify="start" variant="subtle" color="#e00000" size="md" w={"50%"} mt={"md"}><DefaultLink to="/">Home</DefaultLink></Button>
        
        <Button onClick={toggle} leftSection={<IconUserCircle size={30} />} justify="start" variant="subtle" color="#e00000" size="md" w={"50%"} mt={"md"}><DefaultLink to="/profile">Profile</DefaultLink></Button>

        <Button onClick={toggle} leftSection={<IconLibraryPlus size={30} />} justify="start" variant="subtle" color="#e00000" size="md" w={"50%"} mt={"md"}><DefaultLink to="/addrecipe">Add Recipe</DefaultLink></Button>
        
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