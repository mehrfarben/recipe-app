import { useState, useEffect } from 'react';
import { createRecipe } from '../../api/index';
import { Modal, TextInput, Button, Textarea, Group, Flex, TagsInput, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

interface AddRecipeProps {
    opened: boolean;
    close: () => void;
}

interface FormData {
    recipeId: number | null;
    image: string;
    name: string;
    description: string;
    preptime: string;
    prep: string[];
    ingredients: string[];
    author: string;
}

export const AddRecipe = ({ opened, close }: AddRecipeProps) => {
    const [formData, setFormData] = useState<FormData>({
        recipeId: null,
        image: '',
        name: '',
        description: '',
        preptime: '',
        prep: [''],
        ingredients: [],
        author: ''
    });
    const [userData, setUserData] = useState<{ username: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    useEffect(() => {
        if (userData) {
            setFormData(prevData => ({ ...prevData, author: userData.username }));
        }
    }, [userData]);

    const handleAddStep = () => {
        if (formData.prep[formData.prep.length - 1] === '') {
            setError('Please fill in the current step before adding a new one.');
            return;
        }
        setFormData(prevData => ({ ...prevData, prep: [...prevData.prep, ''] }));
        setError(null);
    };

    const handleStepChange = (index: number, value: string) => {
        const newSteps = [...formData.prep];
        newSteps[index] = value;
        setFormData(prevData => ({ ...prevData, prep: newSteps }));
    };

    const handleRemoveStep = (index: number) => {
        const newSteps = formData.prep.filter((_, i) => i !== index);
        setFormData(prevData => ({ ...prevData, prep: newSteps }));
    };

    const handleIngredientsChange = (value: string[]) => {
        const filteredValue = value.filter(ingredient => ingredient.trim() !== '');
        setFormData(prevData => ({ ...prevData, ingredients: filteredValue }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.ingredients.some(ingredient => ingredient === '') || formData.prep.some(step => step === '')) {
            setError('Please fill in all ingredients and steps.');
            return;
        }
        try {
            const updatedFormData = {
                ...formData,
                recipeId: Math.floor(Math.random() * 1000000) + 1
            };
            await createRecipe(updatedFormData);
            close();
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                setError('A recipe with this name already exists. Please choose a different name.');
            } else {
                setError('An error occurred. Please try again.');
            }
            console.error(error);
        } finally {
            setFormData({
                recipeId: null,
                image: '',
                name: '',
                description: '',
                preptime: '',
                prep: [''],
                ingredients: [],
                author: userData?.username || ''
            });
        }
    };

    return (
        <Modal size="lg" opened={opened} onClose={close} title="Add New Recipe" centered transitionProps={{ transition: 'slide-up', duration: 250, timingFunction: 'ease-in-out' }}>
            <form onSubmit={handleSubmit}>
                {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
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
                <Flex mb="md" direction="column">
                    <label>Ingredients</label>
                    <TagsInput
                        value={formData.ingredients}
                        onChange={handleIngredientsChange}
                        placeholder="Add ingredients"
                        mt="sm"
                        mb="lg"
                        radius="md"
                    />
                </Flex>
                <Flex mb="md" direction="column">
                    <label>Preparation Steps</label>
                    {formData.prep.map((step, index) => (
                        <Group key={index} mb="sm" align="center">
                            <TextInput
                                placeholder={`Step ${index + 1}`}
                                value={step}
                                onChange={(e) => handleStepChange(index, e.target.value)}
                            />
                            {formData.prep.length > 1 && (
                                <ActionIcon variant='outline' color="red" onClick={() => handleRemoveStep(index)}>
                                    <IconTrash size={16} />
                                </ActionIcon>
                            )}
                        </Group>
                    ))}
                    <Button radius='xl' color='green' w="30%" mt="sm" mb='lg' variant='outline' onClick={handleAddStep}>Add Step</Button>
                </Flex>
                <Button mt="md" w="100%" type="submit">Add Recipe</Button>
            </form>
        </Modal>
    );
};
