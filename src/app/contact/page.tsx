'use client'

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    Stack,
    Textarea,
    Tooltip,
    useClipboard,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react'
import { BsGithub, BsLinkedin, BsPerson, BsTwitter } from 'react-icons/bs'
import { MdEmail, MdOutlineEmail } from 'react-icons/md'

const confetti = {
    light: {
        primary: '4299E1', // blue.400
        secondary: 'BEE3F8', // blue.100
    },

    dark: {
        primary: '1A365D', // blue.900
        secondary: '2A4365', // blue.800
    },
}

function onClick() {
    console.log('Button clicked!')
}

export default function Contact() {
    const { hasCopied, onCopy } = useClipboard('example@example.com')

    return (
        <Flex
            align="center"
            justify="center"
            id="contact">
            <Box borderRadius="lg" m={{ base: 5, md: 16, lg: 10 }} p={{ base: 5, lg: 16 }}>
                <Box>
                    <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
                        <Heading
                            fontSize={{
                                base: '4xl',
                                md: '5xl',
                            }}>
                            Get in Touch
                        </Heading>

                        <Stack
                            spacing={{ base: 4, md: 8, lg: 20 }}
                            direction={{ base: 'column', md: 'row' }}>
                            <Stack
                                align="center"
                                justify="space-around"
                                direction={{ base: 'row', md: 'column' }}>
                                <Tooltip
                                    label={hasCopied ? 'Email Copied!' : 'Copy Email'}
                                    closeOnClick={false}
                                    hasArrow>
                                    <IconButton
                                        aria-label="email"
                                        variant="ghost"
                                        size="lg"
                                        fontSize="3xl"
                                        icon={<MdEmail />}
                                        _hover={{
                                            bg: 'blue.500',
                                            color: useColorModeValue('white', 'gray.700'),
                                        }}
                                        onClick={onCopy}
                                        isRound
                                    />
                                </Tooltip>

                                <Box as="a" href="#">
                                    <IconButton
                                        aria-label="github"
                                        variant="ghost"
                                        size="lg"
                                        fontSize="3xl"
                                        icon={<BsGithub />}
                                        _hover={{
                                            bg: 'blue.500',
                                            color: useColorModeValue('white', 'gray.700'),
                                        }}
                                        isRound
                                    />
                                </Box>

                                <Box as="a" href="#">
                                    <IconButton
                                        aria-label="twitter"
                                        variant="ghost"
                                        size="lg"
                                        icon={<BsTwitter size="28px" />}
                                        _hover={{
                                            bg: 'blue.500',
                                            color: useColorModeValue('white', 'gray.700'),
                                        }}
                                        isRound
                                    />
                                </Box>

                                <Box as="a" href="#">
                                    <IconButton
                                        aria-label="linkedin"
                                        variant="ghost"
                                        size="lg"
                                        icon={<BsLinkedin size="28px" />}
                                        _hover={{
                                            bg: 'blue.500',
                                            color: useColorModeValue('white', 'gray.700'),
                                        }}
                                        isRound
                                    />
                                </Box>
                            </Stack>

                            <Box
                                bg={useColorModeValue('white', 'gray.700')}
                                borderRadius="lg"
                                p={8}
                                color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                                shadow="base">
                                <VStack spacing={5}>
                                    <FormControl isRequired>
                                        <FormLabel>Name</FormLabel>

                                        <InputGroup>
                                            <InputLeftElement>
                                                <BsPerson />
                                            </InputLeftElement>
                                            <Input type="text" name="name" placeholder="Your Name" />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Email</FormLabel>

                                        <InputGroup>
                                            <InputLeftElement>
                                                <MdOutlineEmail />
                                            </InputLeftElement>
                                            <Input type="email" name="email" placeholder="Your Email" />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Message</FormLabel>

                                        <Textarea
                                            name="message"
                                            placeholder="Your Message"
                                            rows={6}
                                            resize="none"
                                        />
                                    </FormControl>

                                    <Button
                                        colorScheme="blue"
                                        bg="blue.400"
                                        color="white"
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                        width="full"
                                        onClick={onClick}>
                                        Send Message
                                    </Button>
                                </VStack>
                            </Box>
                        </Stack>
                    </VStack>
                </Box>
            </Box>
        </Flex>
    )
}