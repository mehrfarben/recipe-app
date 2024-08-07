import { useState } from 'react';
import { Button, Textarea, Container, Title, Flex } from '@mantine/core';
import { addComment } from '../../api/index'; 

const CommentForm = ({ recipeId, username, onCommentAdded }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      return;
    }
    try {
      await addComment(recipeId, username, comment);
      setComment('');
      onCommentAdded();
    } catch (error) {
      console.error('Error submitting comment', error);
    }
  };

  return (
    <Container w='100%' m={0}>
        <Title mb={10} order={1}>Comments</Title>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="sm" mt={10}>
          <Textarea
            autosize
            size='lg'
            minRows={3}
            maxRows={10}
            placeholder="What do you think about this recipe?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <Flex w='100%' justify='end'>
          <Button w={125} type="submit" variant='outline' color='#ff0307'>Comment</Button>
          </Flex>
        </Flex>
      </form>
    </Container>
  );
};

export default CommentForm;
