import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../component/Loading';
import LazyLoad from 'react-lazyload';
import { getPokemonList } from '../fetcher/getPokemonList';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const data = await getPokemonList();
        setPokemonList(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>{error.message}</div>;
  if (pokemonList.length === 0) return <div>No Pokemon found.</div>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl text-center mb-6 font-bold text-gray-800 mt-10">Pokemon List</h1>
      <h2 className="text-2xl text-center mb-6 font-bold text-gray-800">Total Pokemon: {pokemonList.length}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-8 mt-2 mb-20">
        {pokemonList.map((pokemon) => (
          <LazyLoad key={pokemon.name} height={200} once>
            <div className="w-64 h-auto rounded overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <img
                className="w-full h-48 bg-center bg-cover"
                src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png?raw=true`}
                alt={pokemon.name}
                style={{ objectFit: 'cover', maxHeight: '12rem' }}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{pokemon.name.toUpperCase()}</div>
              </div>
              <div className="px-6 pt-4 pb-2">
                <Link
                  to={`/pokemon/${pokemon.name}`}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-center text-gray-700 mr-2 mb-2 w-full hover:bg-gray-300 hover:text-gray-800 transition-colors duration-300 ease-in-out transform hover:scale-105"
                >
                  View Details
                </Link>
              </div>
            </div>
          </LazyLoad>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
