<template>
    <div class="bg-white border-b py-8">
        <div class="container max-w-5xl mx-auto m-8">
            <h1 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            {{$t('sampleDiet')}}
            </h1>
            <div class="w-full mb-4">
            <div class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
            </div>
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