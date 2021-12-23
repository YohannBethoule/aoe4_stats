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
    civName: (state) => (civ_id) => {
        if (!state.all.civ) return '';
        return state.all.civ.find(c => c.id == civ_id)?.string
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
                id: 17,
                label: 'QM 1v1',
                nbPlayers: 2
            },
            {
                id: 18,
                label: 'QM 2v2',
                nbPlayers: 4
            },
            {
                id: 19,
                label: 'QM 3v3',
                nbPlayers: 8
            },
            {
                id: 20,
                label: 'QM 4v4',
                nbPlayers: 16
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
