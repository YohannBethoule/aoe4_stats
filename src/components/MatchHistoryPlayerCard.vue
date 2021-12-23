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
        <span class="white--text">
           <v-hover v-slot="{ hover }">
             <h1 class="text-lg-h6">
                <router-link :class="hover? 'black--text': 'white--text text-decoration-underline'"
                             :to="'/profile/'+player.profile_id">
                  {{ player.name }}
                </router-link>
             </h1>
           </v-hover>

          <span>
            Elo : {{ player.rating ? player.rating : 'Unknown' }}
          </span>
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
