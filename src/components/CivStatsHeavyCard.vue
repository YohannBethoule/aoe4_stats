<template>
  <div>
    <span class="font-italic">(Below informations are computed from the match history. The latter being incomplete most of the time, you can note that the total number of games doesn't add up to the total displayed above.)</span>

    <div class="tw-flex tw-items-center tw-justify-center tw-mb-10 flex-wrap">
      <v-btn-toggle
          v-model="gameMode_id"
          class="mr-10 d-none d-md-flex flex-row"
          mandatory
      >
        <v-btn v-for="mode in constantes.leaderboards" :key="mode.id" :value="mode.id" type="button">
          {{ mode.label }} ({{ getGameCountByMode(mode.id) }})
        </v-btn>
      </v-btn-toggle>
      <v-select
          v-model="gameMode_id"
          :item-text="item => item.label + ' (' + getGameCountByMode(item.id) + ')'"
          :items="constantes.leaderboards"
          class="pt-7 d-flex d-md-none"
          item-value="id"
          label="Select game mode"
          solo
      ></v-select>
      <v-select
          v-model="civ_id"
          :item-text="item => getCivName(item.id) + ' (' + getGameCountByCiv(item.id) + ')'"
          :items="constantes.civ"
          class="pt-7"
          item-value="id"
          label="Select civilization"
          solo
      ></v-select>
    </div>

    <span class="tw-flex tw-my-10 tw-space-x-5">
      <h4 class="text-h4">{{ getGameCount() }} matches played</h4>
      <v-chip
          class="my-auto"
          :color="gameMode.chipColor"
      >
          {{ gameMode.label }}
      </v-chip>
      <v-img
          v-if="this.civ.id >= 0"
          :src="require(`@/assets/flags/${this.civ.id}.webp`)"
          contain max-height="50" max-width="80"></v-img>

    </span>
    <div v-if="gameMode.nbPlayers > 2" class="mb-10">
      <div class="text-h5">Friends</div>
      <div class="d-flex flex-row flex-wrap tw-space-x-5 mt-2">
        <MatchHistoryPlayerCard v-for="friend in friends" :key="friend.profile_id" :is-ally="true"
                                :player="friend"></MatchHistoryPlayerCard>
      </div>
    </div>
    <MatchHistory :games="games()" :profile_id="profile_id"></MatchHistory>
  </div>
</template>

<script>
import MatchHistory from "@/components/MatchHistory";
import MatchHistoryPlayerCard from "@/components/MatchHistoryPlayerCard";
import {mapGetters, mapState} from "vuex";

export default {
  name: "CivStatsHeavyCard",
  components: {MatchHistory, MatchHistoryPlayerCard},
  props: {
    profile_id: String,
  },
  data() {
    return {
      gameMode_id: -1,
      civ_id: -1
    }
  },
  computed: {
    ...mapGetters({
      getPlayer: 'players/player',
      getModeName: 'constantes/gameModeName',
      getCivName: 'constantes/civName',
      getCiv: 'constantes/civ',
      getMode: 'constantes/gameMode'
    }),
    ...mapState({
      constantes: state => state.constantes.all,
      leaderboards: state => state.leaderboards,
    }),
    player() {
      return this.getPlayer(this.profile_id)
    },
    civ() {
      return this.getCiv(this.civ_id)
    },
    gameMode() {
      return this.getMode(this.gameMode_id)
    },
    playerLoaded() {
      return this.player && this.player.leaderboards && this.player.gameHistory
    },
    friends() {
      if (this.gameMode.nbPlayers <= 2) return [];
      let allys = {};
      for (let game of this.games()) {
        const team_id = game.players.find(p => p.profile_id == this.profile_id).team;

        for (let player of game.players.filter(p => p.team === team_id && p.profile_id != this.profile_id)) {
          if (allys[player.profile_id]) {
            allys[player.profile_id].nbGames++;
          } else {
            allys[player.profile_id] = {...player};
            allys[player.profile_id].nbGames = 1;
          }
        }
      }
      return Object.fromEntries(
          Object.entries(allys).filter(([, value]) => {
                return value.nbGames > 5
              }
          ))
    }
  },
  methods: {
    games() {
      if (!this.player.gameHistory) return [];
      return this.player.gameHistory
          .filter(match => match.players.find(player => player.profile_id == this.profile_id).civ === this.civ.id || this.civ.id === -1)
          .filter(match => match.leaderboard_id === this.gameMode.id || this.gameMode.id === -1)
    },
    getGameCount() {
      return this.games().length
    },
    getGameCountByMode(leaderboard_id) {
      return this.player.gameHistory
          .filter(match => (match.leaderboard_id === leaderboard_id) | leaderboard_id === -1).length
    },
    getGameCountByCiv(civ_id) {
      return this.player.gameHistory
          .filter(match => match.players.find(player => player.profile_id == this.profile_id).civ === civ_id || civ_id === -1).length
    },
  },
}
</script>

<style scoped>

</style>
