import { useState } from 'react';
import { registerUser } from '../../api/index';
import { TextInput, PasswordInput, Button, Flex, Fieldset, Text} from '@mantine/core';

const Register = () => {
    const [formData, setFormData] = useState({ email: '', username: '', password: '' });
    const [loginMessage, setLoginMessage] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const { data } = await registerUser(formData);
            setLoginMessage('You have successfully signed up. Please sign in.');
        } catch (error) {
            console.error(error);
            setLoginMessage('Something went wrong. Please try again.');
        }
        finally {
            setFormData({ email: '', username: '', password: '' });
        }
    };

    return (
        <Flex h='75vh' mt={50} align="start" justify="center">
        <Fieldset w="35%">
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
                <Button bg='primary' mt="md" onClick={handleSubmit}>Sign Up</Button>   
                <Text mt="md">{loginMessage}</Text>
           </Fieldset>
           </Flex>
    );
};

export default Register;
