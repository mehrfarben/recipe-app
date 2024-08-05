import { useEffect, useState } from 'react';
import { UserCredentials } from '../../api';
import { Text, Flex, Group, Button, Card } from '@mantine/core';
import { Login } from '../Molecules/Login';
import { Link } from 'react-router-dom';
import Favorites from '../Molecules/Favorites';
import YourRecipes from '../Molecules/YourRecipes';

const Profile = () => {
    const [userData, setUserData] = useState<UserCredentials[] | null>(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    if (!userData) {
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

    return (
        <Flex  justify='center' align='center'>
            <Card p={50} w='70%' shadow='sm'>
            <Text>Welcome, {userData.username}</Text>
            <Text>Email: {userData.email}</Text>
            <Favorites/>
            <YourRecipes/>
            </Card>      
        </Flex>
    );
};

export default Profile;
