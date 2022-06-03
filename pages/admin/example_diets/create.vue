<template>
<el-form ref="form" v-model="form" label-width="120px">
  <el-form-item label="Tên">
    <el-input type="text" v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="Mô tả">
    <el-input type="textarea" v-model="form.note"></el-input>
  </el-form-item>
  <el-form-item label="Dành cho">
    <el-select v-model="form.mode_id" placeholder="please select your zone">
      <el-option v-for="(mode,index) in modes" :key="mode.id" :label="mode.name_vi" :value="mode.id">{{mode.name_vi}}</el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Mục tiêu">
    <el-select v-model="form.target_id" placeholder="please select your zone">
      <el-option v-for="(target,index) in targets" :key="mode.id" :label="target.name_vi" :value="target.id">{{target.name_vi}}</el-option>
    </el-select>
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
import { modeLists } from '~/api/mode';
import { index } from '~/api/target'
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
        const modes = await modeLists(app.$axios)
        const targets = await index(app.$axios)
        return { modes , targets }
        }catch(err){
            return { 
              modes:[],
              targets:[]
            }
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