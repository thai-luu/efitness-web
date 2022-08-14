<template>
    <el-form class ="searchFood" v-model="searchFoodVal">
        <el-form-item label="Name" size="small">
            <el-input v-model="searchFoodVal.name">
            </el-input>
        </el-form-item>
        <el-form-item label="Classify">
            <el-select v-model="searchFoodVal.classify" clearable>
                <el-option v-for="option in optionsClassify" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="Protein">
            <el-select v-model="searchFoodVal.protein" clearable>
                <el-option v-for="option in optionsProtein" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="Carb">
            <el-select v-model="searchFoodVal.carb" clearable>
                <el-option v-for="option in optionsCarb" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="Cenluloza">
            <el-select v-model="searchFoodVal.cenluloza" clearable>
                <el-option v-for="option in optionsFat" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="Fat">
            <el-select v-model="searchFoodVal.fat" clearable>
                <el-option v-for="option in optionsFat" :key="option.value" :label="option.label" :value="option.value" />
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
        classify:'',
        protein:'',
        carb:'',
        fat: '',
        name:'',
    }
import _assign from 'lodash/assign'
import _cloneDeep from 'lodash/cloneDeep';
export default {
    props: {
        search: Object
    },

    data () {
        return {
            searchFoodVal: {
                classify:'',
                protein:'',
                carb:'',
                fat: '',
                name:'',
            },
            optionsClassify:[
                {
                    label:'thịt',
                    value: 1
                },
                {
                    label:'rau',
                    value: 2
                },
                {
                    label:'củ quả',
                    value: 3
                },
                {
                    label:'khác',
                    value: 4
                },
            ],
            optionsProtein:[
                {
                    label:'< 20 gram',
                    value: 1
                },
                {
                    label:'20 gram - 30 gram',
                    value: 2
                },
                {
                    label:'> 30 gram',
                    value: 3
                },
            ],
            optionsCarb:[
                {
                    label:'< 20 gram',
                    value: 1
                },
                {
                    label:'20 gram - 40 gram',
                    value: 2
                },
                {
                    label:'41 gram - 60 gram',
                    value: 3
                },
                {
                    label:'61 gram - 80 gram',
                    value: 4
                },
                {
                    label:'> 80 gram',
                    value: 5
                },
            ],
            optionsFat:[
                {
                    label:'< 10 gram',
                    value: 1
                },
                {
                    label:'10 gram - 20 gram',
                    value: 2
                },
                {
                    label:'> 20 gram',
                    value: 3
                },
            ]

        }
    },

    methods: {
        searchFood () {
            this.$emit('fetch', this.searchFoodVal)
        },

        resetSearch(){
            this.searchFoodVal =  _cloneDeep(searchDefault)
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