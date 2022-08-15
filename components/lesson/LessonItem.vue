<template>
    <el-card :body-style="{ padding: '0px'}">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      <div style="padding: 14px;">
          <span>{{lesson.name_vi}}</span>
          <div class="bottom clearfix">
              <el-button type="text" class="button" @click="view(exercise.id)">Xem chi tiết</el-button>
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
    }
    
}
</script>