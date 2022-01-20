<template>
  <v-app>
    <AppBar></AppBar>

    <v-main :style="{background: $vuetify.theme.themes['dark'].mainBackground}">
      <v-banner v-if="apiError" color="red t-0" sticky>
        <v-icon>mdi-alert-outline</v-icon>
        Oops ! It seems like the API from aoeiv.net is not reachable ! No data available
      </v-banner>

      <v-container class="d-flex pa-10 align-center justify-center page-container my-auto">
        <router-view v-if="constantes" :key="$route.fullPath"></router-view>
        <LoadingPage v-if="!constantes"></LoadingPage>
      </v-container>

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
    constantes: state => state.constantes.all,
    apiError: state => state.leaderboards.apiError
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
.table-background {
  background-color: rgba(0, 0, 0, 0.3) !important;
}

.page-container > div {
  flex-basis: 100%;
}

.v-main__wrap {
  display: flex;
  flex-direction: column;
  align-content: center;
}

.v-menu__content > .theme--dark.v-list {
  background-color: #3b1a52;
}

.v-text-field--outlined > .v-input__control > .v-input__slot {
  background-color: rgba(255, 255, 255, 0.1);
}

</style>
