<template>
  <CustomCard :title="mode.label">
    <p><span v-if="mode.id==-1">Highest </span>Ranking : {{ data.rank }}</p>
    <p><span v-if="mode.id==-1">Highest </span>Rating : {{ Math.round(data.rating) }}</p>
    <p>
      <WinrateProgressBar :games="data.games" :losses="data.losses" :wins="data.wins"></WinrateProgressBar>
    </p>

    <RatingGraph v-if="ratingHistory" :rating-history="ratingHistory"></RatingGraph>
  </CustomCard>
</template>

<script>
import WinrateProgressBar from "@/components/WinrateProgressBar";
import RatingGraph from "@/components/RatingGraph";
import CustomCard from "@/components/CustomCard";

export default {
  name: "GameMode",
  components: {CustomCard, RatingGraph, WinrateProgressBar},
  props: {
    data: Object,
    mode: Object,
    ratingHistory: Array
  },
}
</script>

<style scoped>

</style>
