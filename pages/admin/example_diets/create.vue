<template>
<el-form class="createDiet" ref="form" v-model="form" label-width="120px">
  <el-form-item label="Tên">
    <el-input type="text" v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="Dành cho">
      <div v-for="(mode_target, index) in form.mode_target" key="index" class="mode_target" >
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
  <el-form-item label="Protein">
    <el-input type="number" v-model="form.protein">
      <template slot="append">%</template>
    </el-input>
  </el-form-item>
  <el-form-item label="Carb">
    <el-input type="number" v-model="form.carb">
      <template slot="append">%</template>
    </el-input>
  </el-form-item>
  <el-form-item label="Fat">
    <el-input type="number" v-model="form.fat">
      <template slot="append">%</template>
    </el-input>
  </el-form-item>
  <el-form-item label="Cenluloza">
    <el-input type="number" v-model="form.cenluloza">
      <template slot="append">%</template>
    </el-input>
  </el-form-item>
  <el-form-item label="Range">
    <el-input type="number" v-model="form.range">
      <template slot="append">%</template>
    </el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="onSubmit">Create</el-button>
    <el-button>Cancel</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import { modeLists } from '~/api/mode';
import { indexTargets } from '~/api/static'
import { create } from '~/api/diet'
export default {
  props: {
  },
    layout:'admin',
    data (){
      return {
        form:{
          carb:'',
          fat:'',
          name:'',
          calories:'',
          protein:'',
          cenluloza:'',
          mode_target:[],
          range: '',
        }
      }
    },
    async asyncData({app}){
        try{
        const modes = await modeLists(app.$axios)
        const targets = await indexTargets(app.$axios)
        return { modes , targets }
        }catch(err){
            return { 
              modes:[],
              targets:[]
            }
        }
    },
    
    methods:{
        async onSubmit(){
          try{
            await create(this.$axios,this.form)
            console.log(123)
          } catch(e) {
            this.$notify.error(e.response.data.message)
          }
    },

      addModeTarget () {
        const push = {
          mode: '',
          target: ''
        }
        this.form.mode_target.push(push)
      },

      deleteModeTarget (index) {
        this.form.mode_target.splice(index, 1)
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