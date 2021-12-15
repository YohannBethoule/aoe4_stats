<template>
  <div>
    <v-card
        class="mb-5"
        elevation="15"
    >
          <v-card-title>

            <span class="text-h6">{{civ.string}}</span>
          </v-card-title>
          <v-card-text class="flex space-x-16">
            <v-img
                contain
                v-if="civ.id >= 0"
                :src="require(`@/assets/flags/${civ.id}.webp`)" max-height="300" max-width="400"></v-img>
            <div class="flex flex-col">
              <p>{{ getGameCount() }} games played</p>
              <p v-for="leaderboard in this.leaderboards" :key="leaderboard.id">
                {{leaderboard.label}} - {{ getGameCountByMode(leaderboard.id) }} matches played
              </p>
            </div>
          </v-card-text>

    </v-card>
    <MatchHistory :games="games()" :player="player"></MatchHistory>
  </div>
</template>

<script>
import MatchHistory from "@/components/MatchHistory";
export default {
  name: "CivStatsHeavyCard",
  components: {MatchHistory},
  props: {
    player : Object,
    civ: Object,
    gameMode: Object
  },
  data() {
    return {
      constantes: this.$constantes,
      leaderboards: [ ...this.$constantes.leaderboards]
    }
  },
  methods: {
    games() {
      if(!this.player.matchHistory) return [];
      return this.player.matchHistory
          .filter(match => match.players.find(player => player.profile_id === this.player.profile_id).civ === this.civ.id || this.civ.id === -1)
          .filter(match => match.num_slots === this.gameMode.nbPlayers || this.gameMode.nbPlayers === 0)
    },
    getGameCount() {
      return this.games().length
    },
    getGameCountByMode(leaderboard_id) {
      return this.games().filter(match => {
        return match.num_slots === this.leaderboards.find(leaderboard => leaderboard.id === leaderboard_id).nbPlayers
      }).length
    }
  },
}
</script>

<style scoped>

</style>
