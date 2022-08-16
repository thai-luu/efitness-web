<template>
    <div class="bg-white border-b py-8">
        <div class="container mx-auto m-8">
            <h1 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            {{$t('sampleDiet')}}
            </h1>
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="diet in diets" :key="diet.id">
                    <diet-item :diet="diet"/>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
// if (process.browser) {
//   require('aframe')
// }
import DietItem from './DietItem.vue'
export default {
  
    components: {
        DietItem
    },
    data() {
      return {
        value: new Date()
   }
      },
    methods: {
      console(data,date){
        
      }
  },
    props:{
        diets:{
            type: Array,
        }
    },

}
</script>
<style>

</style>