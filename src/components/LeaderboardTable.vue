<template>
  <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="100"
      :loading="items.length === 0"
      class="elevation-10 mt-15 table-background"
      color="rgba(0,0,0,0.3)"
      item-class="text-xl"
      item-key="profile_id"
      @click:row="goToProfile"
  >
    <v-data-table-header :headers="headers">

    </v-data-table-header>
    <template v-slot:item.name="{ item }">
      <router-link :to="'/profile/'+item.profile_id"> {{ item.name }}</router-link>
    </template>
    <template v-slot:item.winrate="{ item }">
      <div :style="$vuetify.breakpoint.mobile ? 'display: flex; width:100%; margin-right:40vw' : ''">
        <WinrateProgressBar :games="item.games" :losses="item.losses" :wins="item.wins"></WinrateProgressBar>
      </div>
    </template>

  </v-data-table>
</template>

<script>
import WinrateProgressBar from "@/components/WinrateProgressBar";

export default {
  name: "LeaderboardTable",
  components: {WinrateProgressBar},
  props: {
    items: {}
  },
  data() {
    return {
      headers: [
        {text: 'Ranking', value: 'rank', width: "1%"},
        {text: 'User', value: 'name', width: "1%"},
        {text: 'Elo', value: 'rating', width: "1%"},
        {text: 'Country', value: 'country', width: "1%"},
        {text: '', value: 'winrate', width: "10%", align: 'center', sortable: false},
      ],
    }
  },
  methods: {
    goToProfile(item) {
      this.$router.push('/profile/' + item.profile_id)
    }
  }
}
</script>

<style scoped>
.table-background {
  background-color: rgba(0, 0, 0, 0.3) !important;
}
</style>
