<template>
<div class="leading-normal tracking-normal text-white gradient" style="font-family: 'Source Sans Pro', sans-serif;">
    <Header />
    <Banner />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Banner from '~/components/Banner'
export default{
 components:{
   Footer,
   Header,
   Banner,
 }
}
</script>

