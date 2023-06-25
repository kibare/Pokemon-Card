import axios from "axios";

export const getPokemonList = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
      return response.data.results;
    } catch (error) {
      throw error;
    }
  };
  

  export const getPokemonHome = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=54');
      return response.data.results;
    } catch (error) {
      throw error;
    }
  };
  

    