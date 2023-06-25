import React from 'react';
import { Link } from 'react-router-dom';

const OwnedCard = ({ pokemon, handleRelease }) => {
  const { name, image } = pokemon;

  return (
    <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center justify-between transform transition duration-300 hover:scale-105">
      <img src={image} alt={name} className="w-32 h-32 object-cover" />
      <span className="text-xl mb-2">{name.toUpperCase()}</span>
      <div>
        <button
          onClick={() => handleRelease(name)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          Release
        </button>
        <Link
          to={`/pokemon/${name}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default OwnedCard;
