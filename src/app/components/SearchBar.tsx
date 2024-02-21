import { Container, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React, { ChangeEvent, KeyboardEvent } from 'react';

interface SearchBarProps {
    query: string;
    maxW: string;
    placeholder: string;
    showSearchIcon?: boolean;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, maxW, placeholder, showSearchIcon, onInputChange, onKeyPress }) => {
    return (
        <InputGroup mx="auto">
            {showSearchIcon && <InputRightElement pointerEvents="none">
                <SearchIcon color="gray.300" />
            </InputRightElement>
            }
            <Input
                type="text"
                variant="outline"
                placeholder={placeholder}
                value={query}
                onChange={onInputChange}
                onKeyUp={onKeyPress}
                _focus={{ borderColor: 'teal.500', boxShadow: 'outline' }}
            />
        </InputGroup>
    );
};

export default SearchBar;
