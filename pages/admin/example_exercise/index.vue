<template>
  <div>
    <div class="bg-gray-800 pt-3">
    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
    <h1 class="font-bold pl-2">Exercise</h1>
    </div>
    </div>
    <search-exercise />
    <div class="flex flex-wrap">  
    <el-table
    :data="exercises"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="Name"
      width="120">
    </el-table-column>
    <el-table-column
      prop="note"
      label="Note"
      width="320">
    </el-table-column>
    <el-table-column
      prop="linkVd"
      label="Link video"
      >
    </el-table-column>
    <el-table-column
      label="Level"
      width="120">
      <template slot-scope="scope">
        <p v-if="scope.row.level_id">{{scope.row.level_id.name_vi}}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="Muscles"
      width="220">
      <template slot-scope="scope">
        <div v-if="scope.row.muscles">
          <el-tag type="success" class="ml-1 mt-1" v-for="muscle in scope.row.muscles" :key="muscle.id">
            {{muscle.name}}
          </el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Operations"
      width="120">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row.id)" type="text" size="small">Edit</el-button>
        <el-button type="text" @click="deleteExercise(scope.row.id)" size="small">Delete</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
    <a href="/admin/example_exercise/create">
    <el-button type="success" plain>
    Create
    </el-button>
    </a>
    <pagination v-bind="{ currentPage, total, pageSize }" />
  </div>
</template>
<script>
import SearchExercise from '~/components/shared/exercise/SearchExercise.vue'
import { getExercises, deleteExercise } from '~/api/admin/exercise'
import Pagination from '~/components/shared/Pagination.vue'
export default {
  props: {
  },
  components: {
    Pagination,
    SearchExercise
  },
  data () {
    return {
    }
  },
  
  watchQuery: true,

  async asyncData({app, query}){
      try{
          const exercises = await getExercises(app.$axios, query)
          return { 
            exercises: exercises.data,
            total: exercises.meta.total,
            pageSize: exercises.meta.per_page,
            currentPage: exercises.meta.current_page,
            }
      }catch(e){
          return {exercises:[]}
      }
  },
  created () {

  },
  data() {
    return {
      muscles:[]
    }
  },
  methods: {
    edit (id) {
      this.$router.push(`/admin/example_exercise/${id}/edit`)
    },

    async fetchExercises() {
      const exercises = await getExercises(this.$axios)
      this.exercises= exercises.data
      this.total= exercises.meta.total
      this.pageSize= exercises.meta.per_page
      this.currentPage= exercises.meta.current_page
    },

    async deleteExercise (id) {
      try {
        await deleteExercise(this.$axios, id)
        this.fetchExercises()
        this.$message.success("Delete successfully")
      } catch (error) {
        this.$message.error("Some thing went wrong")
      }
    }
  },
    layout: 'admin',
}
</script>