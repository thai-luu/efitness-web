<template>
<fragment>
  <div class="bg-gray-800 pt-3">
    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
      <h1 class="font-bold pl-2">Traning session</h1>
    </div>
  </div>
  <div class="flex flex-wrap">  
    <el-table
      :data="example_lessons"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="Date"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="120">
      </el-table-column>
      <el-table-column
        prop="state"
        label="State"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="City"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="Address"
        width="300">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="Zip"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operations"
        width="120">
        <template slot-scope="scope">
          <el-button @click="handleClick" type="text" size="small">Detail</el-button>
          <el-button type="text" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <a href="/admin/training_session/create">
  <el-button>
    Primary
  </el-button>
      </a>
</fragment>
</template>
<script>
import { allExampleTrainningSession } from '~/api/lesson/lesson';
export default {
    layout: 'admin',
    async asyncData(){
        try{
            const example_lessons =  await allExampleTrainningSession(app.$axios)
            return example_lessons
        }catch (err){
          return {example_lessons:[] }
        }

    },
    created(){
      console.log(this.example_lessons)
    }
}
</script>