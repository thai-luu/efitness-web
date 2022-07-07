<template>
    <div>
        <el-input type="text" class="w-40" v-model="search.name" placeholder="Name"></el-input>
        <el-select v-model="search.category" placeholder="Select category">
            <el-option
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :value="category.id">
            </el-option>
        </el-select>
        <el-select v-model="search.muscle_group"
            multiple
            filterable
            placeholder="Select muscle"
        >
            <el-option
            v-for="muscle in muscles"
            :key="muscle.id"
            :label="muscle.name"
            :value="muscle.id">
            </el-option>
        </el-select>
        <span class="float-right">
        <el-button type="success" plain @click="query">Search</el-button>
        <el-button @click="clearFilter">Clear</el-button>
        </span>
    </div>
</template>
<script>
import _find from 'lodash/find'
import _assign from 'lodash/assign'
export default {
    props: {
        categories: Array,
        muscles: Array
    },

    data () {
        return {
            search: {
                name: '',
                category: '',
                muscle_group: '',
            }
        }
    },

    methods: {
        query () {
            this.$emit('search', this.search)
        },

        clearFilter () {
            this.search.muscle_group = ''
            this.search.name = ''
            this.search.category = ''
            this.$router.push({ query: '' })
        },
    }
}
</script>