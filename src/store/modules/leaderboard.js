import api from '../../api/api'
import store from "@/store";

// initial state
// shape: [{ id, quantity }]
const state = () => ({
    '-1': null, //searching leaderboard
    17: [],
    18: [],
    19: [],
    20: [],
    // avatars: {},
    searching: false,
    apiError: false
})

// actions
const actions = {
    getLeaderboard({commit}, {leaderboard_id, count}) {
        api.getLeaderboard(leaderboard_id, count,
            leaderboard => {
                commit('setLeaderboard', {leaderboard_id, 'leaderboard': leaderboard})
                commit('setApiError', false)
            },
            error => {
                if (error.request && !error.response) {
                    commit('setApiError', true)
                }
            }
        )
    },
    searchLeaderboard({commit}, name) {
        //start by deleting the searching leaderboard
        commit('setSearching', true)
        commit('setApiError', false)
        commit('setLeaderboard', {leaderboard_id, 'leaderboard': null})
        let requests = [];
        let leaderboard_id = '-1'
        let leaderboard = [];
        store.state.constantes.all.leaderboards.forEach(mode => {
            if (mode.id == -1) return;
            requests.push(api.searchLeaderboard(mode.id, name))
        })
        Promise.allSettled(requests).then((results) => {
            results.forEach((result) => {
                if (result.status === 'rejected') {
                    commit('setApiError', true)
                    return;
                }
                result.value.data.leaderboard.forEach((player) => {
                    let row = leaderboard.find(p => p.profile_id === player.profile_id)
                    if (row) {
                        row.games += player.games;
                        row.wins += player.wins;
                        row.losses += player.losses;
                    } else {
                        leaderboard.push(player)
                    }
                })
            })
            commit('setLeaderboard', {leaderboard_id, leaderboard})
            commit('setSearching', false)
        })
    },
}

// getters
const getters = {}


// mutations
const mutations = {
    setLeaderboard(state, {leaderboard_id, leaderboard}) {
        state[leaderboard_id] = leaderboard
        // if (leaderboard) {
        //     api.getSteamAvatar(leaderboard.filter(player => !Object.keys(state.avatars).includes(player.profile_id)).map(player => player.profile_id), (response) => {
        //         console.log('leaderboard getAvatars', response)
        //         Object.assign(state.avatars, response)
        //     })
        // }
    },
    setSearching(state, value) {
        state.searching = value;
    },
    setApiError(state, value) {
        state.apiError = value;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
