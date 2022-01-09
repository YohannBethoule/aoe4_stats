<template>
  <v-card class="my-5" color="rgba(0,0,0,0.3)" elevation="5">
    <v-card-title>{{ title }}
      <v-icon v-if="icon" class="ml-2">{{ icon }}</v-icon>
    </v-card-title>
    <v-card-text class="text-body-1 text--primary">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CustomCard",
  props: {
    title: String,
    icon: String,
    paragraph: String
  }
}
</script>

<style scoped>

</style>
