import { SimpleGrid, Center } from '@chakra-ui/react';
import React from 'react';
import BookCard from './bookcard';
import BookVolume from '../models/BookVolume';

interface BookGridProps {
    books: BookVolume[];
}

const BookGrid: React.FC<BookGridProps> = ({ books }) => {
    return (
        <Center>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} mt={4} px={8}>
                {books.map((book) => (
                    <BookCard
                        key={book.volumeInfo.industryIdentifiers?.[0].identifier ?? book.id}
                        id={book.id}
                        imageURL={book?.volumeInfo?.imageLinks?.thumbnail || ''}
                        title={book?.volumeInfo?.title || ''}
                        authors={book?.volumeInfo?.authors || []}
                    />
                ))}
            </SimpleGrid>
        </Center>
    );
};

export default BookGrid;
