import axios from 'axios';

// ?limit=151
const pokemonApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon',
});

export { pokemonApi };
