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
        label="Mode"
        width="120">
        <template slot-scope="{row}">
          <p>{{row.mode.name}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="Target"
        width="120">
        <template slot-scope="{row}">
          <p>{{row.target.name}}</p>
        </template>
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
  <!-- <a href="/admin/training_session/create"> -->
  <el-button @click="add()">
    Primary
  </el-button>
      <!-- </a> -->
</div>
</template>
<script>
import { index } from '~/api/diet';
export default {
    layout: 'admin',
    async asyncData({app}){
        try{
            const diets =  await index(app.$axios)
            return  { diets }
        }catch (err){
          return {diets:[] }
        }

    },
   async created(){
      const diets =  await index(this.$axios)
      
    },
    methods:{
       onEdit(id) {
        this.$router.push({path:`/admin/example_diets/${id}/edit`})
            },
      add(){
        this.$router.push({path:`/admin/example_diets/create`})
      }
    }

}
</script>