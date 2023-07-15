import React, { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store';
import { ThunkDispatch } from 'redux-thunk';
import { User } from '@firebase/auth-types';
import Navbar from '../components/Navbar';

import { useGetBooksQuery } from '../Slice/bookApi';
import { Box, Button, Grid, GridItem, Heading, VStack, Wrap, WrapItem, Image, Text, CardBody, Card, Divider, CardFooter, ButtonGroup} from '@chakra-ui/react';

const Home = () => {
    const { data , isFetching, isSuccess } = useGetBooksQuery({});
    
    const user = useSelector((state: RootState) => state.user.user);
  
  
    useEffect(() => {
        // Optional: Dispatch an action to update the book list in the store
        // when the data is successfully fetched from the API
      }, [isSuccess]);
    
      if (isFetching) {
        return <div>Loading...</div>;
      }
  
    return (

           
        <Box ms={40} mt={20}>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {data?.map((book: any) => (
            

                    <Card>
                        <CardBody>


                                    <VStack spacing={2} alignItems="start">
                                        <Image
                                        src='default-image.jpg'
                                        alt="Book Cover"
                                        boxSize="200px"
                                        objectFit="contain"
                                        fallbackSrc="default-image.jpg"
                                        />
                                        <Heading as="h2" size="md">{book.title}</Heading>
                                        <Text>{book.author}</Text>
                                    </VStack>




                            </CardBody>

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