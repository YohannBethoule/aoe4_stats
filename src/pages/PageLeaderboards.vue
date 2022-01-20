<template>
  <div>
    <div class="d-flex">
      <v-btn-toggle
          v-model="gameMode"
          class="mx-auto d-none d-md-flex flex-md-row flex-column"
          background-color="rgba(0,0,0,0.1)"
          mandatory
      >
        <v-btn v-for="mode in constantes.leaderboards.filter(lb => lb.id > 0)" :key="mode.id" :value="mode.id"
               color="rgba(255,255,255,0.2)"
               type="button">
          {{ mode.label }}
        </v-btn>
      </v-btn-toggle>
    </div>
    <v-select
        v-model="gameMode"
        :items="constantes.leaderboards.filter(lb => lb.id > 0)"
        :menu-props="{ bottom: true, offsetY: true}"
        class="pt-7 d-flex d-md-none"
        item-text="label"
        item-value="id"
        label="Select game mode"
        outlined
    ></v-select>

    <LeaderboardTable :items="leaderboards[this.gameMode]"></LeaderboardTable>
  </div>

</template>

<script>
import {mapState} from "vuex";
import LeaderboardTable from "@/components/LeaderboardTable";

export default {
  name: "LeaderBoard",
  components: {LeaderboardTable},
  props: {
    name: null
  },
  data() {
    return {
      gameMode: 17,
      headers: [
        {text: 'User', value: 'name'},
        {text: 'Ranking', value: 'rank'},
        {text: 'Elo', value: 'rating'},
        {text: 'Games', value: 'games'},
        {text: 'Wins', value: 'wins'},
        {text: 'Losses', value: 'losses'},
        {text: 'Winrate', value: 'winrate'},
        {text: 'Country', value: 'country'},
      ],
    }
  },
  created() {
    this.searchGameMode()
  },
  computed: mapState({
    constantes: state => state.constantes.all,
    leaderboards: state => state.leaderboards
  }),
  methods: {
    searchGameMode() {
      this.$store.dispatch('leaderboards/getLeaderboard', {leaderboard_id: this.gameMode, count: 10000});
    },

  },
  watch: {
    gameMode: function () {
      if (this.leaderboards[this.gameMode].length > 0) return;
      this.searchGameMode()
    },
  }
}
</script>

<style scoped>
</style>

