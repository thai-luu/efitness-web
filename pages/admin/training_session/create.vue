<template>
<el-form ref="form" v-model="form" label-width="120px">
  <el-form-item label="Activity zone" v-for="(exer,index) in form.exerciseList" :key="index">
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
import { create } from '~/api/training_session'
export default {
  props: {
  },
    layout:'admin',
    data (){
        return {
            form:{
                desc:'',
                exerciseList: [{
                    id:'', 
                  }
                ],
                status: 1,
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
    
   async created(){
        
    },
    methods:{
      async onSubmit(){
        await create(this.$axios,this.form)
              
        },
        deleteEx(index){
          
          this.form.exerciseList.splice(index,1)
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