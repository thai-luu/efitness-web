import { indexLevels, indexTargets, modeLists, foodList } from '~/api/static' 
const state = () => ({
    targets: [],
    levels: [],
    modes: [],
    foods: [],

});

const actions = {
    async fetch({ commit },axios) {
        const targets = await indexTargets(axios);
        const levels = await indexLevels(axios);
        const modes = await modeLists(axios);
        const foods = await foodList(axios);
        commit('setTarget', targets);
        commit('setLevel', levels);
        commit('setMode', modes);
        commit('setFoods', foods.data);

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

    setFoods(state, foods) {
        state.foods = foods;

    },

};

export default {
    state,
    actions,
    mutations,
};
