'use client'

import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import useSWR from 'swr';
import { Button, Center, Grid, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import BookGrid from '../components/bookgrid';
import SearchBar from '../components/SearchBar';
import LoadingStateCard from '../components/loadingstatecard';
import fetcher from '../utils/fetcher';
import LoadingStateGrid from '../components/loadingStateGrid';
import BookVolume from '../models/BookVolume';

const BookSearch: React.FC = () => {
    const PAGE_SIZE = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [allItems, setAllItems] = useState<BookVolume[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [titleQuery, settitleQuery] = useState<string>('');
    const [authorQuery, setAuthorQuery] = useState<string>('');
    const [isbnQuery, setIsbnQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>('');
    const startIndex = (currentPage - 1) * PAGE_SIZE;


    // const { data, error, isValidating, isLoading } = useSWR<BookSearchResponse>(
    //     titleQuery.trim() !== ''
    //         ? `https://www.googleapis.com/books/v1/volumes?q=${titleQuery}&startIndex=${startIndex}&maxResults=${PAGE_SIZE}`
    //         : null,
    //     fetcher,
    //     {
    //         onSuccess: (data) => {
    //             setTotalItems(data.totalItems);
    //             setAllItems((prevItems) => [...prevItems, ...(data.items || [])]);
    //         },
    //         onError: (error) => {
    //             console.error('Failed to fetch data', error);
    //         },
    //         onDiscarded: () => {
    //             console.error('titleQuery was discarded');
    //         }
    //     }
    // );

    const fetchBooks = () => {
        let queryParams = [];
        if (authorQuery) {
            queryParams.push(`inauthor:${authorQuery.trim()}`);
        }
        if (isbnQuery) {
            queryParams.push(`isbn:${isbnQuery.trim()}`);
        }
        if (titleQuery) {
            queryParams.push(titleQuery.trim());
        }

        const queryString = queryParams.join('+');

        let url = `https://www.googleapis.com/books/v1/volumes?q=${queryString}&startIndex=${startIndex}&maxResults=${PAGE_SIZE}`;

        console.log(url);

        setIsLoading(true);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setTotalItems(data.totalItems);
                if (data.totalItems === 0) {
                    setAllItems([]);
                    setErrorText((_) => 'No results');
                } else {
                    setErrorText((_) => '');
                    setAllItems((prevItems) => [...prevItems, ...(data.items || [])]);
                }
                setIsLoading((_) => (false));
            })
            .catch(error => {
                console.error('Failed to fetch data', error);
                setIsLoading((_) => (false));
                setErrorText((_) => 'Failed to fetch results');
            });
    }

    const loadMore = () => {
        const nextPage = currentPage + 1;
        if (allItems.length < totalItems) {
            setCurrentPage(nextPage);
        }
    };

    const handletitleQueryInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        settitleQuery(e.target.value);
    };

    const handleauthorQueryInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAuthorQuery(e.target.value);
    };

    const handleIsbnQueryInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsbnQuery(e.target.value);
    }

    const handleSearch = () => {
        setCurrentPage(1);
        setAllItems([]);
        fetchBooks();
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log("Handle search")
            handleSearch();
        }
    };

    return (
        <div style={{ height: 'calc(100vh - 200px)' }} >
            <Center>
                <Grid
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(6), 1fr)'
                    gap={2}
                    maxW={'lg'}
                    mt={16}
                >
                    <GridItem rowSpan={1} colSpan={6}>
                        <SearchBar
                            query={titleQuery}
                            maxW={'lg'}
                            placeholder={"Title"}
                            showSearchIcon={true}
                            onInputChange={handletitleQueryInputChange}
                            onKeyPress={handleKeyPress}
                        />
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={3}>
                        <SearchBar
                            query={authorQuery}
                            maxW={'sm'}
                            placeholder='authorQuery'
                            showSearchIcon={false}
                            onInputChange={handleauthorQueryInputChange}
                            onKeyPress={handleKeyPress}
                        />
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={3}>
                        <SearchBar
                            query={isbnQuery}
                            maxW={'sm'}
                            placeholder='ISBN'
                            showSearchIcon={false}
                            onInputChange={handleIsbnQueryInputChange}
                            onKeyPress={handleKeyPress}
                        />
                    </GridItem>
                </Grid >
            </Center>
            {
                allItems.length > 0 && (
                    <BookGrid books={allItems} />
                )
            }
            {
                (isLoading || !allItems) && (
                    <LoadingStateGrid />
                )
            }
            {
                allItems.length < totalItems && allItems.length > 0 && titleQuery.trim() !== '' && (
                    <Center>
                        <Button onClick={loadMore} mt={4} colorScheme="teal">
                            Load more
                        </Button>
                    </Center>
                )
            }
            {
                errorText.length !== 0 && (
                    <Center><Text>{errorText}</Text></Center>
                )
            }
            {
                (allItems.length === 0 || isLoading) && (
                    <div style={{ height: 'calc(100vh - 200px)' }}></div>
                )
            }
        </div>
    );
};

export default BookSearch;
