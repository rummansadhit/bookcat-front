import React, { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store';
import { ThunkDispatch } from 'redux-thunk';
import { User } from '@firebase/auth-types';
import Navbar from '../components/Navbar';
import { selectFilteredBooks, setGenreFilter, setPublicationYearFilter } from '../Slice/bookSlice';
import { useGetBooksQuery } from '../Slice/bookApi';
import { Box, Button, Grid, GridItem, Heading, VStack, Wrap, WrapItem, Image, Text, CardBody, Card, Divider, CardFooter, ButtonGroup, Select, Input} from '@chakra-ui/react';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch: any = useDispatch();
    const data = useSelector(selectFilteredBooks);
    const [genreFilter, setGFilter] = useState('');
    const [publicationYearFilter, setPFilter] = useState('');
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
                <option value="">All Genres</option>
                {/* Add genre options based on available genres */}
                <option value="fantasy">Fantasy</option>
                <option value="romance">Romance</option>
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
                                    <Button colorScheme="blue">Edit</Button>
                                     <Button colorScheme="red">Delete</Button>
                                    </ButtonGroup>
                                </CardFooter>




                    </Card>

        
          ))}
        </Grid>
      </Box>

          

    );
  };

export default Home;