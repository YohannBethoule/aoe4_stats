<template>
  <v-btn
      :fab="fab"
      :small="small"
      color="rgba(255, 255, 255, 0.9)"
      dark
      elevation="10"
      outlined
      @click="onClick()"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    fab: Boolean,
    small: Boolean,
    onClick: Function
  }
}
</script>

<style scoped>

</style>
