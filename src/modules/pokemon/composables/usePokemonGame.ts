import { computed, onMounted, ref } from 'vue';
import { GameStatus } from '../interfaces/game-status.enum';
import type { PokemonListResponse } from '../interfaces/pokemon-list.response';
import type { Pokemon } from '../interfaces/pokemon.interfaces';
import { pokemonApi } from '../api/pokemonApi';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([])

  const randomPokemon = computed(
    ():Pokemon=> {
      const randomIndex = Math.floor( Math.random() * pokemonOptions.value.length )
      return pokemonOptions.value[randomIndex];
    }
  ); // un pokemon de pokemon options

  const isLoading = computed(() => pokemons.value.length === 0)

  const getPokemons = async(): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');
    
    const pokemonsArray = response.data.results.map((pokemon) => {
      const urlPaths = pokemon.url.split('/');
      const id = urlPaths.at(-2) ?? 0;

      return {
        name: pokemon.name,
        id: +id,
      };
    });

    return pokemonsArray.sort( ()=> Math.random() - 0.5 );
  };

  const getNextOption = ( howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0,howMany);
    pokemons.value = pokemons.value.slice(howMany);
  }



  onMounted(async() => {
    // await new Promise (r => setTimeout(r,1000));

    pokemons.value = await getPokemons();
    getNextOption();
    console.log(pokemonOptions.value)
    

  });

  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,

    //Methods 
    getNextOption,
  };
};
