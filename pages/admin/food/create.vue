<template>
<div class="bg-gray-800 pt-3">
    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
      <h1 class="font-bold pl-2">Create food</h1>
    </div>
</div>
<el-form ref="form" v-model="form" label-width="120px" class="create-foods-admin">
  <el-form-item label="Name">
    <el-input type="text" v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="carb">
    <el-input type="number" v-model="form.carb"></el-input>
  </el-form-item>
  <el-form-item label="protein">
    <el-input type="number" v-model="form.protein"></el-input>
  </el-form-item>
  <el-form-item label="fat">
    <el-input type="number" v-model="form.fat"></el-input>
  </el-form-item>
  <el-form-item label="cenluloza">
    <el-input type="number" v-model="form.cenluloza"></el-input>
  </el-form-item>
  <el-form-item label="calcium">
    <el-input type="number" v-model="form.calcium"></el-input>
  </el-form-item>
  <el-form-item label="cholesteron">
    <el-input type="number" v-model="form.cholesteron"></el-input>
  </el-form-item>
  <el-form-item label="trans">
    <el-input type="number" v-model="form.trans"></el-input>
  </el-form-item>
  <el-form-item label="sodium">
    <el-input type="number" v-model="form.sodium"></el-input>
  </el-form-item>
  <el-form-item label="classify">
    <el-select v-model="form.classify_id" placeholder="please select your classify">
      <el-option v-for="(classify,index) in classifies" :key="classify.id" :label="classify.name" :value="classify.id">{{classify.name}}</el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="calo">
    <el-input type="number" v-model="form.calo"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="onSubmit">Create</el-button>
    <el-button>Cancel</el-button>
  </el-form-item>
</el-form>
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
            }
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
        await store(this.$axios,this.form)
        },
    }
}
</script>
