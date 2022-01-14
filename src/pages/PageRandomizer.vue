<template>
  <v-container class="d-flex flex-column  justify-space-around">

    <LoadingPage v-if="!constantes"></LoadingPage>
    <p class="text-h5">Quickly setup random maps and civilizations for your Age of Empire 4 custom games, with the
      ability to veto.</p>
    <div class="d-flex flex-column flex-md-row justify-space-around">
      <CarouselRandomizer :truc="constantes.map_type" class="mr-5" img-ext="png" img-path="maps/"
                          label-property="string" title="Maps">
      </CarouselRandomizer>

      <CarouselRandomizer :truc="constantes.civ.filter(c => c.id > -1)" img-ext="png" img-path="flags/"
                          label-property="string" title="Civilizations">
      </CarouselRandomizer>
    </div>


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
  },
  watch: {}

}
</script>

<style scoped>
</style>
