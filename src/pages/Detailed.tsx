
import { Box, Heading, Text, Image, Flex} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useParams } from 'react-router-dom';
import { useGetBooksQuery } from '../Slice/bookApi';
import Comments from '../components/Comments';
import AddReviewForm from '../components/ReviewForm';

const Detailed = () => {
    
        useGetBooksQuery({});

        const { bookId } = useParams();
        const book = useSelector((state: RootState) =>  state.books.books.find((book) => book.guid === bookId));
        
        const user = useSelector((state: RootState) => state.user.user);

        const currentUser = useSelector((state: RootState) => state.firebase.auth);

        console.log(currentUser);
        if (!book) {
          return <div>Book not found</div>;
        }
      
        return (


               <div>


                    <Box p={4}>
                    <Flex direction="column" align="center">
                        <Image
                        src="/images/default-image.png"
                        alt="Book Cover"
                        boxSize="200px"
                        objectFit="contain"
                        fallbackSrc="default-image.jpg"
                        />
                        <Heading as="h2" size="xl" mb={2}>
                        {book.title}
                        </Heading>
                        <Text mb={2}>
                        <strong>Author:</strong> {book.author}
                        </Text>
                        <Text mb={2}>
                        <strong>Genre:</strong> {book.genre}
                        </Text>
                        <Text mb={2}>
                        <strong>Publication Date:</strong> {book.publicationDate}
                        </Text>
                    </Flex>
                    </Box>
                    {user && <AddReviewForm book={book}></AddReviewForm> }
                    <Comments reviews={book.reviews}></Comments>

                    

               </div>

        );
   
};

export default Detailed;