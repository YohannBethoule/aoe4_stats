<template>
  <div class="container mx-auto px-4 sm:px-8 ">
    <div class="py-8">
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
            <tr>
              <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                User
              </th>
              <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                Ranking
              </th>
              <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                Elo
              </th>
              <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                Games
              </th>
              <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                Wins
              </th>
              <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                Losses
              </th>
              <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                Winrate
              </th>
              <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                Country
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="[profile_id, player] in leaderboards" :key="player.profile_id" @click="$emit('select-player', profile_id)"
                class="hover:bg-blue-200 text-lg">
              <td class="px-5 py-5 border-b border-gray-200 ">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{player.name}}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200">
                <p class="text-gray-900 whitespace-no-wrap">
                  #{{player.rank}}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{player.rating}}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{player.games}}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{player.wins}}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{player.losses}}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200">
                <p class="whitespace-no-wrap"
                   :class="{ 'text-green-900' : (player.wins/player.games*100) > 51 ,
                             'text-orange-900' : (player.wins/player.games*100) < 51 && (player.wins/player.games*100) > 49,
                             'text-red-900' : (player.wins/player.games*100) < 49}">
                  {{(player.wins/player.games*100).toFixed(2)}} %
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{player.country}}
                </p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeaderBoard",
  props: {
    leaderboards: Map,
  }
}
</script>

<style scoped>

</style>
