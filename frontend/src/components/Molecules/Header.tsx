import { Link } from "react-router-dom"
import { Button, Flex, Image, Group } from "@mantine/core"
import { IconUserCircle} from "@tabler/icons-react"
import Logo from "../../assets/logotexticon.png"
import { Login } from "./Login"

const Header = () => {
  return (
    <Flex visibleFrom="md" align='center' w='100%' justify='space-around'>
    <Link to="/">
        <Image h={60} p={0} m={0} src={Logo} alt="logo" />
    </Link>
    <Group>
    <Link to="/profile">
        <Button leftSection={<IconUserCircle size={30} />} justify="start" variant="subtle" color="#e00000" size="md" w={"100%"}>Profile</Button>
    </Link>
    <Login/>
    </Group>
    </Flex>
  )
}

export default Header