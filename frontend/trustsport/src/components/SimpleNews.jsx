import React from 'react';
import defaultThumbnail from "../img/ads/default.webp";
import { Link } from 'react-router-dom';
import { Box, VStack, Heading, Text, Image, AspectRatio } from '@chakra-ui/react';

const SimpleNews = ({ news }) => {
  const { thumbnail, title, text, team, id } = news;

  return (
    <Link to={{ pathname: `/news/${id}`, state: news}} className="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
      <VStack align='start'>
        <AspectRatio ratio={4 / 3} w="100%"  
               
              _hover={{
                borderColor: "red", // Change the border color on hover
                borderWidth: "3px", // Increase the border width on hover
              }}>
          <Image
            objectFit="cover"
            src={thumbnail ? `http://localhost:8080/api/v1/post/thumbnail/download/${id}` : defaultThumbnail}
            alt="alt title"
          />
        </AspectRatio>
        <VStack align='start'>
          <Heading size='sm' alignContent='left'>
            {title}
          </Heading>
          <Text noOfLines={2} _hover={{ color: "red" }} dangerouslySetInnerHTML={{ __html: text }}></Text>
          <Box color='black' _hover={{ color: "red" }}>
            <Link to={`/news/${team}`}>
              <Box className="inline-block h-3 border-l-2 border-red-600 mr-2"></Box>
              {team}
            </Link>
          </Box>
        </VStack>
      </VStack>
    </Link>
  );
};

export default SimpleNews;
