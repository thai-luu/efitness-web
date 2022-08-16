<template>
    <el-form class ="searchFood" v-model="searchUser">
        <el-form-item label="Name" size="small">
            <el-input v-model="searchUser.name">
            </el-input>
        </el-form-item>
        <el-form-item label="Email" size="small">
            <el-input v-model="searchUser.email">
            </el-input>
        </el-form-item>
        <el-form-item label="Permission" size="small">
        <el-select v-model="searchUser.permission" clearable placeholder="Select permission">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
  </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="searchFood" plain>Search</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="resetSearch" plain>Reset Search</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
const searchDefault = {
        name:'',
        email:'',
        permission: ''
    }
import _assign from 'lodash/assign'
import _cloneDeep from 'lodash/cloneDeep';
export default {
    props: {
        search: Object
    },

    data () {
        return {
            searchUser: {
                email: '',
                name:'',
                permission:'',
            },
            options:[
                {
                    label:'CTV',
                    value: 'CTV'
                },
                {
                    label:'QTV',
                    value: 'QTV'
                },
                {
                    label:'ND',
                    value: 'ND'
                },
            ],
        }
    },
    mounted () {
        this.searchUser.email = this.$route.query.email || ''
        this.searchUser.name = this.$route.query.name ||''
        this.searchUser.permission = this.$route.query.permission || ''
    },

    methods: {
        searchFood () {
            this.$router.push({
                query: _assign({}, this.$route.query, {
                    ['email']: this.searchUser.email,
                    ['permission']: this.searchUser.permission,
                    ['name']: this.searchUser.name,

                }),
            })
        },

        resetSearch(){
            this.searchUser =  _cloneDeep(searchDefault)
            this.searchFood()
        }
    }
}
</script>
<style lang="scss">
    .searchFood{
        display: flex;
        flex-wrap: wrap;
        .el-form-item {
            display: flex;
            margin-left: 5px;
        }
    }
</style>