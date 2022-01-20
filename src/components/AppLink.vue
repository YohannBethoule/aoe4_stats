<template>
  <v-hover v-slot="{ hover }">
    <router-link :class="hover? 'blue--text': 'white--text text-decoration-underline'" :to="to">
      <span :class="classes"><slot></slot></span>
    </router-link>
  </v-hover>
</template>

<script>
export default {
  name: "AppLink",
  props: {
    to: String,
    classes: String,
  }
}
</script>

<style scoped>

</style>
