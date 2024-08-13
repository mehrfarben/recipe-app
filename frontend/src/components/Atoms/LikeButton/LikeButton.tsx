import { IconHeart } from '@tabler/icons-react';
import { Flex } from '@mantine/core';
import styled from 'styled-components';
import classes from './LikeButton.module.css';

const StyledLikeButtonIcon = styled(IconHeart)<{ filled: boolean }>`
  fill: ${({ filled }) => (filled ? '#fc6160' : 'none')};
`;

const LikeButton = ({ isFavorite, onClick }: { isFavorite: boolean; onClick: () => void }) => {
  return (
    <button className={classes.likeButton} onClick={onClick}>
      <Flex align="center" justify="center">
        <StyledLikeButtonIcon filled={isFavorite} size={25} />
      </Flex>
    </button>
  );
};

export default LikeButton;
