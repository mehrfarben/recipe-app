import { useState } from 'react';
import { registerUser } from '../../api/index';
import { TextInput, PasswordInput, Flex, Fieldset, Text} from '@mantine/core';
import Button from '../Atoms/CustomButton/CustomButton'
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ email: '', username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const { data } = await registerUser(formData);
            notifications.show({ title: 'Success', message: 'You have successfully signed up. Redirecting to the home page', color: 'green', loading: true});
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error(error);
            notifications.show({ title: 'Error', message: 'Something went wrong. Please try again.', color: '#ff3131' });
        }
        finally {
            setFormData({ email: '', username: '', password: '' });
        }
    };

    return (
        <Flex mih='80vh' mt={50} align="start" justify="center">
        <Fieldset w={{base:'90%' ,md:"35%"}}>
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
                <Flex justify='end'>
                <Button mt="md" onClick={handleSubmit}>Sign Up</Button>   
                </Flex>
           </Fieldset>
           </Flex>
    );
};

export default Register;
