import { Link } from "react-router-dom";
import { Button, Flex, Image, Group } from "@mantine/core";
import { IconUserCircle,  IconLibraryPlus } from "@tabler/icons-react";
import DarkModeButton from "../Atoms/DarkModeButton";
import Logo from "../../assets/logotexticon.svg";
import LogoWhite from "../../assets/logotexticonwhite.svg";
import { Login } from "./Login";

const Header = () => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const username = userData.username;



  return (
    <Flex visibleFrom="md" align='center' w='100%' justify='space-around'>
      <Link to="/">
        <Image darkHidden h={50} p={0} m={0} src={Logo} alt="logo" />
        <Image lightHidden h={50} p={0} m={0} src={LogoWhite} alt="logo" />
      </Link>
      <Group>
<DarkModeButton/>
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
