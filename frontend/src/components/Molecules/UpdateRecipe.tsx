import { updateRecipe, RecipeType } from '../../api/index';
import { Container, TextInput, Textarea } from '@mantine/core';
import { useState } from 'react';

interface UpdateRecipeProps {
    recipeId: number;
    recipe: RecipeType;
  }

export const UpdateRecipe = ({ recipeId, recipe }: UpdateRecipeProps) => {
    const [updatedRecipe, setUpdatedRecipe] = useState<RecipeType>(recipe);

  const handleSubmit = async () => {
    try {
      await updateRecipe(recipeId, updatedRecipe);
      // Handle successful update, e.g., close the modal, update the UI
    } catch (error) {
      // Handle update error
    }
  };

  return (
    <Container>
      <TextInput
        mt={30}
          label="Name"
          mb="md"
          type="text"
          placeholder="Name"
          value={updatedRecipe.name}
          onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, name: e.target.value })}
        />
        <TextInput
          label="Image"
          mb="md"
          type="text"
          placeholder="Image URL"
          value={updatedRecipe.image}
          onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, image: e.target.value })}
        />
<TextInput
          label="Preparation Time"
          mb="md"
          placeholder="1hr 30min"
          value={updatedRecipe.preptime}
          onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, preptime: e.target.value })}
        />
        <TextInput
          label="Serving Size"
          mb="md"
          placeholder="For how many people?"
          value={updatedRecipe.serving}
          onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, serving: e.target.value })}
        />
        <Textarea
          label="Description"
          mb="md"
          autosize
          minRows={5}
          placeholder="Description"
          value={updatedRecipe.description}
          onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, description: e.target.value })}
        />
      <button onClick={handleSubmit}>Save</button>
    </Container>
  );
};




        
        