import { useEffect, useState } from 'react';
import { Text, Group, Avatar, ActionIcon, Flex, Container, Paper } from '@mantine/core';
import { fetchComments, deleteComment } from '../../api/index';
import { IconX } from '@tabler/icons-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

const CommentList = ({ recipeId }) => {
  const [comments, setComments] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const currentUser = userData.username;

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetchComments(recipeId);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments', error);
        setComments([]);
      }
    };

    getComments();
  }, [recipeId]);

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment', error);
    }
  };

  const formatTimeAgo = (timestamp) => {
    return formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
  };

  return (
    <Container w='100%' pt={0}>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Group py={10} key={comment._id}>
            <Flex w='100%' justify='space-between'>
              <Paper radius='lg' shadow="xs" withBorder w='100%' p={20}>
              <Avatar mr={10}/>
              <Flex  justify='space-between'>
                <Flex  align="start" justify='space-between' direction='column'>
                <Group >
                <Text size='lg' fw={700}>{comment.username}</Text>
                <Text size='sm' c='dimmed'>{formatTimeAgo(comment.createdAt)}</Text>
                </Group>
                <Text>{comment.comment}</Text>
                </Flex>
                {currentUser && comment.username === currentUser && (
                <ActionIcon
                  mt={5}
                  color="red" 
                  onClick={() => handleDeleteComment(comment._id)}
                  variant='subtle'
                  size="sm"
                >
                  <IconX/>
                </ActionIcon>
              )}
              </Flex>
              </Paper>
            </Flex>
          </Group>
        ))
      ) : (
        <Text>No comments yet</Text>
      )}
    </Container>
  );
};

export default CommentList;
