import { useState } from 'react';
import { registerUser } from '../api/index';
import { TextInput, PasswordInput, Button, Container, Text } from '@mantine/core';

const Register = () => {
    const [formData, setFormData] = useState({ email: '', username: '', password: '' });
    const [registerMessage, setRegisterMessage] = useState("");

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const { data } = await registerUser(formData);
            setRegisterMessage("Successfully registered. Please sign in.");
        } catch (error) {
            console.error(error);
            setRegisterMessage("Something went wrong. Please try again.");
        }
        finally {
            setFormData({ email: '', username: '', password: '' });
        }
    };

    return (
        <Container w="35%">
        <form onSubmit={handleSubmit}>
                <TextInput
                    label="Email"
                    type='email'
                    placeholder="youremail@example.com"
                    required
                    mt="md"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <TextInput
                    label="Username"
                    placeholder="Your username"
                    required
                    mt="md"
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
                <Button mt="md" type="submit">Register</Button>   
            </form>
            <Text mt={10}>{registerMessage}</Text>
            </Container>
    );
};

export default Register;
