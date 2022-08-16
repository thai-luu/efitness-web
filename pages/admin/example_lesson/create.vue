<template>
<el-form ref="form" v-model="form" label-width="120px">
  <el-form-item label="Dành cho người" :error="error.mode_id">
    <el-select  multiple filterable v-model="form.mode_id" placeholder="please select mode">
      <el-option v-for="(mode, index) in modes" :key="mode.id" :label="mode.name" :value="mode.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Mục tiêu" :error="error.target_id">
    <el-select  multiple filterable v-model="form.target_id" placeholder="please select mode">
      <el-option v-for="(target, index) in targets" :key="target.id" :label="target.name" :value="target.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Thêm buổi tập" :error="error.trainingSessions">
    <el-select  multiple filterable v-model="form.trainingSessions" placeholder="please select mode">
      <el-option v-for="(trainingSession, index) in trainingSessions" :key="trainingSession.id" :label="trainingSession.desc" :value="trainingSession.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Name" :error="error.name">
    <el-input type="text" v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="Note">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="onSubmit">Create</el-button>
    <el-button @click="back">Cancel</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import { modeLists } from '~/api/mode';
import { index } from '~/api/training_session'
import { store } from '~/api/admin/lesson'
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
                mode_id: [],
                trainingSessions: [],
                target_id: [],
                name: ''
            },
            targets: [],
            error:{}
        }
    },
    created () {
      this.getStoreLocal()
    },

    methods:{
        async onSubmit(){
          try {
          await store(this.$axios, this.form)
          this.$message.success('Create successfully')
          } catch (error) {
            if(error.response)
            this.error = error.response.data.errors
            this.$message.error("Some thing went wrong")
          }
        },

        back () {
          this.$router.push('/admin/example_lesson')
        },

        getStoreLocal(){
            if(process.client) {
                this.targets = JSON.parse(localStorage.targets)
            }
        },


    }
}
</script>