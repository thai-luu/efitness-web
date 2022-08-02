<template>
<el-form class="editDiet" ref="form" v-model="diet" label-width="120px">
  <el-form-item label="Tên">
    <el-input type="text" v-model="diet.name"></el-input>
  </el-form-item>
  <el-form-item label="Dành cho">
    <el-select v-model="diet.mode_id" placeholder="please select your zone">
      <el-option v-for="(mode,index) in modes" :key="mode.id" :label="mode.name" :value="mode.id">{{mode.name}}</el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Mục tiêu">
    <el-select v-model="diet.target_id" placeholder="please select your zone">
      <el-option v-for="(target,index) in targets" :key="target.id" :label="target.name" :value="target.id">{{target.name}}</el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Protein">
    <el-input type="number" v-model="diet.protein">
      <template slot="append">%</template>
    </el-input>
  </el-form-item>
  <el-form-item label="Carb">
    <el-input type="number" v-model="diet.carb">
      <template slot="append">%</template>
    </el-input>
  </el-form-item>
  <el-form-item label="Fat">
    <el-input type="number" v-model="diet.fat">
      <template slot="append">%</template>
    </el-input>
  </el-form-item>
  <el-form-item label="Cenluloza">
    <el-input type="number" v-model="diet.cenluloza">
      <template slot="append">%</template>
    </el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="onSubmit">Update</el-button>
    <el-button>Cancel</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import { show,update } from '~/api/diet'
import { modeLists } from '~/api/mode';
import { indexTargets } from '~/api/static'
export default {
  props: {
  },
    layout:'admin',
    async asyncData({app,params}){
        try{
        const diet = await show(app.$axios,params.id)
        const modes = await modeLists(app.$axios,params.id)
        const targets = await indexTargets(app.$axios,params.id)
        return { diet:diet, modes:modes,targets:targets }
        }catch(err){
            return { diet:[],modeLists:[],targets:[]}
        }
    },
    
   async created(){
      // const training_session = await getTrainingSession(this.$axios,params.id)
         

    },
    methods:{
      async onSubmit(){
        await update(this.$axios,this.$route.params.id,this.diet)           
        },
    }
}
</script>
<style lang="scss">
.editDiet{
  .el-form-item__content {
    width: 200px;
  }
}
</style>