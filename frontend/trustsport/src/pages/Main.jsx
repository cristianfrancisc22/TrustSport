import BigGrid from "../components/BigGrid"
import Header from "../components/Header"
import Cookies from "universal-cookie"
import { useEffect, useState } from "react"
import HeroBigGrid from "../components/HeroBigGrid"
import Ad1 from "../img/ads/ads_728.jpg"
import Ad2 from "../img/ads/250.jpg"
import Img3 from "../img/dummy/img3.jpg"
import Img4 from "../img/dummy/img4.jpg"
import Img5 from "../img/dummy/img5.jpg"
import Img14 from "../img/dummy/img14.jpg"
import SimpleNews from "../components/SimpleNews"
import MostPopularNews from "../components/MostPopularNews"

export default function Main() {
    const [latestNews, setLatestNews] = useState([]);
    const [liga1LatestNews, setLiga1LatestNews] = useState([]);
    const [latestInternationalNews, setLatestInternationalNews] = useState([])
    const [latestLiga2News, setLatestLiga2News] = useState([])

  
    useEffect(() => {
    fetchLatestNews();
    fetchLatestLiga1News();
    fetchInternationalLatestNews();
    fetchLatestLiga2News();
    }, []);

    const fetchLatestNews = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/getLatestNews', {
        headers: {
            'Content-Type': 'application/json' // Specify content type if needed
        }
        });
        if (!response.ok) {
        throw new Error('Failed to fetch latest news');
        }
        const data = await response.json();
        setLatestNews(data);
        // console.log(data)
        // console.log(data[0])
        // console.log(defaultNews)
    } catch (error) {
        console.error('Error fetching latest news:', error.message);
    }
    };

    const fetchLatestLiga1News = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/getLatestNews/${"LIGA 1"}`, {
            headers: {
                'Content-Type': 'application/json' // Specify content type if needed
            }
            });
            if (!response.ok) {
            throw new Error('Failed to fetch latest news');
            }
            const data = await response.json();
            setLiga1LatestNews(data);
            // console.log("SUPERLIGA")
            // console.log(data)
        } catch (error) {
            console.error('Error fetching latest news:', error.message);
        }
        };

        const fetchLatestLiga2News = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/getLatestNews/${"LIGA 2"}`, {
                headers: {
                    'Content-Type': 'application/json' // Specify content type if needed
                }
                });
                if (!response.ok) {
                throw new Error('Failed to fetch latest news');
                }
                const data = await response.json();
                setLatestLiga2News(data);
                // console.log("SUPERLIGA")
                // console.log(data)
            } catch (error) {
                console.error('Error fetching latest news:', error.message);
            }
            };

        const fetchInternationalLatestNews = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/getLatestInternationalNews`, {
                headers: {
                    'Content-Type': 'application/json' // Specify content type if needed
                }
                });
                if (!response.ok) {
                throw new Error('Failed to fetch latest news');
                }
                const data = await response.json();
                setLatestInternationalNews(data);
                console.log("INTERNATIONAL")
                console.log(data)
            } catch (error) {
                console.error('Error fetching latest news:', error.message);
            }
            };
    

    const defaultNews = [
        {
            id: '1',
            title: 'Default Title 1',
            text: 'Default text 1',
            sport: 'Default Sport 1',
            championship: 'Default Championship 1'
        },
        {
            id: '2',
            title: 'Default Title 2',
            text: 'Default text 2',
            sport: 'Default Sport 2',
            championship: 'Default Championship 2'
        },
        {
            id: '3',
            title: 'Default Title 2',
            text: 'Default text 2',
            sport: 'Default Sport 2',
            championship: 'Default Championship 2'
        },
        {
            id: '4',
            title: 'Default Title 2',
            text: 'Default text 2',
            sport: 'Default Sport 2',
            championship: 'Default Championship 2'
        },
        {
            id: '5',
            title: 'Default Title 2',
            text: 'Default text 2',
            sport: 'Default Sport 2',
            championship: 'Default Championship 2'
        },
        {
            id: '6',
            title: 'Default Title 2',
            text: 'Default text 2',
            sport: 'Default Sport 2',
            championship: 'Default Championship 2'
        }
      ];


    return (
        <>
        <body class="text-gray-700 pt-9 sm:pt-10">
            {/* <!-- =========={ MAIN }==========  --> */}
            <main id="content">
                {/* <!-- advertisement --> */}
                <div class="bg-gray-50 py-4 hidden">
                <div class="xl:container mx-auto px-3 sm:px-4 xl:px-2">
                    <div class="mx-auto table text-center text-sm">
                    <a class="uppercase" href="#">Advertisement</a>
                    <a href="#">
                        <img src={Ad1} alt="advertisement area"/>
                    </a>
                    </div>
                </div>
                </div>

                <HeroBigGrid news={latestNews.length > 0 ? latestNews : defaultNews} />

                

                {/* <!-- block news --> */}
                <div class="bg-white">
                <div class="xl:container mx-auto px-3 sm:px-4 xl:px-2">
                    <div class="flex flex-row flex-wrap">
                    {/* <!-- Left --> */}
                    <div class="flex-shrink max-w-full w-full lg:w-2/3 overflow-hidden">
                        <div class="w-full py-3">
                        <h2 class="text-gray-800 text-2xl font-bold">
                            <span class="inline-block h-5 border-l-3 border-red-600 mr-2"></span>LIGA 1
                        </h2>
                        </div>
                        <div class="flex flex-row flex-wrap -mx-3">
                        {liga1LatestNews.length > 0 ? liga1LatestNews.map((news, index) => (
                            <SimpleNews key={index} news={news} />))
                        : defaultNews.map((news, index) => (
                            <SimpleNews key={index} news={news}/>))
                        }
                        </div>
                    </div>
                    {/* <!-- right --> */}
                    <div class="flex-shrink max-w-full w-full lg:w-1/3 lg:pl-8 lg:pt-14 lg:pb-8 order-first lg:order-last">
                        <div class="w-full bg-gray-50 h-full">
                        <div class="text-sm py-6 sticky">
                            <div class="w-full text-center">
                            <a class="uppercase" href="#">Advertisement</a>
                            <a href="#">
                                <img class="mx-auto" src={Ad2} alt="advertisement area"/>
                            </a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                {/* <!-- slider news --> */}
                
                {/* <!-- block news --> */}
                <div class="bg-white py-6">
                <div class="xl:container mx-auto px-3 sm:px-4 xl:px-2">
                    <div class="flex flex-row flex-wrap">
                    <div class="flex-shrink max-w-full w-full overflow-hidden">
                        <div class="w-full py-3">
                        <h2 class="text-gray-800 text-2xl font-bold">
                            <span class="inline-block h-5 border-l-3 border-red-600 mr-2"></span>International
                        </h2>
                        </div>
                        <div class="flex flex-row flex-wrap -mx-3">
                            {latestInternationalNews.length > 0 ? latestInternationalNews.map((news, index) => (
                                <SimpleNews key={index} news={news} />))
                            : defaultNews.map((news, index) => (
                                <SimpleNews key={index} news={news}/>))
                            }
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                {/* <!-- block news --> */}
                <div class="bg-gray-50 py-6">
                <div class="xl:container mx-auto px-3 sm:px-4 xl:px-2">
                    <div class="flex flex-row flex-wrap">
                    {/* <!-- Left --> */}
                    <div class="flex-shrink max-w-full w-full lg:w-2/3 overflow-hidden">
                    <div class="w-full py-3">
                        <h2 class="text-gray-800 text-2xl font-bold">
                            <span class="inline-block h-5 border-l-3 border-red-600 mr-2"></span>Liga 2
                        </h2>
                    </div>
                    <div class="flex flex-row flex-wrap -mx-3">
                        {/* Render the first news separately */}
                        {latestLiga2News.length > 0 && latestLiga2News[0] && (
                            <div class="flex-shrink max-w-full w-full px-3 pb-5">
                                <SimpleNews news={latestLiga2News[0]} />
                            </div>
                        )}
                        {/* Render the rest of the news */}
                        {latestLiga2News.slice(1).map((news, index) => (
                            <div class="flex-shrink max-w-full w-full px-3 pb-5">
                                <SimpleNews key={index} news={news} />
                            </div>
                        ))}
                        {/* If latestLiga2News is empty, render default news */}
                        {latestLiga2News.length === 0 && defaultNews.map((news, index) => (
                            <div class="flex-shrink max-w-full w-full px-3 pb-5">
                                <SimpleNews key={index} news={news} />
                            </div>
                        ))}
                    </div>
                </div>

                    {/* <!-- right --> */}
                    <div class="flex-shrink max-w-full w-full lg:w-1/3 lg:pl-8 lg:pt-14 lg:pb-8 order-first lg:order-last">
                        <MostPopularNews/>

                        <div class="text-sm py-6 sticky">
                        <div class="w-full text-center">
                            <a class="uppercase" href="#">Advertisement</a>
                            <a href="#">
                            <img class="mx-auto" src={Ad2} alt="advertisement area"/>
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>


            </main>
            {/* <!-- end main --> */}

            {/* <!-- =========={ SCROLL TO TOP }==========  --> */}
            <a href="#" class="back-top fixed p-4 rounded bg-gray-100 border border-gray-100 text-gray-500 dark:bg-gray-900 dark:border-gray-800 right-4 bottom-4 hidden" aria-label="Scroll To Top">
                <svg width="1rem" height="1rem" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clip-rule="evenodd"></path>
                <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8 3.707 5.354 6.354a.5.5 0 11-.708-.708l3-3z" clip-rule="evenodd"></path>
                </svg>
            </a>

            
            </body>
        </>
    )
}