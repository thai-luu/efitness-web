<template>
    <div>
        <el-form :model="excercise" :rules="rules" ref="formExercise" label-width="120px" class="demo-ruleForm">
            <el-form-item label="Name" prop="name">
                <el-input class="w-40" v-model="excercise.name"></el-input>
            </el-form-item>
            <el-form-item label="Range of movement" prop="movement">
                <el-input-number :min="0" :disabled="disabledMovement" v-model="excercise.movement"></el-input-number>
            </el-form-item>
            <el-form-item label="Category" prop="categories_id">
                <el-select v-model="excercise.categories_id" placeholder="Category of exercise">
                    <el-option v-for="(category, index) in categories" :key="index" :label="category.name" :value="category.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="Muscle" prop="muscle">
                <el-select
                    v-model="exercise.muscle"
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
            <el-form-item>
                <el-button type="primary" @click="submitForm">Submit</el-button>
                <el-button @click="resetForm">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { exerciseCategory } from '~/api/static' 
import _mapKeys from 'lodash/mapKeys'
import _cloneDeep from 'lodash/cloneDeep';
export default {
    async asyncData({app}) {
        const {data: categoriesList} = await exerciseCategory(app.$axios)
        return { categories: categoriesList || [{ id : '', name: ''}] }
    },

    data() {
        return {
            rules: {
                name: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' },
                    { max: 15, message: 'max 15 character', trigger: 'blur' },
                ],
            },

            excercise: {
                name: '',
                movement: '',
                categories_id: '',
                muscles:[]
            },
            muscles: []
        }
    },
    computed: {
        disabledMovement() {
            return this.excercise.categories_id === 1
        },

        muscleList () {
            return this.convertMuscle(this.muscles)
        }
    },

    methods: {
        getStoreLocal () {
            if(process.client) {
            this.muscles = JSON.parse(localStorage.muscles)
        }
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
        resetForm() {
            this.$refs.formExercise.resetFields();
      },

      submitForm() {

      }
    },

    created() {
        
    }
}
</script>