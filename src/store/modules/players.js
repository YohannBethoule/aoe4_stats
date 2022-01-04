import api from '../../api/api'
import Vue from "vue";
import store from '../';

const state = () => ({
    all: {}
})

// actions
const actions = {
    getGameHistory({commit}, profile_id) {
        api.getGameHistory(profile_id, gameHistory => {
            commit('setGameHistory', {profile_id, gameHistory})
        })
    },
    getRatingHistory({commit}, {leaderboard_id, profile_id}) {
        api.getRatingHistory(leaderboard_id, profile_id, ratingHistory => {
            commit('setRatingHistory', {profile_id, leaderboard_id, ratingHistory})
        })
    },
    getPlayerLeaderboard({commit}, {leaderboard_id, profile_id}) {
        api.getPlayerLeaderboard(leaderboard_id, profile_id, leaderboard => {
            commit('setPlayerLeaderboard', {profile_id, leaderboard_id, leaderboard})
        })
    },
    refreshPlayerData({dispatch}, profile_id) {
        dispatch('getGameHistory', profile_id)
        dispatch('getRatingHistory', {'leaderboard_id': 17, 'profile_id': profile_id})
        store.state.constantes.all.leaderboards.forEach(mode => {
            if (mode.id == -1) return;
            dispatch('getPlayerLeaderboard', {leaderboard_id: mode.id, profile_id: profile_id})
        })
    }
}

// getters
const getters = {
    player: (state, getters) => (profile_id) => {
        let obj = {...state.all[profile_id]};
        obj.mainCiv = getters.playerCiv(profile_id)
        return obj;
    },
    playerCiv: state => (profile_id) => {
        if (!state.all[profile_id]?.gameHistory) return;
        return state.all[profile_id].gameHistory
            .map(game => game.players.find(player => player.profile_id == profile_id).civ)
            .reduce(
                (a, b, i, arr) =>
                    (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b),
                null);
    },
}


// mutations
const mutations = {
    setGameHistory(state, {profile_id, gameHistory}) {
        if (state.all[profile_id]) {
            Vue.set(state.all[profile_id], 'gameHistory', gameHistory.data)
        } else {
            Vue.set(state.all, profile_id, {gameHistory: gameHistory.data})
        }
    },
    setRatingHistory(state, {profile_id, leaderboard_id, ratingHistory}) {
        // if (state.all[profile_id]) {
        //     Vue.set(state.all[profile_id], 'ratingHistory', ratingHistory.data)
        // } else {
        //     Vue.set(state.all, profile_id, {ratingHistory: ratingHistory.data})
        // }
        const element = ratingHistory.data;

        if (state.all[profile_id]) {
            if (state.all[profile_id].ratingHistory) {
                Vue.set(state.all[profile_id].ratingHistory, leaderboard_id, element)
            } else {
                Vue.set(state.all[profile_id], 'ratingHistory', {[leaderboard_id]: element})
            }
        } else {
            Vue.set(state.all, profile_id, {ratingHistory: {[leaderboard_id]: element}})
            // Vue.set(state.all, profile_id, leaderboard.data.leaderboard[0])
        }
    },
    setPlayerLeaderboard(state, {profile_id, leaderboard_id, leaderboard}) {
        if (!leaderboard.data.leaderboard[0]) return;
        const element = {...leaderboard.data.leaderboard[0]}
        if (state.all[profile_id]) {
            if (state.all[profile_id].leaderboards) {
                const globalLeaderboard = state.all[profile_id].leaderboards['-1'] ?? null;
                if (Object.keys(element).length > 0 && globalLeaderboard && !state.all[profile_id].leaderboards[leaderboard_id]) {
                    //if global leaderboard already exists, merge the new one into it
                    Vue.set(state.all[profile_id].leaderboards, '-1', {
                        ...globalLeaderboard,
                        games: globalLeaderboard.games + element.games,
                        wins: globalLeaderboard.wins + element.wins,
                        losses: globalLeaderboard.losses + element.losses,
                        rating: Math.max(globalLeaderboard.rating, element.rating),
                    })
                }
                Vue.set(state.all[profile_id].leaderboards, leaderboard_id, element)
            } else {
                Vue.set(state.all[profile_id], 'leaderboards', {[leaderboard_id]: element, '-1': element})
            }
        } else {
            Vue.set(state.all, profile_id, {leaderboards: {[leaderboard_id]: element, '-1': element}})
            // Vue.set(state.all, profile_id, leaderboard.data.leaderboard[0])
        }
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
