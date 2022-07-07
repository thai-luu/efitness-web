import { getSystemExerciseByMuscle } from '~/api/exercise' 
const state = () => ({
    exercises: [],
});

const actions = {
    async fetch({ commit },axios) {
        const exercises = await getSystemExerciseByMuscle(axios);
        commit('setExercises', exercises.data);

    },
};

const mutations = {
    setExercises(state, exercises) {
        state.exercises = exercises;
        
    },


};

export default {
    state,
    actions,
    mutations,
};