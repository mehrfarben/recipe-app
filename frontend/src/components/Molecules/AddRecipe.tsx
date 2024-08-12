import { useState, useEffect } from 'react';
import { createRecipe, updateRecipe } from '../../api/index';
import { Flex, TagsInput, ActionIcon, Text, Title, Paper } from '@mantine/core';
import { IconTrash, IconCheck } from '@tabler/icons-react';
import Button from '../Atoms/CustomButton/CustomButton';
import CategoriesDropdown from '../Atoms/CategoriesDropdown';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomTextArea from '../Atoms/CustomTextArea/CustomTextArea';

interface FormData {
  recipeId: number | null;
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
  const navigate = useNavigate();
  const location = useLocation();
  const editingRecipe = location.state?.recipe as FormData | null;

  const [formData, setFormData] = useState<FormData>({
    recipeId: editingRecipe?.recipeId || null,
    image: editingRecipe?.image || '',
    name: editingRecipe?.name || '',
    description: editingRecipe?.description || '',
    preptime: editingRecipe?.preptime || '',
    prep: editingRecipe?.prep || [''],
    ingredients: editingRecipe?.ingredients || [],
    category: editingRecipe?.category || '',
    serving: editingRecipe?.serving || '',
    author: editingRecipe?.author || ''
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

  const handleCategorySelect = (selectedCategory: string) => {
    setFormData(prevData => ({ ...prevData, category: selectedCategory }));
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.ingredients.some(ingredient => ingredient === '') || formData.prep.some(step => step === '')) {
      setError('Please fill in all ingredients and steps.');
      return;
    }
    try {
      if (formData.recipeId) {
        await updateRecipe(formData.recipeId, formData);
      } else {
        const newRecipeId = Math.floor(Math.random() * 1000000) + 1;
        const updatedFormData = { ...formData, recipeId: newRecipeId };
        await createRecipe(updatedFormData);
      }
      navigate('/');
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setError('A recipe with this name already exists. Please choose a different name.');
      } else {
        setError('An error occurred. Please try again.');
      }
      console.error(error);
    } finally {
      resetForm();
    }
  };

  const resetForm = () => {
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex justify='center' w='100%'>
        <Paper withBorder w={{base: '100%',md:'50%'}} shadow='sm' p='md' radius='md'>

          <Title order={2} mb={20}>
            {formData.recipeId ? 'Edit Recipe' : 'Add New Recipe'}
          </Title>
          
          <CustomTextArea
            label='Recipe Image URL'
            placeholder='Enter image URL'
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />

          <CustomTextArea
            label='Recipe Name'
            placeholder='Enter recipe name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <CustomTextArea
            label='Recipe Description'
            placeholder='Enter recipe description'
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <CustomTextArea
            label='Preparation Time'
            placeholder='e.g. 30 minutes'
            value={formData.preptime}
            onChange={(e) => setFormData({ ...formData, preptime: e.target.value })}
          />

          <TagsInput
          mt={30}
          c='#dd3131'
            value={formData.ingredients}
            onChange={handleIngredientsChange}
            placeholder='Please separate ingredients with commas'
            label='Ingredients'
          />

          <Text c='#dd3131' mt={30} fw={500} size='sm'>Category</Text>
          <CategoriesDropdown
            onCategorySelect={handleCategorySelect}
          />

          <CustomTextArea
            label='Serving Size'
            placeholder='e.g. 2-4 people'
            value={formData.serving}
            onChange={(e) => setFormData({ ...formData, serving: e.target.value })}

          />

          <Text c='#dd3131' mt={20} fw={500} size='sm'>Preparation Steps</Text>
          {formData.prep.map((step, index) => (
            <Flex key={index} align='center'>
              <CustomTextArea
                w='100%'
                minRows={2}
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
                required
              />
              {index > 0 && (
                <ActionIcon variant='subtle' mx={5} color='#ff3131' onClick={() => handleRemoveStep(index)}>
                  <IconTrash size={16} />
                </ActionIcon>
              )}
            </Flex>
          ))}
            <Button mt={10} variant='outline' w='20%' onClick={handleAddStep}>
              Add Another Step
            </Button>

            <Flex w='100%' justify='end' mt={50}>
            <Button rightSection={<IconCheck />} type='submit'>{formData.recipeId ? 'Update Recipe' : 'Add Recipe'}</Button>
            </Flex>

          {error && <Text c='red'>{error}</Text>}
        </Paper>
      </Flex>
    </form>
  );
};
