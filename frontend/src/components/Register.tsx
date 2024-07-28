import { useState } from 'react';
import { registerUser } from '../api';

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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
