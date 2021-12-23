import Vue from 'vue'
import Vuex from 'vuex'
import constantes from './modules/constantes'
import leaderboards from './modules/leaderboard'
import players from './modules/players'

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        constantes,
        leaderboards,
        players
    },
})
