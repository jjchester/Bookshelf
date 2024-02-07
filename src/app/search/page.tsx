'use client'

import React, { useState, ChangeEvent } from 'react';
import useSWR from 'swr';
import { Button, Center, SimpleGrid, Text } from '@chakra-ui/react';
import BookGrid from '../components/bookgrid';
import BookSearchBar from '../components/booksearchbar';
import LoadingStateCard from '../components/loadingstatecard';
import fetcher from '../utils/fetcher';

const BookSearch: React.FC = () => {
    const PAGE_SIZE = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [allItems, setAllItems] = useState<BookItem[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [query, setQuery] = useState<string>('');

    const startIndex = (currentPage - 1) * PAGE_SIZE;

    const { data, error, isValidating } = useSWR<BookSearchResponse>(
        query.trim() !== ''
            ? `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${PAGE_SIZE}`
            : null,
        fetcher,
        {
            onSuccess: (data) => {
                if (query.trim() !== '') {
                    setTotalItems(data.totalItems || 0);
                    setAllItems((prevItems) => [...prevItems, ...(data.items || [])]);
                }
            },
            onError: (error) => {
                console.error('Failed to fetch data', error);
            }
        }
    );

    const loadMore = () => {
        const nextPage = currentPage + 1;
        if (allItems.length < totalItems) {
            setCurrentPage(nextPage);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAllItems([]);
        setQuery(e.target.value);
    };

    return (
        <>
            <BookSearchBar query={query} onInputChange={handleInputChange} />
            {allItems.length > 0 && (
                <BookGrid books={allItems} />
            )}
            {(isValidating || !allItems) && (
                <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} mt={4} px={8}>
                    {[...Array(20)].map((_, index) => (
                        <LoadingStateCard key={index} />
                    ))}
                </SimpleGrid>
            )}
            {allItems.length < totalItems && allItems.length > 0 && query.trim() !== '' && (
                <Center>
                    <Button onClick={loadMore} mt={4} colorScheme="teal">
                        Load more
                    </Button>
                </Center>
            )}
            {allItems.length === 0 && query.trim() !== '' && !isValidating && (
                <Center><Text>No results</Text></Center>
            )}
            {((allItems.length === 0 && query.trim() === '') || isValidating) && (
                <div style={{ height: 'calc(100vh - 200px)' }}></div>
            )}
        </>
    );
};

export default BookSearch;
