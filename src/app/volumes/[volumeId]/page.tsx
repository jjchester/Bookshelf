'use client'

import useSWR from 'swr';
import BookVolume from "@/app/models/BookVolume";
import { deepCopy } from "@/app/models/BookVolume";
import { Badge, Box, Button, Center, Divider, Grid, GridItem, Image, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { DEFAULT_IMAGE_URL } from '@/app/utils/constants';

export default function Page({ params }: { params: { volumeId: string } }) {
    // Fetch data using SWR
    const { data: bookData, error } = useSWR<BookVolume>(`https://www.googleapis.com/books/v1/volumes/${params?.volumeId}`, (url: string) =>
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => deepCopy(data))
    );

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!bookData) {
        return <div>Loading...</div>;
    }

    // Function to strip HTML tags from a string
    const stripHtmlTags = (htmlString: string) => {
        return htmlString.replace(/<[^>]+>/g, "");
    };

    let volumeInfo = bookData!.volumeInfo;
    return (
        <Box maxW="1200px" mx="auto" p="4">
            <Grid templateColumns="repeat(7, 1fr)" gap="4">
                <GridItem colSpan={2} p={4}>
                    {/* Check if medium image exists, if not, display the thumbnail */}
                    {!volumeInfo?.imageLinks?.medium && (
                        <Image
                            src={volumeInfo?.imageLinks?.thumbnail ? volumeInfo?.imageLinks?.thumbnail.replace('http:', 'https:') : DEFAULT_IMAGE_URL}
                            alt={volumeInfo.title}
                            w={'100%'}
                        />
                    )}
                    {/* If medium image exists, display it */}
                    {volumeInfo?.imageLinks?.medium && (
                        <Image
                            src={volumeInfo?.imageLinks?.medium.replace('http:', 'https:')}
                            alt={volumeInfo?.title}
                        />
                    )}
                </GridItem>
                <GridItem colSpan={3}>
                    <Text fontSize="2xl" fontWeight="bold" mb="2">
                        {volumeInfo?.title}
                    </Text>
                    <Text fontSize="lg" color="gray.600" mb="2">
                        by {volumeInfo?.authors?.join(", ")}
                    </Text>
                    <Text fontSize="lg" mb="2">
                        Publisher: {volumeInfo?.publisher}
                    </Text>
                    <Text fontSize="lg" mb="2">
                        Published Date: {volumeInfo?.publishedDate}
                    </Text>
                    <hr />
                    <Text fontSize="lg" mb="2">
                        {volumeInfo?.description && stripHtmlTags(volumeInfo?.description)}
                    </Text>
                </GridItem>
                <GridItem colSpan={2}>
                    <Stack direction={"row"}>
                        <Divider orientation="vertical" />
                        <Stack direction={"column"}>
                            <Text fontSize="lg" mb="2">
                                Categories: {volumeInfo?.categories?.join(", ")}
                            </Text>
                            <Text fontSize="lg" mb="2">
                                Page Count: {volumeInfo?.pageCount}
                            </Text>
                            <Text fontSize="lg" mb="2">
                                {volumeInfo?.dimensions && <>Dimensions: {volumeInfo?.dimensions?.height} x {volumeInfo?.dimensions?.width} x{" "}
                                    {volumeInfo?.dimensions?.thickness}</>}
                            </Text>
                            <Text fontSize="lg" mb="2">
                                Language: {volumeInfo?.language}
                            </Text>
                            <Badge colorScheme="blue" mb="4">
                                {bookData?.saleInfo?.saleability === "NOT_FOR_SALE" ? "Not for Sale" : "For Sale"}
                            </Badge>
                            {bookData?.accessInfo?.pdf?.isAvailable && (
                                <Link href={bookData?.accessInfo?.pdf?.acsTokenLink} isExternal>
                                    <Button colorScheme="blue" w={'100%'}>
                                        PDF Preview
                                    </Button>
                                </Link>
                            )}
                        </Stack>
                    </Stack>
                </GridItem>
            </Grid>
        </Box>
    );
};
