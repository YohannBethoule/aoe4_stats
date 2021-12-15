<template>
    <v-card
        elevation="15"
        rounded
        min-height="100"
        min-width="150"
        height="100"
        :color="isAlly ? 'blue' : 'red'"
        class="m-5 p-5"
    >
        <span class="text-white">
          <h1 class="text-lg-h6">
            {{ player.name }}
          </h1>
          <div>
            Elo : {{ player.rating ? player.rating : 'Unknown'}}
          </div>
        </span>


      <span class="text-sm text-white mr-3"></span>
      <span class="text-xl text-white"></span>
  </v-card>

</template>

<script>
export default {
  name: "MatchHistoryPlayerCard",
  props: {
    player: Object,
    isAlly: Boolean
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
