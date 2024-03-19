import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import defaultThumbnail from '../img/ads/default.webp'; // Import the default thumbnail image
import { Grid } from '@chakra-ui/react';

// HeroBigGrid component
const HeroBigGrid = ({ news }) => {
  return (
    <Grid pt='6'>
      <div className="container mx-auto px-3 sm:px-4 xl:px-2">
        {/* big grid 1 */}
        <div className="flex flex-row flex-wrap">
          {/* Left cover */}
          {news.length > 0 && <LeftCover news={news[0]} />}
          {/* Box news */}
          <BoxNews news={news.slice(1)} />
        </div>
      </div>
    </Grid>
  );
};

const LeftCover = ({ news }) => {
  const { title, text, sportType, championship, id } = news;
  const [imageLoaded, setImageLoaded] = useState(true); // Initialize to true

  useEffect(() => {
    setImageLoaded(true); // Reset imageLoaded when the news prop changes
  }, [news]);


  const handleImageLoad = () => {
    setImageLoaded(true);
  }
  
  return (
    // <Card>

    // </Card>
    <div className="flex-shrink w-full lg:w-1/2 pb-1 lg:pb-0 lg:pr-1 hover:border-red-500 border-8 border-black border-double">
      <Link to={{ pathname: `/news/${id}`, state: news}} >
      <div className="relative hover-img max-h-98 overflow-hidden">
          <img
            className="max-w-full w-full mx-auto h-auto"
            src={`http://localhost:8080/api/v1/post/thumbnail/download/${id}?${imageLoaded ? 'loaded=true' : ''}`}
            alt="Image description"
            onLoad={handleImageLoad}
          />
        <div className="absolute px-5 pt-8 pb-5 bottom-0 w-full bg-gradient-cover">
            <h2 className="text-3xl font-bold capitalize text-white mb-3">{title}</h2>
          <div className="text-gray-100 hidden sm:inline-block" dangerouslySetInnerHTML={{ __html: truncatedText }}></div> {/* Render truncated HTML content */}
          <div className="pt-2">
            <div className="text-gray-100 flex items-center">
              <div className="inline-block h-3 border-l-2 border-red-600 mr-2"></div>
              <span>{sportType}</span>
              <div className="inline-block custom-dot"></div>
              <span>{championship}</span>
            </div>
          </div>
        </div>
      </div>
      </Link>
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
  const { title, sportType, championship, id } = news;
  const [imageLoaded, setImageLoaded] = useState(true); // Initialize to true

  useEffect(() => {
    setImageLoaded(true); // Reset imageLoaded when the news prop changes
  }, [news]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <article className="flex-shrink w-full sm:w-1/2">
      <Link to={{ pathname: `/news/${id}`, state: news}} >
      <div className="relative hover-img max-h-48 overflow-hidden">
          <img
            className="max-w-full w-full mx-auto h-auto"
            src={`http://localhost:8080/api/v1/post/thumbnail/download/${id}?${imageLoaded ? 'loaded=true' : ''}`}
            alt="Image description"
            onLoad={handleImageLoad}
          />
        <div className="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-cover">
            <h2 className="text-lg font-bold capitalize leading-tight text-white mb-1">{title}</h2>
          <div className="pt-1">
            <div className="text-gray-100 flex items-center">
              <div className="inline-block h-3 border-l-2 border-red-600 mr-2"></div>
              <span>{sportType}</span>
              <div className="inline-block custom-dot"></div>
              <span>{championship}</span>
            </div>
          </div>
        </div>
      </div>
      </Link>
    </article>
  );
};

export default HeroBigGrid;
