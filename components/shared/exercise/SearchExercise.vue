<template>
    <el-form class ="searchFood" v-model="searchExercise">
        <el-form-item label="Name" size="small">
            <el-input v-model="searchExercise.name">
            </el-input>
        </el-form-item>
        <el-form-item label="Classify">
            <el-select v-model="searchExercise.category">
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
            searchExercise: {
                muscles:[],
                name:'',
                category: '',
            },
            optionsMuscles: [],
            muscles: [],
            optionsCategory: [
                {
                    label: 'strength',
                    id: 2
                },
                {
                    label: 'cardio',
                    id: 1
                }
            ]

        }
    },
    mounted () {
        if(this.search)
        this.searchExercise = _cloneDeep(this.search)
    },

    methods: {
        searchFood () {
            this.$router.push({
                query: _assign({}, this.$route.query, {
                    ['category']: this.searchExercise.category,
                    ['muscles']: this.searchExercise.muscles,
                    ['name']: this.searchExercise.name,
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