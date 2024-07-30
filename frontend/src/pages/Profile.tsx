import { useEffect, useState } from 'react';
import { UserCredentials } from '../api';

const Profile = () => {
    const [userData, setUserData] = useState<UserCredentials[]>(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    if (!userData) {
        return <div>Please Log in or Sign up</div>;
    }

    return (
        <div>
            <h1>Welcome, {userData.username}</h1>
            <p>Email: {userData.email}</p>
        </div>
    );
};

export default Profile;
