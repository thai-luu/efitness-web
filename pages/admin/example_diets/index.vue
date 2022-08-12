<template>
<div>
  <div class="bg-gray-800 pt-3">
    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
      <h1 class="font-bold pl-2">Diets</h1>
    </div>
  </div>
  <div class="flex flex-wrap">  
    <el-table
      :data="diets"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="Id"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="120">
      </el-table-column>
      <el-table-column
        prop="protein"
        label="protein"
        width="120">
      </el-table-column>
      <el-table-column
        prop="fat"
        label="fat"
        width="120">
      </el-table-column>
      <el-table-column
        prop="carb"
        label="carb"
        width="120">
      </el-table-column>
      <el-table-column
        prop="cenluloza"
        label="cenluloza"
        width="120">
      </el-table-column>
      <el-table-column
        prop="trans"
        label="trans"
        width="120">
      </el-table-column>
      <el-table-column
        prop="range"
        label="range"
        width="120">
      </el-table-column>
      <el-table-column
        label="Mode"
        width="120">
        <template slot-scope="scope">
          <div v-for="modeTarget in scope.row.mode_target">
            {{modeTarget.mode.name}} - {{modeTarget.target.name}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operations"
        width="120">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row.id)" type="text" size="small">Edit</el-button>
          <el-button type="text" @click="deleteDiet(scope.row.id)" size="small">Delete</el-button>
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
import Pagination from '~/components/shared/Pagination.vue'
import { index } from '~/api/diet';
import { deleteDiet } from '~/api/admin/diet';
export default {
    layout: 'admin',
    components: {
      Pagination
    },

    async asyncData({app, query}){
        try{
            const diets =  await index(app.$axios, query)
            return  { 
              diets: diets.data,
              total: diets.meta.total,
              pageSize: diets.meta.per_page,
              currentPage: diets.meta.current_page,
              }
        }catch (err){
          return {diets:[] }
        }

    },

    methods:{
      onEdit(id) {
        this.$router.push({path:`/admin/example_diets/${id}/edit`})
      },

      add(){
        this.$router.push({path:`/admin/example_diets/create`})
      },

      async fetchDiet(){
        const diets =  await index(this.$axios, this.$route.query)
        this.diets = diets.data
      },

      async deleteDiet (id) {
        try {
          await deleteDiet(this.$axios, id)
          this.fetchDiet()
          this.$message.success('Delete successfully')
        } catch (error) {
          this.$message.error('Some thing went wrong')
        }
        
      }
    },

    created () {
      console.log(this.diets)
    }

}
</script>