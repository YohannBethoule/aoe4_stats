<template>
  <div class="flex flex-col bg-gray-100 p-40 items-center place-content-center">
    <div class="flex gap-x-8">
      <v-text-field
          label="Search..."
          v-model="name"
          v-on:keyup.enter="searchId"
          solo
      ></v-text-field>
      <v-btn
          @click="searchId"
          class="ma-2"
          outlined
          color="indigo"
      >
        Search
      </v-btn>
    </div>


    <div class="container mx-auto px-4 sm:px-8 ">
      <div class="py-8">
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
              <tr>
                <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                  User
                </th>
                <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                  Ranking
                </th>
                <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                  Elo
                </th>
                <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                  ID
                </th>
                <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                  Games
                </th>
                <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                  Wins
                </th>
                <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                  Losses
                </th>
                <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                  Winrate
                </th>
                <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                  Country
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="[profile_id, player] in leaderboards" :key="player.profile_id" @click="selectPlayer(player.profile_id)"
                :class="{ 'bg-blue-500' : selectedPlayer.profile_id === player.profile_id}">
                <td class="px-5 py-5 border-b border-gray-200 text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{player.name}}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{player.rank}}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{player.rating}}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{player.profile_id}}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{player.games}}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{player.wins}}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{player.losses}}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{(player.wins/player.games*100).toFixed(2)}} %
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{player.country}}
                  </p>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="w-3/4" v-if="playerCharge">
      <v-skeleton-loader
          class=""
          type="card"
      ></v-skeleton-loader>
    </div>

   <PlayerCard v-if="this.playerEstCharge"
         :player="this.selectedPlayer"/>
  </div>
</template>

<script>
import axios from 'axios';
import PlayerCard from "@/components/PlayerCard";
import Vue from "vue";


export default {
  name: 'HelloWorld',
  components: {
    PlayerCard
  },
  data() {
    return {
      name: '',
      leaderboards: new Map(),
      selectedPlayer: 0,
      constantes: [],
      playerEstCharge: false,
      playerCharge: false,
    }
  },
  beforeMount(){
    this.getStringConstantes('en');
  },
  mounted() {
    this.searchId()
  },
  methods: {
    searchId(){
      this.leaderboards.clear();
      this.selectedPlayer = 0;
      for (let leaderboard_id of this.$leaderboards) {
        axios
            .get('https://aoeiv.net/api/leaderboard?game=aoe4&leaderboard_id=' + leaderboard_id + '&start=0&count=100&search=' + this.name)
            .then(response => {
              for (const player of response.data.leaderboard) {
                if (!this.leaderboards.get(player.profile_id)) {
                  this.leaderboards.set(player.profile_id, {...player});
                } else {
                  this.leaderboards.get(player.profile_id).games += player.games;
                  this.leaderboards.get(player.profile_id).wins += player.wins;
                  this.leaderboards.get(player.profile_id).losses += player.losses;
                  this.leaderboards.get(player.profile_id).rating = Math.max(this.leaderboards.get(player.profile_id).rating, player.rating);
                }
                this.leaderboards.get(player.profile_id)[leaderboard_id] = player;
                this.refreshData();
              }
            });
      }
    },
    selectPlayer(profile_id) {
      this.playerEstCharge = false;
      this.playerCharge = true;
      this.selectedPlayer = {...this.leaderboards.get(profile_id)}
      let requests = [this.getMatchHistory(profile_id), this.getRatingHistory(profile_id)]
      Promise.all(requests).then(() => {
            this.playerEstCharge = true;
            this.playerCharge = false;
          })

    },
    getMatchHistory(profile_id) {
      return axios
          .get('https://aoeiv.net/api/player/matches?game=aoe4&count=1000&profile_id=' + profile_id)
          .then(response => {
            this.leaderboards.get(profile_id).matchHistory = response.data
            this.refreshData();
          });
    },
    getRatingHistory(profile_id){
      let requests = []
      for (let leaderboard_id of this.$leaderboards) {
        requests.push(axios
            .get('https://aoeiv.net/api/player/ratinghistory?game=aoe4&leaderboard_id=' + leaderboard_id + '&count=1000&profile_id=' + profile_id)
            .then(response => {
              console.log('rating history ' + leaderboard_id, response )
              let player = this.leaderboards.get(profile_id);
              if (!player.ratingHistory) {
                player.ratingHistory = new Map()
              }
              player.ratingHistory.set(leaderboard_id, {...response.data});
              this.refreshData();
            })
        )
      }
    },
    getStringConstantes(langage){
      axios
          .get('https://aoeiv.net/api/strings?game=aoe4&language=' + langage)
          .then(response => {
            Vue.prototype.$constantes = response.data
            this.$constantes.civ.splice(0,0, { id: -1, string: 'All civilizations'})
            this.$constantes.leaderboards = [
              {
                id: -1,
                label: 'All modes',
                nbPlayers: 0
              },
              {
                id: 17,
                label: 'QM 1v1',
                nbPlayers: 2
              },
              {
                id: 18,
                label: 'QM 2v2',
                nbPlayers: 4
              },
              {
                id: 19,
                label: 'QM 3v3',
                nbPlayers: 8
              },
              {
                id: 20,
                label: 'QM 4v4',
                nbPlayers: 16
              },
            ]
          });
    },
    refreshData() {
      this.leaderboards = new Map(this.leaderboards)
      if (this.selectedPlayer){
        this.selectedPlayer = this.leaderboards.get(this.selectedPlayer.profile_id)
      }
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
