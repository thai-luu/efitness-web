<template>
<el-form ref="form" v-model="form" label-width="120px">
  <el-form-item label="Activity zone" v-for="(exercise,index) :key="index" in form.exerciseList">
    <el-select v-model="exercise.id" placeholder="please select your zone">
      <el-option v-for="(ex,index) in exercises" :key="ex.id" :label="exercise.name" :value="ex.id">{{exercise.name}}</el-option>
    </el-select>
  </el-form-item>
  <el-button @click="addExercise">
    Add exercise
  </el-button>
  <el-form-item label="Activity form">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="onSubmit">Create</el-button>
    <el-button>Cancel</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import { modeLists } from '~/api/mode';
import { getExercises } from '~/api/exercise'
export default {
    layout:'admin',
    data(){
      return {
        form:{
          
        }
      }
    },
    async asyncData({app}){
        try{
        const modeList = await modeLists(app.$axios)
        const exercises = await getExercises(app.$axios)
        return { modes:modeList, exercises:exercises }
        }catch(err){
            return { modes:[]}
        }
    },
    data (){
        return {
            form:{
                desc:'',
                exerciseList:[
                  {
                    id:'',
                    name:''
                  }
                ],
            }
        }
    },
   async created(){
        console.log(this.modes)
    },
    methods:{
        onSubmit(){

        },
        addExercise(){
          const ex = {
            id:''
          }
          this.form.exerciseList.push(ex)
        }
    }
}
</script>