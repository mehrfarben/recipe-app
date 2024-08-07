import { IconHeart } from '@tabler/icons-react';
import { Flex } from '@mantine/core';
import styled from 'styled-components';

const StyledLikeButton = styled.button`
  position: absolute;
  top:10px;
  right:10px;
  color: #fc6160;
  border: none;
  cursor: pointer;
  background-color: white;
  border-radius: 50%;
  padding: 5;
  width: 35px;
  height: 35px;
  margin-right: 10px;
  &:active {
    transform: scale(80%);
  }
`;

const StyledLikeButtonIcon = styled(IconHeart)<{ filled: boolean }>`
  ${({ filled }) => filled && 'fill: #fc6160;'}
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
