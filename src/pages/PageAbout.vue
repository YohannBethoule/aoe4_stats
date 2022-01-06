<template>
  <div class="container mx-auto px-4 sm:px-8 text-body-1">
    <div class="text-h5 mb-5">About me
      <v-icon>mdi-account-circle-outline</v-icon>
    </div>
    <p>
      My name is Yohann Bethoule, I'm a web developer from France. I'm also an Aoe 4 player and I made this website to
      be able to see more game statistics.
    </p>
    <v-divider class="my-10"></v-divider>
    <div class="text-h5 mb-5">Contact
      <v-icon>mdi-at</v-icon>
    </div>
    <p>
      If you have any request about the project, feel free to open an issue on the github repository, or send an email
      to :
      <a href="mailto:aoe4.analytics@gmail.com">aoe4.analytics@gmail.com</a>
    </p>
    <v-divider class="my-10"></v-divider>
    <div class="text-h5 mb-5">Check the sources
      <v-icon>mdi-book-open-blank-variant</v-icon>
    </div>
    <p class="text-body-1">
      You can find the source code of the application over there : <a
        href="https://github.com/YohannBethoule/aoe4_stats"
        target="_blank">https://github.com/YohannBethoule/aoe4_stats</a>
    </p>
    <p>
      This was made using the API from <a href="https://aoeiv.net/#api" target="_blank">aeoiv.net</a>
    </p>

    <v-divider class="my-10"></v-divider>
    <div class="text-h5 mb-5">External links
      <v-icon>mdi-open-in-new</v-icon>
    </div>
    <v-list class="pa-0 text-body-1 text--primary" color="rgba(0, 0, 0, 0)" three-line>
      <template>
        <v-subheader class="pa-0 text-body-1 text--primary">Here are some others great ressources for Age of Empire 4
          :
        </v-subheader>


        <v-list-item class="pa-0">
          <v-list-item-content>
            <v-list-item-title class="text-body-1 text--primary">Aoe4world</v-list-item-title>
            <v-list-item-subtitle class="text-body-1 text--primary">
              <a href="https://aoe4world.com" target="_blank">aoe4world.com</a> -
              Analytics for AoE4. Very well crafted, with a lot of useful features
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>


        <v-list-item class="pa-0">
          <v-list-item-content>
            <v-list-item-title class="text-body-1 text--primary">AoE4 Quick Sheet</v-list-item-title>
            <v-list-item-subtitle class="text-body-1 text--primary">
              <a href="https://docs.google.com/spreadsheets/d/1LG0We2pTFZsbFm_k1SKLix8gxSq_9n5R_Ic3G2tVzBg/edit?pli=1#gid=1819454633"
                 target="_blank">Acces to google spreasheet</a> -
              All useful ressources for AoE4 stored in one place
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>

</template>

<script>
export default {
  name: "About",
}
</script>

<style scoped>

</style>
