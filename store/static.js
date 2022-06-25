import { indexLevels, indexTargets, modeLists } from '~/api/static' 
const state = () => ({
    targets: [],
    levels: [],
    modes: []
});

const actions = {
    async fetch({ commit },axios) {
        const targets = await indexTargets(axios);
        const levels = await indexLevels(axios);
        const modes = await modeLists(axios);
        commit('setTarget', targets);
        commit('setLevel', levels);
        commit('setMode', modes);
    },
};

const mutations = {
    setTarget(state, targets) {
        state.targets = targets;
        
    },

    setLevel(state, levels) {
        state.levels = levels;

    },

    setMode(state, modes) {
        state.modes = modes;

    },
};

export default {
    state,
    actions,
    mutations,
};
