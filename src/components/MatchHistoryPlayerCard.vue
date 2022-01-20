<template>
    <v-card
        elevation="15"
        rounded
        min-height="100"
        class="tw-p-5 white--text mt-5 mr-10"
        :color="isAlly ? 'blue' : 'red'"
        min-width="300"
    >

      <div>
        <my-link :to="'/profile/'+player.profile_id" classes="text-lg-h6">{{ player.name }}</my-link>
      </div>

      <div v-if="player.nbGames && isAlly">
        {{ player.nbGames }} games together
      </div>
      <div v-if="player.nbGames && !isAlly">
        {{ player.nbGames }} games against
      </div>

      <div>
        Elo : {{ player.rating ? player.rating : 'Unknown' }}
      </div>

      <div class="text-right">
        <a
            :href="matchupLink"
            class="text--primary text-right"
            target="_blank" title="Go to aoe4matchup.com">
          See matchup analysis
          <v-icon>mdi-open-in-new</v-icon>
        </a>
      </div>
    </v-card>

</template>

<script>
import MyLink from "@/components/MyLink";

export default {
  name: "MatchHistoryPlayerCard",
  components: {MyLink},
  props: {
    player: Object,
    fromPlayerId: String,
    isAlly: Boolean,
    leaderboard_id: Number
  },
  methods: {},
  computed: {
    matchupLink() {
      let leaderboard_id = this.leaderboard_id;
      if (leaderboard_id === 0) {
        leaderboard_id = 17;
      }
      return 'https://aoe4matchup.com/?player=' + this.fromPlayerId + '&player=' + this.player.profile_id + '&ladderId=' + leaderboard_id
    }
  }
}
</script>

<style>

</style>
