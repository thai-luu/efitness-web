<template>
<el-form ref="form" v-model="form" label-width="120px">
  <el-form-item label="Activity form">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item :label="`Exercise ${index + 1}`" v-for="(exer,index) in form.exerciseList" :key="index">
    <el-select v-model="exer.id" placeholder="please select your zone">
      <el-option v-for="(ex,index) in exercises" :key="ex.id" :label="ex.name" :value="ex.id">{{ex.name}}</el-option>
    </el-select>
    <el-input-number v-model="exer.set" placeholder="number of set"></el-input-number>
    <el-input-number v-model="exer.rep" placeholder="rep of set"></el-input-number>
    <el-button @click="deleteEx(index)"><i class="el-icon-delete"></i></el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="success" plain @click="addExercise">
      Add exercise
    </el-button>
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
import { create } from '~/api/admin/training_session'
export default {
  props: {
  },
    layout:'admin',
    data (){
        return {
            form:{
                desc:'',
                exerciseList: [],
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
          const ex = {}
          this.form.exerciseList.push(ex)
        }
    }
}
</script>