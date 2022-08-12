<template>
    <div>
        <el-form :model="training_session" ref="formExercise" label-width="150px" class="demo-ruleForm">
            <el-form-item label="Name" prop="name">
                <el-input class="w-40" v-model="training_session.name"></el-input>
            </el-form-item>
            <el-form-item label="Exercise:" prop="Exercise">
            </el-form-item>
            <el-form-item v-for="(exercise, index) in training_session.exercises" :key="exercise.id" :label="exercise.name" prop="categories_id">
                <div class="text-black" v-if="exercise.category.id === 2">
                    <div v-for="exer in exercise.sets">
                        <span>Weight</span>
                        <el-input-number class="w-40" v-model="exer.weight" placeholder="weight"></el-input-number>
                        <span>Reps</span>
                        <el-input-number class="w-40" v-model="exer.reps" placeholder="reps"></el-input-number>
                        <span>Rm</span>
                        <el-input-number class="w-40" v-model="exer.rm"  placeholder="How many rm . is this weight"></el-input-number>
                        <el-button type="danger" plain icon="el-icon-minus" @click="deleteExercise(index)"></el-button>
                    </div>
                    <br>
                    <el-button type="success" plain @click="addSet(index)">Add set</el-button>
                </div>
                <div class="text-black" v-else>
                    <span>Time</span>
                    <el-input-number class="w-40" v-model="exercise.time" placeholder="time"></el-input-number>
                </div>
            </el-form-item>
            <div class="text-center ">
            <el-button type="success" plain @click="dialogVisible = true">Add Exercise</el-button>
            </div>
            <div class="text-center">
            <span class="text-black">
                Time: {{training_session.totalTime}}, Calo: {{training_session.calories}}
            </span>
            </div>
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
import { store } from '~/api/user/training_session'

export default {
    components: { TableExercise, ExerciseFilter },

    async asyncData ({app, query}) {
        const  {data: exercises} = await index(app.$axios, query)
        const {data: categories} = await exerciseCategory(app.$axios, query)
        const {data: muscles} = await allMuscles(app.$axios, query)
        return { 
            exercises: exercises.data || [] , 
            categories, muscles,
            }
    },

    data () {

        return {
            training_session:{
                name: '',
                exercises: [],
                volume: 0,
                totalTime: 0,
                calories: 0
            },
            dialogVisible: false,
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

        deleteExercise(index) {
            this.training_session.exercises.splice(index, 1)
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

        async submitForm () {
            const form = {
                name: this.training_session.name,
                exercises: this.training_session.exercises
            }
            // try {
                await store(this.$axios, form)
                this.$message.success('Created training session successfully')
                console.log(this.$route)
                this.$router.push(`/u/${this.$route.params.user}/training_session`)
            // } catch (error) {
            //     this.$message.error('Some thing went wrong')
            // }
        },

        consoleChange () {
        },

        resetForm () {

        }
    },
    
    created () {
        console.log(this.exercises)
        console.log(this.$route)
        if(Object.values(this.$route.query).length !== 0)
        {
            this.dialogVisible = true
        }
        
    },

    updated () {
        
    }
    
}
</script>