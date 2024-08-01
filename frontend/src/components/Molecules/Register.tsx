import { useState } from 'react';
import { registerUser } from '../../api/index';
import { TextInput, PasswordInput, Button, Flex, Fieldset} from '@mantine/core';

const Register = () => {
    const [formData, setFormData] = useState({ email: '', username: '', password: '' });

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const { data } = await registerUser(formData);

        } catch (error) {
            console.error(error);
        }
        finally {
            setFormData({ email: '', username: '', password: '' });
        }
    };

    return (
        <Flex h='50vh' align="center" justify="center">
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
                <Button mt="md" onClick={handleSubmit}>Register</Button>   
           </Fieldset>
           </Flex>
    );
};

export default Register;
