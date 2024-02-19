import React from 'react';
import defaultThumbnail from "../img/ads/default.webp";
import { Link } from 'react-router-dom';

const SimpleNews = ({ news }) => {
  const { thumbnailLink, title, text, team, id } = news;

  // Extracting the first 10 words from the text
  const trimmedText = text.split(' ').slice(0, 10).join(' ');

  return (
    <Link to={{ pathname: `/news/${id}`, state: news}} className="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
      <div className="flex flex-row sm:block hover-img">
        <img className="max-w-full w-full mx-auto" src={thumbnailLink ? `http://localhost:8080/api/v1/downloadThumbnail/${id}` : defaultThumbnail} alt="alt title" />
        <div className="py-0 sm:py-3 pl-3 sm:pl-0">
          <h3 className="text-lg font-bold leading-tight mb-2">
            {title}
          </h3>
          <p className="hidden md:block text-gray-600 leading-tight mb-1" dangerouslySetInnerHTML={{ __html: trimmedText }}></p> {/* Render the first 10 words */}
          <span className="text-gray-500"><span className="inline-block h-3 border-l-2 border-red-600 mr-2"></span>{team}</span>
        </div>
      </div>
    </Link>
  );
};

export default SimpleNews;
