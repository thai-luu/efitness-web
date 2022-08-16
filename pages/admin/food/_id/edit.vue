<template>
<div>
  <div class="bg-gray-800 pt-3">
    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
      <h1 class="font-bold pl-2">Create food</h1>
    </div>
  </div>
  <el-form ref="form" v-model="food" label-width="120px" class="editFoodsAdmin">
    <el-form-item label="Name" :error="error.name">
      <el-input type="text" v-model="food.name"></el-input>
    </el-form-item>
    <el-form-item label="carb" :error="error.carb">
      <el-input type="number" v-model="food.carb"></el-input>
    </el-form-item>
    <el-form-item label="protein" :error="error.protein">
      <el-input type="number" v-model="food.protein"></el-input>
    </el-form-item>
    <el-form-item label="fat" :error="error.fat">
      <el-input type="number" v-model="food.fat"></el-input>
    </el-form-item>
    <el-form-item label="cenluloza" :error="error.cenluloza">
      <el-input type="number" v-model="food.cenluloza"></el-input>
    </el-form-item>
    <el-form-item label="sodium" :error="error.sodium">
      <el-input type="number" v-model="food.sodium"></el-input>
    </el-form-item>
    <el-form-item label="calcium" :error="error.calcium">
      <el-input type="number" v-model="food.calcium"></el-input>
    </el-form-item>
    <el-form-item label="trans" :error="error.trans">
      <el-input type="number" v-model="food.trans"></el-input>
    </el-form-item>
    <el-form-item label="cholesteron" :error="error.cholesteron">
      <el-input type="number" v-model="food.cholesteron"></el-input>
    </el-form-item>
    <el-form-item label="classify" :error="error.classify">
      <el-select v-model="food.classify_id" placeholder="please select your classify">
        <el-option v-for="(classify,index) in classifies" :key="classify.id" :label="classify.name" :value="classify.id">{{classify.name}}</el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="calo" :error="error.calo">
      <el-input type="number" v-model="food.calo"></el-input>
    </el-form-item>
    <el-form-item label="image" :error="error.image">
      <el-input type="text" v-model="food.image"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="onSubmit">Edit</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import { show,update } from '~/api/admin/food'
import { index } from '~/api/classify'
export default {
  props: {
  },
    layout:'admin',
    async asyncData({app,params}){
        try{
        const food = await show(app.$axios,params.id)
        const {data: classifies} = await index(app.$axios)
        return { classifies,food, error:{} }
        }catch(err){
            return { food:'',classifies:[] }
        }
    },
    
   async created(){
      const food = await show(this.$axios,this.$route.params.id)
        

    },
    methods:{
      async onSubmit(){
        try {
          await update(this.$axios,this.$route.params.id,this.food)
          this.$message.success('Update successfully')
        } catch (error) {
          if(error.response)
          this.error = error.response.data.errors
          this.$message.error('Some thing went wrong')
        }
        },
    }
}
</script>
<style lang="scss">
  .editFoodsAdmin{
    .el-input{
      width: 200px;
    }
  }
</style>