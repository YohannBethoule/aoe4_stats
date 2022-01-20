<template>
  <div>
    <div class="d-flex flex-column flex-sm-row justify-center">
      <v-text-field
          label="Search player name..."
          v-model="name"
          v-on:keyup.enter="searchId"
          solo
          light
          class="flex-grow-0"
      ></v-text-field>
      <AppButton
          :onClick="searchId"
          class="mx-5 mt-1 my-auto"
          outlined
          color="rgba(255, 255, 255, 0.8)"
      >
        Search
      </AppButton>
    </div>


    <LeaderBoardTable v-if="!leaderboards.searching && leaderboards['-1'] && leaderboards['-1'].length > 0"
                      :items="leaderboards[-1]"></LeaderBoardTable>

    <div v-if="!leaderboards.searching && leaderboards['-1'] && leaderboards['-1'].length === 0"
         class="flex text-h4 text-center mt-5">No player found...
    </div>

    <LoadingPage v-if="leaderboards.searching"></LoadingPage>

  </div>
</template>

<script>
import LeaderBoardTable from "@/components/LeaderboardTable";
import {mapState} from "vuex";
import LoadingPage from "@/components/LoadingPage";
import AppButton from "@/components/AppButton";


export default {
  name: 'HelloWorld',
  components: {
    AppButton,
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
