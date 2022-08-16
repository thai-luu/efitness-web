<template>
    <div class="food-user text-black">
        <div class="text-xl text-transform: uppercase font-bold">Foods</div>
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
                    @fetchFood="fetchFoods" 
                    @onDialog="openDialogEdit"     
                />
                <el-button type="success" @click="openDialog" plain>Create new</el-button>
                
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
            <el-dialog
            :title="title"
            :visible.sync="dialogVisble"
            width="50%"
            min-width="300px"
            >
            <el-form :model="food" ref="formExercise" label-width="150px" class="demo-ruleForm">
                <el-form-item label="Name">
                    <el-input type="text" v-model="food.name"></el-input>
                </el-form-item>
                <el-form-item label="carb">
                    <el-input type="number" v-model="food.carb"></el-input>
                </el-form-item>
                <el-form-item label="protein">
                    <el-input type="number" v-model="food.protein"></el-input>
                </el-form-item>
                <el-form-item label="fat">
                    <el-input type="number" v-model="food.fat"></el-input>
                </el-form-item>
                <el-form-item label="cenluloza">
                    <el-input type="number" v-model="food.cenluloza"></el-input>
                </el-form-item>
                <el-form-item label="calcium">
                    <el-input type="number" v-model="food.calcium"></el-input>
                </el-form-item>
                <el-form-item label="cholesteron">
                    <el-input type="number" v-model="food.cholesteron"></el-input>
                </el-form-item>
                <el-form-item label="trans">
                    <el-input type="number" v-model="food.trans"></el-input>
                </el-form-item>
                <el-form-item label="sodium">
                    <el-input type="number" v-model="food.sodium"></el-input>
                </el-form-item>
                <el-form-item label="classify">
                    <el-select v-model="food.classify_id" placeholder="please select your classify">
                    <el-option v-for="(classify,index) in classifies" :key="classify.id" :label="classify.name" :value="classify.id">{{classify.name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="calo">
                    <el-input type="number" v-model="food.calo"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" v-if="food.id" plain @click="onSubmit">Update</el-button>
                    <el-button type="success" v-else plain @click="createNew">Create</el-button>
                    <el-button>Cancel</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
const foodDefault = {
    name:'',
    carb:'',
    fat:'',
    protein:'',
    cenluloza:'',
    trans:'',
    calcium:'',
    sodium:'',
    classify:'',
    cholesteron:'',
    calo:'',
}
import TableFood from '~/components/shared/food/TableFood.vue'
import TableSystemFood from '~/components/food/TableSystemFood.vue'
import SearchFood from '~/components/shared/food/SearchFood.vue';
import { index, create, update } from '~/api/user/food'
import { index as indexClassify } from '~/api/classify'
import _assign from 'lodash/assign'
import Tab from '~/components/food/Tab.vue';
import _cloneDeep from 'lodash/cloneDeep'
export default {

    async asyncData({app, params, query}){
        const foods  = await index(app.$axios, query)
        const { data:classifies } = await indexClassify(app.$axios)
        return {
            foods: foods.data || [],
            classifies: classifies,
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
            active: 1,
            food:{
                name:'',
                carb:'',
                fat:'',
                protein:'',
                cenluloza:'',
                trans:'',
                calcium:'',
                sodium:'',
                classify:'',
                cholesteron:'',
                calo:'',
            },
            title: ''
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
        async fetchFoods () {
            const foods  = await index(this.$axios, this.$route.query)
                this.foods = foods.data || []
                this.total = foods.meta.total
                this.pageSize = foods.meta.per_page
                this.currentPage = foods.meta.current_page
                this.active = parseInt(this.$route.query.sys, 10) === 0 ? 0 : 1
                this.search = {
                    classify: parseInt(this.$route.query.classify, 10) || '',
                    protein: parseInt(this.$route.query.protein, 10) || '',
                    carb: parseInt(this.$route.query.carb, 10) || '',
                    fat: parseInt(this.$route.query.fat, 10) || ''
                }
            
        },

        openDialog() {
            this.food = _cloneDeep(foodDefault)
            this.dialogVisble = true
        },

        async createNew() {
            try {
               await create(this.$axios, this.food)
               this.$message.success('Created successfully')
               this.dialogVisble = false
               this.fetchFoods()
            } catch (error) {
                this.$message.error('Some thing went wrong')
            }
            

        },

        async onSubmit() {
            try {
               await update(this.$axios, this.food.id, this.food)
               this.$message.success('Created successfully')
               this.dialogVisble = false
               this.fetchFoods()
            } catch (error) {
                this.$message.error('Some thing went wrong')
            }
        },

        selectFood (value) {
            this.selectedFood = value
        },
        
        deleteFood () {
            
        },
        
        changeTab(value) {
            this.active = value
            this.$router.push({
                query: _assign({}, this.$route.query, {
                    ['sys']: value,
                }),
            })
            
        },
        openDialogEdit (food) {
            this.dialogVisble = true
            this.food = _cloneDeep(food)
            this.title = 'Edit exercise'
        },
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
