import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

const Card = ({ pokemon }) => {
  const { name, url } = pokemon;

  return (
    <div className="w-96 rounded overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
      <LazyLoad height={200} once>
        <div
          className="w-full h-72 bg-center bg-cover"
          style={{
            backgroundImage: `url(https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/official-artwork/${url.split('/')[6]}.png?raw=true)`,
            backgroundSize: 'cover'
          }}
        />
      </LazyLoad>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name.toUpperCase()}</div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link to={`/pokemon/${name}`} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-center text-gray-700 mr-2 mb-2 w-full hover:bg-gray-300 hover:text-gray-800 transition-colors duration-300 ease-in-out transform hover:scale-105">View Details</Link>
      </div>
    </div>
  );
};

export default Card;
