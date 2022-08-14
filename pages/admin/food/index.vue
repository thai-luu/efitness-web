<template>
<div>
  <div class="bg-gray-800 pt-3">
    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
      <h1 class="font-bold pl-2">Food</h1>
    </div>
  </div>
  <SearchFood :search="search"/>
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
          <template slot-scope="scope">
              <span v-if="scope.row.classify">{{scope.row.classify.name}}</span>
          </template>
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
          <el-button @click="onEdit(row.id)" type="text" size="small">Edit</el-button>
          <el-button type="text" @click="deleteFood(row.id)" size="small">Delete</el-button>
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
import { index, deleteFood } from '~/api/admin/food';
import { mapState } from 'vuex';
import Pagination from '~/components/shared/Pagination.vue'
import SearchFood from '~/components/shared/food/SearchFood.vue';
export default {

    layout: 'admin',
    components: {
      Pagination,
      SearchFood
    },

    async asyncData({app, query}){
        try{
            const foods =  await index(app.$axios, query)
            return  { 
              foods: foods.data,
              total: foods.meta.total,
              pageSize: foods.meta.per_page,
              currentPage: foods.meta.current_page,
              search: {
                classify: parseInt(query.classify, 10) || '',
                protein: parseInt(query.protein, 10) || '',
                carb: parseInt(query.carb, 10) || '',
                fat: parseInt(query.fat, 10) || '',
                cenluloza: parseInt(query.cenluloza, 10) || '',
                name: query.name
            }
            }
        }catch (err){
          return {foods:[] }
        }
        
    },
    
    watchQuery: true,
    created () {
      console.log(this.foods)
    },

    methods:{
      onEdit(id) {
        this.$router.push({path:`/admin/food/${id}/edit`})
      },

      add(){
        this.$router.push({path:`/admin/food/create`})
      },

      async fetchFoods(){
        const foods =  await index(this.$axios, this.$route.query)
        this.foods = foods.data
        this.total = foods.meta.total
        this.pageSize = foods.meta.per_page
        this.currentPage = foods.meta.current_page
      },

      async deleteFood (id) {
        try {
          await deleteFood(this.$axios, id)
          this.fetchFoods()
          this.$message.success('Delete successfully')
        } catch (error) {
          this.$message.error('Some thing went wrong')
        }
        
      }
    }

}
</script>