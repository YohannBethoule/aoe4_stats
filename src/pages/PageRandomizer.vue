<template>
  <v-container class="d-flex flex-column flex-md-row  justify-space-around">

    <LoadingPage v-if="!constantes"></LoadingPage>
    <CarouselRandomizer class="mr-5" title="Maps">
      <v-carousel-item

          v-for="(map, i) in constantes.map_type"
          :key="i"
      >
        <v-img
            :aspect-ratio="1"
            :src="require(`@/assets/maps/${map.id}.png`)"
            width="100%"
        >
          <v-row
              align="center"
              class="fill-height"
              justify="center"
          >
            <div class="text-h4">
              {{ map.string }}
            </div>
          </v-row>
        </v-img>

      </v-carousel-item>

    </CarouselRandomizer>

    <CarouselRandomizer class="flex-grow-1" title="Civilizations">
      <v-carousel-item

          v-for="(civ, i) in constantes.civ.filter(c => c.id > -1)"
          :key="i"
      >
        <v-img
            :aspect-ratio="1920/1080"
            :src="require(`@/assets/flags/${civ.id}.webp`)"
            height="100%"
        >
          <v-row
              align="center"
              class="fill-height"
              justify="center"
          >
            <div class="text-h4">
              {{ civ.string }}
            </div>
          </v-row>
        </v-img>
      </v-carousel-item>

    </CarouselRandomizer>


  </v-container>
</template>

<script>
import {mapState} from "vuex";
import LoadingPage from "@/components/LoadingPage";
import CarouselRandomizer from "@/components/CarouselRandomizer";


export default {
  name: 'PageRandomizer',
  components: {
    LoadingPage,
    CarouselRandomizer
  },
  data() {
    return {
      cycle: false,
      cycleCiv: false,
    }
  },
  computed: mapState({
    constantes: state => state.constantes.all,
  }),
  methods: {
    getRandomTimeout() {
      const max = 3000
      const min = 2000
      return Math.random() * (max - min) + min;
    },
    getRandomMap() {
      this.cycle = true;
      setTimeout(() => {
        this.cycle = false;
      }, this.getRandomTimeout())
    },
    getRandomCiv() {
      this.cycleCiv = true;
      setTimeout(() => {
        this.cycleCiv = false;
      }, this.getRandomTimeout())
    },
  },
  watch: {}

}
</script>

<style scoped>
</style>
