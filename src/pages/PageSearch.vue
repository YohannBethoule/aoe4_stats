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


    <LeaderBoardTable v-if="!leaderboards.searching && leaderboards['-1'] && leaderboards['-1'].length > 0"
                      :items="leaderboards[-1]"></LeaderBoardTable>

    <div v-if="!leaderboards.searching && leaderboards['-1'] && leaderboards['-1'].length === 0"
         class="flex text-h4 text-center mt-5">No player found...
    </div>

    <LoadingPage v-if="leaderboards.searching"></LoadingPage>

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
    leaderboards: state => state.leaderboards,
  }),
  methods: {
    searchId() {
      this.$store.dispatch('leaderboards/searchLeaderboard', this.name)
    },
    // refreshData() {
    //   this.leaderboards = new Map(this.leaderboards)
    //   if (this.selectedPlayer){
    //     this.selectedPlayer = this.leaderboards.get(this.selectedPlayer.profile_id)
    //   }
    // }
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

<style scoped>
</style>
