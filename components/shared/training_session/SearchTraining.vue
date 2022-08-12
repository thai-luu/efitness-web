<template>
    <el-form class ="searchFood" v-model="searchTrainVal">
        <el-form-item label="Name" size="small">
            <el-input v-model="searchTrainVal.name">
            </el-input>
        </el-form-item>
        <el-form-item label="Muscle">
            <el-select v-model="searchTrainVal.muscles"
                multiple
                filterable
                default-first-option
                placeholder="Choose tags for your article"
            >
                <el-option v-for="option in optionsMuscles" :key="option.value" :label="option.label" :value="option.value" />
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
            searchTrainVal: {
                muscles:[],
                name:'',
            },
            optionsMuscles: [],
            muscles: [],

        }
    },
    mounted () {
        if(this.search)
        this.searchTrainVal = _cloneDeep(this.search)
    },

    methods: {
        searchFood () {
            this.$router.push({
                query: _assign({}, this.$route.query, {
                    ['classify']: this.searchTrainVal.classify,
                    ['protein']: this.searchTrainVal.protein,
                    ['carb']: this.searchTrainVal.carb,
                    ['fat']: this.searchTrainVal.fat,

                }),
            })
        },

        getLocalMuscles () {
            if(process.client) {
                this.muscles = JSON.parse(localStorage.muscles).data
            }
        },
        
        convertMuscle (muscles) {
            const optionsMuscles = []
            muscles.forEach((item) => {
                optionsMuscles.push({
                    label: item.name,
                    value: item.id
                })
            })

            return optionsMuscles
        }
    },

    created () {
        this.getLocalMuscles()
        if(this.muscles === undefined){
            this.fetchMuscle()
        }
        this.optionsMuscles = _cloneDeep(this.convertMuscle(this.muscles))
        
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