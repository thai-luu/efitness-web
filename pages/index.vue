<template>
<div>
  <diet-list :diets="diets" />
  <lesson-list :exercise_modes="exercise_modes" />
</div>
</template>

<script>

import DietList from '../components/diet/DietList.vue'
import LessonList from '../components/lesson/LessonList.vue'
import { indexWeb } from '~/api/diet'
import { index as allExerciseMode } from '~/api/exercise_mode'
import { mapState } from 'vuex';
export default {
  name: 'IndexPage',
  layout: 'default',
  auth: false,
  components:{
    DietList,
    LessonList
  },
  async asyncData({app, store}){
     await store.dispatch('static/fetch',app.$axios)
     
        try{
            const diets =  await indexWeb(app.$axios)
            const exercise_modes =  await allExerciseMode(app.$axios)
            return  { diets:diets, exercise_modes:exercise_modes }
        }catch (err){
          return {diets:[],exercise_modes:[] }
        }

    }, 
  methods: {
    setLocalStore(){
      if(process.client){
        localStorage.setItem('targets', JSON.stringify(this.targets))
        localStorage.setItem('levels', JSON.stringify(this.levels))
        localStorage.setItem('modes', JSON.stringify(this.modes))
        localStorage.setItem('foods', JSON.stringify(this.foods))
      }
    }
  },
  computed:{
        ...mapState('static',['targets', 'levels', 'modes', 'foods'])
    },
  async created(){
    this.setLocalStore()
    const diets =  await indexWeb(this.$axios)
   
  }
  
}
// var scrollpos = window.scrollY;
//       var header = document.getElementById("header");
//       var navcontent = document.getElementById("nav-content");
//       var navaction = document.getElementById("navAction");
//       var brandname = document.getElementById("brandname");
//       var toToggle = document.querySelectorAll(".toggleColour");

//       document.addEventListener("scroll", function () {
//         /*Apply classes for slide in bar*/
//         scrollpos = window.scrollY;

//         if (scrollpos > 10) {
//           header.classList.add("bg-white");
//           navaction.classList.remove("bg-white");
//           navaction.classList.add("gradient");
//           navaction.classList.remove("text-gray-800");
//           navaction.classList.add("text-white");
//           //Use to switch toggleColour colours
//           for (var i = 0; i < toToggle.length; i++) {
//             toToggle[i].classList.add("text-gray-800");
//             toToggle[i].classList.remove("text-white");
//           }
//           header.classList.add("shadow");
//           navcontent.classList.remove("bg-gray-100");
//           navcontent.classList.add("bg-white");
//         } else {
//           header.classList.remove("bg-white");
//           navaction.classList.remove("gradient");
//           navaction.classList.add("bg-white");
//           navaction.classList.remove("text-white");
//           navaction.classList.add("text-gray-800");
//           //Use to switch toggleColour colours
//           for (var i = 0; i < toToggle.length; i++) {
//             toToggle[i].classList.add("text-white");
//             toToggle[i].classList.remove("text-gray-800");
//           }

//           header.classList.remove("shadow");
//           navcontent.classList.remove("bg-white");
//           navcontent.classList.add("bg-gray-100");
//         }
//       });
</script>
