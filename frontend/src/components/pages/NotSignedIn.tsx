import { Button, Flex, Group, Text } from "@mantine/core"
import { Login } from "../Molecules/Login"
import { Link } from "react-router-dom"

const NotSignedIn = () => {
    return ( 
        <Flex direction="column" justify="center" align="center" h="80vh">
            <Text size='xl' fw={400}>You are not signed in. Please sign in or sign up.</Text>
            <Group mt={20}>
                <Login/>
                <Link to="/register">
                <Button bg='#FF9505' px={50}>Sign Up</Button>
                </Link>
                
            </Group>
            
        </Flex>
        )
}

export default NotSignedIn