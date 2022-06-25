<template>
<el-form ref="form" v-model="form" label-width="120px">
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
  <el-form-item label="vitaminA">
    <el-input type="number" v-model="form.vitaminA"></el-input>
  </el-form-item>
  <el-form-item label="vitaminB">
    <el-input type="number" v-model="form.vitaminB"></el-input>
  </el-form-item>
  <el-form-item label="kali">
    <el-input type="number" v-model="form.kali"></el-input>
  </el-form-item>
  <el-form-item label="natri">
    <el-input type="number" v-model="form.natri"></el-input>
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
import { store } from '~/api/food'
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
                vitaminA:'',
                vitaminB:'',
                classify:'',
                kali:'',
                natri:'',
            }
        }
    },
    async asyncData({app}){
        try{
        const classifies = await index(app.$axios)
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