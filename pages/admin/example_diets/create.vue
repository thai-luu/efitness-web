<template>
<el-form ref="form" v-model="form" label-width="120px">
  <el-form-item label="Tên">
    <el-input type="text" v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="Dành cho">
    <el-select v-model="form.mode_id" placeholder="please select your zone">
      <el-option v-for="(mode,index) in modes" :key="mode.id" :label="mode.name" :value="mode.id">{{mode.name}}</el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Mục tiêu">
    <el-select v-model="form.target_id" placeholder="please select your zone">
      <el-option v-for="(target,index) in targets" :key="target.id" :label="target.name" :value="target.id">{{target.name}}</el-option>
    </el-select>
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
          mode_id:'',
          target_id:'',
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
    async created(){
      const modes = await modeLists(this.$axios)
      const targets = await index(this.$axios)
      
    },
    methods:{
        async onSubmit(){
          try{
            
          await create(this.$axios,this.form)
          
        }
      catch(err){
        this.$notify.error('Some thing went wrong')
      }
    }
    }
}
</script>