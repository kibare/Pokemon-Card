import axios from "axios";

export const getPokemonImage = async (pokemonName) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonId = response.data.id;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  } catch (error) {
    console.error(`Error fetching image for ${pokemonName}:`, error);
    return null;
  }
};
