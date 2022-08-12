import { indexLevels, indexTargets, modeLists, allMuscles } from '~/api/static' 
const state = () => ({
    targets: [],
    levels: [],
    modes: [],
    muscles:[],

});

const actions = {
    async fetch({ commit },axios) {
        const targets = await indexTargets(axios);
        const levels = await indexLevels(axios);
        const modes = await modeLists(axios);
        const muscles = await allMuscles(axios);
        commit('setTarget', targets);
        commit('setLevel', levels);
        commit('setMode', modes);
        commit('setMuscle', muscles);

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

    setMuscle(state, muscles) {
        state.muscles = muscles;
    }

};

export default {
    state,
    actions,
    mutations,
};
