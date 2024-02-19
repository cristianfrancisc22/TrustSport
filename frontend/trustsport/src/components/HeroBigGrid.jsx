import React, { useState, useEffect } from 'react';
import defaultThumbnail from '../img/ads/default.webp'; // Import the default thumbnail image

// HeroBigGrid component
const HeroBigGrid = ({ news }) => {
  return (
    <div className="bg-white py-6">
      <div className="container mx-auto px-3 sm:px-4 xl:px-2">
        {/* big grid 1 */}
        <div className="flex flex-row flex-wrap">
          {/* Left cover */}
          {news.length > 0 && <LeftCover news={news[0]} />}
          {/* Box news */}
          <BoxNews news={news.slice(1)} />
        </div>
      </div>
    </div>
  );
};

const LeftCover = ({ news }) => {
  const { title, text, sport, championship, id } = news;
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false); // Reset imageLoaded when the news prop changes
  }, [news]);

  // Function to truncate text to 10-15 words
  const truncateText = (text) => {
    const words = text.split(' ');
    if (words.length <= 15) {
      return text;
    } else {
      return words.slice(0, 15).join(' ') + '...';
    }
  };

  const truncatedText = truncateText(text);

  return (
    <div className="flex-shrink w-full lg:w-1/2 pb-1 lg:pb-0 lg:pr-1">
      <div className="relative hover-img max-h-98 overflow-hidden">
        <a href="#">
          <img
            className="max-w-full w-full mx-auto h-auto"
            src={imageLoaded ? `http://localhost:8080/api/v1/downloadThumbnail/${id}` : defaultThumbnail}
            alt="Image description"
            onLoad={() => setImageLoaded(true)}
          />
        </a>
        <div className="absolute px-5 pt-8 pb-5 bottom-0 w-full bg-gradient-cover">
          <a href="#">
            <h2 className="text-3xl font-bold capitalize text-white mb-3">{title}</h2>
          </a>
          <div className="text-gray-100 hidden sm:inline-block" dangerouslySetInnerHTML={{ __html: truncatedText }}></div> {/* Render truncated HTML content */}
          <div className="pt-2">
            <div className="text-gray-100 flex items-center">
              <div className="inline-block h-3 border-l-2 border-red-600 mr-2"></div>
              <span>{sport}</span>
              <div className="inline-block custom-dot"></div>
              <span>{championship}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// BoxNews component
const BoxNews = ({ news }) => {
  return (
    <div className="flex-shrink w-full lg:w-1/2">
      <div className="box-one flex flex-row flex-wrap">
        {news.map((item, index) => (
          <NewsArticle key={index} news={item} />
        ))}
      </div>
    </div>
  );
};

// NewsArticle component
const NewsArticle = ({ news }) => {
  const { title, sport, championship, id } = news;
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false); // Reset imageLoaded when the news prop changes
  }, [news]);

  return (
    <article className="flex-shrink w-full sm:w-1/2">
      <div className="relative hover-img max-h-48 overflow-hidden">
        <a href="#">
          <img
            className="max-w-full w-full mx-auto h-auto"
            src={imageLoaded ? `http://localhost:8080/api/v1/downloadThumbnail/${id}` : defaultThumbnail}
            alt="Image description"
            onLoad={() => setImageLoaded(true)}
          />
        </a>
        <div className="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-cover">
          <a href="#">
            <h2 className="text-lg font-bold capitalize leading-tight text-white mb-1">{title}</h2>
          </a>
          <div className="pt-1">
            <div className="text-gray-100 flex items-center">
              <div className="inline-block h-3 border-l-2 border-red-600 mr-2"></div>
              <span>{sport}</span>
              <div className="inline-block custom-dot"></div>
              <span>{championship}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HeroBigGrid;
