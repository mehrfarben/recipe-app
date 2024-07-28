import { useState } from 'react';
import { registerUser } from '../api/index';
import { TextInput, PasswordInput, Button, Container } from '@mantine/core';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const { data } = await registerUser(formData);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container w="25%">
        <form onSubmit={handleSubmit}>
                <TextInput
                    label="Email"
                    placeholder="youremail@example.com"
                    required
                    mt="md"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
            </Container>
    );
};

export default Register;
