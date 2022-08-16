<template>
<div class="pt-24 banner">
    <div class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <!--Left Col-->
        <div class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <p class="uppercase tracking-loose w-full">Bạn gặp khó khăn trong việc xây dựng chế độ ăn uống và luyện tập khoa học ?</p>
          <h1 class="my-4 text-5xl font-bold leading-tight">
            Hãy đăng nhập ngay để chúng tôi có thể hỗ trợ bạn
          </h1>
          <p class="leading-normal text-2xl mb-8">
            Chúng tôi sẽ giúp bạn xây dựng một chế độ ăn uống, tập luyện khoa học và lành mạnh dựa theo mục tiêu mà bạn hướng đến.
          </p>
          <nuxt-link to="/user/account/login">
          <button class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">  
            {{$t('login')}}
          </button>
          </nuxt-link>
        </div>
        <!--Right Col-->
        <div class="w-full md:w-3/5 py-6 text-center">
        </div>
    </div>
</div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .banner{
        background-image: url("~/assets/images/cta-bg.jpg");
    }
</style>