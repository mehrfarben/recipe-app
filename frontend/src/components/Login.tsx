import { Modal, TextInput, PasswordInput, Button, Text, Flex } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loginUser } from '../api/index';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout } from '@tabler/icons-react';
import { UserCredentials } from '../api/index';

export const Login = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [userData, setUserData] = useState<UserCredentials | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const[loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const { data } = await loginUser(formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));
            setUserData(data.user);
            setIsLoggedIn(true);
            navigate('/');
            setFormData({ identifier: '', password: '' });
            close();
            setLoginMessage('');
        } 
        catch (error) {
            console.error(error);
            setLoginMessage('Something went wrong. Please try again.');
        }
        finally {
            setLoginMessage('');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setUserData(null);
        setIsLoggedIn(false);
    };

    return (
        <>
            {!isLoggedIn && <Button px={50} onClick={open}>Sign In</Button>}
            {isLoggedIn && (
                <Flex gap={15} direction='column' align="center">
                    <Text fw={500} size='sm'>Welcome, {userData?.username || 'User'}.</Text>
                    <Button leftSection={<IconLogout/>} variant='subtle' color='#808080' onClick={handleLogout}>
                    Logout
                    </Button>
                </Flex>
            )}
            <Modal
                opened={opened}
                onClose={close}
                title="Login"
                yOffset="25vh"
                transitionProps={{ transition: 'slide-up', duration: 250, timingFunction: 'ease-in-out' }}
            >
                <form onSubmit={handleLogin}>
                    <TextInput
                        label="Username or Email"
                        placeholder="Your username or email"
                        required
                        value={formData.identifier}
                        onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        required
                        mt="md"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Flex mt={24} justify="space-between" align="center">
                        
                        <Button type="submit">Login</Button>
                        

                        <Link style={{ textDecoration: 'none', color: 'inherit' }} onClick={close} to="/register">
                            <Text size="sm">
                                Don't have an account? Click here to register.
                            </Text>
                        </Link>
                        
                    </Flex>
                    <Text ta="center" mt={10} size='sm' c='red'>{loginMessage}</Text>
                </form>
            </Modal>
        </>
    );
};
