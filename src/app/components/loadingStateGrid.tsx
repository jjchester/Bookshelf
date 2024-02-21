import { SimpleGrid, Center } from '@chakra-ui/react';
import React from 'react';
import LoadingStateCard from './loadingstatecard';

const LoadingStateGrid: React.FC = () => {
    return (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} mt={4} px={4} pt={4} maxW={1200} margin={'auto'}>
            {[...Array(20)].map((_, index) => (
                <LoadingStateCard key={index} />
            ))}
        </SimpleGrid>
    );
};

export default LoadingStateGrid;
