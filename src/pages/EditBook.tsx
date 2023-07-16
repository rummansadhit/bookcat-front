import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
} from '@chakra-ui/react';

import { RootState } from '../store';
import { IBook, updateBook } from '../Slice/bookSlice';
import { useUpdateBookMutation } from '../Slice/bookApi';

const EditBookPage = () => {
  const { bookId } = useParams();
 

  const dispatch = useDispatch();
  const book: IBook | undefined = useSelector((state: RootState) =>
    state.books.books.find((b) => b.guid === bookId)
  );

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');

  const [updateBookMutation] = useUpdateBookMutation();

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setGenre(book.genre);
      setPublicationDate(book.publicationDate);
    }
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create the updated book object
    const updatedBook: IBook = {
      ...book!,
      title,
      author,
      genre,
      publicationDate,
    };

    let guid: string = bookId || '';
    // Call the updateBookMutation to update the book
    const response = await updateBookMutation({bookId: guid, book: updatedBook}); 

    // Dispatch the updateBook action to update the book in Redux
    dispatch(updateBook(updatedBook));

    // Redirect to the book details page or any other appropriate page
   
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <Box maxWidth="400px" mx="auto" mt={20}>
      <Heading as="h1" size="xl" mb={4}>
        Edit Book
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Author</FormLabel>
          <Input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Genre</FormLabel>
          <Input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Publication Date</FormLabel>
          <Input
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Update
        </Button>
      </form>
    </Box>
  );
};

export default EditBookPage;

