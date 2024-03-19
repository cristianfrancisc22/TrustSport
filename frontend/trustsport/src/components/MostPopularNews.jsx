import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const MostPopularNews = () => {
    const [mostPopularNews, setMostPopularNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const news = await fetchMostPopularNews();
            setMostPopularNews(news);
        };

        fetchNews();
    }, []);

    const fetchMostPopularNews = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/post/most-viewed');
            return await response.json();
        } catch (error) {
            console.error('Error fetching most popular news:', error);
            return [];
        }
    };

    return (
            <div className="w-full bg-white">
                <div className="mb-6">
                    <div className="p-4 bg-gray-100">
                        <h2 className="text-lg font-bold">Most Popular</h2>
                    </div>
                    <ul className="post-number">
                        {mostPopularNews.map((newsItem, index) => (
                            <li key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                <Link to={{ pathname: `/news/${newsItem.id}`, state: newsItem }} className="text-lg font-bold px-6 py-3 flex flex-row items-center">
                                    {newsItem.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
    );
};

export default MostPopularNews;
