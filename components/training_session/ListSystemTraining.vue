<template>
    <div>
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="trainingSession in trainingSessions" :key="trainingSession.id">
            <el-card :body-style="{ padding: '0px'}">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                <div style="padding: 14px;">
                    <span>{{trainingSession.name}}</span>
                    <div class="bottom clearfix">
                        <div class="time">Mô tả: {{ trainingSession.desc }}</div>
                            <span class="time">Danh sách bài tập:</span>
                            <div class="grid grid-cols-3 gap-1">
                                <span v-for="exercise in trainingSession.exercises">
                                    <el-tag type="success">{{exercise.name}}</el-tag>
                                </span>
                            </div>
                        <el-button type="text" class="button" @click="view(trainingSession.id)">Xem chi tiết</el-button>
                    </div>
                </div>
                </el-card>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
export default {
    props :{
        trainingSessions: Array
    },

    methods: {
        view (id) {
            this.$router.push(`/exercise/${id}/detail`)
        }
    }
}
</script>
<style>
    .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin-top: 0px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-card__body {
    display: flex;
  }
</style>