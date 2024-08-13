import { useState } from 'react';
import { Button, Textarea, Container, Title, Flex } from '@mantine/core';
import { addComment } from '../../api/index';
import { notifications } from '@mantine/notifications';

interface CommentFormProps {
  userData: any;
  recipeId: string;
  username: string;
  onCommentAdded: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ recipeId, username, onCommentAdded }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username) {
      notifications.show({
        title: 'Sign In',
        message: 'You must sign in to make a comment.',
        color: '#ff3131',
      });
      return;
    }

    if (!comment.trim()) {
      return;
    }

    try {
      await addComment(recipeId, username, comment);
      setComment('');
      onCommentAdded();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Something went wrong while delivering your comment.',
        color: '#ff3131',
      });
    }
  };

  return (
    <Container w="100%" m={0}>
      <Title my={20} order={1}>Comments</Title>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="sm" mt={10}>
          <Textarea
            autosize
            size="lg"
            minRows={3}
            maxRows={10}
            placeholder="What do you think about this recipe?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <Flex w="100%" justify="end">
            <Button w={125} type="submit" variant="outline" color="#ff0307">
              Comment
            </Button>
          </Flex>
        </Flex>
      </form>
    </Container>
  );
};

export default CommentForm;
