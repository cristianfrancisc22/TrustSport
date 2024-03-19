import React, { useState, useEffect } from 'react';
import { Container, HStack, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import OpinionCard from './OpinionCard';

const opinionsPerPage = 4;

function OpinionContainer() {
    const [opinions, setOpinions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        async function fetchOpinions() {
            try {
                const response = await fetch('http://localhost:8080/api/v1/post/latest/postType/editorial');
                if (!response.ok) {
                    throw new Error('Failed to fetch opinions');
                }
                const data = await response.json();
                // Fetch thumbnail images for all opinions
                const opinionsWithThumbnails = await Promise.all(data.map(opinion => fetchThumbnail(opinion)));
                setOpinions(opinionsWithThumbnails);
                // Reset to the first page when opinions are fetched
                setCurrentPage(0);
            } catch (error) {
                console.error('Error fetching opinions:', error);
            }
        }

        fetchOpinions();
    }, []);

    // Function to fetch thumbnail image for a single opinion
    async function fetchThumbnail(opinion) {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/post/thumbnail/download/${opinion.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch thumbnail');
            }
            const thumbnailData = await response.blob();
            const thumbnailUrl = URL.createObjectURL(thumbnailData);
            return { ...opinion, thumbnailUrl };
        } catch (error) {
            console.error('Error fetching thumbnail:', error);
            return { ...opinion, thumbnailUrl: null };
        }
    }

    const handlePrevPage = () => {
        const totalPages = Math.ceil(opinions.length / opinionsPerPage);
        setCurrentPage(prevPage => (prevPage === 0 ? totalPages - 1 : prevPage - 1));
    };

    const handleNextPage = () => {
        if (opinions.length <= (currentPage + 1) * opinionsPerPage) {
            // Reset to the first page when reaching the end
            setCurrentPage(0);
        } else {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const startIndex = currentPage * opinionsPerPage;
    const endIndex = startIndex + opinionsPerPage;
    const opinionsToShow = opinions.slice(startIndex, endIndex);

    return (
        <Container maxW='8xl'>   
            <HStack className='opinions-container' justifyContent='center' alignItems='center' mt='6px' >
                <IconButton
                    icon={<ChevronLeftIcon />}
                    aria-label='Previous Page'
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    bg='tomato'
                />
                {opinionsToShow.map(opinion => (
                    <OpinionCard key={opinion.id} opinion={opinion} />
                ))}
                <IconButton
                    icon={<ChevronRightIcon />}
                    aria-label='Next Page'
                    onClick={handleNextPage}
                    disabled={opinionsToShow.length < opinionsPerPage}
                    bg='tomato'
                />
            </HStack>
        </Container>
    );
}

export default OpinionContainer;
