<template>
    <div class="text-black exercise">
        <div>System excercise</div>
        <br>
        <div>My exercise</div>
        <br>
        <el-button type="success" plain @click="openDialog">Create exercise</el-button>
        <el-dialog
            title="Tips"
            :visible.sync="dialogVisible"
            width="50%"
            min-width="300px"
            >
            <el-form :model="exercise" :rules="rules" ref="formExercise" label-width="150px" class="demo-ruleForm">
                <el-form-item label="Name" prop="name">
                    <el-input class="w-40" v-model="exercise.name"></el-input>
                </el-form-item>
                <el-form-item class="categories_exercise" label="Category" prop="categories_id">
                    <el-select v-model="exercise.categories_id" placeholder="Category of exercise">
                        <el-option class="w-40" v-for="(category, index) in categories" :key="index" :label="category.name" :value="category.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Calories/min" prop="calories">
                    <el-input-number class="w-40" v-model="exercise.calories"></el-input-number>
                </el-form-item>
                <el-form-item  label="Compound" prop="compound">
                    <el-checkbox v-model="exercise.compound">Option</el-checkbox>
                </el-form-item>
                <el-form-item v-if="disabledMovement" label="Rep to failure" prop="failure">
                    <el-input-number class="w-40" :min="1" v-model="exercise.failure"></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" plain @click="submitForm">Submit</el-button>
                    <el-button @click="resetForm">Reset</el-button>
                </el-form-item>
        </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { exerciseCategory } from '~/api/static' 
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
                categories_id: [
                    { required: true, message: 'Please input category', trigger: 'change' },
                ],
                calories: [
                    { required: true, message: 'Please input calories', trigger: 'blur' },
                ],

            },
        dialogVisible: false,
        exercise: {
                name: '',
                calories: '',
                categories_id: '',
                compound: false,
                failure: ''

            }
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
        }
    },

    methods: {
        openDialog() {
            this.dialogVisible = true
        },

        caculateCalories (exercise) {
            let calo = 8
            if (exercise.categories_id === 2) {
            if(exercise.failure > 7 &&  exercise.failure <=10)
                calo += 2
            if(exercise.failure <7)
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
                            categories_id: this.exercise.categories_id,
                            calories: this.exercise.calories,
                            compound: this.exercise.compound,
                        }
                        console.log(formExercise.calories)
                        await update(this.$axios, this.$route.params.user, formExercise)
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