import React, { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store';
import { ThunkDispatch } from 'redux-thunk';
import { User } from '@firebase/auth-types';
import Navbar from '../components/Navbar';
import { selectFilteredBooks, setGenreFilter, setPublicationYearFilter, bookDeleted, IBook } from '../Slice/bookSlice';
import { useGetBooksQuery , useDeleteBookMutation} from '../Slice/bookApi';
import { Box, Button, Grid, GridItem, Heading, VStack, Wrap, WrapItem, Image, Text, CardBody, Card, Divider, CardFooter, ButtonGroup, Select, Input, AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,


} from '@chakra-ui/react';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
const Home = () => {
  const cancelRef = useRef<HTMLButtonElement>(null);
    const [deleteBookMutation] = useDeleteBookMutation();
    const dispatch: any = useDispatch();
    const data = useSelector(selectFilteredBooks);
    const [genreFilter, setGFilter] = useState('');
    const [publicationYearFilter, setPFilter] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deleteBookId, setDeleteBookId] = useState('');
    useGetBooksQuery({});
    useEffect(() => {
        
    }, [dispatch]);
  
    const handleGenreFilterChange = (e: any) => {
      const genre = e.target.value;
      setGFilter(genre);
      dispatch(setGenreFilter(genre));
    };
  
    const handlePublicationYearFilterChange = (e: any) => {
      const publicationYear = e.target.value;
      setPFilter(publicationYear);
      dispatch(setPublicationYearFilter(publicationYear));
    };

    const handleDelete = (book: IBook) => {
      setDeleteBookId(book.guid);
      onOpen();
    };

    const handleDeleteCancel = () => {
      setDeleteBookId('');
      onClose();
    };
      const handleDeleteConfirmation = () => {
        const bookId: string = deleteBookId ;
        console.log(bookId);
        deleteBookMutation({bookId});
        dispatch(bookDeleted(bookId));
        onClose();
      }

    return (

           
        <Box ms={40} mt={20}>
        <Box mb={4}>
          <Heading as="h1" size="xl" mb={2}>Home Page</Heading>
          <Box display="flex" alignItems="center">
            <Box mr={4}>
              <Select
                placeholder="Select Genre"
                value={genreFilter}
                onChange={handleGenreFilterChange}
              >
                <option value="">Select Genre</option>
                <option value="fantasy">Fantasy</option>
                <option value="romance">Romance</option>
                <option value="mystery">Mystery</option>
                <option value="science-fiction">Science Fiction</option>
                <option value="thriller">Thriller</option>
                {/* Add more options as needed */}
              </Select>
            </Box>
            <Box>
              <Input
                placeholder="Publication Year"
                value={publicationYearFilter}
                onChange={handlePublicationYearFilterChange}
              />
            </Box>
          </Box>
        </Box>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {data?.map((book: any) => (
            

                    <Card>

                        <Link to={`/books/${book.guid}`}>
                        
                        <CardBody>


                        <VStack spacing={2} alignItems="start">
                            <Image
                            src='/images/default-image.png'
                            alt="Book Cover"
                            boxSize="200px"
                            objectFit="contain"
                            fallbackSrc="default-image.jpg"
                            />
                            <Heading as="h2" size="md">{book.title}</Heading>
                            <Text>{book.author}</Text>
                        </VStack>




                        </CardBody>
                        
                        
                        
                        
                        
                        </Link>


                            <Divider />
                            
                                <CardFooter>
                                    <ButtonGroup spacing='2'>
                                  <Link to={`/books/edit/${book.guid}`}>  <Button colorScheme="blue">Edit</Button>  </Link> 
                                     <Button colorScheme="red" onClick={() => handleDelete(book)}>Delete</Button>
                                    </ButtonGroup>
                                </CardFooter>




                    </Card>

        
          ))}





        </Grid>


        <AlertDialog isOpen={isOpen} onClose={onClose} isCentered leastDestructiveRef={cancelRef} >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Book
                          </AlertDialogHeader>
                          <AlertDialogBody>
                            Are you sure you want to delete this book?
                          </AlertDialogBody>
                          <AlertDialogFooter>
                            <Button variant="outline" onClick={handleDeleteCancel}>
                              Cancel
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={handleDeleteConfirmation}>
                              Delete
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
      </Box>

          

    );
  };

export default Home;