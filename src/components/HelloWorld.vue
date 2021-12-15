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


  <LeaderBoard :leaderboards="this.leaderboards"
    v-on:select-player="selectPlayer($event)"></LeaderBoard>

   <PlayerCard v-if="this.selectedPlayer"
         :selected-player="this.selectedPlayer"
         v-on:close-player-card="unselectPLayer()"/>
  </div>
</template>

<script>
import axios from 'axios';
import PlayerCard from "@/components/PlayerCard";
import Vue from "vue";
import LeaderBoard from "@/components/LeaderBoard";


export default {
  name: 'HelloWorld',
  components: {
    LeaderBoard,
    PlayerCard
  },
  data() {
    return {
      name: '',
      leaderboards: new Map(),
      selectedPlayer: 0,
      constantes: [],
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
      this.selectedPlayer = {...this.leaderboards.get(profile_id)}
      this.$vuetify.goTo(0)
    },
    unselectPLayer() {
      this.selectedPlayer = null;
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
