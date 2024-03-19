import BigGrid from "../components/BigGrid"
import Header from "../components/Header"
import Cookies from "universal-cookie"
import { useEffect, useState } from "react"
import HeroBigGrid from "../components/HeroBigGrid"
import Ad1 from "../img/ads/ads_728.jpg"
import Ad2 from "../img/ads/250.jpg"
import SimpleNews from "../components/SimpleNews"
import MostPopularNews from "../components/MostPopularNews"
import ClubsBar from "../components/ClubsBar"
import { Box, Container, Flex, HStack, Heading } from "@chakra-ui/react"
import OpinionCard from "../components/OpinionCard"
import OpinionContainer from "../components/OpinionContainer"

export default function Main() {
    const [latestNews, setLatestNews] = useState([]);
    const [liga1LatestNews, setLiga1LatestNews] = useState([]);
    const [latestInternationalNews, setLatestInternationalNews] = useState([])
    const [latestLiga2News, setLatestLiga2News] = useState([]);

    useEffect(() => {
        fetchLatestNews();
        fetchLatestLiga1News();
        fetchInternationalLatestNews();
        fetchLatestLiga2News();
    }, []);

    const fetchLatestNews = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/post/latest', {
                headers: {
                    'Content-Type': 'application/json' // Specify content type if needed
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch latest news');
            }
            const data = await response.json();
            setLatestNews(data);
        } catch (error) {
            console.error('Error fetching latest news:', error.message);
        }
    };

    const fetchLatestLiga1News = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/post/latest/championship/${"LIGA 1"}`, {
                headers: {
                    'Content-Type': 'application/json' // Specify content type if needed
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch latest news');
            }
            const data = await response.json();
            setLiga1LatestNews(data);
        } catch (error) {
            console.error('Error fetching latest news:', error.message);
        }
    };

    const fetchLatestLiga2News = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/post/latest/championship/${"LIGA 2"}`, {
                headers: {
                    'Content-Type': 'application/json' // Specify content type if needed
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch latest news');
            }
            const data = await response.json();
            setLatestLiga2News(data);
        } catch (error) {
            console.error('Error fetching latest news:', error.message);
        }
    };

    const fetchInternationalLatestNews = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/post/international/latest`, {
                headers: {
                    'Content-Type': 'application/json' // Specify content type if needed
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch latest news');
            }
            const data = await response.json();
            setLatestInternationalNews(data);
        } catch (error) {
            console.error('Error fetching latest news:', error.message);
        }
    };

    return (
        <div className="text-gray-700 pt-9 sm:pt-10">
            <main id="content">
                <div className="bg-gray-50 py-4 hidden">
                    <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
                        <div className="mx-auto table text-center text-sm">
                            <a className="uppercase" href="#">Advertisement</a>
                            <a href="#">
                                <img src={Ad1} alt="advertisement area"/>
                            </a>
                        </div>
                    </div>
                </div>

                <HeroBigGrid news={latestNews} />
                <ClubsBar/>

                <div className="bg-white">
                    <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
                        <div className="flex flex-row flex-wrap">
                            <div className="flex-shrink max-w-full w-full lg:w-2/3 overflow-hidden">
                                <div className="w-full py-3">
                                    <h2 className="text-gray-800 text-2xl font-bold">
                                        <span className="inline-block h-5 border-l-3 border-red-600 mr-2"></span>LIGA 1
                                    </h2>
                                </div>
                                <div className="flex flex-row flex-wrap -mx-3">
                                    {liga1LatestNews.map(news => (
                                        <SimpleNews key={news.id} news={news} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex-shrink max-w-full w-full lg:w-1/3 lg:pl-8 lg:pt-14 lg:pb-8 order-first lg:order-last">
                                <div className="w-full bg-gray-50 h-full">
                                    <div className="text-sm py-6 sticky">
                                        <div className="w-full text-center">
                                            <a className="uppercase" href="#">Advertisement</a>
                                            <a href="#">
                                                <img className="mx-auto" src={Ad2} alt="advertisement area"/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Heading textAlign='left' ml={20} mt='5' mb='5'>Opiniile TrustSport</Heading>
                <OpinionContainer/>


                    
                <div className="bg-white py-6">
                    <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
                        <div className="flex flex-row flex-wrap">
                            <div className="flex-shrink max-w-full w-full overflow-hidden">
                                <div className="w-full py-3">
                                    <h2 className="text-gray-800 text-2xl font-bold">
                                        <span className="inline-block h-5 border-l-3 border-red-600 mr-2"></span>International
                                    </h2>
                                </div>
                                <div className="flex flex-row flex-wrap -mx-3">
                                    {latestInternationalNews.map(news => (
                                        <SimpleNews key={news.id} news={news} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 py-6">
                    <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
                        <div className="flex flex-row flex-wrap">
                            <div className="flex-shrink max-w-full w-full lg:w-2/3 overflow-hidden">
                                <div className="w-full py-3">
                                    <h2 className="text-gray-800 text-2xl font-bold">
                                        <span className="inline-block h-5 border-l-3 border-red-600 mr-2"></span>Liga 2
                                    </h2>
                                </div>
                                <div className="flex flex-row flex-wrap -mx-3">
                                    {latestLiga2News.map(news => (
                                        <SimpleNews key={news.id} news={news} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex-shrink max-w-full w-full lg:w-1/3 lg:pl-8 lg:pt-14 lg:pb-8 order-first lg:order-last">
                                <MostPopularNews/>
                                <div className="text-sm py-6 sticky">
                                    <div className="w-full text-center">
                                        <a className="uppercase" href="#">Advertisement</a>
                                        <a href="#">
                                            <img className="mx-auto" src={Ad2} alt="advertisement area"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <a href="#" className="back-top fixed p-4 rounded bg-gray-100 border border-gray-100 text-gray-500 dark:bg-gray-900 dark:border-gray-800 right-4 bottom-4 hidden" aria-label="Scroll To Top">
                <svg width="1rem" height="1rem" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clipRule="evenodd"></path>
                    <path fillRule="evenodd" d="M7.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8 3.707 5.354 6.354a.5.5 0 11-.708-.708l3-3z" clipRule="evenodd"></path>
                </svg>
            </a>
        </div>
    )
}
