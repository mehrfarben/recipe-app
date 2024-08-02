import { IconHeart } from '@tabler/icons-react';
import { Flex } from '@mantine/core';
import styled from 'styled-components';

const StyledLikeButton = styled.button`
  color: red;
  border: none;
  cursor: pointer;
  background-color: transparent;
  padding: 0;
  width: 30px;
  height: 30px;
  &:active {
    transform: scale(80%);
  }
`;

const StyledLikeButtonIcon = styled(IconHeart)<{ filled: boolean }>`
  ${({ filled }) => filled && 'fill: #ff5050;'}

  &:hover {
    fill: #ff5050;
  }
`;

const LikeButton = ({ isFavorite, onClick }: { isFavorite: boolean; onClick: () => void }) => {
  return (
    <StyledLikeButton onClick={onClick}>
      <Flex align='center' justify='center'>
        <StyledLikeButtonIcon filled={isFavorite} size={30} />
      </Flex>
    </StyledLikeButton>
  );
};

export default LikeButton;
