import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function NewsArticle() {
    const { id } = useParams();
    const [news, setNews] = useState(null);

    useEffect(() => {
        console.log(id + "  id")
        // Fetch news article data by id
        fetch(`http://localhost:8080/api/v1/getNewsById/${id}`)
            .then(response => response.json())
            .then(data => setNews(data))
            .catch(error => console.error('Error fetching news:', error));
    }, [id]);

    if (!news) {
        return <div>Loading...</div>; // Show loading message while fetching data
    }

    const { thumbnailLink, title, text, team } = news;

    return (
        <div className="max-w-4xl mx-auto my-8 bg-white rounded shadow-md p-4">
            <img src={thumbnailLink ? `http://localhost:8080/api/v1/downloadThumbnail/${id}` : ""} alt="Thumbnail" className="w-full h-auto rounded-lg mb-5" />
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
            <p className="text-gray-500">{team}</p>
        </div>
    );
}

export default NewsArticle;
