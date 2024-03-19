import React from 'react';
import { VStack, Heading, Text, AspectRatio, Box, Image } from '@chakra-ui/react';
import AvatarImage from '../img/avatar.jpg';

export default function OpinionCard({ opinion }) {
    return (
        <Box
            _hover={{
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(-2px)',
                cursor: 'pointer', // Change cursor on hover
                color: 'red', // Change text color to red on hover
            }}
            transition='all 0.3s ease'
            h='auto'
            minH={'150px'} 
            w='300px' 
            border='solid' 
            borderWidth='1px' 
            justifyContent='center' 
            alignItems='center' 
            overflow='hidden'
            borderRadius='md'
            p='2'
            className='opinion-card'
        >
            <VStack h='100%' w='100%' spacing='4'>
                <AspectRatio ratio={4 / 3} w='100%' maxW='100%'>
                    <Image 
                        src={AvatarImage} 
                        objectFit='cover'
                        w='100%' 
                        h='100%' 
                        maxW='100%' 
                        maxH='100%'
                        borderRadius='md' 
                        alt={`Thumbnail for opinion by ${opinion.createdBy}`}
                        _hover={{
                            border: '1px solid red', // Add red border on hover
                        }}
                    />
                </AspectRatio>
                <Box textAlign='center' w='100%' h='150px'>
                    <Heading size='sm' textColor='black' mb='2'>{opinion.createdBy}</Heading>
                    <Text 
                        fontSize='md' 
                        textAlign='center' 
                        noOfLines={3} 
                        overflow='hidden' 
                        textOverflow='ellipsis'
                        _hover={{
                            color: 'red', // Change text color to red on hover
                        }}
                    >
                        {opinion.title}
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
}
