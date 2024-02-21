'use client'

import {
    Box,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
} from '@chakra-ui/react'
import React from 'react';

const IMAGE =
    'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'

export default function BookCard({ id, imageURL, title, authors }: { id: string, imageURL: string, title: string, authors: string[] }) {

    return (
        <Box
            onClick={() => console.log({ id })}
            role={'group'}
            px={8}
            py={8}
            maxW={'300px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'lg'}
            pos={'relative'}
            zIndex={1}
            overflow="hidden"  // Set overflow to "hidden"
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.02)', zIndex: 2, bg: useColorModeValue('white', 'white') }}
        >
            <Box
                rounded={'lg'}
                pos={'relative'}
                height={'230px'}
                _after={{
                    transition: 'all .3s ease',
                    content: '""',
                    w: 'full',
                    h: 'full',
                    pos: 'absolute',
                    top: 5,
                    left: 0,
                    backgroundImage: `url(${imageURL})`,
                    filter: 'blur(15px)',
                    opacity: 0.3,
                    zIndex: -1,
                }}>
                <Image
                    rounded={'lg'}
                    height={230}
                    width={282}
                    objectFit={'contain'}
                    src={imageURL}
                    alt="#"
                />
            </Box>
            <Stack pt={10} spacing={0} align={'center'}>
                {authors.length < 1 && <Text
                    color={'gray.500'}
                    fontSize={'sm'}
                    textTransform={'uppercase'}
                    textAlign="center"
                    fontWeight="bold"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    noOfLines={2}  // Set the maximum number of lines
                >
                    No Author
                </Text>}
                {authors.map((author, index, key) => (
                    <React.Fragment key={index}>
                        <Text
                            color={'gray.500'}
                            fontSize={'sm'}
                            textTransform={'uppercase'}
                            textAlign="center"
                            fontWeight="bold"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            noOfLines={2}  // Set the maximum number of lines
                        >
                            {author}
                        </Text>
                    </React.Fragment>
                ))}

                <Heading
                    fontSize={'xl'}
                    fontFamily={'body'}
                    fontWeight={500}
                    textAlign="center"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    display="-webkit-box"
                    noOfLines={2}  // Set the maximum number of lines
                    marginBottom={0}
                    mt={16}
                >
                    {title}
                </Heading>
            </Stack>
        </Box>
    );
}