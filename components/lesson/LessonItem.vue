<template>
    <el-card :body-style="{ padding: '0px'}">
      <img src="https://img.websosanh.vn/v10/users/review/images/5yjgxwhc7fahw/ta-tay-1.jpg?compress=85" class="image w-1/2">
      <div style="padding: 14px;">
          <span>{{lesson.name_vi}}</span>
          <div class="bottom clearfix">
              <!-- <el-button type="text" class="button" @click="view(lesson.id)">Xem chi tiết</el-button> -->
          </div>
      </div>
    </el-card>
</template>
<script>
export default {
    components: {

    },
    props: {
      lesson: Object
    },

    methods: {
      view(id){
        this.$router.push(`/lesson/${id}`)
      }
    }
}
</script>