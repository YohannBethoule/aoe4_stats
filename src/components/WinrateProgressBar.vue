<template>
  <v-container>
    <div class="d-flex d-flew-row">
      <div>{{ wins }} <span v-if="$vuetify.breakpoint.mdAndUp">wins</span></div>
      <div class="d-flex flex-column align-center mx-2 flex-grow-1">
        <v-progress-linear
            :value="(wins / games * 100)"
            background-color="red"
            color="green"
            height="25"
        >
          <template v-slot:default="{ value }">
            <strong>{{ Math.ceil(value) }}%</strong>
          </template>
        </v-progress-linear>
        {{ games }} games
      </div>

      <div>{{ losses }}<span v-if="$vuetify.breakpoint.mdAndUp"> losses</span></div>
    </div>
  </v-container>


</template>

<script>
export default {
  name: "WinrateProgressBar",
  props: {
    games: Number,
    wins: Number,
    losses: Number,
  }
}
</script>

<style scoped>

</style>
