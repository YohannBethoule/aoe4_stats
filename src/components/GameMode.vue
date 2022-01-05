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
