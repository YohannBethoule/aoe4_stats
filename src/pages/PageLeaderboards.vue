<template>
  <div>
    <div class="container mx-auto px-4 sm:px-8 ">
      <div class="flex">
        <v-btn-toggle
            v-model="gameMode"
            class="mx-auto"
            mandatory
        >
          <v-btn v-for="mode in constantes.leaderboards.filter(lb => lb.id != -1)" :key="mode.id" :value="mode.id"
                 type="button">
            {{ mode.label }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <LeaderboardTable :items="leaderboards[this.gameMode]"></LeaderboardTable>
    </div>
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
      // this.leaderboards.clear();
      // this.selectedPlayer = 0;
      // axios
      //     .get('https://aoeiv.net/api/leaderboard?game=aoe4&leaderboard_id=' + this.gameMode + '&start=0&count=100')
      //     .then(response => {
      //       for (const player of response.data.leaderboard) {
      //         if (!this.leaderboards.get(player.profile_id)) {
      //           this.leaderboards.set(player.profile_id, {...player});
      //         } else {
      //           this.leaderboards.get(player.profile_id).games += player.games;
      //           this.leaderboards.get(player.profile_id).wins += player.wins;
      //           this.leaderboards.get(player.profile_id).losses += player.losses;
      //           this.leaderboards.get(player.profile_id).rating = Math.max(this.leaderboards.get(player.profile_id).rating, player.rating);
      //         }
      //         this.leaderboards.get(player.profile_id)[this.gameMode] = player;
      //         this.refreshData();
      //       }
      //     });
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


<!--<div class="py-8">-->
<!--<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">-->
<!--  <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">-->
<!--    <table class="min-w-full leading-normal">-->
<!--      <thead>-->
<!--      <tr>-->
<!--        <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">-->
<!--          User-->
<!--        </th>-->
<!--        <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">-->
<!--          Ranking-->
<!--        </th>-->
<!--        <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">-->
<!--          Elo-->
<!--        </th>-->
<!--        <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">-->
<!--          Games-->
<!--        </th>-->
<!--        <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">-->
<!--          Wins-->
<!--        </th>-->
<!--        <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">-->
<!--          Losses-->
<!--        </th>-->
<!--        <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">-->
<!--          Winrate-->
<!--        </th>-->
<!--        <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">-->
<!--          Country-->
<!--        </th>-->
<!--      </tr>-->
<!--      </thead>-->
<!--      <tbody>-->
<!--      <tr v-for="[profile_id, player] in leaderboards" :key="player.profile_id" @click="$emit('select-player', profile_id)"-->
<!--          class="hover:bg-blue-200 text-lg">-->
<!--        <td class="px-5 py-5 border-b border-gray-200 ">-->
<!--          <p class="text-gray-900 whitespace-no-wrap">-->
<!--            {{player.name}}-->
<!--          </p>-->
<!--        </td>-->
<!--        <td class="px-5 py-5 border-b border-gray-200">-->
<!--          <p class="text-gray-900 whitespace-no-wrap">-->
<!--            #{{player.rank}}-->
<!--          </p>-->
<!--        </td>-->
<!--        <td class="px-5 py-5 border-b border-gray-200">-->
<!--          <p class="text-gray-900 whitespace-no-wrap">-->
<!--            {{player.rating}}-->
<!--          </p>-->
<!--        </td>-->
<!--        <td class="px-5 py-5 border-b border-gray-200">-->
<!--          <p class="text-gray-900 whitespace-no-wrap">-->
<!--            {{player.games}}-->
<!--          </p>-->
<!--        </td>-->
<!--        <td class="px-5 py-5 border-b border-gray-200">-->
<!--          <p class="text-gray-900 whitespace-no-wrap">-->
<!--            {{player.wins}}-->
<!--          </p>-->
<!--        </td>-->
<!--        <td class="px-5 py-5 border-b border-gray-200">-->
<!--          <p class="text-gray-900 whitespace-no-wrap">-->
<!--            {{player.losses}}-->
<!--          </p>-->
<!--        </td>-->
<!--        <td class="px-5 py-5 border-b border-gray-200">-->
<!--          <p class="whitespace-no-wrap"-->
<!--             :class="{ 'text-green-900' : (player.wins/player.games*100) > 51 ,-->
<!--                             'text-orange-900' : (player.wins/player.games*100) < 51 && (player.wins/player.games*100) > 49,-->
<!--                             'text-red-900' : (player.wins/player.games*100) < 49}">-->
<!--            {{(player.wins/player.games*100).toFixed(2)}} %-->
<!--          </p>-->
<!--        </td>-->
<!--        <td class="px-5 py-5 border-b border-gray-200 text-sm">-->
<!--          <p class="text-gray-900 whitespace-no-wrap">-->
<!--            {{player.country}}-->
<!--          </p>-->
<!--        </td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->
<!--  </div>-->
<!--</div>-->
<!--</div>-->
