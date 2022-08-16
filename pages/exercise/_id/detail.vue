<template>
    <div class="pt-10  h-screen bg-slate-200">
        <div class="text-center text-black underline my-2 text-5xl font-bold leading-tight">
            <h1>Chi tiết bài tập</h1>
        </div>
        <br>
        <div class="pl-20 flex">
        <div v-html="exercise.linkVd" class="flex video"></div>
        <div class="float-right ml-10 bg-white pt-10 pl-5 info rounded-lg shadow">
            <div class="border-div">
                <span class="text-xl text-slate-600">Tên bài tập: {{exercise.name}} </span>
            </div>
            <br>
            <div class="text-xl text-slate-600 border-div">
                <span >Nhóm cơ tác động: </span>
                <span v-for="muscle in exercise.muscles" :key="muscle.id">
                    {{muscle.name}},
                </span>
            </div>
            <br>
            <div class="text-xl text-slate-600 border-div">
                <span >Thể loại bài tập: </span>
                <span v-if="exercise.compound">
                    Compound
                </span>
                <span v-else>
                    Transition
                </span>
            </div>
            <br>
            <div class="border-div">
                <span class="text-xl text-slate-600">Ghi chú: {{exercise.note}} </span>
            </div>
            <br>
            <div class="border-div">
                <span class="text-xl text-slate-600">Calo đốt cháy/phút: {{calories}} calo</span>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import { show } from '~/api/exercise'
export default {
    async asyncData ({app,params}) {
        try {
            const {data : exercise } = await show(app.$axios,params.id)
            return { exercise: exercise}
        } catch (error) {
            return { exercise: [] }
        }
    },

    created() {
        console.log(this.exercise.muscles, this.calories)
    },
    computed: {
        calories() {
            return this.caculateCalories(this.exercise)
        }
    },
    methods: {
        caculateCalories (exercise) {
            let calo = 8
            if (exercise.categories_id === 2) {
            if(exercise.compound == true)
                calo = calo * 2
            
            }
            return calo
        }
    }
}
</script>

<style lang="scss">
    .video{
        width: 68%;
        height: 300px;
        float: left
    }
    .info{
        height: 500px;
    }
    .border-div{
        border-bottom: 5px solid rgb(109, 100, 100);
    }
</style>