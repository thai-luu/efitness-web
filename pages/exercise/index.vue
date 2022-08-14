<template>
    <div class="text-black container mx-auto pt-10">
        <h1 class="text-center underline my-2 text-5xl font-bold leading-tight">Danh sách các bài tập</h1>
        <br>
        <div v-for="muscle in exercises">
            <br>
            <h1 class="text-3xl font-bold leading-tight uppercase text-center">{{muscle.name}}</h1>
            <br>
            <br>
            <list-system-exercise :exercises="muscle.exercises" />
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import ListSystemExercise from '~/components/ListSystemExercise.vue'
export default {
    components: {
        ListSystemExercise
    },

    async asyncData ({app, store}) {
        await store.dispatch('exercise/fetch',app.$axios)
    },

    computed:{
        ...mapState('exercise',['exercises'])
    },
    watchQuery: true,
    mounted () {
        
    }
}

</script>