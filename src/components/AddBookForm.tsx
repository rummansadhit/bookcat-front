import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Textarea, useToast } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { useAddBookMutation } from '../Slice/bookApi';
import {IBook, bookAdded} from '../Slice/bookSlice';
import { MutationActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';

import { v4 as uuidv4 } from 'uuid';









const AddBookForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState<Date | null>(null)
  const [description, setDescription] = useState('');
  const toast = useToast();


  const dispatch = useDispatch();
  const [addBookMutation] = useAddBookMutation();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform form validation here
    const guid: string = uuidv4();
    // Create the book object
    const newBook: IBook = {
      guid,
      title,
      author,
      genre,
      publicationDate: publicationDate?.toISOString().substring(0, 10) || '',
   
    };

    try{

      const response : any= await addBookMutation(newBook);

      // Access the appropriate field or property in the response
      const responseData = response.data;

      // Dispatch the action to handle adding a book
      dispatch(bookAdded(responseData));

      // Handle the success response if needed
      console.log('New book:', responseData);
      toast({
        title: 'Book added',
        description: 'The book has been successfully added.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setTitle('');
      setAuthor('');
      setGenre('');
      setPublicationDate(null);


    }catch(error: any){
        throw new Error(error);
    }

  };

  return (
    <Box maxWidth="400px" mx="auto">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl id="author" isRequired>
            <FormLabel>Author</FormLabel>
            <Input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </FormControl>
          <FormControl id="genre" isRequired>
            <FormLabel>Genre</FormLabel>
            <Input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
          </FormControl>
          <FormControl id="publicationDate" isRequired>
            <FormLabel>Publication Date</FormLabel>
            <DatePicker selected={publicationDate} onChange={(date: any) => setPublicationDate(date)} />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Add Book
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddBookForm;
