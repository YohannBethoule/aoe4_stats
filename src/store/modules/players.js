import api from '../../api/api'
import Vue from "vue";
import store from '../';

const state = () => ({
    all: {}
})

const getMatchLeaderboardId = (match) => {
    if (!store.state.constantes.all.leaderboards) return null;
    if (match.leaderboard_id !== undefined) return match.leaderboard_id;

    return store.state.constantes.all.leaderboards.find(leaderboard => {
        return match.num_slots === leaderboard.nbPlayers
    }).id
}

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
    getPlayerLeaderboards({commit}, profile_id) {
        let requests = [];
        commit('setSearching', {profile_id, value: true})
        store.state.constantes.all.leaderboards.forEach(mode => {
            if (mode.id == -1) return;
            requests.push(api.getPlayerLeaderboard(mode.id, profile_id))
        })
        Promise.allSettled(requests).then((results) => {
            results.forEach((result) => {
                let data = result.value.data;
                if (result.status === 'rejected' || data.count < 1) {
                    return;
                }
                commit('setPlayerLeaderboard', {
                    profile_id,
                    leaderboard_id: data.leaderboard_id,
                    leaderboard: data.leaderboard[0]
                })

            })
            commit('setSearching', {profile_id, value: false})
        })
    },
    getSteamAvatar({commit}, profile_id) {
        api.getSteamAvatar([profile_id], avatarUrl => {
            commit('setAvatarUrl', {profile_id, avatarUrl: avatarUrl[profile_id]})
        })
    },
    refreshPlayerData({dispatch}, profile_id) {
        dispatch('getGameHistory', profile_id)
        dispatch('getSteamAvatar', profile_id)
        dispatch('getPlayerLeaderboards', profile_id)
        store.state.constantes.all.leaderboards.forEach(mode => {
            if (mode.id == -1) return;
            dispatch('getRatingHistory', {'leaderboard_id': mode.id, 'profile_id': profile_id})
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
    setAvatarUrl(state, {profile_id, avatarUrl}) {
        if (state.all[profile_id]) {
            Vue.set(state.all[profile_id], 'avatarUrls', avatarUrl)
        } else {
            Vue.set(state.all, profile_id, {avatarUrls: avatarUrl})
        }
    },
    setSearching(state, {profile_id, value}) {
        if (state.all[profile_id] && !value) {
            Vue.set(state.all[profile_id], 'searching', value)
        } else {
            Vue.set(state.all, profile_id, {searching: value})
        }
    },
    setGameHistory(state, {profile_id, gameHistory}) {
        for (let game of gameHistory) {
            game.leaderboard_id = getMatchLeaderboardId(game);
        }
        if (state.all[profile_id]) {
            Vue.set(state.all[profile_id], 'gameHistory', gameHistory)
        } else {
            Vue.set(state.all, profile_id, {gameHistory: gameHistory})
        }
    },
    setRatingHistory(state, {profile_id, leaderboard_id, ratingHistory}) {
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
        if (!leaderboard) return;
        const element = {...leaderboard}
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
                        rank: Math.min(globalLeaderboard.rank, element.rank),
                    })
                }
                Vue.set(state.all[profile_id].leaderboards, leaderboard_id, element)
            } else {
                Vue.set(state.all[profile_id], 'leaderboards', {[leaderboard_id]: element, '-1': element})
            }
        } else {
            Vue.set(state.all, profile_id, {leaderboards: {[leaderboard_id]: element, '-1': element}})
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
