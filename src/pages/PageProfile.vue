<template>
  <v-container>
    <LoadingPage v-if="!playerLoaded"></LoadingPage>
    <div v-if="playerLoaded">

      <div class="text-h3 d-flex mb-10 flex-wrap">
        <v-btn
            class="ma-2"
            color="indigo"
            fab
            outlined
            small
            @click="$router.back()"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <span class="mr-5">{{ player.leaderboards['-1'].name }}</span>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-img v-if="playerLoaded"
                   v-on="on"
                   :alt="'Main civ : ' + getNameCiv(player.mainCiv)"
                   :src="require(`@/assets/flags/${player.mainCiv}.png`)" max-height="50" max-width="80"></v-img>
          </template>
          <span>Main civ : {{ getNameCiv(player.mainCiv) }}</span>
        </v-tooltip>

        <v-skeleton-loader v-if="!playerLoaded" height="50" type="image" width="80"></v-skeleton-loader>

        <v-btn
            class="ml-auto"
            dark
            rounded
            @click="refreshPlayerData(player.profile_id)"
        >
          <v-icon>mdi-repeat-variant</v-icon>
          Refresh data
        </v-btn>
      </div>

      <v-container grid-list-lg>
        <v-layout>
          <v-row>
            <v-col v-for="mode in Object.keys(player.leaderboards).sort()" :key="mode" class="col-12 col-md-4">
              <GameMode :data="player.leaderboards[mode]"
                        :mode="constantes.leaderboards.find(lb => lb.id == mode)"
                        :rating-history="player.ratingHistory[mode]"/>
            </v-col>
          </v-row>
        </v-layout>
      </v-container>

      <CivStatsHeavyCard
          :profile_id="profile_id"></CivStatsHeavyCard>
    </div>
  </v-container>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import LoadingPage from "@/components/LoadingPage";
import GameMode from "@/components/GameMode";
import CivStatsHeavyCard from "@/components/CivStatsHeavyCard";

export default {
  name: "Profile",
  components: {
    LoadingPage,
    GameMode,
    CivStatsHeavyCard
  },
  props: {
    profile_id: String,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      getPlayer: 'players/player',
      getNameCiv: 'constantes/civName'
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
  created() {
    if (!this.player.leaderboards) {
      this.$store.dispatch('players/refreshPlayerData', this.profile_id);
    }
  },
  methods: {
    refreshPlayerData() {
      this.$store.dispatch('players/refreshPlayerData', this.profile_id);
    }
  }
}
</script>

<style scoped>

</style>
