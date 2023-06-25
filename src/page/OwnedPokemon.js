import React, { useEffect, useState } from 'react';
import Confirmation from '../component/Confirmation';
import Alert from '../component/Alert';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { getPokemonImage } from '../fetcher/getPokemonImage';
import OwnedCard from '../component/OwnedCard';

const OwnedPokemon = () => {
  const [ownedPokemon, setOwnedPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertStatus, setAlertStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(true);

  const maxOwnedPokemon = 32; 

  useEffect(() => {
    const fetchData = async () => {
      const storedPokemon = JSON.parse(localStorage.getItem('ownedPokemon') || '[]');

      if (storedPokemon.length > maxOwnedPokemon) {
        storedPokemon.length = maxOwnedPokemon;
        localStorage.setItem('ownedPokemon', JSON.stringify(storedPokemon));
      }

      const pokemonData = await Promise.all(storedPokemon.map(async (pokemonName) => {
        const pokemonImage = await getPokemonImage(pokemonName);
        return {
          name: pokemonName,
          image: pokemonImage,
        };
      }));

      setOwnedPokemon(pokemonData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleRelease = (pokemonName) => {
    setSelectedPokemon(pokemonName);
    setIsConfirmationOpen(true);
  };

  const confirmRelease = () => {
    const updatedOwnedPokemon = ownedPokemon.filter((pokemon) => pokemon.name !== selectedPokemon);
    localStorage.setItem('ownedPokemon', JSON.stringify(updatedOwnedPokemon));
    setOwnedPokemon(updatedOwnedPokemon);
    setIsConfirmationOpen(false);
    setSelectedPokemon(null);
    setAlertMessage(`You released ${selectedPokemon} successfully!`);
    setAlertStatus('success');
    setIsAlertOpen(true);
    setTimeout(() => {
      setIsAlertOpen(false);
    }, 3000);
  };

  const cancelRelease = () => {
    setIsConfirmationOpen(false);
    setSelectedPokemon(null);
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => paginate(page)}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-1 ${
            currentPage === page ? 'bg-blue-700' : ''
          }`}
        >
          {page}
        </button>
      );
    }

    return buttons;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = ownedPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(ownedPokemon.length / pokemonPerPage);

  const skeletonCards = Array.from({ length: pokemonPerPage - currentPokemon.length }).map((_, index) => (
    <div
      key={`skeleton-${index}`}
      className="bg-gray-200 p-4 rounded-lg flex flex-col items-center justify-between transform transition duration-300 hover:scale-105 animate-pulse"
    >
      <div className="w-32 h-32 bg-gray-400 mb-2 rounded"></div>
      <div className="w-16 h-4 bg-gray-400 mb-2 rounded"></div>
      <div className="flex">
        <div className="w-16 h-8 bg-red-400 mr-2 rounded"></div>
        <div className="w-16 h-8 bg-blue-400 rounded"></div>
      </div>
    </div>
  ));

  return (
    <div className="max-w-full bg-white rounded-lg p-8 mt-4 mb-10 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Owned Pokemon</h1>
        <h2 className="text-2xl font-bold">Total: {ownedPokemon.length} / {maxOwnedPokemon}</h2>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-4 gap-4">
          {skeletonCards}
        </div>
      ) : (
        <>
          {ownedPokemon.length === 0 && (
            <p className="text-lg">You don't have any pokemon yet.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-2 mb-20">
            {currentPokemon.map((pokemon) => (
              <OwnedCard
                key={pokemon.name}
                pokemon={pokemon}
                handleRelease={handleRelease}
              />
            ))}
            {skeletonCards}
          </div>
          <div className="mt-4 flex justify-center">
            {currentPage > 1 && (
              <button
                onClick={() => paginate(currentPage - 1)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-1"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
            )}
            {renderPaginationButtons()}
            {currentPage < totalPages && (
              <button
                onClick={() => paginate(currentPage + 1)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-1"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            )}
          </div>
        </>
      )}
      <Confirmation
        isOpen={isConfirmationOpen}
        onClose={cancelRelease}
        message={`Are you sure you want to release ${selectedPokemon}?`}
        confirmText="Release"
        confirmColor="red"
        onCancel={cancelRelease}
        onConfirm={confirmRelease}
      />

      {isAlertOpen && (
        <div className="absolute top-0 left-0 right-0 z-10 mt-6 mx-auto">
          <Alert
            message={alertMessage}
            status={alertStatus}
            onClose={() => setIsAlertOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default OwnedPokemon;
