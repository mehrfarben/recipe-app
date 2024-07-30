import { useState, useEffect } from 'react';
import { createRecipe } from '../api/index';
import { Modal, TextInput, Button, Textarea, } from '@mantine/core';

export const AddRecipe = ({ opened, close }
    : { opened: boolean, open: () => void, close: () => void }
) => {
    const [formData, setFormData] = useState({ image: '', name: '', description: '', preptime: '', prep: '', ingredients: '', author: '' });
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    useEffect(() => {
        if (userData) {
            setFormData((prevData) => ({ ...prevData, author: userData.username }));
        }
    }, [userData]);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const { data } = await createRecipe(formData);
            close();
        } catch (error) {
            console.error(error);
        } finally {
            setFormData({ image: '', name: '', description: '', preptime: '', prep: '', ingredients: '', author: userData?.username || '' });
        }
    };

    return (
        <Modal size="lg" opened={opened} onClose={close} title="Add New Recipe" centered transitionProps={{ transition: 'slide-up', duration: 250, timingFunction: 'ease-in-out' }}>
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Name"
                    mb="md"
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <TextInput
                    label="Image"
                    mb="md"
                    type="text"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
                <TextInput
                    label="Preparation Time"
                    mb="md"
                    placeholder="1hr 30min"
                    value={formData.preptime}
                    onChange={(e) => setFormData({ ...formData, preptime: e.target.value })}
                />
                <Textarea
                    label="Description"
                    mb="md"
                    autosize
                    minRows={5}
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <Textarea
                    label="Preparation"
                    mb="md"
                    autosize
                    minRows={5}
                    placeholder="Add preparation steps"
                    value={formData.prep}
                    onChange={(e) => setFormData({ ...formData, prep: e.target.value })}
                />
                <TextInput
                    label="Ingredients"
                    mb="md"
                    placeholder="2 Eggs, 1/2 cup sugar, 1/2 cup flour..."
                    value={formData.ingredients}
                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                />
                <Button mt="md" type="submit">Add Recipe</Button>
            </form>
        </Modal>
    );
};
