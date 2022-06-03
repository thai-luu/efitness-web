<template>
<el-form ref="form" v-model="training_session" label-width="120px">
  <el-form-item label="Activity zone" v-for="(exer,index) in training_session.exercise" :key="index">
    <el-select v-model="exer.id" placeholder="please select your zone">
      <el-option v-for="(ex,index) in exercises" :key="ex.id" :label="ex.name" :value="ex.id">{{ex.name}}</el-option>
    </el-select>
    <el-button @click="deleteEx(index)"><i class="el-icon-delete"></i></el-button>
    <!-- <el-input v-model="exer.name"></el-input> -->
  </el-form-item>
  <el-button @click="addExercise">
    Add exercise
  </el-button>
  <el-form-item label="Activity form">
    <el-input type="textarea" v-model="training_session.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="onSubmit">Create</el-button>
    <el-button>Cancel</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import { getExercises } from '~/api/exercise'
import { edit } from '~/api/training_session'
import { getTrainingSession } from '~/api/training_session';
export default {
  props: {
  },
    layout:'admin',
    async asyncData({app,params}){
        try{
        const exercises = await getExercises(app.$axios)
        const training_session = await getTrainingSession(app.$axios,params.id)
        return { training_session:training_session, exercises:exercises }
        }catch(err){
            return { modes:[]}
        }
    },
    
   async created(){
      // const training_session = await getTrainingSession(this.$axios,params.id)
         console.log(this.training_session,this.$route.params)

    },
    methods:{
      async onSubmit(){
        await edit(this.$axios,this.$route.params.id,this.training_session)
              
        },
        deleteEx(index){
          console.log(index)
          this.training_session.exercise.splice(index,1)
        },
        addExercise(){
          const ex = {
            id:''
          }
          this.training_session.exercise.push(ex)
        },
        
    }
}
</script>