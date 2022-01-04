<template>
  <v-card
      class="my-5  tw-flex-auto"
      elevation="15"
  >
    <v-card-title>

      <span class="text-h6">{{ mode.label }}</span>
    </v-card-title>
    <v-card-text class="tw-flex-auto tw-flex-col tw-justify-space-between">
      <p><span v-if="mode.id==-1">Highest </span>Ranking : {{ data.rank }}</p>
      <p><span v-if="mode.id==-1">Highest </span>Rating : {{ Math.round(data.rating) }}</p>
      <p>
        <WinrateProgressBar :games="data.games" :losses="data.losses" :wins="data.wins"></WinrateProgressBar>
      </p>

      <RatingGraph v-if="ratingHistory" :rating-history="ratingHistory"></RatingGraph>
    </v-card-text>


  </v-card>
  <!--  <div class="shadow-lg rounded-2xl w-64 p-4 relative overflow-hidden m-6-->
  <!--      bg-gradient-to-r from-indigo-500 via-purple-500 " v-if="data">-->
  <!--    <p class="text-gray-600 dark:text-white text-xl font-large font-semibold">{{ label }}</p>-->
  <!--    <p>Games : <span class="text-right">{{data.games}}</span></p>-->
  <!--    <p>Wins : {{data.wins}}</p>-->
  <!--    <p>Losses : {{data.losses}}</p>-->
  <!--    <p>Profile id : {{data.profile_id}}</p>-->
  <!--    <p>Ranking : {{data.rank}}</p>-->
  <!--    <p>Winrate : <span-->
  <!--        :class="{ 'text-green-900' : (data.wins/data.games*100) > 51 ,-->
  <!--         'text-orange-900' : (data.wins/data.games*100) < 51 && (data.wins/data.games*100) > 49,-->
  <!--         'text-red-900' : (data.wins/data.games*100) < 49}">-->
  <!--      {{(data.wins/data.games*100).toFixed(2)}} %-->
  <!--    </span> </p>-->
  <!--    <p>Elo : {{Math.round(data.rating)}}</p>-->
  <!--  </div>-->
</template>

<script>
import WinrateProgressBar from "@/components/WinrateProgressBar";
import RatingGraph from "@/components/RatingGraph";

export default {
  name: "GameMode",
  components: {RatingGraph, WinrateProgressBar},
  props: {
    data: Object,
    mode: Object,
    ratingHistory: Array
  },
}
</script>

<style scoped>

</style>
