<template>
<div class="flex flex-col">
        <Header />
        <main>
            <div class="flex flex-col md:flex-row">
                <Sidebar />
                <div id="main" class="main-content flex-1 bg-gray-100 pb-24 md:pb-5">
                <nuxt />      
                </div>
            </div>
        </main>
</div>
</template>
<script>
import Header from '~/components/admin/Header'
import Sidebar from '~/components/admin/Sidebar'
export default {
    components:{
        Header,Sidebar
    },

}
</script>