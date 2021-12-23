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
              <p v-for="leaderboard in constantes.leaderboards" :key="leaderboard.id">
                {{ leaderboard.label }} - {{ getGameCountByMode(leaderboard.id) }} matches played
              </p>
            </div>
          </v-card-text>

    </v-card>
    <MatchHistory :games="games()" :profile_id="profile_id"></MatchHistory>
  </div>
</template>

<script>
import MatchHistory from "@/components/MatchHistory";
import {mapGetters, mapState} from "vuex";

export default {
  name: "CivStatsHeavyCard",
  components: {MatchHistory},
  props: {
    profile_id: String,
    civ: Object,
    gameMode: Object
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      getPlayer: 'players/player'
    }),
    ...mapState({
      constantes: state => state.constantes.all,
      leaderboards: state => state.leaderboards,
    }),
    player() {
      return this.getPlayer(this.profile_id)
    },
    playerLoaded() {
      return this.player && this.player.leaderboards && this.player.gameHistory
    }
  },
  methods: {
    games() {
      if (!this.player.gameHistory) return [];
      return this.player.gameHistory
          .filter(match => match.players.find(player => player.profile_id == this.profile_id).civ === this.civ.id || this.civ.id === -1)
          .filter(match => match.num_slots === this.gameMode.nbPlayers || this.gameMode.nbPlayers === 0)
    },
    getGameCount() {
      return this.games().length
    },
    getGameCountByMode(leaderboard_id) {
      return this.games().filter(match => {
        return match.num_slots === this.constantes.leaderboards.find(leaderboard => leaderboard.id === leaderboard_id).nbPlayers
      }).length
    }
  },
}
</script>

<style scoped>

</style>
