import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBolt, faShieldAlt, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from '../component/Modal';
import Catch from '../component/Catch';
import Loading from '../component/Loading';
import Alert from '../component/Alert';
import { getPokemonDetail } from '../fetcher/getPokemonDetail';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [catchOpen, setCatchOpen] = useState(false);
  const [catchStatus, setCatchStatus] = useState(null);
  const [isAlreadyCaught, setIsAlreadyCaught] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertStatus, setAlertStatus] = useState('');

  const handleLoading = () => {
    return setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleFetchError = (error) => {
    setError(error);
    setLoading(false);
  };

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try{
        setLoading(true);
        setError(null);
        const data = await getPokemonDetail(id);
        setPokemon(data);
        handleLoading();
      } catch (error) {
        handleFetchError(error);
      }
    };
  
    fetchPokemonDetail();
  }, [id]);

  useEffect(() => {
    const ownedPokemon = JSON.parse(localStorage.getItem('ownedPokemon') || '[]');
    const isCaught = ownedPokemon.includes(pokemon?.name);
    setIsAlreadyCaught(isCaught);
  }, [pokemon]);

  const handleCatch = async () => {
    if (isAlreadyCaught) {
      return;
    }
  
    const ownedPokemon = JSON.parse(localStorage.getItem('ownedPokemon') || '[]');
  
    if (ownedPokemon.length >= 32) {
      setAlertMessage("Owned Pokemon is already full, please remove or release one of them :(");
      setAlertStatus("fail");
      setIsAlertOpen(true);
      return;
    }
  
    const successProbability = Math.random() < 0.5;
  
    if (successProbability) {
      ownedPokemon.push(pokemon.name);
      localStorage.setItem('ownedPokemon', JSON.stringify(ownedPokemon));
      setCatchStatus('success');
      setIsAlreadyCaught(true);
      openCatch();
    } else {
      setCatchStatus('failed');
      openCatch();
    }
  };
  
  const openModal = () => {
    setModalOpen(true);
  };

  const openCatch = () => {
    setCatchOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeCatch = () => {
    setCatchOpen(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-2xl p-8 mt-10 mb-10">
      <div className="flex items-center justify-center">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={pokemon.name}
          className="w-64 h-64"
        />
      </div>
      <h2 className="text-2xl font-bold mb-2">{pokemon.name.toUpperCase()}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold mb-2">Type:</h3>
          <ul className="flex flex-wrap">
            {pokemon.types.map((type) => (
              <li key={type.type.name} className="mr-2 capitalize">
                {type.type.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Weight:</h3>
          <p>{pokemon.weight}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Height:</h3>
          <p>{pokemon.height}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Abilities:</h3>
          <ul className="flex flex-wrap">
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name} className="mr-2 capitalize">
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Stats:</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name} className="flex items-center">
              {stat.stat.name === 'hp' && (
                <FontAwesomeIcon icon={faHeart} className="text-red-500 mr-2" />
              )}
              {stat.stat.name === 'attack' && (
                <FontAwesomeIcon icon={faBolt} className="text-yellow-500 mr-2" />
              )}
              {stat.stat.name === 'defense' && (
                <FontAwesomeIcon icon={faShieldAlt} className="text-blue-500 mr-2" />
              )}
              {stat.stat.name === 'speed' && (
                <FontAwesomeIcon icon={faTachometerAlt} className="text-green-500 mr-2" />
              )}
              {stat.stat.name === 'special-attack' && (
                <FontAwesomeIcon icon={faBolt} className="text-yellow-500 mr-2" />
              )}
              {stat.stat.name === 'special-defense' && (
                <FontAwesomeIcon icon={faShieldAlt} className="text-blue-500 mr-2" />
              )}
              <span className="text-lg font-bold">{stat.base_stat}</span>
              <span className="text-gray-500 ml-1 capitalize">{stat.stat.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Moves:</h3>
        <ul className="overflow-hidden">
          {pokemon.moves.slice(0, 5).map((move) => (
            <li key={move.move.name} className="text-base capitalize">
              {move.move.name}
            </li>
          ))}
        </ul>
        {pokemon.moves.length > 5 && (
          <button
            onClick={openModal}
            className="text-base text-gray-500 mt-1 underline focus:outline-none"
          >
            + {pokemon.moves.length - 5} more
          </button>
        )}
      </div>
      <div className="flex justify-center">
        {isAlreadyCaught ? (
          <button
            className="bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-not-allowed"
            disabled
          >
            This Pokemon is already caught
          </button>
        ) : (
          <button
            onClick={handleCatch}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Catch Pokemon
          </button>
        )}
      </div>
      <Catch isOpen={catchOpen} onClose={closeCatch} pokemon={pokemon} status={catchStatus} />
      <Modal isOpen={modalOpen} onClose={closeModal} moves={pokemon.moves} />
      {isAlertOpen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
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

export default PokemonDetail;
