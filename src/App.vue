<template>
  <v-app>
    <AppBar></AppBar>

    <v-main :style="{background: $vuetify.theme.themes['dark'].mainBackground}">
      <div class="tw-flex tw-p-10 md:tw-p-32 tw-items-center tw-place-content-center tw-h-full">
        <router-view v-if="constantes" :key="$route.fullPath"></router-view>
        <LoadingPage v-if="!constantes"></LoadingPage>
      </div>

    </v-main>

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
