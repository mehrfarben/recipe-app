import { useEffect, useState } from 'react';
import { UserCredentials } from '../../api';
import { Text, Flex, Card, Tabs } from '@mantine/core';
import Favorites from '../Molecules/Favorites';
import YourRecipes from '../Molecules/YourRecipes';
import NotSignedIn from './NotSignedIn';
import { IconHeart, IconReceipt } from '@tabler/icons-react';

const Profile = () => {
    const [userData, setUserData] = useState<UserCredentials | null>(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    return (
        <>
        {userData ? (
            <Flex justify="center" align="center">
                <Card p={{ base: 15, md: 50 }} w={{ base: '100%', md: '80%' }} shadow="sm">
                    <Text>Welcome, {userData.username}</Text>
                    <Text>Email: {userData.email}</Text>
                        <Tabs color="primary" defaultValue="favorites">
                            <Tabs.List>
                                <Tabs.Tab value="favorites" leftSection={<IconHeart />}>
                                Favorites
                                </Tabs.Tab>
                                <Tabs.Tab value="yourrecipes" leftSection={<IconReceipt />}>
                                Your Recipes
                                </Tabs.Tab>
                            </Tabs.List>

                            <Tabs.Panel value='favorites'>
                                <Favorites />
                            </Tabs.Panel>
                            <Tabs.Panel value='yourrecipes'>
                                <YourRecipes />
                            </Tabs.Panel>
                        </Tabs>
                    </Card>
                </Flex>
            ) : (
                <NotSignedIn />
            )}
        </>
    );
};

export default Profile;
