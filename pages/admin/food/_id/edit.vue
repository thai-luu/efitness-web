<template>
<div>
  <div class="bg-gray-800 pt-3">
    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
      <h1 class="font-bold pl-2">Create food</h1>
    </div>
  </div>
  <el-form ref="form" v-model="food" label-width="120px" class="edit-foods-admin">
    <el-form-item label="Name">
      <el-input type="text" v-model="food.name"></el-input>
    </el-form-item>
    <el-form-item label="carb">
      <el-input type="number" v-model="food.carb"></el-input>
    </el-form-item>
    <el-form-item label="protein">
      <el-input type="number" v-model="food.protein"></el-input>
    </el-form-item>
    <el-form-item label="fat">
      <el-input type="number" v-model="food.fat"></el-input>
    </el-form-item>
    <el-form-item label="cenluloza">
      <el-input type="number" v-model="food.cenluloza"></el-input>
    </el-form-item>
    <el-form-item label="vitaminA">
      <el-input type="number" v-model="food.vitaminA"></el-input>
    </el-form-item>
    <el-form-item label="vitaminB">
      <el-input type="number" v-model="food.vitaminB"></el-input>
    </el-form-item>
    <el-form-item label="kali">
      <el-input type="number" v-model="food.kali"></el-input>
    </el-form-item>
    <el-form-item label="natri">
      <el-input type="number" v-model="food.natri"></el-input>
    </el-form-item>
    <el-form-item label="classify">
      <el-select v-model="food.classify_id" placeholder="please select your classify">
        <el-option v-for="(classify,index) in classifies" :key="classify.id" :label="classify.name" :value="classify.id">{{classify.name}}</el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="calo">
      <el-input type="number" v-model="food.calo"></el-input>
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
        return { classifies,food }
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
          this.$message.error(error.message)
        }
        
        },
    }
}
</script>
