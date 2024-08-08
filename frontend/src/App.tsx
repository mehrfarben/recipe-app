import { AppShell, Button, Flex, Burger, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUserCircle, IconHome2, IconLibraryPlus } from '@tabler/icons-react';
import  Router  from './utils/Router';
import { Login } from './components/Molecules/Login';
import Header from './components/Molecules/Header';
import Logo from "./assets/logotexticon.svg"
import LogoWhite from "./assets/logotexticonwhite.svg";
import DefaultLink from './components/Atoms/DefaultLink';
import DarkModeButton from './components/Atoms/DarkModeButton';
import { Link } from 'react-router-dom';
import { Footer } from './components/Molecules/Footer';

function Home() {
  const [opened, { toggle }] = useDisclosure();


  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{ width: 400, breakpoint: 'md', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header >
        <Flex align='center' h='100%'>
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="md" ml={25} />
        <Flex w='80%' justify='center' hiddenFrom='md'>
          <Link to="/">
        <Image darkHidden w={160} src={Logo} alt="logo" />
        <Image lightHidden w={160} src={LogoWhite} alt="logo" />
        </Link>
        </Flex>
        <Header/>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md" hiddenFrom='md'>

        <Button onClick={toggle} leftSection={<IconHome2 size={30} />} justify="start" variant="subtle" color="primary" size="md" w={"60%"} mt={"md"}><DefaultLink to="/">Home</DefaultLink></Button>
        
        <Button onClick={toggle} leftSection={<IconUserCircle size={30} />} justify="start" variant="subtle" color="primary" size="md" w={"60%"} mt={"md"}><DefaultLink to="/profile">Profile</DefaultLink></Button>

        <Button onClick={toggle} leftSection={<IconLibraryPlus size={30} />} justify="start" variant="subtle" color="primary" size="md" w={"60%"} mt={"md"}><DefaultLink to="/addrecipe">Add Recipe</DefaultLink></Button>
        
        <Flex gap={40} h='100%' justify='space-around' align='end' mb={10}>
          <Login />
          <DarkModeButton/>
          </Flex>
      </AppShell.Navbar>

      <AppShell.Main>
        <Router/>
        <Footer/>
      </AppShell.Main>
      
    </AppShell>
  );
}

export default Home