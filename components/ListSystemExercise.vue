<template>
    <div>
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="exercise in exercises" :key="exercise.id">
            <el-card :body-style="{ padding: '0px'}">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                <div style="padding: 14px;">
                    <span>{{exercise.name}}</span>
                    <div class="bottom clearfix">
                        <div class="time">Calories/min: {{ exercise.calories }}</div>
                        <div class="time" v-if="exercise.compound === true">Category: compound</div>
                        <div class="time" v-else>Category: transition</div>
                        <div class="time" v-if="exercise.level_id !== null">Level: {{ exercise.level_id.name_vi }}</div>
                        <el-button type="text" class="button" @click="view(exercise.id)">Xem chi tiết</el-button>
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
        exercises: Array
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