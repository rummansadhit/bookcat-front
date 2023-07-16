
import { Box, Heading, Text, Image, Flex} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useParams } from 'react-router-dom';
import { useGetBooksQuery } from '../Slice/bookApi';

const Detailed = () => {
    
                useGetBooksQuery({});

        const { bookId } = useParams();
        const book = useSelector((state: RootState) =>  state.books.books.find((book) => book.guid === bookId));
        
      
        if (!book) {
          return <div>Book not found</div>;
        }
      
        return (
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
        );
   
};

export default Detailed;