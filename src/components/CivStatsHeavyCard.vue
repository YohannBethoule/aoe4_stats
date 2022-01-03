<template>
  <div>
    <span class="font-italic">(Below informations are computed from the match history. The latter being incomplete most of the time, you can note that the total number of games doesn't add up to the total displayed above.)</span>

    <div class="tw-flex tw-items-center tw-justify-center tw-mb-10 flex-wrap">
      <v-btn-toggle
          v-model="gameMode_id"
          class="mr-10 flex-md-row flex-column"
          mandatory
      >
        <v-btn v-for="mode in constantes.leaderboards" :key="mode.id" :value="mode.id" type="button">
          {{ mode.label }} ({{ getGameCountByMode(mode.id) }})
        </v-btn>
      </v-btn-toggle>
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
          dark
      >
          {{ gameMode.label }}
      </v-chip>
      <v-img
          v-if="this.civ.id >= 0"
          :src="require(`@/assets/flags/${this.civ.id}.webp`)"
          contain max-height="50" max-width="80"></v-img>

    </span>


    <!--    <v-card-->
    <!--        class="mb-5"-->
    <!--        elevation="15"-->
    <!--    >-->
    <!--          <v-card-title>-->

    <!--            <span class="text-h6">{{civ.string}}</span>-->
    <!--          </v-card-title>-->
    <!--          <v-card-text class="flex space-x-16">-->
    <!--            <v-img-->
    <!--                contain-->
    <!--                v-if="civ.id >= 0"-->
    <!--                :src="require(`@/assets/flags/${civ.id}.webp`)" max-height="300" max-width="400"></v-img>-->
    <!--            <div class="flex flex-col">-->
    <!--              <p >-->
    <!--                {{ getModeName(this.gameMode.id) }} - {{ getGameCountByMode(this.gameMode.id) }} matches played-->
    <!--              </p>-->
    <!--            </div>-->
    <!--          </v-card-text>-->

    <!--    </v-card>-->
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
      return this.player.gameHistory
          .filter(match => match.num_slots === this.getMode(leaderboard_id)?.nbPlayers || this.getMode(leaderboard_id)?.nbPlayers === 0).length
    },
    getGameCountByCiv(civ_id) {
      return this.player.gameHistory
          .filter(match => match.players.find(player => player.profile_id == this.profile_id).civ === civ_id || civ_id === -1).length
    }
  },
}
</script>

<style scoped>

</style>
