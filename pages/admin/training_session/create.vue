<template>
<el-form ref="form" v-model="form" label-width="120px">
  <el-form-item label="Name">
    <el-input type="text" v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="Note">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item :label="`Exercise ${index + 1}`" v-for="(exer,index) in form.exerciseList" :key="index">
    <el-select filterable v-model="exer.id" placeholder="please select exercise">
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
    <el-button type="primary" plain @click="onSubmit">Create</el-button>
    <el-button @click="back">Cancel</el-button>
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
                name:'',
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
      back () {
        this.$router.push('/admin/training_session')
      },

      async onSubmit(){
        try{
          await create(this.$axios,this.form)
          this.$notify.success('Succed')
          this.$nuxt.refresh()
        } catch (e) {
          this.$notify.error('Some thing went wrong')
        }
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