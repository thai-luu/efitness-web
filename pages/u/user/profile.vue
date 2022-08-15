<template>
<div class="text-black">
    <el-dialog
        title="Profile"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="Weight" prop="weight">
            <el-input-number v-model="form.weight" :min="1"></el-input-number>
            <span>kg</span>
        </el-form-item>
        <el-form-item label="Height" prop="height">
            <el-input-number v-model="form.height" :min="1"></el-input-number>
            <span>cm</span>
        </el-form-item>
        <el-form-item label="Wrist" prop="wrist">
            <el-input-number v-model="form.wrist" :min="1"></el-input-number>
            <span>cm</span>
        </el-form-item>
        <el-form-item label="Name" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
            <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Age" prop="age">
            <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="Sex" prop="sex">
            <el-select v-model="form.sex" placeholder="please select your zone">
                <el-option v-for="sex in sexs" :key="sex.id" :label="sex.name" :value="sex.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="Target" prop="target_id">
            <el-select v-model="form.target_id" placeholder="please select your zone">
                <el-option v-for="target in targets" :key="target.id" :label="target.name" :value="target.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="Level" prop="level_id">
            <el-select v-model="form.level_id" placeholder="please select your zone">
                <el-option v-for="level in levels" :key="level.id" :label="level.name_vi" :value="level.id"></el-option>
            </el-select>
        </el-form-item>
        </el-form-item>
        <el-form-item>
            <el-button type="success" plain @click="onSubmit">Update</el-button>
            <el-button @click="dialogVisible = false">Cancel</el-button>
        </el-form-item>
        </el-form>
    </el-dialog>
    <div class="">
        <div class="float-left w-1/4">
        <div class="block"><el-avatar shape="square" :size="300" :src="squareUrl"></el-avatar></div>
        </div>
        <div class="ml-48 h-96 grid grid-cols-3 profile-div px-2 py-2">
            <div class="text-profile">
                <span>Name: </span>
                <span>
                 {{$auth.user.data.name}}
                </span>
            </div>
            <div class="text-profile">
                <span>Email: </span> {{$auth.user.data.email}} </div>
            <div class="text-profile">
                <span>Sex: </span>
                <span v-if="$auth.user.data.sex == 1">male
                </span>
                <span v-else>female</span>
                </div>
            <div class="text-profile">
                <span>Age: </span>{{$auth.user.data.age}}</div>
            <div class="text-profile">
                <span>Mode: </span>{{$auth.user.data.mode.name}}</div>
            <div class="text-profile">
                <span>Experience: {{$auth.user.data.level_id.name_en}} </span>
            </el-select>
            </div>
            <div class="text-profile">
                <span>Target: {{$auth.user.data.target_id.name}} </span>
            </div>
            <div class="text-profile">
                <span>Weight: </span>{{$auth.user.data.weight}}</div>
            <div class="text-profile">
                <span>Height: </span>{{$auth.user.data.height}}</div>
        </div>
    </div>
    <el-button @click="dialogVisible = true"> Edit </el-button>
</div>
</template>
<script>
import _cloneDeep from 'lodash/cloneDeep';
import { update } from '~/api/user/profile'
import _keys from 'lodash/keys';
import _pick from 'lodash/pick';
export default {
    // async asyncData({app, store}){
    //     await store.dispatch('static/fetch',app.$axios)
    // }, 
    data(){
        return {
            form: _cloneDeep(this.$auth.user.data),
            rules: {
                age: [
                    { required: true, message: 'Please input age', trigger: 'blur' }
                ],
                weight: [
                    { required: true, message: 'Please pick a time', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: 'Please input age', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: 'Please pick a time', trigger: 'blur' }
                ],
                height: [
                    { required: true, message: 'Please pick a time', trigger: 'blur' }
                ],
                target_id: [
                    { required: true, message: 'Please select Activity zone', trigger: 'change' }
                ],
                sex: [
                    { required: true, message: 'Please select Activity zone', trigger: 'change' }
                ],
                level_id: [
                    { required: true, message: 'Please select Activity zone', trigger: 'change' }
                ],
                wrist: [
                    { required: true, message: 'Please input level', trigger: 'change' }
                ],
        },
            dialogVisible: false,
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            fit: "contain",
            targets: [],
            levels: [],
            sexs: [
                {
                    name: "Male",
                    id: 1
                },
                {
                    name: "FeMale",
                    id: 0
                }
            ]
        }
    },

    methods:{
        async onSubmit(){
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    try{
                        const formUpdate = {
                            name: this.form.name,
                            sex: this.form.sex,
                            target_id: this.form.target_id,
                            level_id: this.form.level_id,
                            age: this.form.age,
                            weight: this.form.weight,
                            height: this.form.height,
                            wrist: this.form.wrist,
                        }
                        await update(this.$axios, this.$route.params.user, formUpdate)
                        this.$message.success('Update successfully')
                        window.location.reload(true)
                    }catch(e){
                        this.$message.error('Some thing went wrong')
                    }
                } else {
                    return false;
                }
                this.dialogVisible = false
            }
            )
            
        },

        getStoreLocal(){
            if(process.client) {
                this.targets = JSON.parse(localStorage.targets)
                this.levels = JSON.parse(localStorage.levels)
                this.modes = JSON.parse(localStorage.modes)
            }
        }
    },
    created(){
       this.getStoreLocal()
      
    },

}
</script>
<style lang="scss">
    .text-profile{
        border-radius: 5px;
        background-color: #F5F7FA; ;
    }

    .el-select{
        width: 100%;
    }

    .disable{
        .el-input__inner{
            color: black !important;
        }
    }

    .profile-div{
        background-color: #F5F7FA;
    }
    
</style>