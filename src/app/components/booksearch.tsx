// // BookSearch.tsx
// import useSWR from 'swr';
// import React, { useState, ChangeEvent } from 'react';
// import BookCard from './bookcard';
// import { Button, Center, Input, InputGroup, InputRightElement, SimpleGrid, Text } from '@chakra-ui/react';
// import { SearchIcon } from '@chakra-ui/icons';
// import { truncate } from 'fs';
// import LoadingCard from './loadingstatecard';

// const fetcher = async (url: string) => {
//     const response = await fetch(url);
//     if (!response.ok) {
//         throw new Error('Failed to fetch data');
//     }
//     return response.json();
// };

// const BookSearch: React.FC = () => {
//     const PAGE_SIZE = 20;
//     const [currentPage, setCurrentPage] = useState(1);
//     const [allItems, setAllItems] = useState<BookItem[]>([]);
//     const [totalItems, setTotalItems] = useState<number>(0);
//     const [query, setQuery] = useState<string>('');
//     const startIndex = (currentPage - 1) * PAGE_SIZE;

//     const { data, error, isLoading, isValidating } = useSWR<BookSearchResponse>(
//         query.trim() !== ''
//             ? `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${PAGE_SIZE}`
//             : null,
//         fetcher,
//         {
//             onSuccess: (data) => {
//                 if (query.trim() !== '') {
//                     // Update totalItems and append new items to allItems
//                     setTotalItems(data.totalItems || 0);
//                     setAllItems((prevItems) => [...prevItems, ...(data.items || [])]);
//                 }
//             },
//             onError: (error) => {
//                 console.error('Failed to fetch data', error);
//             }
//         }
//     );

//     const loadMore = () => {
//         // Calculate the next page based on the totalItems and PAGE_SIZE
//         const nextPage = currentPage + 1;

//         // Check if there are more items to fetch
//         if (allItems.length < totalItems) {
//             setCurrentPage(nextPage);
//         }
//     };

//     const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setAllItems([]);
//         setQuery(e.target.value);
//     };

//     return (
//         <>
//             <InputGroup maxW="md" mx="auto" my={8}>
//                 <InputRightElement pointerEvents="none">
//                     <SearchIcon color="gray.300" />
//                 </InputRightElement>
//                 <Input
//                     type="text"
//                     variant="outline"
//                     placeholder="Search for books"
//                     value={query}
//                     onChange={handleInputChange}
//                     _focus={{ borderColor: 'teal.500', boxShadow: 'outline' }}
//                 />
//             </InputGroup>
//             {(isLoading || isValidating) && (
//                 <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} mt={4} px={8}>
//                     {[0, 0, 0, 0].map((book) => (
//                         <LoadingCard key={'loading'} />
//                     ))}
//                 </SimpleGrid>
//             )}
//             {!isLoading && allItems.length != 0 && (<div>
//                 {allItems.length > 0 && (
//                     <div>
//                         <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} mt={4} px={8}>
//                             {allItems.map((book) => (
//                                 <BookCard
//                                     key={book.id}
//                                     id={book.id}
//                                     imageURL={book?.volumeInfo?.imageLinks?.thumbnail || ''}
//                                     title={book?.volumeInfo?.title || ''}
//                                     author={book?.volumeInfo?.authors?.[0] || ''}
//                                 />
//                             ))}
//                         </SimpleGrid>
//                     </div>
//                 )}
//             </div>)}
//             {allItems.length < totalItems && allItems.length > 0 && query.trim() !== '' && (
//                 <Center>
//                     <Button onClick={loadMore} mt={4} colorScheme="teal" disabled={isLoading}>
//                         Load more
//                     </Button>

//                 </Center>
//             )}
//             {allItems.length === 0 && query.trim() !== '' && !isLoading && !isValidating && <Center><Text>No results</Text></Center>}
//             {((allItems.length === 0 && query.trim() == '') || (isLoading || isValidating)) && //100% height whitespace when no results are present
//                 <div style={{ height: 'calc(100vh - 200px)' }}></div>}
//         </>
//     );
// };

// export default BookSearch;
