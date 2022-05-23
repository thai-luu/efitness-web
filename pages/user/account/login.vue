<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <h3 class="text-black text-2xl font-bold text-center">Login</h3>
        <div :v-model="form">
            <div class="mt-4 text-black">
                <div class="">
                    <label class="block" for="Name">Name</label>
                            <input type="text" placeholder="Name"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" v-model="form.name">
                </div>
                <div class="mt-4">
                    <label class="block" for="email">Email</label>
                            <input type="text" placeholder="Email"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" v-model="form.email">
                </div>
                <div class="mt-4">
                    <label class="block">Password</label>
                            <input type="password" placeholder="Password"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" v-model="form.password">
                </div>
                <div class="flex">
                    <button class="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" @click="login">
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  props: {
  },
    layout: 'null',
    data () {
        return {
        form: {
            name:'',
            email:'',
            password: '',
        }
        }
    },
    methods: {
        async login(){
         try{ 
                await this.$auth.loginWith('local', { data: this.form });
                     this.$router.push('/');
         }
        catch (err) {
                this.$notify.error({
                    title: 'Error',
                    message: 'Sai email hoặc mật khẩu'
                })
                }
        }
    }
}
</script>