<template>
  <section
    v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pókemon</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Quién es este pókemon?</h1>
    <h3 class="capitalize"> {{ gameStatus }} </h3>
    
    <!-- <h3>{{ randomPokemon }}</h3> -->

    <!-- Pokemon picture-->
    <PokemonPicture :pokemon-id="randomPokemon.id" :showPokemon="gameStatus !== GameStatus.Playing"/>
    <!--Pokemon option -->
    <PokemonOptions 
    :options = "options"
    :block-selection = ""
     @selected-option="checkAnwer"/>
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';

import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces/game-status.enum';

const { randomPokemon, isLoading, gameStatus, pokemonOptions:options, checkAnwer } = usePokemonGame();

</script>
