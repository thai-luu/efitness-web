<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 mb-10">
    <div class="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <h3 class="text-black text-2xl font-bold text-center">Register</h3>
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
            <el-form-item label="Name" prop="name" :error="error.name" >
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email" :error="error.email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password" :error="error.password">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="Check password" prop="checkPass">
                <el-input type="password" v-model="form.checkPass"></el-input>
            </el-form-item>
            <el-form-item label="Weight" prop="weight" :error="error.weight">
                <el-input-number v-model="form.weight" :min="1"></el-input-number>
                <span>kg</span>
            </el-form-item>
            <el-form-item label="Height" prop="height" :error="error.height">
                <el-input-number v-model="form.height" :min="1"></el-input-number>
                <span>cm</span>
            </el-form-item>
            <el-form-item label="Wrist" prop="wrist" :error="error.wrist">
                <el-input-number v-model="form.wrist" :min="1"></el-input-number>
                <span>cm</span>
            </el-form-item>   
            <el-form-item label="Age" prop="age" :error="error.age">
                <el-input v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item label="Sex" prop="sex" :error="error.sex">
                <el-select v-model="form.sex" placeholder="please select your zone">
                    <el-option v-for="sex in sexs" :key="sex.id" :label="sex.name" :value="sex.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Target" prop="target_id"  :error="error.target_id">
                <el-select v-model="form.target_id" placeholder="please select your zone">
                    <el-option v-for="target in targets" :key="target.id" :label="target.name" :value="target.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Level" prop="level_id" :error="error.level_id">
                <el-select v-model="form.level_id" placeholder="please select your zone">
                    <el-option v-for="level in levels" :key="level.id" :label="level.name_vi" :value="level.id"></el-option>
                </el-select>
            </el-form-item>
            </el-form-item>
            <el-form-item>
                    <el-button class="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 btRegister" @click="register">
                        Register
                    </el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>
<script>
import { register as sendRegister } from '~/api/user/account'
export default {
    layout: 'null',
    auth: false,
    data () {
        return {
        form: {
            name:'',
            email:'',
            password: '',
            age: '',
            sex:'',
            weight: '',
            height: '',
            wrist: '',
            target_id: '',
            level_id: ''
        },
        error:{},
        sexs: [
            {
                name: "Male",
                id: 1
            },
            {
                name: "FeMale",
                id: 0
            }
            ],
        rules: {
                age: [
                    { required: true, message: 'Please input age', trigger: 'blur' }
                ],
                weight: [
                    { required: true, message: 'Please input weight', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: 'Please input name', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: 'Please input email', trigger: 'blur' }
                ],
                height: [
                    { required: true, message: 'Please input height', trigger: 'blur' }
                ],
                target_id: [
                    { required: true, message: 'Please input target', trigger: 'change' }
                ],
                sex: [
                    { required: true, message: 'Please input sex', trigger: 'change' }
                ],
                level_id: [
                    { required: true, message: 'Please input levl', trigger: 'change' }
                ],
                wrist: [
                    { required: true, message: 'Please input wrist', trigger: 'change' }
                ],
                password: [
                    { required: true, message: 'Please input password', trigger: 'change' }
                ],
                checkPass: [
                    { required: true, message: 'Please input check password', trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
        async register(){
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    if(this.form.checkPass == this.form.password) {
                        console.log(this.form, this.$axios)
                        try {
                            await sendRegister(this.$axios, this.form)
                            this.$message.success('Register successfully')
                        } catch (e) {
                            if(e.response.data.errors)
                                this.error = e.response.data.errors
                            this.$message.error('Some thing went wrong')
                            console,log(12)
                        }
                    } else {
                        this.$message.error('Password confirm incorrect')
                    }
                }
        })
        },

        getStoreLocal(){
            if(process.client) {
                this.targets = JSON.parse(localStorage.targets)
                this.levels = JSON.parse(localStorage.levels)
                this.modes = JSON.parse(localStorage.modes)
            }
        },
    },

    mounted(){
       this.getStoreLocal()
      
    },
}
</script>
<style lang="scss">
    .btRegister{
        margin-left: -50px;
    }
</style>