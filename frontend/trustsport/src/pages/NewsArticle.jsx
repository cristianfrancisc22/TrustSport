import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Flex, Heading, Image, Text } from '@chakra-ui/react';

function NewsArticle() {
    const { id } = useParams();
    const [news, setNews] = useState({});

    useEffect(() => {
        // Fetch news article data by id
        fetch(`http://localhost:8080/api/v1/post/${id}`)
            .then(response => response.json())
            .then(data => setNews(data))
            .catch(error => console.error('Error fetching news:', error));
    }, [id]);

    if (!news) {
        return <div>Loading...</div>; // Show loading message while fetching data
    }

    const { thumbnail, title, text, team, createdBy, sportType, createdDate, championship, lastModifiedBy, lastModifiedDate } = news;

    // Function to format the date into "day.month.year hour:minute" format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = (date.getMonth() + 1).toString().padStart(2, '0') // Month is zero-based
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    return (
        <Container maxW='container.md' color='#262626' mb={20} mt={20}>
            <Flex align='center' backgroundColor="gold" fontSize='sm' width='fit-content' borderRadius="md" px={2} py={1} fontWeight="bold" color="black">
                <Heading fontSize='md'>{sportType}</Heading>
                <Heading fontSize='md' _before={{ content: '"\\2192"', display: 'inline-block', mr: '5px', ml: '5px' }}> {championship} </Heading>
                <Heading fontSize='md' _before={{ content: '"\\2192"', display: 'inline-block', mr: '5px', ml: '5px' }}>{team}</Heading>
            </Flex>
            <Heading noOfLines={[1, 2, 3]} fontSize='40px' mb='5' className="text-xl font-semibold mb-2">{title}</Heading>
            <Box w='100%' mb={10}>
                <Image
                    borderRadius='md'
                    borderColor='black'
                    borderStyle='double'
                    borderWidth='2px'
                    src={thumbnail ? `http://localhost:8080/api/v1/post/thumbnail/download/${id}` : ""}
                    alt="Thumbnail"
                    className="w-full h-auto rounded-lg mb-5"
                />
                <Flex align='center' justify='center'>
                    <Flex align='center' gap='5px' fontSize='xs' fontWeight='normal' width='100%'>
                        Articol de <Heading fontSize='xs' fontStyle='normal' color='red' width='fit'>{createdBy}</Heading>  |  Publicat: {formatDate(createdDate)}  |  Actualizat: {formatDate(lastModifiedDate)}
                    </Flex>
                </Flex>
            </Box>
            <Text dangerouslySetInnerHTML={{ __html: text }}></Text>
        </Container>
    );
}

export default NewsArticle;
