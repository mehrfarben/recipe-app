import { Modal, TextInput, PasswordInput, Text, Flex } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loginUser, UserCredentials } from '../../api/index';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import Button from '../Atoms/CustomButton/CustomButton';
import { useAtom } from 'jotai'
import { isLoggedInAtom } from '../../Atoms';

export const Login = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [userData, setUserData] = useState<UserCredentials | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            setIsLoggedIn(true);
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
            setFormData({ identifier: '', password: '' });
            navigate('/');
            close();
            setLoginMessage('');
            window.location.reload();
        } catch (error) {
            console.error(error);
            setLoginMessage('Something went wrong. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setUserData(null);
        setIsLoggedIn(false);
        window.location.reload();
    };

    return (
        <>
            {!isLoggedIn && <Button onClick={open}>Sign In</Button>}
            {isLoggedIn && (
                <Flex gap={10} direction='column' align="center">
                    <Button leftSection={<IconLogout size={25} />} variant='subtle' onClick={handleLogout}>
                        Sign Out
                    </Button>
                </Flex>
            )}
            <Modal
                opened={opened}
                onClose={close}
                title="Sign In"
                yOffset="25vh"
                transitionProps={{ transition: 'slide-up', duration: 250, timingFunction: 'ease-in-out' }}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                  }}
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
                    <Flex mt={24} justify="space-between" align="center" direction={{base: 'column', md: 'row'}}>
                        <Button type="submit" w={{base:'50%', md:'30%'}}>Sign In</Button>
                        <Link onClick={close} to="/register">
                            <Text size="xs" mt={{base:30, md:0}}>
                                Don't have an account? Click here to sign up.
                            </Text>
                        </Link>
                    </Flex>
                    <Text ta="center" mt={10} size='sm' c='red'>{loginMessage}</Text>
                </form>
            </Modal>
        </>
    );
};
