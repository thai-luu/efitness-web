<template>
<el-form class="createDiet" ref="form" v-model="diet" label-width="120px">
  <el-form-item label="Tên" :error="error.name">
    <el-input type="text" v-model="diet.name"></el-input>
  </el-form-item>
  <el-form-item label="Dành cho"  :error="error.target_id || error.mode_id">
      <div v-for="(mode_target, index) in diet.mode_target" key="index" class="mode_target" >
          <span class="w-24">Tạng người: </span>
          <el-select v-model="mode_target.mode" placeholder="Chọn tạng người">
            <el-option v-for="(mode,index) in modes" :key="mode.id" :label="mode.name" :value="mode.id">{{mode.name}}</el-option>
          </el-select>
          <span class="w-24">Mục tiêu: </span>
          <el-select v-model="mode_target.target" placeholder="Chọn mục tiêu">
            <el-option v-for="(target,index) in targets" :key="target.id" :label="target.name" :value="target.id">{{target.name}}</el-option>
          </el-select>
          <el-button type="danger" plain class="ml-1" @click="deleteModeTarget(index)"><i class="el-icon-minus"></i></el-button>
      </div>
      <br>
    <el-button class="text-center" type="success" @click="addModeTarget" plain>Add mode and target</el-button>
  </el-form-item>
  <el-form-item label="Protein" :error="error.protein">
    <el-input type="number" v-model="diet.protein">
      <template slot="append">%</template>
    </el-input>
  </el-form-item>
  <el-form-item label="Carb" :error="error.carb">
    <el-input type="number" v-model="diet.carb">
      <template slot="append">%</template>
    </el-input>
  </el-form-item>
  <el-form-item label="Fat" :error="error.fat">
    <el-input type="number" v-model="diet.fat">
      <template slot="append">%</template>
    </el-input>
  </el-form-item>
  <el-form-item label="Cenluloza" :error="error.cenluloza">
    <el-input type="number" v-model="diet.cenluloza">
      <template slot="append">%</template>
    </el-input>
  </el-form-item>
  <el-form-item label="Range" :error="error.range">
    <el-input type="number" v-model="diet.range">
      <template slot="append">%</template>
    </el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="onSubmit" type="success" plain >Update</el-button>
    <el-button @click="back">Back</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import { showDiet } from '~/api/admin/diet'
import { modeLists } from '~/api/mode';
import { indexTargets } from '~/api/static'
import { update } from '~/api/diet'
export default {
  props: {
  },
    layout:'admin',
    data (){
      return {
        error: {}
      }
    },
    async asyncData({app, params}){
        try{
        const {data: diet} = await showDiet(app.$axios, params.id) 
        const modes = await modeLists(app.$axios)
        const targets = await indexTargets(app.$axios)
        return { 
          diet: diet,
          modes , targets,
         }
        }catch(err){
            return { 
              diet:'',
              modes:[],
              targets:[]
            }
        }
    },
    
    methods:{
        async onSubmit(){
          try{
            await update(this.$axios, this.params.id, this.form)
            this.$message.success('Updated successfully')
          } catch(e) {
            if(e.response)
              this.error = e.response.data.errors
            this.$message.error('Some thing went wrong')
          }
    },

      addModeTarget () {
        const push = {
          mode: '',
          target: ''
        }
        this.diet.mode_target.push(push)
      },

      deleteModeTarget (index) {
        this.diet.mode_target.splice(index, 1)
      },

      back (){
        this.$router.push('/admin/example_diets')
      }

    }
}
</script>
<style lang="scss">
.createDiet{
  .el-form-item__content {
    width: 200px;
  }
.mode_target{
  width: 600px;
  display: flex;
}
}
</style>