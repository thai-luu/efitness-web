<template>
<div>
  <div class="bg-gray-800 pt-3">
    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
      <h1 class="font-bold pl-2">Traning session</h1>
    </div>
  </div>
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
        prop="desc"
        label="Description"
        width="120">
      </el-table-column>
      <el-table-column
        prop="status"
        label="Status"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operations"
        width="120">
        <template slot-scope="{row}">
          <el-button @click="onEdit(row.id)" type="text" size="small">Detail</el-button>
          <el-button type="text" size="small">Edit</el-button>
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
import { getAll } from '~/api/admin/training_session';
import Pagination from '~/components/shared/Pagination.vue'
export default {
    layout: 'admin',

    components: {
      Pagination
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
      }
    }

}
</script>