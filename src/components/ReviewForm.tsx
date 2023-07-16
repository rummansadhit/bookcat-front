import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Textarea, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { IBook, IReview, addReview } from '../Slice/bookSlice';
import { useFirebase } from 'react-redux-firebase';
import { useAddReviewMutation } from '../Slice/bookApi';

interface AddReviewFormProps {
  book: IBook;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ book }) => {
  const firebase = useFirebase();
  const { email } = firebase.auth().currentUser || {};
  const [addReviewMutation] = useAddReviewMutation();

  const [comment, setComment] = useState('');
  const toast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform form validation here

    // Create the review object
    const newReview:IReview = {
      userName: email || 'Anonymous',
      comment,
    };

    const newBook: IBook = {
        ...book,
        reviews: [...book.reviews, newReview],
      }
    // Dispatch the addReview action with the bookId and review
    

    // Perform the necessary logic with the new review object
    try {
      const response = await addReviewMutation({ bookId: book.guid, book: newBook });

      dispatch(addReview({ bookId: book.guid, review: newReview }));
        console.log('New review:', response);
    } catch (error) {
      // Handle error if needed
    }

    // Reset the form
    setComment('');

    // Show success toast
    toast({
      title: 'Review added',
      description: 'The review has been successfully added.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxWidth="400px" mx="auto">
      <form onSubmit={handleSubmit}>
        <FormControl id="comment" mt={4}>
          <FormLabel>Comment</FormLabel>
          <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4}>
          Add Review
        </Button>
      </form>
    </Box>
  );
};

export default AddReviewForm;
