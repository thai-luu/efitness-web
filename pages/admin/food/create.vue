<template>
<div>
<div class="bg-gray-800 pt-3">
    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
      <h1 class="font-bold pl-2">Create food</h1>
    </div>
</div>
<el-form ref="form" v-model="form" label-width="120px" class="createFoodsAdmin">
  <el-form-item label="Name" :error="error.name">
    <el-input type="text" v-model="form.name" ></el-input>
  </el-form-item>
  <el-form-item label="carb" :error="error.carb">
    <el-input type="number" v-model="form.carb" :error="error.carb"></el-input>
  </el-form-item>
  <el-form-item label="protein" :error="error.protein">
    <el-input type="number" v-model="form.protein" :error="error.protein"></el-input>
  </el-form-item>
  <el-form-item label="fat" :error="error.fat">
    <el-input type="number" v-model="form.fat"></el-input>
  </el-form-item>
  <el-form-item label="cenluloza" :error="error.cenluloza">
    <el-input type="number" v-model="form.cenluloza"></el-input>
  </el-form-item>
  <el-form-item label="calcium" :error="error.calcium">
    <el-input type="number" v-model="form.calcium"></el-input>
  </el-form-item>
  <el-form-item label="cholesteron">
    <el-input type="number" v-model="form.cholesteron" :error="error.cholesteron"></el-input>
  </el-form-item>
  <el-form-item label="trans" :error="error.trans">
    <el-input type="number" v-model="form.trans"></el-input>
  </el-form-item>
  <el-form-item label="sodium" :error="error.sodium">
    <el-input type="number" v-model="form.sodium"></el-input>
  </el-form-item>
  <el-form-item label="classify" :error="error.classify">
    <el-select v-model="form.classify_id" placeholder="please select your classify">
      <el-option v-for="(classify,index) in classifies" :key="classify.id" :label="classify.name" :value="classify.id">{{classify.name}}</el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="calo" :error="error.calo">
    <el-input type="number" v-model="form.calo"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="onSubmit">Create</el-button>
    <el-button>Cancel</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
import { store } from '~/api/admin/food'
import { index } from '~/api/classify'
export default {
  props: {
  },
    layout:'admin',
    data (){
        return {
            form:{
                name:'',
                carb:'',
                fat:'',
                protein:'',
                cenluloza:'',
                trans:'',
                calcium:'',
                sodium:'',
                classify:'',
                cholesteron:'',
                calo:'',
            },
            error:{}
        }
    },
    async asyncData({app}){
        try{
        const { data:classifies } = await index(app.$axios)
        return { classifies }
        }catch(err){
            return { classifies:[]}
        }
    },
    
   async created(){
     const classifies = await index(this.$axios)
        
    },
    methods:{
      async onSubmit(){
        try {
          await store(this.$axios,this.form)
          this.$message.success('Create successfully')
        } catch (error) {
          if(error.response)
          this.error = error.response.data.errors
          this.$message.error("Some thing went wrong")
        }
        
        },
    }
}
</script>
<style lang="scss">
  .createFoodsAdmin{
    .el-input{
      width: 200px;
    }
  }
</style>