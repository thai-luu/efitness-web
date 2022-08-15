<template>
<div>
<el-card :body-style="{ padding: '0px'}">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      <div style="padding: 14px;">
          <span>{{diet.name}}</span>
          <div class="bottom clearfix">
              <div class="time" v-if="diet.protein">Protein: {{diet.protein}}%</div>
              <div class="time" v-if="diet.carb">Carb: {{diet.carb}}%</div>
              <div class="time" v-if="diet.fat">Fat: {{diet.fat}}%</div>
              <div class="time" v-if="diet.range">Range: {{diet.range}}%</div>
              <div class="time" v-if="diet.mode_targets">
                <div class="time" v-for="mode_target in diet.mode_targets">
                  <div> Tạng người: {{mode_target.mode.name}}</div>
                  <div> Mục tiêu: {{mode_target.target.name}}</div>
                </div>
              </div>
              <el-button type="text" class="button" @click="view(diet.id)">Xem chi tiết</el-button>
          </div>
      </div>
    </el-card>
</div>
</template>
<script>
export default {
    props:{
      diet:{
        type: Object
      }
    }
}
</script>