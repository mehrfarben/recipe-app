import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconNotes } from '@tabler/icons-react';
import { AddRecipe } from "../Molecules/AddRecipe";
import styled from 'styled-components';

const StyledAddRecipeButton = styled.div`
  z-index: 25;
  position: fixed;
  right: 100px;
  bottom: 70px;
  transition: all 600ms ease;
  &:hover {
    transform: rotate(360deg);
  }
`;

const AddRecipeButton = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <StyledAddRecipeButton>
      <Tooltip position='left' label="Add Recipe" color='#ff9505'>
        <ActionIcon bd={15} radius={100} size={80} bg="#ff9505" onClick={open}>
          <IconNotes size={45} stroke={2} color="white" />
        </ActionIcon>
      </Tooltip>

      <AddRecipe opened={opened} open={open} close={close} />
    </StyledAddRecipeButton>
  );
};

export default AddRecipeButton;
