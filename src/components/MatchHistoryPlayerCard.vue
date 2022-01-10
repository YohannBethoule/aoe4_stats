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
        <my-link :text="player.name" :to="'/profile/'+player.profile_id" classes="text-lg-h6"></my-link>
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
    </v-card>

</template>

<script>
import MyLink from "@/components/MyLink";

export default {
  name: "MatchHistoryPlayerCard",
  components: {MyLink},
  props: {
    player: Object,
    isAlly: Boolean
  },
  methods: {}
}
</script>

<style scoped>

</style>
