<template>
<el-form ref="form" v-model="form" label-width="120px">
  <el-form-item label="Activity zone">
    <el-select v-model="form.mode_id" placeholder="please select your zone">
      <el-option v-for="(mode,index) in modes" :key="mode.id" label="Mode" value="mode.id">{{mode.name}}</el-option>
    </el-select>
  </el-form-item>
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
export default {
    layout:'admin',
    async asyncData({app}){
        try{
        const modeList = await modeLists(app.$axios)
        return { modes:modeList }
        }catch(err){
            return { modes:[]}
        }
    },
    data (){
        return {
            form:{
                desc:'',
                mode_id:null,
            }
        }
    },
   async created(){
        console.log(this.modes)
    },
    methods:{
        onSubmit(){

        }
    }
}
</script>