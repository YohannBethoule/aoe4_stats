<template>
  <v-container class="align-center">
    <div class="d-flex flex-column flex-sm-row justify-center">
      <v-text-field
          label="Search player name..."
          v-model="name"
          v-on:keyup.enter="searchId"
          solo
          light
          class="flex-grow-0"
      ></v-text-field>
      <v-btn
          @click="searchId"
          class="tw-mx-5 tw-mt-1 tw-my-auto"
          outlined
          color="rgba(255, 255, 255, 0.8)"
      >
        Search
      </v-btn>
    </div>


    <LeaderBoardTable v-if="leaderboards[-1].length > 0" :items="leaderboards[-1]"></LeaderBoardTable>
    <LoadingPage v-if="leaderboards[-1].length > 0 == 0 && initialSearch"></LoadingPage>

  </v-container>
</template>

<script>
import LeaderBoardTable from "@/components/LeaderboardTable";
import {mapState} from "vuex";
import LoadingPage from "@/components/LoadingPage";


export default {
  name: 'HelloWorld',
  components: {
    LoadingPage,
    LeaderBoardTable,
  },
  data() {
    return {
      name: '',
      initialSearch: false
    }
  },
  computed: mapState({
    constantes: state => state.constantes.all,
    leaderboards: state => state.leaderboards
  }),
  beforeMount() {
  },
  mounted() {
    //this.searchId()
  },
  methods: {
    searchId() {
      this.initialSearch = true;
      this.$store.dispatch('leaderboards/searchLeaderboard', this.name)
      // this.leaderboards.clear();
      // this.selectedPlayer = 0;
      // for (let leaderboard_id of this.constantes.leaderboards) {
      //   api.searchLeaderboard(leaderboard_id, this.name, response => {
      //     for (const player of response.data.leaderboard) {
      //       if (!this.leaderboards.get(player.profile_id)) {
      //         this.leaderboards.set(player.profile_id, {...player});
      //       } else {
      //         this.leaderboards.get(player.profile_id).games += player.games;
      //         this.leaderboards.get(player.profile_id).wins += player.wins;
      //         this.leaderboards.get(player.profile_id).losses += player.losses;
      //         this.leaderboards.get(player.profile_id).rating = Math.max(this.leaderboards.get(player.profile_id).rating, player.rating);
      //       }
      //       this.leaderboards.get(player.profile_id)[leaderboard_id] = player;
      //       this.refreshData();
      //     }
      //   });
      // }
    },
    selectPlayer(profile_id) {
      this.selectedPlayer = {...this.leaderboards.get(profile_id)}
    },
    unselectPLayer() {
      this.selectedPlayer = null;
    },

    refreshData() {
      this.leaderboards = new Map(this.leaderboards)
      if (this.selectedPlayer){
        this.selectedPlayer = this.leaderboards.get(this.selectedPlayer.profile_id)
      }
    }
  },
  watch : {
    selectedPlayer(value) {
      if (value) {
        document.documentElement.classList.add('overflow-y-hidden')
      } else {
        document.documentElement.classList.remove('overflow-y-hidden')
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
