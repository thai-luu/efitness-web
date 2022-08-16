<template>
    <div class="text-black exercise">
        <div class="text-xl text-transform: uppercase font-bold">My exercise</div>
        <table-exercise-user :exercises="exercises" :total="total" :pageSize="pageSize" :currentPage="currentPage" @fetchExercise="fetchExercise" @onDialog="openDialogEdit"/>
        <br>
        <el-button type="success" plain @click="openDialog">Create exercise</el-button>
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            width="50%"
            min-width="300px"
            >
            <el-form :model="exercise" :rules="rules" ref="formExercise" label-width="150px" class="demo-ruleForm">
                <el-form-item label="Name" prop="name">
                    <el-input class="w-40" v-model="exercise.name"></el-input>
                </el-form-item>
                <el-form-item class="categories_exercise" label="Category" prop="category">
                    <el-select v-model="exercise.category" placeholder="Category of exercise">
                        <el-option class="w-40" v-for="(category, index) in categories" :key="index" :label="category.name" :value="category.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="Compound" prop="compound">
                    <el-checkbox v-model="exercise.compound">Option</el-checkbox>
                </el-form-item>
                <el-form-item v-if="disabledMovement" label="Rep to failure" prop="failure">
                    <el-input-number class="w-40" :min="1" v-model="exercise.failure"></el-input-number>
                </el-form-item>
                <el-form-item  label="Muscle" prop="muscle">
                    <el-select
                        v-model="exercise.muscles"
                        multiple
                        filterable
                        default-first-option
                        placeholder="Chọn các nhóm cơ">
                            <el-option
                                v-for="item in muscleList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                    </el-select>
                </el-form-item>
                <div class="text-center">
                    <span>Calories tiêu hao:</span>
                    <span class="font-bold">{{exercise.calories}}</span>
                </div>
                <el-form-item>
                    <el-button v-if="this.title === 'Create exercise'" type="success" plain @click="submitForm">Submit</el-button>
                    <el-button v-else type="success" plain @click="editExercise">Update</el-button>
                    <el-button @click="offDialog">Cancel</el-button>
                </el-form-item>
        </el-form>
        </el-dialog>
    </div>
</template>
<script>
import TableExerciseUser from '~/components/exercise/TableExerciseUser.vue'
import _mapKeys from 'lodash/mapKeys'
import _cloneDeep from 'lodash/cloneDeep';
import { exerciseCategory, allMuscles } from '~/api/static'
import { createExercise } from '~/api/user/exercise'
import { index, update } from '~/api/user/exercise'
import { getExercises } from '~/api/exercise'
import ListSystemExercise from '~/components/ListSystemExercise.vue'
export default {
    async asyncData({app, query}) {
        const {data: categoriesList} = await exerciseCategory(app.$axios)
        const {data: muscles} = await allMuscles(app.$axios)
        const  exercises = await index(app.$axios, query)
        return { 
            categories: categoriesList || [{ id : '', name: ''}],
            muscles: muscles,
            exercises: exercises.data,
            total: exercises.meta.total,
            pageSize: exercises.meta.per_page,
            currentPage: exercises.meta.current_page,
        }
    },
    components : {
        ListSystemExercise,
        TableExerciseUser
    },
    watchQuery: true,
    data() {
      return {
        rules: {
                name: [
                    { required: true, message: 'Please input name', trigger: 'blur' },
                    { max: 50, message: 'max 50 character', trigger: 'blur' },
                ],
                category: [
                    { required: true, message: 'Please input category', trigger: 'change' },
                ],
                rm: [
                    { required: true, message: 'Please input rep to failure', trigger: 'blur' },
                ],

            },
        dialogVisible: false,
        exercise: {
                name: '',
                rm: '',
                categories_id: '',
                compound: false,
                failure: '',
                muscles:''
        },
        title:'', 
        exerciseSelected: null
      };
    },
    watch: {
            'exercise.categories_id' () {
                this.caculateCalories(this.exercise)
            },

            'exercise.compound' () {
                this.caculateCalories(this.exercise)
            },

            'exercise.failure' () {
                this.caculateCalories(this.exercise)
            }
        },

    computed: {
        disabledMovement() {
            return this.exercise.categories_id === 2
        },

        muscleList () {
            return this.convertMuscle(this.muscles)
        }
    },

    mounted () {
        console.log(this.muscleList,'list muscle')
    },

    methods: {
        async fetchExercise () {
            const {data: myExercise} = await index(this.$axios)
            this.exercises = myExercise
        },

        convertMuscle (muscles) {
            const muscleList = muscles.map((value) => {
            value =  _mapKeys(value , (val, key) => {
                    if(key === 'id'){
                    return 'value'
                    }
                    if(key === 'name'){
                    return 'label'
                    }
                    
                })
                delete value.undefined
                return value
            })
            
            return muscleList
        },

        convertMuscleEdit (muscles) {
            const muscleList = []
            muscles.forEach((item) => {
                muscleList.push(item.id)
            })

            
            return muscleList
        },

        async editExercise () {
            try {
                await update(this.$axios, this.exercise.id, this.exercise)
                this.fetchExercise()
                this.$message.success('Updated successfully')
                this.dialogVisible = false
            } catch (error) {
                this.$message.error('Some thing went wrong')
            }
        },

        openDialog () {
            this.dialogVisible = true
            this.title = 'Create exercise'
            
        },

        openDialogEdit (exercise) {
            this.dialogVisible = true
            this.exercise = _cloneDeep(exercise)
            this.exercise.muscles = _cloneDeep(this.convertMuscleEdit(this.exercise.muscles))
            this.exercise.category = _cloneDeep(exercise.category.id)
            console.log(this.muscleList)
            this.title = 'Edit exercise'
        },

        offDialog () {
            this.exercise = {
                name: '',
                rm: '',
                categories_id: '',
                compound: false,
                failure: '',
                muscles:''
            }
            this.dialogVisible = false
        },

        handleClose () {
            this.offDialog()
        },

        caculateCalories (exercise) {
            let calo = 8
            if (exercise.categories_id === 2) {
            if(exercise.failure > 7 &&  exercise.failure <=10)
                calo += 2
            if(exercise.failure <7 && exercise.failure !== 0)
                calo += 4
            if(exercise.failure > 12)
                calo += -1
            }
            if(exercise.compound == true)
                calo = calo * 2
            this.exercise.calories = calo
        },

        resetForm() {
            this.$refs.formExercise.resetFields();
        },

        submitForm() {
            this.$refs['formExercise'].validate(async (valid) => {
                if (valid) {
                    try{
                        const formExercise = {
                            name: this.exercise.name,
                            exercise_categories_id: this.exercise.category,
                            rm: this.exercise.failure,
                            compound: this.exercise.compound,
                            muscles: this.exercise.muscles
                        }
                        console.log(formExercise)
                        await createExercise(this.$axios, formExercise)
                        this.$message.success('Create exercise succesfully')
                        this.dialogVisible = false
                        this.fetchExercise()
                    }catch(e){
                        this.$message.error('Some thing went wrong')
                    }
                } else {
                    return false;
                }
            }
        )}
    }
}
</script>
<style lang="scss">
.categories_exercise {
    .el-input__inner {
        width: 100px;
    }
}
</style>