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
    <Container w='100%' p={30} mt={20}>
        <Title mb={10} order={1}>Comments</Title>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="sm" mt={10}>
          <Textarea
            autosize
            minRows={2}
            maxRows={10}
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <Button w={100} type="submit" variant='outline' color='red'>Comment</Button>
        </Flex>
      </form>
    </Container>
  );
};

export default CommentForm;
