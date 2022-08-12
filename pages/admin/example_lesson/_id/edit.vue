<template>
<el-form ref="form" v-model="lesson" label-width="120px">
  <el-form-item label="Dành cho người">
    <el-select  multiple filterable v-model="lesson.mode_id" placeholder="please select mode">
      <el-option v-for="(mode, index) in modes" :key="mode.id" :label="mode.name" :value="mode.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Mục tiêu">
    <el-select  multiple filterable v-model="lesson.target_id" placeholder="please select mode">
      <el-option v-for="(target, index) in targets" :key="target.id" :label="target.name" :value="target.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Thêm buổi tập">
    <el-select  multiple filterable v-model="lesson.trainingSessions" placeholder="please select mode">
      <el-option v-for="(trainingSession, index) in trainingSessions" :key="trainingSession.id" :label="trainingSession.desc" :value="trainingSession.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Name">
    <el-input type="text" v-model="lesson.name"></el-input>
  </el-form-item>
  <el-form-item label="Note">
    <el-input type="textarea" v-model="lesson.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="success" plain @click="onUpdate">Update</el-button>
    <el-button @click="back">Back</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import { modeLists } from '~/api/mode';
import { index } from '~/api/training_session'
import { store, showLesson, editLesson } from '~/api/admin/lesson'

export default {
    layout:'admin',
    async asyncData({app, params}){
        try{
        const modeList = await modeLists(app.$axios)
        const {data: trainingSessionList} = await index(app.$axios)
        const {data: lesson} = await showLesson(app.$axios, params.id)
        return { modes:modeList , trainingSessions: trainingSessionList, lesson: lesson }
        }catch(err){
            return { modes:[], trainingSessions: [], lesson: []}
        }
    },
    data (){
        return {
            targets: [],
        }
    },
    created () {
      this.getStoreLocal()
    },

    methods:{
        async onUpdate(){
          try {
            await editLesson(this.$axios, this.$route.params.id, this.lesson)
            this.$message.success('Update successfully')
            this.$router.push('/admin/example_lesson')
          } catch (error) {
            this.$message.error('Some thing went wrong')
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