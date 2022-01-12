<template>
  <!--  <v-toolbar color="#4C0070" hide-on-scroll>-->
  <!--    <v-toolbar-title>Aoe4 Stats</v-toolbar-title>-->
  <!--    <v-spacer></v-spacer>-->
  <!--    <v-toolbar-items class="hidden-md-and-down " centered >-->
  <!--      <v-btn to="/" text>Profile</v-btn>-->
  <!--      <v-btn to="/leaderboards" text>Leaderboard</v-btn>-->
  <!--      <v-btn to="/about" text>About</v-btn>-->
  <!--    </v-toolbar-items>-->
  <!--    <v-menu class="hidden-md-and-up">-->
  <!--      <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>-->
  <!--      <v-list>-->
  <!--        <v-list-tile to="/">-->
  <!--          <v-list-tile-content>-->
  <!--            <v-list-tile-title>Profile</v-list-tile-title>-->
  <!--          </v-list-tile-content>-->
  <!--        </v-list-tile>-->
  <!--        <v-list-tile to="/leaderboards">-->
  <!--          <v-list-tile-content>-->
  <!--            <v-list-tile-title>Leaderboard</v-list-tile-title>-->
  <!--          </v-list-tile-content>-->
  <!--        </v-list-tile>-->
  <!--        <v-list-tile to="/about">-->
  <!--          <v-list-tile-content>-->
  <!--            <v-list-tile-title>About</v-list-tile-title>-->
  <!--          </v-list-tile-content>-->
  <!--        </v-list-tile>-->
  <!--      </v-list>-->
  <!--    </v-menu>-->
  <!--  </v-toolbar>-->
  <div>
    <v-app-bar
        app
        color="rgba(0, 0, 0, 0.4)"
        hide-on-scroll
    >
      <v-app-bar-nav-icon class="d-flex d-sm-none" left @click="drawer = true"></v-app-bar-nav-icon>
      <my-link classes="text-h5 text-no-wrap" text="AoE IV Analytics" to="/"></my-link>
      <v-icon class="ml-2 d-none d-sm-inline-flex">mdi-chart-areaspline</v-icon>
      <v-tabs centered class="d-none d-sm-inline-flex justify-center text-white" color="white">
        <v-tab text to="/">Profile</v-tab>
        <v-tab text to="/leaderboards">Leaderboard</v-tab>
        <v-tab text to="/randomizer">Random tool</v-tab>
        <v-tab text to="/about">About</v-tab>
      </v-tabs>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        color="rgba(0, 0, 0, 0.9)"
        absolute
        left
        temporary
    >
      <v-list
          dense
          nav
          centered
          height="100vh"
      >
        <v-list-item-group
            v-model="group"
            class="align-center justify-center fill-height"
            active-class=""
        >
          <v-list-item to="/">
            <v-list-item-title>Search</v-list-item-title>
          </v-list-item>

          <v-list-item to="/leaderboards">
            <v-list-item-title>Leaderboard</v-list-item-title>
          </v-list-item>

          <v-list-item to="/about">
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>

          <v-list-item to="/randomizer">
            <v-list-item-title>Random tool</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>

</template>

<script>
import MyLink from "@/components/MyLink";

export default {
  name: "AppBar",
  components: {MyLink},
  data() {
    return {
      drawer: false,
      group: null,
    }
  }
}
</script>

<style scoped>

</style>
