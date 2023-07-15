import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Textarea, useToast } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
interface Book {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  description: string;
}

interface AddBookFormProps {
  onAddBook: (book: Book) => void;
}

const AddBookForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState<Date | null>(null)
  const [description, setDescription] = useState('');
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform form validation here

    // Create the book object
    const newBook: Book = {
      title,
      author,
      genre,
      publicationDate: publicationDate?.toString() || '',
      description,
    };

    // Call the onAddBook function passed from the parent component
    

    // Reset the form
    setTitle('');
    setAuthor('');
    setGenre('');
    setPublicationDate(null);
    setDescription('');

    // Show success toast
    toast({
      title: 'Book added',
      description: 'The book has been successfully added.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
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
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
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
