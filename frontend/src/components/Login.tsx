import { Modal, TextInput, PasswordInput, Button, Text, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from '../api/index';

export const Login = ({ opened, close }
    : { opened: boolean, open: () => void, close: () => void }
) => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const { data } = await loginUser(formData);
            localStorage.setItem('token', data.token);
            console.log(data);
            close();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal opened={opened} onClose={close} title="Login" yOffset="25vh" transitionProps={{ transition: 'slide-up', duration: 250, timingFunction: 'ease-in-out' }}>
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Username"
                    placeholder="Your username"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
            </form>
        </Modal>
    );
};
