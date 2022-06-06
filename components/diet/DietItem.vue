<template>
<div>
<swiper-slide class="slide">
    <div class="flex flex-wrap">
        <div class="w-5/6 sm:w-1/2 p-6">
            <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3">
              {{diet.name}}
            </h3>
            <p class="text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
              <br />
              <br />
              Images from:
              <a class="text-pink-500 underline" href="https://undraw.co/">undraw.co</a>
            </p>
        </div>
        <div class="w-full sm:w-1/2 p-6">
            <svg class="w-full sm:h-64 mx-auto" viewBox="0 0 1177 598.5" xmlns="http://www.w3.org/2000/svg">
            </svg>
        </div>
    </div>
</swiper-slide>
</div>
</template>
<script>
export default {
    props:{
      diet:{
        type: Object
      }
    }
}
</script>