import { IconHeart } from '@tabler/icons-react';
import { Flex } from '@mantine/core';
import classes from './LikeButton.module.css';

const LikeButton = ({ isFavorite, onClick }: { isFavorite: boolean; onClick: () => void }) => {
  return (
    <button className={classes.likeButton} onClick={onClick}>
      <Flex align="center" justify="center">
        <IconHeart 
          size={25} 
          style={{ fill: isFavorite ? '#fc6160' : 'none' }} 
        />
      </Flex>
    </button>
  );
};

export default LikeButton;
