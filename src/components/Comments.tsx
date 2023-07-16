import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { IReview } from '../Slice/bookSlice';

interface CommentsProps {
  reviews: IReview[];
}

const Comments: React.FC<CommentsProps> = ({ reviews }) => {
  return (
    <Box display="flex" justifyContent="center">
      <Box minWidth="400px">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Comments
        </Text>
        <Box width="100%">
          <VStack spacing={4} align="start">
            {reviews.map((review) => (
              <Box
                p={4}
                borderWidth="1px"
                borderRadius="md"
                
                width="100%"
                minHeight="100px"
                maxHeight="200px"
                overflow="auto"
              >
                <Text fontWeight="bold">{review.userName}</Text>
                <Text>{review.comment}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Comments;






