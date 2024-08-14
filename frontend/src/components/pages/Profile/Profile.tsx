import { useEffect, useState } from 'react';
import { fetchFavoriteRecipes } from '../../../api';
import { Flex, Card, Tabs, Avatar, Stack, Box, Loader } from '@mantine/core';
import Favorites from '../../Molecules/Favorites';
import YourRecipes from '../../Molecules/YourRecipes';
import NotSignedIn from '../NotSignedIn';
import { IconHeart, IconReceipt } from '@tabler/icons-react';
import classes from './Profile.module.css';

const Profile = () => {
    const [profileData, setProfileData] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const username = userData.username || null;
    
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetchFavoriteRecipes(username);
                setProfileData(response.data);
                
            } catch (error) {
                console.error('Error fetching favorite recipes', error);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchFavorites();
        } else {
            setLoading(false);
        }
    }, [username]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
        {userData ? (
            <Flex mih='85vh' justify="center" align="start">
                <Card mb={50} p={{ base: 15, md: 50 }} w={{ base: '100%', md: '85%' }}>

                    <Box py={20} pl={20}>
                        <Flex align='center' direction={{ base: 'column', md: 'row' }}>
                            <Avatar size={150} />
                            <Stack ml={{base: 0, md:20}} mt={20} gap={5}>
                                <p className={classes.credentials}>Username: <span className={classes.credentialsText}>{userData.username}</span></p>
                                <p className={classes.credentials}>Email: <span className={classes.credentialsText}>{userData.email}</span></p>
                            </Stack>
                        </Flex>
                    </Box>

                    <Tabs mt={20} color="#ff3131" defaultValue="favorites">
                        <Tabs.List>
                            <Tabs.Tab value="favorites" leftSection={<IconHeart />}>
                                Favorites
                            </Tabs.Tab>
                            <Tabs.Tab value="yourrecipes" leftSection={<IconReceipt />}>
                                Your Recipes
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value='favorites'>
                            <Favorites profileData={profileData} username={username} />
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
