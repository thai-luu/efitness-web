<template>
    <div class="food-user">
        <el-tabs type="border-card">
            <el-button :class="active === 1 ? 'active':''" @click="changeTab(1)">System Food</el-button >
            <el-button :class="active === 0 ? 'active':''" style="margin-left:0px" @click="changeTab(0)">My Food</el-button >
            <SearchFood :search="search"/>
            <div v-if="active === 0" >
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
                <table-system-food 
                    :foods="foods"
                    :total="total"
                    :pageSize="pageSize"
                    :currentPage="currentPage"
                />
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

        return {
            foods: foods.data || [],
            total: foods.meta.total,
            pageSize: foods.meta.per_page,
            currentPage: foods.meta.current_page,
            active: parseInt(query.sys, 10) === 0 ? 0 : 1,
            search: {
                classify: parseInt(query.classify, 10) || '',
                protein: parseInt(query.protein, 10) || '',
                carb: parseInt(query.carb, 10) || '',
                fat: parseInt(query.fat, 10) || ''
            }
        }

    },
    
    data () {
        return {
            dialogVisble: false,
            selectedFood: [],
            active: 1
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
        
        changeTab (value) {
            this.active = value
            this.$router.push({
                query: _assign({}, this.$route.query, {
                    ['sys']: value,
                }),
            })
            
        }
    },

    created(){
        console.log(this.active)
    },
    updated () {
        console.log('updated',this.tab)
    }

}
</script>
<style lang="scss">
    .food-user{
        .active {
            color: white;
            background-color: #67C23A;
        }
    }
</style>
