<template>
  <CustomCard :max-height="300" :max-width="500" :title="title" class="justify-content flex-grow-1 ">
    <v-carousel
        :cycle="cycle"
        class="my-auto"
        hide-delimiters
        height="300"
        interval="50"
    >
      <v-carousel-item
          v-for="(item, i) in truc.filter(elem => !vetos.includes(elem.id))"
          :key="i"
      >
        <v-img
            :src="require(`@/assets/${imgPath + item.id + '.' + imgExt}`)" aspect-ratio="1"
            contain
            height="300"
        >
          <v-row
              align="center"
              class="fill-height"
              justify="center"
          >
            <p class="text-h4 text-shadow">
              {{ item[labelProperty] }}
            </p>
          </v-row>
        </v-img>

      </v-carousel-item>

    </v-carousel>
    <div class="d-flex flex-column justify-center mt-5">
      <v-btn class="tw-mx-auto" @click="randomCycle()">Get random</v-btn>
      <div class="text-h6 my-3">Veto</div>
      <v-select
          v-model="vetos"
          :item-text="labelProperty"
          :items="truc"
          attach
          chips
          class=""
          item-value="id"
          multiple
          outlined
      ></v-select>
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
    title: String,
    truc: Array,
    labelProperty: String,
    imgSrc: String,
    imgPath: String,
    imgExt: String,
  },
  data() {
    return {
      cycle: false,
      vetos: []
    }
  },
  computed: mapState({
    constantes: state => state.constantes.all,
  }),
  methods: {
    getRandomTimeout() {
      const max = 2000
      const min = 1000
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
.text-shadow {
  text-shadow: 3px 3px #000000;
}
</style>
