import { useState } from 'react';
import { createRecipe } from '../api/index';
import { Modal, TextInput, Button, Textarea, } from '@mantine/core';

export const AddRecipe = ({ opened, close }
    : { opened: boolean, open: () => void, close: () => void }
) => {
    const [formData, setFormData] = useState({ image: '', name: '', description: '',preptime: '', prep: '', ingredients: '' });
    

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const { data } = await createRecipe(formData);
        } catch (error) {
            console.error(error);
        }
        finally{
            setFormData({ image: '', name: '', description: '',preptime: '', prep: '', ingredients: '' });
        }
    };

    return (
        <Modal size="lg" opened={opened} onClose={close} title="Add New Recipe" centered transitionProps={{ transition: 'slide-up', duration: 250, timingFunction: 'ease-in-out' }}>
        <form onSubmit={handleSubmit}>
            <TextInput
                label="Name"
                size='md'
                mb="md"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextInput
                label="Image"
                size='md'
                mb="md"
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            <TextInput
                label="Preparation Time"
                size='md'
                mb="md"
                placeholder="1hr 30min"
                value={formData.preptime}
                onChange={(e) => setFormData({ ...formData, preptime: e.target.value })}
            />
            <Textarea
                label="Description"
                size='md'
                mb="md"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <Textarea
                label="Preparation"
                size='md'
                mb="md"
                placeholder="Add preparation steps"
                value={formData.prep}
                onChange={(e) => setFormData({ ...formData, prep: e.target.value })}
            />
            <TextInput
                label="Ingredients"
                size='md'
                mb="md"
                placeholder="2 Eggs, 1/2 cup sugar, 1/2 cup flour..."
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
            />
            <Button mt="md" onClick={close} type="submit">Add Recipe</Button>
        </form>
        </Modal>
    );
};
