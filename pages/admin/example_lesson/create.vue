<template>
<el-form ref="form" v-model="form" label-width="120px">
  <el-form-item label="Dành cho">
    <el-select v-model="form.mode_id" placeholder="please select your zone">
      <el-option v-for="(mode,index) in modes" :key="mode.id" label="Mode" value="mode.id">{{mode.name}}</el-option>
    </el-select>
  </el-form-item>
  <el-form-item :label="`Buổi tập ${index + 1}`" v-for="(trainingSession, index) in form.trainingSessions" :key="index">
    <el-select v-model="trainingSession.id" filterable  placeholder="please select your zone">
      <el-option v-for="(trainingSession, index) in trainingSessions" :key="trainingSession.id" :label="trainingSession.desc" :value="trainingSession.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="success" plain @click="addTrainingSession">Add traning session</el-button>
  </el-form-item>
  <el-form-item label="Note">
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
import { index } from '~/api/training_session'
export default {
    layout:'admin',
    async asyncData({app}){
        try{
        const modeList = await modeLists(app.$axios)
        const {data: trainingSessionList} = await index(app.$axios)
        return { modes:modeList , trainingSessions: trainingSessionList }
        }catch(err){
            return { modes:[], trainingSessions: []}
        }
    },
    data (){
        return {
            form:{
                desc:'',
                mode_id:null,
                trainingSessions: []
            }
        }
    },
   async created(){
      const trainingSessionList = await index(this.$axios)
      console.log(trainingSessionList)
    },
    methods:{
        onSubmit(){

        },

        addTrainingSession () {
          const train = {}
          this.form.trainingSessions.push(train)
        }
    }
}
</script>