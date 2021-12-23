<template>
  <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="100"
      :loading="items.length === 0"
      class="elevation-10 mt-15"
      item-class="text-xl"
      item-key="profile_id"
  >
    <template v-slot:item.name="{ item }">
      <router-link :to="'/profile/'+item.profile_id"> {{ item.name }}</router-link>
    </template>
    <template v-slot:item.winrate="{ item }">
         <span :class="{ 'text-green-900' : (item.wins/item.games*100) > 51 ,
                                     'text-orange-900' : (item.wins/item.games*100) < 51 && (item.wins/item.games*100) > 49,
                                     'text-red-900' : (item.wins/item.games*100) < 49}">
           {{ (item.wins / item.games * 100).toFixed(2) }} %
         </span>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "LeaderboardTable",
  props: {
    items: {}
  },
  data() {
    return {
      headers: [
        {text: 'User', value: 'name'},
        {text: 'Ranking', value: 'rank'},
        {text: 'Elo', value: 'rating'},
        {text: 'Games', value: 'games'},
        {text: 'Wins', value: 'wins'},
        {text: 'Losses', value: 'losses'},
        {text: 'Winrate', value: 'winrate'},
        {text: 'Country', value: 'country'},
      ],
    }
  },
}
</script>

<style scoped>

</style>
