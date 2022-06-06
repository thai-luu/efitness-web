<template>
<div>
  <Banner />
  <diet-list :diets="diets" />
  <lesson-list :exercise_modes="exercise_modes" />
</div>
</template>

<script>
import Banner from '~/components/Banner.vue'
import DietList from '../components/diet/DietList.vue'
import LessonList from '../components/lesson/LessonList.vue'
import { index as allDiet } from '~/api/diet'
import { index as allExerciseMode } from '~/api/exercise_mode'
export default {
  async asyncData({app}){
        try{
            const diets =  await allDiet(app.$axios)
            const exercise_modes =  await allExerciseMode(app.$axios)
            return  { diets:diets, exercise_modes:exercise_modes }
        }catch (err){
          return {diets:[],exercise_modes:[] }
        }

    }, 
  methods: {
  },
  name: 'IndexPage',
  layout: 'default',
  auth: false,
  components:{
    Banner,
    DietList,
    LessonList
  },
  
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
