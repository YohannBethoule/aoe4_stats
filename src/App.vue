<template>
  <v-app>
    <AppBar></AppBar>

    <v-main v-if="constantes" :style="{background: $vuetify.theme.themes['dark'].mainBackground}">
      <div class="flex p-md-and-down-10 p-40 items-center place-content-center h-full">
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </v-main>
    <LoadingPage v-if="!constantes"></LoadingPage>
  </v-app>
</template>

<script>
import Vue from "vue";
import LoadingPage from "@/components/LoadingPage";
import {mapState} from 'vuex'
import AppBar from "@/components/AppBar";

export default {
  name: 'App',
  components: {
    AppBar,
    LoadingPage
  },
  computed: mapState({
    constantes: state => state.constantes.all
  }),
  beforeMount() {
    Vue.prototype.$leaderboards = [17, 18, 19, 20]
    Array.prototype.sum = Array.prototype.sum || function () {
      return this.reduce(function (p, c) {
        return p + c
      }, 0);
    };
    Array.prototype.avg = Array.prototype.avg || function () {
      return this.sum() / this.length;
    };
  },
  created() {
    this.$store.dispatch('constantes/getAllConstantes');
  },
  methods: {}
}
</script>

<style>
</style>
