<template>
    <div>
        <el-form :model="training_session" ref="formExercise" label-width="150px" class="demo-ruleForm">
            <el-form-item label="Name" prop="name">
                <el-input class="w-40" v-model="training_session.name"></el-input>
            </el-form-item>
            <el-form-item v-for="(exercise, index) in training_session.exercises" :key="exercise.id" :label="exercise.name" prop="categories_id">
                <div v-if="exercise.category.id === 2">
                    <div v-for="exer in exercise.sets">
                        <el-input-number class="w-40" v-model="exer.weight" placeholder="weight"></el-input-number>
                        <el-input-number class="w-40" v-model="exer.reps" :max="exer.repFailure" placeholder="reps"></el-input-number>          
                    </div>
                    <br>
                    <el-button type="success" plain @click="addSet(index)">Add set</el-button>
                </div>
                <div v-else>
                    <el-input-number class="w-40" v-model="exercise.time" placeholder="time"></el-input-number>
                </div>
            </el-form-item>
            <el-button type="success" plain @click="dialogVisible = true">Add Exercise</el-button>
            <span class="text-black">
            {{training_session.totalTime}},{{training_session.calories}}
            </span>
            <el-form-item>
                <el-button type="primary" plain @click="submitForm">Submit</el-button>
                <el-button @click="resetForm">Reset</el-button>
            </el-form-item>
        </el-form>
        <table-exercise
            :exercises="exercises" 
            :muscles="muscles" 
            :categories="categories" 
            :dialogVisible="dialogVisible"
            :total="total"
            :pageSize="pageSize"
            :currentPage="currentPage"
            @emitExercise="pushExercise"
            @offDialog="offDialog" />
    </div>
</template>
<script>
import _forEach from 'lodash/forEach';
import _find from 'lodash/find'
import _assign from 'lodash/assign'
import TableExercise from '~/components/shared/TableExercise.vue'
import ExerciseFilter from '~/components/user/ExerciseFilter.vue'
import { index } from '~/api/exercise'
import { exerciseCategory, allMuscles } from '~/api/static'
export default {
    components: { TableExercise, ExerciseFilter },

    async asyncData ({app, query}) {
        const  {data: exercises} = await index(app.$axios, query)
        const {data: categories} = await exerciseCategory(app.$axios, query)
        const {data: muscles} = await allMuscles(app.$axios, query)
        return { 
            exercises: exercises.data || [] , 
            categories, muscles,
            total: exercises.meta.total,
            pageSize: exercises.meta.per_page,
            currentPage: exercises.meta.current_page,
            }
    },

    watch: {
        'training_session.exercises': {
            handler(){
                this.caculateCalories(this.training_session.exercises)
            },
            deep: true
        }
    },

    methods: {
        addSet (index) {
            const set = {}
            this.training_session.exercises[index].sets.push(set)
        },

        async search (search) {
            // try {
                this.exercises = await index(this.$axios, search)
            // } catch (e) {
                
            // }
        },

        pushExercise (exercises, dialog) {
            this.training_session.exercises = exercises
            this.dialogVisible = dialog
        },

        caculateCalories (form) {
            let calo = 0
            let time = 0
            _forEach(form, (value) => {
                let calories = value.calories
                if (value.sets.length > 0){
                    _forEach(value.sets, (val) => {
                        let rep = val.reps || 0
                        time += (rep*5)/60
                        calo += time*calories
                    })
                } else {
                    let timing = value.time || 0
                    time += timing
                    // console.log(123, time)
                    calo += time*calories
                }
            })
            this.training_session.totalTime = time
            this.training_session.calories = calo
            // console.log(time, calo)
        },

        offDialog (value) {
            this.dialogVisible = value
        },

        submitForm () {
            console.log(this.training_session)
        },

        consoleChange () {
        },

        resetForm () {

        }
    },

    data () {

        return {
            training_session:{
                name: '',
                exercises: [
                    
                ],
                volume: 0,
                totalTime: 0,
                calories: 0

            },
            dialogVisible: false,
            
        }
    },
    
    created () {
        console.log(this.exercises)
        if(Object.values(this.$route.query).length !== 0)
        {
            this.dialogVisible = true
        }
        
    },

    updated () {
        
    }
    
}
</script>