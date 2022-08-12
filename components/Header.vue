<template>
	<div class="header">
		<div x-data="{ open: false }" class="w-full text-gray-700 bg-cream">
        <div class="flex flex-col max-w-screen-xl px-8 mx-auto md:items-center md:justify-between md:flex-row">
            <div class="flex flex-row items-center justify-between py-6">
                <div class="relative md:mt-8">
                    <a href="/" class="text-lg relative z-50 font-bold tracking-widest text-gray-900 rounded-lg focus:outline-none focus:shadow-outline">
                      <img src="@/assets/images/logo.png" alt="/">
                    </a>
                </div>
                <button class="rounded-lg md:hidden focus:outline-none focus:shadow-outline" @click="open = !open">
                    <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                        <path x-show="!open" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                        <path x-show="open" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <el-menu
            ref="menu"
            mode="horizontal"
            :default-active="defaultActive"
            class="font-semi-bold bg-white custom_menu main-menu"
            router
            >
                <el-menu-item index="/exercise">Exercise</el-menu-item>
                <el-menu-item index="/lesson">Example lesson</el-menu-item>
                <el-menu-item index="/about">About Us</el-menu-item>
                <el-menu-item index="/organization">Organization</el-menu-item>
                
            </el-menu>
            <el-menu v-if="$auth.loggedIn === true" mode="horizontal">  
            <el-submenu index="2">
              <template slot="title">{{$auth.user.data.name}}</template>
              <el-menu-item index="2-1"><nuxt-link :to="`/u/${$auth.user.data.id}/profile`">{{$auth.user.data.name}}</nuxt-link></el-menu-item>
              <el-menu-item v-if="$auth.user.data.permissions[0].name === 'QTV'" index="2-2"><nuxt-link to="/admin/example_lesson">Go to dashboard admin</nuxt-link></el-menu-item>
              <el-menu-item index="2-3" @click="logout">Logout</el-menu-item>
            </el-submenu>
          </el-menu>
          <a v-else href="/user/account/register">
            <button
                id="navAction"
                class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
                Sign in/Register
            </button>
          </a>
        </div>
    </div>
	</div>
</template>
<script>
export default {
    computed:{
      defaultActive() {
        const pathArr = this.$route.path.split('/');
        const path = `/${pathArr[1]}`;
        return path || '/';
      },
    },
    methods: {
      async logout() {
        await this.$axios.post('/api/auth/user/logout')
        this.$auth.logout();
          }
    },
    created() {
    }
}
</script>
<style lang="scss">
.header{
  .el-menu-item.is-active{
    border-bottom-color: #67C23A !important;
    color: #67C23A !important;
    border-bottom: 2px solid #67C23A !important;
  }
  .el-submenu__title{
    color: #67C23A !important;
    border-bottom: 2px solid #67C23A !important;
  }
}
</style>