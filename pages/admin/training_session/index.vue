<template>
<div>
  <div class="bg-gray-800 pt-3">
    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
      <h1 class="font-bold pl-2">Traning session</h1>
    </div>
  </div>
  <search-training />
  <div class="flex flex-wrap"> 
    <el-table
      :data="training_sessions"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="Id"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="220">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="Description"
        width="320">
      </el-table-column>
      <el-table-column
        prop="exercise"
        label="Exercise"
      >
        <template slot-scope="{row}">
          <el-tag class="ml-1 mt-1" v-for="exercise in row.exercises" :key="exercise.id" type="success">{{exercise.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operations"
        width="120">
        <template slot-scope="{row}">
          <el-button @click="onEdit(row.id)" type="text" size="small">Edit</el-button>
          <el-button type="text" @click="deleteTraining(row.id)" size="small">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <pagination v-bind="{ currentPage, total, pageSize }" />
  <!-- <a href="/admin/training_session/create"> -->
  <el-button type="success" plain @click="add()">
    Create
  </el-button>
      <!-- </a> -->
</div>
</template>
<script>
import SearchTraining from '~/components/shared/training_session/SearchTraining.vue';
import { getAll, deleteTraining } from '~/api/admin/training_session';
import Pagination from '~/components/shared/Pagination.vue'
export default {
    layout: 'admin',

    components: {
      Pagination,
      SearchTraining
    },

    async asyncData({app, query}){
        try{
            const training_sessions =  await getAll(app.$axios, query)
            return  { 
              training_sessions: training_sessions.data,
              total: training_sessions.total,
              pageSize: training_sessions.per_page,
              currentPage: training_sessions.current_page,
              }
        }catch (err){
          return {training_sessions:[] }
        }

    },
    created(){
      //  const training_sessions =  await getAll(this.$axios)
      console.log(this.training_sessions)
      
    },
    
    watchQuery: true,

    methods:{
      onEdit(id) {
        this.$router.push({path:`/admin/training_session/${id}/edit`})
      },

      add(){
        this.$router.push({path:`/admin/training_session/create`})
      },

      async fetchTraining(){
        const training_sessions =  await getAll(this.$axios, this.$route.query)
        this.training_sessions = training_sessions.data
      },
      async deleteTraining(id){
        try {
          await deleteTraining(this.$axios, id)
          this.$message.success('Delete training session successfully')
          this.fetchTraining()
        } catch (error) {
          this.$message.success('Some thing went wrong')
        }
      }
    }

}
</script>