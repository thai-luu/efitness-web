<template>
    <el-form class ="searchFood" v-model="searchExercise">
        <el-form-item label="Name" size="small">
            <el-input v-model="searchExercise.name">
            </el-input>
        </el-form-item>
        <el-form-item label="Category">
            <el-select v-model="searchExercise.category" clearable>
                <el-option v-for="option in optionsCategory" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="Muscles">
            <el-select v-model="searchExercise.muscles"
                multiple
                filterable
                default-first-option
                placeholder="Choose tags for your article"
            >
                <el-option v-for="option in optionsMuscles" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="searchEx" plain>Search</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="resetSearch" plain>Reset search</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
const searchDefault = {
        muscles:[],
        name:'',
        category: '',
    }
import _assign from 'lodash/assign'
import _cloneDeep from 'lodash/cloneDeep';
export default {

    data () {
        return {
            searchExercise: {
                muscles:[],
                name:'',
                category: '',
            },
            optionsMuscles: [],
            muscles: [],
            optionsCategory: [
                {
                    label: 'cardio',
                    value: 1
                },
                {
                    label: 'strength',
                    value: 2
                }
            ]

        }
    },
    mounted () {
        this.searchExercise.category = parseInt(this.$route.query.category, 10) || ''
        if(this.$route.query.muscles){
        this.searchExercise.muscles = this.$route.query.muscles.map((item) => {
            return parseInt(item, 10)
        }) || []
    }
        this.searchExercise.name = this.$route.query.name ||''
    },

    methods: {
        searchEx() {
            this.$router.push({
                query: _assign({}, this.$route.query, {
                    ['category']: this.searchExercise.category,
                    ['muscles']: this.searchExercise.muscles,
                    ['name']: this.searchExercise.name,
                }),
            })
        },

        resetSearch(){
            this.searchExercise =  _cloneDeep(searchDefault)
            this.searchEx()
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