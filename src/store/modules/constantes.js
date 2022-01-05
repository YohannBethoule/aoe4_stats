import api from '../../api/api'

// initial state
// shape: [{ id, quantity }]
const state = () => ({
    all: null
})

// actions
const actions = {
    getAllConstantes({commit}) {
        api.getConstantes('en', constantes => {
            commit('setConstantes', constantes)
        })
    },
}

// getters
const getters = {
    gameMode: (state) => (leaderboard_id) => {
        if (!state.all.leaderboards) return null;
        return state.all.leaderboards.find(lb => lb.id == leaderboard_id)
    },
    civ: (state) => (civ_id) => {
        if (!state.all.civ) return null;
        return state.all.civ.find(c => c.id == civ_id)
    },
    civName: (state) => (civ_id) => {
        if (!state.all.civ) return '';
        return state.all.civ.find(c => c.id == civ_id)?.string
    },
    gameModeName: (state) => (leaderboard_id) => {
        if (!state.all.leaderboards) return '';
        return state.all.leaderboards.find(lb => lb.id == leaderboard_id)?.label
    },
    gameModeFromNumSlotsAndLeaderBoardId: (state) => (num_slots, leaderboard_id) => {
        if (!state.all.leaderboards) return '';
        if (leaderboard_id === 0) return state.all.leaderboards.find(lb => lb.id === 0);
        return state.all.leaderboards.find(lb => lb.nbPlayers == num_slots)
    },
}


// mutations
const mutations = {
    setConstantes(state, constantes) {
        state.all = constantes.data
        state.all.civ.splice(0, 0, {id: -1, string: 'All civilizations'})
        state.all.leaderboards = [
            {
                id: -1,
                label: 'All modes',
                nbPlayers: 0
            },
            {
                id: 0,
                label: 'Custom',
                chipColor: '#CC8F00',
                nbPlayers: -1
            },
            {
                id: 17,
                label: 'QM 1v1',
                chipColor: '#6930c3',
                nbPlayers: 2
            },
            {
                id: 18,
                label: 'QM 2v2',
                chipColor: '#5e60ce',
                nbPlayers: 4
            },
            {
                id: 19,
                label: 'QM 3v3',
                chipColor: '#118ab2',
                nbPlayers: 6
            },
            {
                id: 20,
                label: 'QM 4v4',
                chipColor: '#073b4c',
                nbPlayers: 8
            },
        ]
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
