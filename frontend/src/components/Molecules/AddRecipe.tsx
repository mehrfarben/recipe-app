import { useState, useEffect } from 'react';
import { createRecipe } from '../../api/index';
import { TextInput, Textarea, Group, Flex, TagsInput, ActionIcon, Text, Title, Paper } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import Button from '../Atoms/CustomButton';
import CategoriesDropdown from '../Atoms/CategoriesDropdown';
import { useNavigate } from 'react-router-dom';
import NotSignedIn from '../Pages/NotSignedIn';

interface FormData {
  recipeId: string | null;
  image: string;
  name: string;
  description: string;
  preptime: string;
  prep: string[];
  ingredients: string[];
  category: string;
  serving: string;
  author: string;
}

export const AddRecipe = () => {
  const [formData, setFormData] = useState<FormData>({
    recipeId: null,
    image: '',
    name: '',
    description: '',
    preptime: '',
    prep: [''],
    ingredients: [],
    category: '',
    serving: '',
    author: ''
  });
  const [userData, setUserData] = useState<{ username: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
    const filteredValue = value
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient !== '');
    setFormData(prevData => ({ ...prevData, ingredients: filteredValue }));
  };

  const handleCategorySelect = (category: string) => {
    setFormData(prevData => ({ ...prevData, category: category }));
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
      navigate('/');
      
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
        category: '',
        serving: '',
        author: userData?.username || ''
      });
    }
  };


  return (
    <>
    {userData ? (
    <Flex w='100%' justify='center'>
    <Paper shadow='xl' p={50} w={{base: '100%', md: '50%'}}>
      <Title mb={20} size={40}>Add Recipe</Title>
      <hr />
      <form onSubmit={handleSubmit}>
        <TextInput
        mt={30}
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
        <TextInput
          label="Serving Size"
          mb="md"
          placeholder="For how many people?"
          value={formData.serving}
          onChange={(e) => setFormData({ ...formData, serving: e.target.value })}
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

        <Text size='sm' fw={600} mt='md'>Category</Text>
        <CategoriesDropdown onCategorySelect={handleCategorySelect} />

        <Flex mt='md' mb="md" direction="column">
          <Text size='sm' fw={600}>Ingredients</Text>
          <TagsInput
            value={formData.ingredients}
            onChange={handleIngredientsChange}
            placeholder="Add ingredients"
            mb="lg"
            radius="md"
          />
        </Flex>
        <Flex mb="md" direction="column">
          <Text size='sm' fw={600}>Preparation Steps</Text>
          {formData.prep.map((step, index) => (
            <Group key={index} mb="sm" align="center">
              <Textarea
                w={{ base: '80%', lg: '90%' }}
                minRows={2}
                maxRows={5}
                autosize
                radius="md"
                placeholder={`Step ${index + 1}`}
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
              />
              {formData.prep.length > 1 && (
                <ActionIcon variant='outline' color="red" onClick={() => handleRemoveStep(index)}>
                  <IconTrash size={20} />
                </ActionIcon>
              )}
            </Group>
          ))}
          <Button radius='xl' w={{ base: '60%', lg: '20%' }} mb='lg' color='white' variant='subtle' onClick={handleAddStep}>Add Step</Button>
        </Flex>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <Button mt="md" radius='md' w="100%" h={50} type="submit">Add Recipe</Button>
      </form>
      </Paper>
      </Flex>
        ): (
          <NotSignedIn />
            
        ) }
        </>
  );
};
