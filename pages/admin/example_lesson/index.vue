<template>
<div>
  <div class="bg-gray-800 pt-3">
    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
      <h1 class="font-bold pl-2">Lesson</h1>
    </div>
  </div>
  <div class="flex flex-wrap">  
    <el-table
      :data="example_lessons"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="Name"
        width="220">
      </el-table-column>
      <el-table-column
        prop="mode"
        label="Mode"
        width="220">
          <template slot-scope="{row}">
            <el-tag type="success" class="ml-1 mt-1" v-for="mode in row.mode_id" :key="mode.id">
              {{mode.name}}
            </el-tag>
          </template>
      </el-table-column>
      <el-table-column
        prop="target"
        label="Target"
        width="220">
          <template slot-scope="{row}">
            <el-tag type="success" class="ml-1 mt-1" v-for="target in row.target_id" :key="target.id">
              {{target.name}}
            </el-tag>
          </template>
      </el-table-column>  
      <el-table-column
        prop="Tranining Session"
        label="training_session">
          <template slot-scope="{row}">
            <el-tag type="success" class="ml-1 mt-1" v-for="training in row.trainingSessions" :key="training.id">
              {{training.name}}
            </el-tag>
          </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operations"
        width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">Edit</el-button>
          <el-button type="text" size="small" @click="deleteLesson(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <a href="/admin/example_lesson/create">
  <el-button type="success" plain>
    Create
  </el-button>
      </a>
  <pagination v-bind="{ currentPage, total, pageSize }" />
</div>
</template>
<script>
import { deleteLesson, indexLesson } from '~/api/admin/lesson';
import Pagination from '~/components/shared/Pagination.vue'
export default {
    layout: 'admin',
    components: {
      Pagination
    },
    async asyncData(app){
        // try{
            const example_lessons =  await indexLesson(app.$axios)
            return {
              example_lessons: example_lessons.data,
              total: example_lessons.meta.total,
              pageSize: example_lessons.meta.per_page,
              currentPage: example_lessons.meta.current_page,
            }
        // }catch (err){
        //   return {example_lessons:[] }
        // }

    },
    created(){
      
    },

    methods: {
      edit (row) {
        this.$router.push(`/admin/example_lesson/${row.id}/edit`)
      },

      async fetchLesson() {
        const {data: example_lessons} =  await indexLesson(this.$axios)
        this.example_lessons = example_lessons
      },

      async deleteLesson (row) {
        try {
          await deleteLesson(this.$axios, row.id)
          this.fetchLesson()
          this.$message.success('Delete successfully')
        } catch (error) {
          this.$message.error('Some thing went wrong')
        }
        
      }
    }
}
</script>