<template>
  <div>
    <LoadingPage v-if="player.searching"></LoadingPage>

    <div v-if="!player.searching && !playerLoaded"
         class="flex text-h4 text-center mt-5">No data found...
    </div>

    <div v-if="playerLoaded && !player.searching">

      <div class="text-h4 text-md-h3 d-flex mb-10 flex-wrap profile-header">
        <AppButton
            class="ma-2"
            :fab="true"
            outlined
            :onClick="goBack"
            :small="true"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </AppButton>
        <AppButton
            :onClick="refreshPlayerData"
            class="d-flex d-sm-none mt-2 ml-auto"
        >
          <v-icon>mdi-repeat-variant</v-icon>
          Refresh data
        </AppButton>
        <div class="d-flex align-center">
          <v-img v-if="player.avatarUrls"
                 :src="player.avatarUrls.medium"
                 alt="Steam avatar" class="mx-2" max-height="50" max-width="50"></v-img>
          <span class="mr-5">{{ player.leaderboards['-1'].name }}</span>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-img v-if="playerLoaded"
                     v-on="on"
                     :alt="'Main civ : ' + getNameCiv(player.mainCiv)"
                     :src="require(`@/assets/flags/${player.mainCiv}.png`)" class="mt-md-1" max-height="40"
                     max-width="70"></v-img>
            </template>
            <span>Main civ : {{ getNameCiv(player.mainCiv) }}</span>
          </v-tooltip>
        </div>

        <v-skeleton-loader v-if="!playerLoaded" height="50" type="image" width="80"></v-skeleton-loader>

        <AppButton
            class="ml-auto d-none d-sm-block"
            :onClick="refreshPlayerData"
        >
          <v-icon>mdi-repeat-variant</v-icon>
          Refresh data
        </AppButton>
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
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import LoadingPage from "@/components/LoadingPage";
import GameMode from "@/components/GameMode";
import CivStatsHeavyCard from "@/components/CivStatsHeavyCard";
import AppButton from "@/components/AppButton";

export default {
  name: "Profile",
  components: {
    AppButton,
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
    },
    goBack() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>
.profile-header > * {
  margin-bottom: 2rem;
}
</style>
