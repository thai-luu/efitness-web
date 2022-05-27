<template>
<el-form ref="form" v-model="form" label-width="120px">
  <el-form-item label="Tên bài tập">
    <el-input type="text" v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="Mẹo tập">
    <el-input type="textarea" v-model="form.note"></el-input>
  </el-form-item>
  <el-form-item label="Dành cho">
    <el-select v-model="form.level_id" placeholder="please select your zone">
      <el-option v-for="(level,index) in levels" :key="level.id" :label="level.name_vi" :value="level.id">{{level.name_vi}}</el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Video hướng dẫn">
    <el-input type="text" v-model="form.linkVd"></el-input>
  </el-form-item>
    <el-form-item label="Video hướng dẫn">
    <el-input type="number" v-model="form.calories"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="onSubmit">Create</el-button>
    <el-button>Cancel</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import { getLevels,createExercise } from '~/api/exercise';
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
        }
      }
    },
    async asyncData({app}){
        try{
        const levels = await getLevels(app.$axios)
        return { levels }
        }catch(err){
            return { levels:[]}
        }
    },
    methods:{
      
        async onSubmit(){
          try{
            console.log(this.form)
          await createExercise(this.$axios,this.form)
        }
      catch(err){
        this.$notify.error('Some thing went wrong')
      }
    }
    }
}
</script>