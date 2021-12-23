<template>
  <div class="flex flex-col">
    <LoadingPage v-if="!playerLoaded"></LoadingPage>
    <div v-if="playerLoaded">

      <div class="text-md-h3 flex mb-10">
        <span class="mr-5">{{ player.leaderboards['-1'].name }}</span>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-img v-if="player.mainCiv"
                   v-on="on"
                   :alt="'Main civ : ' + getNameCiv(player.mainCiv)"
                   :src="require(`@/assets/flags/${player.mainCiv}.webp`)" max-height="50" max-width="80"></v-img>
          </template>
          <span>Main civ : {{ getNameCiv(player.mainCiv) }}</span>
        </v-tooltip>

        <v-skeleton-loader v-if="!player.mainCiv" height="300" type="image" width="400"></v-skeleton-loader>
      </div>

      <div class="flex justify-between space-x-5 my-5">
        <GameMode v-for="mode in Object.keys(player.leaderboards)" :key="mode" :data="player.leaderboards[mode]"
                  :label="constantes.leaderboards.find(lb => lb.id == mode).label"/>
      </div>

      <span class="font-italic">(Below informations are computed from the match history. The latter being incomplete most of the time, you can note that the total number of games doesn't add up to the total displayed above.)</span>

      <div class="flex items-center justify-center mb-10">
        <v-btn-toggle
            v-model="gameMode"
            class="mr-10"
            mandatory
        >
          <v-btn v-for="mode in constantes.leaderboards" :key="mode.id" :value="mode.id" type="button">
            {{ mode.label }}
          </v-btn>
        </v-btn-toggle>
        <v-select
            v-model="civ"
            :items="constantes.civ"
            class="pt-7"
            item-text="string"
            item-value="id"
            label="Select civilization"
            solo
        ></v-select>
      </div>

      <CivStatsHeavyCard
          :civ="constantes.civ.find(civ => civ.id === this.civ)"
          :game-mode="constantes.leaderboards.find(mode => mode.id === this.gameMode)"
          :profile_id="profile_id"></CivStatsHeavyCard>

    </div>
  </div>
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
      gameMode: -1,
      civ: -1
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
  }
}
</script>

<style scoped>

</style>
