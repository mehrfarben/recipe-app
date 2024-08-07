import { AppShell, Group, Button, Flex, Burger, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUserCircle, IconHome2, IconLibraryPlus } from '@tabler/icons-react';
import  Router  from '../../utils/Router';
import { Login } from '../Molecules/Login';
import Header from '../Molecules/Header';
import Logo from "../../assets/logotexticon.svg"
import LogoWhite from "../../assets/logotexticonwhite.svg";
import DefaultLink from '../Atoms/DefaultLink';
import DarkModeButton from '../Atoms/DarkModeButton';

function Home() {
  const [opened, { toggle }] = useDisclosure();


  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ width: 400, breakpoint: 'md', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header >
        <Flex align='center' h='100%'>
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="md" ml={25} />
        <Flex w='80%' justify='center' hiddenFrom='md'>
        <Image darkHidden h={45} mr={35} src={Logo} alt="logo" />
        <Image lightHidden h={45} mr={35} src={LogoWhite} alt="logo" />
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
      </AppShell.Main>
      
    </AppShell>
  );
}

export default Home