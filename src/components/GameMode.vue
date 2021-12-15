<template>
  <div class="shadow-lg rounded-2xl w-64 p-4 bg-white relative overflow-hidden m-6" v-if="data">
    <p class="text-gray-600 dark:text-white text-xl font-large font-semibold">{{ label }}</p>
    <p>Games : <span class="text-right">{{data.games}}</span></p>
    <p>Wins : {{data.wins}}</p>
    <p>Losses : {{data.losses}}</p>
    <p>Profile id : {{data.profile_id}}</p>
    <p>Ranking : {{data.rank}}</p>
    <p>Winrate : <span
        :class="{ 'text-green-900' : (data.wins/data.games*100) > 51 ,
         'text-orange-900' : (data.wins/data.games*100) < 51 && (data.wins/data.games*100) > 49,
         'text-red-900' : (data.wins/data.games*100) < 49}">
      {{(data.wins/data.games*100).toFixed(2)}} %
    </span> </p>
    <p>Elo : {{Math.round(data.rating)}}</p>
  </div>
</template>

<script>
export default {
  name: "GameMode",
  props: {
    data : Object,
    label: String
  },
}
</script>

<style scoped>

</style>
