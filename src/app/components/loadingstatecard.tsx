import { Box } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const shimmer = keyframes`
  0% { background-position: -300px 0; }
  100% { background-position: 300px 0; }
`;

const LoadingStateCard = () => {
    return (
        <Box
            maxW="280"
            h="400"
            bgGradient="linear(to-r, #eee 0%, #fff 50%, #eee 100%)"
            bgPos="0 0"
            rounded={'lg'}
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" // Drop shadow
            backdropFilter="blur(4px)" // Slight blur effect
            animation={`${shimmer} 1.5s infinite linear`}
        />
    );
};

export default LoadingStateCard;
