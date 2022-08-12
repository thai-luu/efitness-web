<template>
<el-form ref="form" v-model="exercise" label-width="120px">
  <el-form-item label="Tên bài tập">
    <el-input type="text" v-model="exercise.name"></el-input>
  </el-form-item>
  <el-form-item label="Mẹo tập">
    <el-input type="textarea" v-model="exercise.note"></el-input>
  </el-form-item>
  <el-form-item label="Compound">
    <el-checkbox v-model="exercise.compound"></el-checkbox>
  </el-form-item>
  <el-form-item label="Dành cho">
    <el-select v-model="exercise.level_id" placeholder="please select your zone">
      <el-option v-for="(level,index) in levels" :key="level.id" :label="level.name_vi" :value="level.id">{{level.name_vi}}</el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Video hướng dẫn">
    <el-input type="textarea" v-model="exercise.linkVd"></el-input>
  </el-form-item>
  <el-form-item label="Muscle" prop="muscle">
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
  <div class="text-center"><el-tag type="success" class="text-xl">Calories/min: {{calories}}</el-tag></div>
  <el-form-item>
    <el-button @click="onSubmit">Update</el-button>
    <el-button>Cancel</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import _mapKeys from 'lodash/mapKeys'
import _cloneDeep from 'lodash/cloneDeep';
import { getLevels,createExercise } from '~/api/exercise';
import { showExercise, updateExercise } from '~/api/admin/exercise'
export default {
  props: {
  },
    layout:'admin',
    data (){
      return {
        form:{
          level_id:null,
          note:'',
          name:'',
          calories:'',
          linkVd:'',
          muscles:[]
        },
        muscles:[]
      }
    },
    async asyncData({app, params}){
        try{
        const levels = await getLevels(app.$axios)
        const {data: exercise} = await showExercise(app.$axios, params.id)
        return { levels, exercise: exercise }
        }catch(err){
            return { levels:[]}
        }
    },

    computed: {
    muscleList () {
        return this.convertMuscle(this.muscles)
    },

    calories() {
        return this.exercise.compound === true ? 16 : 8
    }

    },

    created (){
      this.getStoreLocal()
    },

    mounted() {
        this.exercise.muscles = _cloneDeep(this.convertMuscleEdit(this.exercise.muscles))
        this.exercise.level_id = _cloneDeep(this.exercise.level_id.id)
        console.log(this.exercise.muscles)
    },
    methods:{
      getStoreLocal () {
            if(process.client) {
            this.muscles = JSON.parse(localStorage.muscles).data
            console.log(this.muscles)
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

        convertMuscleEdit (muscles) {
            const optionsMuscles = []
            muscles.forEach((item) => {
                optionsMuscles.push(item.id)
            })

            return optionsMuscles
        },

        async onSubmit(){
            try{
                await updateExercise(this.$axios, this.$route.params.id, this.exercise)
                this.$router.push('/admin/example_exercise')
                this.$message.success('Update exercise successfully')
            }
            catch(err){
                this.$message.error('Some thing went wrong')
            }
    }
    }
}
</script>