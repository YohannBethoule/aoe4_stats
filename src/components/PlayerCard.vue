<template>

  <v-card
      class="mb-5 p-10 absolute top-10"
      elevation="15"
      width="90%"
      loading="playerCharge"
      rounded
  >
    <div class="flex justify-end">
      <v-hover v-slot="{ hover }">
        <v-btn
            icon
            :color="hover ? 'red' : 'blue'"
            @click="$emit('close-player-card')"
        >
          <v-icon>mdi-close-outline</v-icon>
        </v-btn>
      </v-hover>

    </div>


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
  </v-card>



</template>

<script>
import GameMode from "@/components/GameMode";
import CivStatsHeavyCard from "@/components/CivStatsHeavyCard";
import axios from "axios";

export default {
  name: "PlayerCard",
  components: {CivStatsHeavyCard, GameMode},
  props: {
    selectedPlayer : Object,
  },
  data() {
    return {
      player: this.selectedPlayer,
      civ: -1,
      gameMode: -1,
      constantes: this.$constantes,
      playerEstCharge: false,
      playerCharge: false,
    }
  },
  beforeMount(){
    this.getPlayer();
  },
  methods: {
    getPlayer(){
      console.log('getPlayer', this.player )
      this.playerEstCharge = false;
      this.playerCharge = true;
      let requests = [this.getMatchHistory(this.player.profile_id), this.getRatingHistory(this.player.profile_id)]
      Promise.all(requests).then(() => {
        this.playerEstCharge = true;
        this.playerCharge = false;
        this.refreshData();
      })
    },
    getMatchHistory(profile_id) {
      return axios
          .get('https://aoeiv.net/api/player/matches?game=aoe4&count=1000&profile_id=' + profile_id)
          .then(response => {
            this.player.matchHistory = response.data
          });
    },
    getRatingHistory(profile_id){
      let requests = []
      for (let leaderboard_id of this.$leaderboards) {
        requests.push(axios
            .get('https://aoeiv.net/api/player/ratinghistory?game=aoe4&leaderboard_id=' + leaderboard_id + '&count=1000&profile_id=' + profile_id)
            .then(response => {
              if (!this.player.ratingHistory) {
                this.player.ratingHistory = new Map()
              }
              this.player.ratingHistory.set(leaderboard_id, {...response.data});
              this.refreshData();
            })
        )
      }
    },
    refreshData() {
      this.player = {...this.player}
    }
  }
}

</script>

<style scoped>

</style>
