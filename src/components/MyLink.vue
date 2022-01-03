<template>
  <v-hover v-slot="{ hover }">
    <router-link :class="hover? 'blue--text': 'white--text text-decoration-underline'" :to="to"><span
        :class="classes">{{ text }}</span>
    </router-link>
  </v-hover>
</template>

<script>
export default {
  name: "MyLink",
  props: {
    to: String,
    classes: String,
    text: String,
  }
}
</script>

<style scoped>

</style>
