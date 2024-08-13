import { IconSettings, IconTrash, IconEdit } from '@tabler/icons-react';
import { Flex, Menu, Text, Container } from '@mantine/core';
import styled from 'styled-components';
import { modals } from '@mantine/modals';
import { useNavigate } from 'react-router-dom';
import { RecipeType } from '../../api';
import { notifications } from '@mantine/notifications';

const StyledEditButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  color: black;
  border: none;
  cursor: pointer;
  background-color: white;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  margin-right: 10px;

  &:hover {
    background-color: red;
    color:white;
  }
  &:active {
    transform: scale(95%);
  }
`;

interface RecipeEditButtonProps {
  recipeId: number;
  recipe: RecipeType;
  onDelete: (recipeId: number) => void;
}

const RecipeEditButton = ({ recipe, onDelete }: RecipeEditButtonProps) => {
  const navigate = useNavigate();

  const openDeleteModal = () => modals.openConfirmModal({
    title: 'Are you sure you want to delete this recipe?',
    centered: true,
    children: (
      <Text size="sm">
        You will not be able to recover it after deletion.
      </Text>
    ),
    labels: { confirm: 'Delete', cancel: 'Cancel' },
    confirmProps: { color: '#ff3131' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => {onDelete(recipe.recipeId), notifications.show({ title: 'Recipe Deleted', message: 'Recipe deleted successfully', color: '#ff3131' })},
  });

  const handleEdit = () => {
    navigate('/edit-recipe', { state: { recipe } });
  };

  return (
    <Container>
      <Menu>
        <Menu.Target>
          <StyledEditButton>
            <Flex align='center' justify='center'>
              <IconSettings size={30} />
            </Flex>
          </StyledEditButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item 
            leftSection={<IconEdit size={14} />}
            onClick={handleEdit}
          >
            Edit Recipe
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            color='red'
            leftSection={<IconTrash size={14} />}
            onClick={openDeleteModal}
          >
            Delete Recipe
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Container>
  );
};

export default RecipeEditButton;
