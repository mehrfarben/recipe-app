import { useEffect, useState } from 'react';
import { UserCredentials } from '../../api';
import { Text, Flex, Group, Button } from '@mantine/core';
import { Login } from '../Molecules/Login';
import { Link } from 'react-router-dom';

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
            <Text size='xl' fw={600}>You are not signed in. Please sign in or sign up.</Text>
            <Group mt={20}>
                <Login/>
                <Link to="/register">
                <Button bg='#ffba08' px={50}>Sign Up</Button>
                </Link>
                
            </Group>
            
        </Flex>
        )
    }

    return (
        <div>
            <h1>Welcome, {userData.username}</h1>
            <p>Email: {userData.email}</p>
        </div>
    );
};

export default Profile;
