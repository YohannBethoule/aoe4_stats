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
        color="#4C0070"
        hide-on-scroll
    >
      <router-link :to="'/'" class="white--text"><span
          class="text-h3 text-white-100 text-no-wrap">AoE IV Analytics</span>
      </router-link>
      <v-tabs centered class="hidden-sm-and-down">
        <v-tab text to="/">Profile</v-tab>
        <v-tab text to="/leaderboards">Leaderboard</v-tab>
        <v-tab text to="/about">About</v-tab>
      </v-tabs>
      <v-spacer class="hidden-lg-and-up"></v-spacer>
      <v-app-bar-nav-icon class="hidden-lg-and-up" right @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        absolute
        right
        temporary
    >
      <v-list
          dense
          nav
      >
        <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
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
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>

</template>

<script>
export default {
  name: "AppBar",
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
