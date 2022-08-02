<template>
<div>
  <div class="bg-gray-800 pt-3">
    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
      <h1 class="font-bold pl-2">Food</h1>
    </div>
  </div>
  <div class="flex flex-wrap">  
    <el-table
      :data="foods"
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
        prop="carb"
        label="Carb"
        width="120">
      </el-table-column>
      <el-table-column
        prop="protein"
        label="Protein"
        width="120">
      </el-table-column>
      <el-table-column
        prop="fat"
        label="Fat"
        width="120">
      </el-table-column>
      <el-table-column
        prop="cenluloza"
        label="Cenluloza"
        width="120">
      </el-table-column>
      <el-table-column
        prop="vitaminA"
        label="VitaminA"
        width="120">
      </el-table-column>
      <el-table-column
        prop="vitaminB"
        label="VitaminB"
        width="120">
      </el-table-column>
      <el-table-column
        prop="natri"
        label="Natri"
        width="120">
      </el-table-column>
      <el-table-column
        prop="kali"
        label="Kali"
        width="120">
      </el-table-column>
      <el-table-column
        prop="classify"
        label="Classify"
        width="120">
      </el-table-column>
      <el-table-column
        prop="calo"
        label="Calo"
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
import { index } from '~/api/admin/food';
import { mapState } from 'vuex';
import Pagination from '~/components/shared/Pagination.vue'

export default {
    layout: 'admin',
    components: {
      Pagination
    },

    async asyncData({app, query}){
        try{
            const foods =  await index(app.$axios, query)
            return  { 
              foods: foods.data,
              total: foods.meta.total,
              pageSize: foods.meta.per_page,
              currentPage: foods.meta.current_page,
            }
        }catch (err){
          return {foods:[] }
        }
        
    },
    
    watchQuery: true,

    methods:{
       onEdit(id) {
        this.$router.push({path:`/admin/food/${id}/edit`})
            },
      add(){
        this.$router.push({path:`/admin/food/create`})
      }
    }

}
</script>