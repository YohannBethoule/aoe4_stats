<template>
  <CustomCard :max-width="400" :title="title" class="justify-content flex-grow-1">
    <div class="d-flex flex-column ">
      <v-carousel
          :cycle="cycle"
          class="my-auto"
          height="100%"
          hide-delimiters
          interval="100"
      >
        <slot></slot>

      </v-carousel>
      <div class="d-flex justify-center mt-5">
        <v-btn class="tw-mx-auto" @click="randomCycle()">Get random</v-btn>
      </div>
    </div>

  </CustomCard>
</template>

<script>
import {mapState} from "vuex";
import CustomCard from '@/components/CustomCard'

export default {
  name: "CarouselRandomizer",
  components: {
    CustomCard
  },
  props: {
    title: String
  },
  data() {
    return {
      cycle: false,
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
    randomCycle() {
      this.cycle = true;
      setTimeout(() => {
        this.cycle = false;
      }, this.getRandomTimeout())
    },
  },
}
</script>

<style scoped>

</style>
