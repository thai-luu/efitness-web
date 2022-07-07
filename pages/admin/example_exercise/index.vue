<template>
    <fragment>
  <div class="bg-gray-800 pt-3">
    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
      <h1 class="font-bold pl-2">Analytics</h1>
    </div>
  </div>
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
        width="120">
      </el-table-column>
      <el-table-column
        prop="calories"
        label="Calories"
        width="120">
      </el-table-column>
      <el-table-column
        prop="linkVd"
        label="Link video"
        width="300">
      </el-table-column>
      <el-table-column
        label="Level"
        width="120">
        <template slot-scope="scope">
          <p>{{scope.row.level.name_vi}}</p>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operations"
        width="120">
        <template slot-scope="scope">
          <el-button @click="" type="text" size="small">Detail</el-button>
          <el-button type="text" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <a href="/admin/example_exercise/create">
  <el-button type="success" plain>
    Create
  </el-button>
      </a>
</fragment>
</template>
<script>
import { getExercises } from '~/api/exercise'
export default {
  props: {
  },
  data () {
    return {
    }
  },
  async asyncData({app}){
      try{
          const exercises = await getExercises(app.$axios)
          return { exercises }
      }catch(e){
          return {exercises:[]}
      }
  },
  created () {

  },
  methods: {
  },
    layout: 'admin',
}
</script>