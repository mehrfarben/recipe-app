import { IconHeart } from '@tabler/icons-react';
import { Flex } from '@mantine/core';
import styled from 'styled-components';

const StyledLikeButton = styled.button `
    color: red;
    border: none;
    cursor: pointer;
    background-color: transparent;
    padding: 0;
    width: 30px;
    height: 30px;
&:hover {
  
}
`

const StyledLikeButtonIcon = styled(IconHeart) `
&:hover {
  fill: #ff5050;
}
`

const LikeButton = () => {
  return (
    
    <StyledLikeButton>
    <Flex align='center' justify='center'>
      <StyledLikeButtonIcon size={30}/>
      </Flex>
    </StyledLikeButton>
    
  )
}

export default LikeButton