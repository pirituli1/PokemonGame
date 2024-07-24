import { pokemonApi } from '../api/pokemonApi';
import { GameStatus } from '../interfaces/game-status.enum';
import { ref } from 'vue';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);

  const getPokemons = () => {
    const response = pokemonApi.get('/?limit=151');
  };

  return {
    gameStatus,
  };
};
