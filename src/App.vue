<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >

      <h1 class="text-xl-h4">AoE IV stats</h1>
      <h3 class="text-xl-h6 mx-auto"> Work in progress...</h3>
    </v-app-bar>

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Vue from "vue";

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  beforeMount() {
    Vue.prototype.$leaderboards = [17, 18, 19, 20]
    Array.prototype.sum = Array.prototype.sum || function (){
      return this.reduce(function(p,c){return p+c},0);
    };
    Array.prototype.avg = Array.prototype.avg || function () {
      return this.sum()/this.length;
    };
  }
}
</script>

<style>
</style>
