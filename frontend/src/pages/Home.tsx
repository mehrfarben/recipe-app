import { AppShell, Burger, Group, Text, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link} from 'react-router-dom';
import { IconUserCircle, IconHeart, IconHome2 } from '@tabler/icons-react';
import  Router  from '../utils/Router';

function Home() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <Link to="/">
          <Text c="black"  size="xl" fw={800}>Recipe App</Text>
          </Link>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Link to="/">
        <Button leftSection={<IconHome2 size={30} />} justify="start" variant="subtle" color="rgba(128, 128, 128, 1)" size="md" w={"100%"} mt={"md"}>Home</Button>
        </Link>

        <Link to="/profile">
        <Button leftSection={<IconUserCircle size={30} />} justify="start" variant="subtle" color="rgba(128, 128, 128, 1)" size="md" w={"100%"} mt={"md"}>Profile</Button>
        </Link>

        <Link to="/favorites">
        <Button leftSection={<IconHeart size={30} />} justify="start" variant="subtle" color="rgba(128, 128, 128, 1)" size="md" w={"100%"} mt={"md"}>Favorites</Button>
        </Link>
      </AppShell.Navbar>

      <AppShell.Main>

        <Router/>

      </AppShell.Main>
    </AppShell>
  );
}

export default Home