<template>
    <el-form class ="searchFood" v-model="searchFoodVal">
        <el-form-item label="Name" size="small">
            <el-input v-model="searchFoodVal.name">
            </el-input>
        </el-form-item>
        <el-form-item label="Classify">
            <el-select v-model="searchFoodVal.classify">
                <el-option v-for="option in optionsClassify" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="Protein">
            <el-select v-model="searchFoodVal.protein">
                <el-option v-for="option in optionsProtein" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="Carb">
            <el-select v-model="searchFoodVal.carb">
                <el-option v-for="option in optionsCarb" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="Cenluloza">
            <el-select v-model="searchFoodVal.cenluloza">
                <el-option v-for="option in optionsFat" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="Fat">
            <el-select v-model="searchFoodVal.fat">
                <el-option v-for="option in optionsFat" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="searchFood" plain>Search</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
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
                    label:'rau',
                    value: 1
                },
                {
                    label:'thịt',
                    value: 2
                },
                {
                    label:'củ quả',
                    value: 3
                },
                {
                    label:'củ quả',
                    value: 4
                },
            ],
            optionsProtein:[
                {
                    label:'< 20 gram',
                    value: 0
                },
                {
                    label:'20 gram - 30 gram',
                    value: 1
                },
                {
                    label:'> 30 gram',
                    value: 2
                },
            ],
            optionsCarb:[
                {
                    label:'< 20 gram',
                    value: 0
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
                    value: 0
                },
                {
                    label:'10 gram - 20 gram',
                    value: 1
                },
                {
                    label:'> 20 gram',
                    value: 2
                },
            ]

        }
    },
    mounted () {
        if(this.search)
        this.searchFoodVal = _cloneDeep(this.search)
    },

    methods: {
        searchFood () {
            this.$router.push({
                query: _assign({}, this.$route.query, {
                    ['classify']: this.searchFoodVal.classify,
                    ['protein']: this.searchFoodVal.protein,
                    ['carb']: this.searchFoodVal.carb,
                    ['fat']: this.searchFoodVal.fat,

                }),
            })
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