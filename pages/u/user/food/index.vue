<template>
    <div>
        <el-tabs @tab-click="changeFoods" type="border-card">
            <el-tab-pane label="System Food" ></el-tab-pane>
            <el-tab-pane label="My Food" ></el-tab-pane>
            <SearchFood />
            <div v-if="tab == 1" >
                <table-food
                    :foods="foods"
                    :total="total"
                    :pageSize="pageSize"
                    :currentPage="currentPage"
                    @emitFood="selectFood"    
                />
                <el-button type="success" plain>Create new</el-button>
                <el-button type="danger" @click="deleteFood" plain>Delete food</el-button>
            </div>
            <div v-else>
                <table-system-food :foods="foods"/>
            </div>
            </el-tabs>
    </div>
</template>
<script>
import TableFood from '~/components/shared/food/TableFood.vue'
import TableSystemFood from '~/components/food/TableSystemFood.vue'
import SearchFood from '~/components/shared/food/SearchFood.vue';
import { index } from '~/api/user/food'
import _assign from 'lodash/assign'
import Tab from '~/components/food/Tab.vue';
export default {

    async asyncData({app, params, query}){
        const foods  = await index(app.$axios)
        console.log(params, query)
        return {
            foods: foods.data || [],
            total: foods.meta.total,
            pageSize: foods.meta.per_page,
            currentPage: foods.meta.current_page,
            tab: query.sys || ''
        }

    },
    
    data () {
        return {
            dialogVisble: false,
            selectedFood: [],
        }
    },

    components: {
        TableFood,
        TableSystemFood,
        SearchFood,
        Tab,
    },
    watchQuery: true,
    

    
    methods: {
        selectFood (value) {
            this.selectedFood = value
        },
        
        deleteFood () {
            
        },
        
        changeFoods (value) {
             this.tab = value.index
            // console.log(typeof(value.index),value.index)
            this.$router.push({
                query: _assign({}, this.$route.query, {
                    ['sys']: value.index,
                }),
            })
            // console.log('sau push route',typeof(value.index),value.index)
            
    }

    },
    updated () {
        console.log('updated',this.tab)
    }

}
</script>
