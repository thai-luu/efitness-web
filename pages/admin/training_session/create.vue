<template>
    <div>
        <el-form :model="form" ref="formExercise" label-width="150px" class="demo-ruleForm">
            <el-form-item label="Name" prop="name" :error="error.name">
                <el-input class="w-40" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Desc" prop="desc">
                <el-input class="w-40" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="Exercise:" prop="Exercise"  :error="error.exercises">
            </el-form-item>
            <el-form-item v-for="(exercise, index) in form.exercises" :key="exercise.id" :label="exercise.name" prop="categories_id">
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
                Time: {{totalTime}}, Calo: {{calories}}
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
import { getTrainingSession, create } from '~/api/admin/training_session'
import { getExercises } from '~/api/admin/exercise'
import { exerciseCategory, allMuscles } from '~/api/static'
import TableExercise from '~/components/shared/TableExercise.vue'
export default {
    layout: 'admin',
    async asyncData ({app, params, query}) {  
        const  exercises = await getExercises(app.$axios, query)
        const {data: categories} = await exerciseCategory(app.$axios, query)
        const {data: muscles} = await allMuscles(app.$axios, query)
        return {
            exercises: exercises.data || [] , 
            total: exercises.meta.total,
            pageSize: exercises.meta.per_page,
            currentPage: exercises.meta.current_page,
            categories, muscles,
        }
    },

    components: { TableExercise },

    data () {
        return {
          form: {
            name: '',
            desc: '',
            exercises: [],
          },
          error: {},
          dialogVisible: false,
        }
    },

    watch: {
        'training_session.exercises': {
            handler(){
                this.caculateCalories(this.form.exercises)
            },
            deep: true
        }
    },

    computed: {
        totalTime () {
            return this.caculateCalories(this.form.exercises).time
        },

        calories () {
            return this.caculateCalories(this.form.exercises).calo
        }
    },

    methods: {
        addSet (index) {
            const set = {}
            this.form.exercises[index].sets.push(set)
        },

        async search (search) {
            // try {
                this.exercises = await index(this.$axios, search)
            // } catch (e) {
                
            // }
        },

        deleteExercise(index) {
            this.form.exercises.splice(index, 1)
        },

        pushExercise (exercises, dialog) {
            this.form.exercises.push(...exercises)
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
            return {
                time: time,
                calo: calo
            }
            // console.log(time, calo)
        },

        offDialog (value) {
            this.dialogVisible = value
        },

        async submitForm () {
            const form = {
                name: this.form.name,
                desc: this.form.desc,
                exercises: this.form.exercises
            }
            try {
                await create(this.$axios, form)
                this.$message.success('Updated training session successfully')
                this.$router.push(`/admin/training_session`)
            } catch (error) {
                if(error.response)
                this.error = error.response.data.errors
                this.$message.error('Some thing went wrong')
            }
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
}
</script>