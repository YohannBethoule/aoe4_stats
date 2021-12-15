<template>
  <div class="flex flex-col">
    <h1 class="text-3xl">{{player.name}}</h1>
    <div class="flex items-between">

      <GameMode v-if="player" :data="player" label="Global"/>
      <GameMode v-for="mode in constantes.leaderboards" :key="mode.id" :data="player[mode.id]" :label="mode.label"/>
    </div>
    <div class="flex items-center my-10">
      <button v-for="mode in constantes.leaderboards" :key="mode.id" @click="() => {gameMode = mode.id}" type="button"
              :class="{'bg-blue-500' : gameMode === mode.id}"
              class="w-full border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-blue-100 px-4 py-2">
        {{ mode.label }}
      </button>
    </div>
      <v-select
          v-model="civ"
          :items="constantes.civ"
          item-text="string"
          item-value="id"
          label="Select game mode"
          single-line
          class="w-1/2"
      ></v-select>

    <CivStatsHeavyCard
        :civ="constantes.civ.find(civ => civ.id === this.civ)" :game-mode="constantes.leaderboards.find(mode => mode.id === this.gameMode)" :player="player"></CivStatsHeavyCard>

  </div>


</template>

<script>
import GameMode from "@/components/GameMode";
import CivStatsHeavyCard from "@/components/CivStatsHeavyCard";

export default {
  name: "PlayerCard",
  components: {CivStatsHeavyCard, GameMode},
  props: {
    player : Object,
  },
  data() {
    return {
      civ: -1,
      gameMode: -1,
      constantes: this.$constantes
    }
  },
}

</script>

<style scoped>

</style>
