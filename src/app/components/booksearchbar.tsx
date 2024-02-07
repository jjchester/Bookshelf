import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React, { ChangeEvent } from 'react';

interface SearchBarProps {
    query: string;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BookSearchBar: React.FC<SearchBarProps> = ({ query, onInputChange }) => {
    return (
        <InputGroup maxW="md" mx="auto" my={8}>
            <InputRightElement pointerEvents="none">
                <SearchIcon color="gray.300" />
            </InputRightElement>
            <Input
                type="text"
                variant="outline"
                placeholder="Search for books"
                value={query}
                onChange={onInputChange}
                _focus={{ borderColor: 'teal.500', boxShadow: 'outline' }}
            />
        </InputGroup>
    );
};

export default BookSearchBar;
