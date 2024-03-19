import { useParams, Link } from "react-router-dom";
import SimpleNews from "../components/SimpleNews";
import { useEffect, useState } from "react";
import { Box, Center, Container, Flex, SimpleGrid, Wrap, WrapItem } from "@chakra-ui/react";

export default function ChampionshipNews(props) {
    const { championship } = useParams();
    const [championshipNews, setChampionshipNews] = useState([]);
    const [championshipName, setChampionshipName] = useState(props.text)

    useEffect(() => {
        fetchChampionshipNews();
    }, []);

    const fetchChampionshipNews = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/post/championship/${championship}`, {
                headers: {
                    'Content-Type': 'application/json' // Specify content type if needed
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }
            const data = await response.json();
            setChampionshipNews(data);
        } catch (error) {
            console.error('Error fetching news:', error.message);
        }
    };

    return (
        <Container maxW='8xl' mb='20'>
            <SimpleGrid mt='20' minChildWidth='300px' spacing='20px'>
            {championshipNews.map((news, index) => (
                <Box>
                    <SimpleNews key={index} news={news} />
                </Box>
            ))}
            </SimpleGrid>

        </Container>
        // <Link to={{ pathname: `/news` }} className="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
        //     <div className="bg-white py-6">
        //         <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
        //             <div className="flex flex-row flex-wrap">
        //                 <div className="flex-shrink max-w-full w-full overflow-hidden">
        //                     <div className="w-full py-3">
        //                         <h2 className="text-gray-800 text-2xl pt-3 font-bold">
        //                             <span className="inline-block h-5 border-l-3 border-red-600 mr-2"></span>{championshipName}
        //                         </h2>
        //                     </div>
        //                     <div className="flex flex-row flex-wrap -mx-3">
        //                         {championshipNews.map((news, index) => (
        //                             <SimpleNews key={index} news={news} />
        //                         ))}
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </Link>
    );
}
