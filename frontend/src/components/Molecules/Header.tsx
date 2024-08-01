import { Link } from "react-router-dom"
import { Button, Flex, Image, Group } from "@mantine/core"
import { IconUserCircle, IconHeart } from "@tabler/icons-react"
import Logo from "../../assets/logotext.png"

const Header = () => {
  return (
    <Flex align='center' w='100%' justify='space-around'>
    <Link to="/">
        <Image h={50} p={0} m={0} src={Logo} alt="logo" />
    </Link>
    <Group>
    <Link to="/profile">
        <Button leftSection={<IconUserCircle size={30} />} justify="start" variant="subtle" color="#e00000" size="md" w={"100%"}>Profile</Button>
    </Link>
    <Link to="/favorites">
        <Button leftSection={<IconHeart size={30} />} justify="start" variant="subtle" color="#e00000" size="md" w={"100%"}>Favorites</Button>
    </Link>
    </Group>
    </Flex>
  )
}

export default Header