<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="games"
        :single-expand=true
        :expanded.sync="expanded"
        item-key="match_id"
        show-expand
        :items-per-page="10"
        class="elevation-10"
    >
      <template v-slot:item.started="{ item }">
        {{new Date(item.started * 1000).toLocaleString()}}
      </template>

      <template v-slot:item.map_type="{ item }">
        {{ $constantes.map_type.find(map => map.id === item.map_type).string }}
      </template>

      <template v-slot:item.num_slots="{ item }">
        <v-chip
            dark
        >
          {{ item.num_slots / 2 }}v{{ item.num_slots / 2 }}
        </v-chip>
      </template>

      <template v-slot:item.rating="{ item }">
        {{ getTeamRating(item , true )}}
      </template>
      <template v-slot:item.opponentRating="{ item }">
        {{ getTeamRating(item , false )}}
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="text-xl pt-5">
          <h3 class="text-xl mb-3">
            {{ new Date(item.started * 1000).toLocaleString() }}
          </h3>
          <div class="flex space-x-12 items-center place-content-center">
            <div class="flex flex-col text-xl">
              <v-img
                  :src="require(`@/assets/maps/${item.map_type}.png`)"
                  :alt="'minimap ' + $constantes.map_type.find(map => map.id === item.map_type).string"
                  max-height="150"
                  max-width="150"
              ></v-img>
              <p class="text-center">{{ $constantes.map_type.find(map => map.id === item.map_type).string }}</p>
            </div>

            <div class="flex flex-col">
              <div v-for="ally in item.players.filter(p1 => p1.team === item.players.find(p2 => p2.profile_id === player.profile_id).team)" :key="ally.profile_id">
                <MatchHistoryPlayerCard :player="ally" :is-ally="true"></MatchHistoryPlayerCard>
              </div>
            </div>
            <div class="text-xl align-center my-auto">
              VS
            </div>
            <div class="flex flex-col">
              <div v-for="ennemy in item.players.filter(p1 => p1.team !== item.players.find(p2 => p2.profile_id === player.profile_id).team)" :key="ennemy.profile_id">
                <MatchHistoryPlayerCard :player="ennemy" :is-ally="false"></MatchHistoryPlayerCard>
              </div>
            </div>
          </div>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import MatchHistoryPlayerCard from "@/components/MatchHistoryPlayerCard";
const STRING_UNKNOWN = 'Unknown';
export default {
  name: "MatchHistory",
  components: {MatchHistoryPlayerCard},
  props: {
    games: Array,
    player: Object
  },
  data() {
    return {
      expanded: [],
      constantes: this.$constantes,
      headers: [
        { text: 'Date', value: 'started' },
        { text: 'Mode', value: 'num_slots' },
        { text: 'Team Rating', value: 'rating'},
        { text: 'Opponent Team Rating', value: 'opponentRating' },
        { text: 'Map', value: 'map_type' },
      ],
    }
  },
  methods: {
    getMyRating(players) {
      return players.find(p => p.profile_id !== this.player.profile_id).rating;
    },
    getTeamRating(game, isAllyTeam) {
      let avg = parseInt(
          game.players.filter(p1 => ( (isAllyTeam === (p1.team === game.players.find(p2 => p2.profile_id === this.player.profile_id).team) && p1.rating != null)))
              .map(p => p.rating)
              .avg()
      )
      return isNaN(avg) ? STRING_UNKNOWN : avg;
    }
  }
}
</script>

<style scoped>

</style>
