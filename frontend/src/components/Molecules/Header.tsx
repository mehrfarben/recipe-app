import { Link } from "react-router-dom";
import { Button, Flex, Image, Group, useMantineColorScheme, ActionIcon, Tooltip } from "@mantine/core";
import { IconUserCircle, IconSunFilled, IconMoonFilled, IconLibraryPlus } from "@tabler/icons-react";
import Logo from "../../assets/logotexticon.png";
import { Login } from "./Login";

const Header = () => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const username = userData.username;

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Flex visibleFrom="md" align='center' w='100%' justify='space-around'>
      <Link to="/">
        <Image h={60} p={0} m={0} src={Logo} alt="logo" />
      </Link>
      <Group>
        <Tooltip closeDelay={200} label="Toggle color scheme">
          <ActionIcon
            variant="subtle"
            color="white"
            onClick={() => toggleColorScheme()}
            size="xl"
          >
            {colorScheme === "dark" ? (
              <IconSunFilled stroke={1.5} />
            ) : (
              <IconMoonFilled color="black" stroke={1.5} />
            )}
          </ActionIcon>
        </Tooltip>
        {username ? (
          <>
            <Link to="/profile">
              <Button leftSection={<IconUserCircle size={30} />} justify="start" variant="outline" color="primary" size="md" w={"100%"}>
                Profile
              </Button>
            </Link>
            <Link to="/addrecipe">
              <Button leftSection={<IconLibraryPlus size={30} />} justify="start" variant="outline" color="primary" size="md" w={"100%"}>
                Add Recipe
              </Button>
            </Link>
            <Login/>
          </>
        ) : (
          <Login />
        )}
      </Group>
    </Flex>
  );
}

export default Header;
