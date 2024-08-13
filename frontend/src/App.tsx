import { AppShell, Button, Flex, Burger, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUserCircle, IconHome2, IconLibraryPlus } from '@tabler/icons-react';
import  Router  from './utils/Router';
import { Login } from './components/Molecules/Login';
import Header from './components/Molecules/Header';
import Logo from "./assets/logotexticon.svg"
import LogoWhite from "./assets/logotexticonwhite.svg";
import DarkModeButton from './components/Atoms/DarkModeButton';
import { Link } from 'react-router-dom';
import { Footer } from './components/Molecules/Footer';

function Home() {
  const [opened, { toggle }] = useDisclosure();


  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ width: 400, breakpoint: 'md', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header >
        <Flex align='center' h='100%' w='100%'>
          <Flex>
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="md" ml={25} />
        </Flex>
        <Flex w='85%' justify='center' hiddenFrom='md'>
          <Link to="/">
        <Image darkHidden w={110} src={Logo} alt="logo" />
        <Image lightHidden w={110} src={LogoWhite} alt="logo" />
        </Link>
        </Flex>
        <Header/>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md" hiddenFrom='md'>

      <Link onClick={toggle} to="/"><Button leftSection={<IconHome2 size={30} />} justify="start" variant="subtle" color="#ff3131" size="md" w={"60%"} mt={"md"}>Home</Button></Link>
        
      <Link onClick={toggle} to="/profile"><Button leftSection={<IconUserCircle size={30} />} justify="start" variant="subtle" color="#ff3131" size="md" w={"60%"} mt={"md"}>Profile</Button></Link>

      <Link onClick={toggle} to="/addrecipe"><Button leftSection={<IconLibraryPlus size={30} />} justify="start" variant="subtle" color="#ff3131" size="md" w={"60%"} mt={"md"}>Add Recipe</Button></Link>
        
        <Flex gap={40} h='100%' justify='space-around' align='end' mb={10}>
          <Login />
          <DarkModeButton/>
          </Flex>
      </AppShell.Navbar>

      <AppShell.Main pb={0} px={0}>
        <Router/>
        <Footer/>
      </AppShell.Main>
      
    </AppShell>
  );
}

export default Home