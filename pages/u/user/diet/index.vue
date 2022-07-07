<template>
<div class="text-black diet-index">
    <date-pick />
    <el-form :model="form" ref="dinnerForm" label-width="120px" class="demo-ruleForm bg-slate-50 rounded-xl mt-10 px-5 py-5">
        <div class="flex flex-col items-start">Breakfast
            <div>
                <el-form-item label="Name" v-for="(food, index) in form.breakfast" :key="`breakfast${index}`">
                    <el-autocomplete
                            popper-class="my-autocomplete"
                            v-model="food.name"
                            :fetch-suggestions="querySearch"
                            placeholder="Please input"
                            @select="handleSelectBreakfastFoods"
                            value-key="name"
                        >
                            <i
                                class="el-icon-edit el-input__icon"
                                slot="suffix"
                                >
                            </i>
                            <template slot-scope="{ item, index }">
                                <div class="value">{{ item.name }}</div>
                                <span class="protein">{{ item.protein }}</span>
                            </template>
                    </el-autocomplete>
                    <span class="text-black ml-5"> Serving </span>
                    <el-input-number class="ml-2 w-36" :min="0.1" v-model="food.serving" />
                    <el-button type="danger" icon="el-icon-minus" @click="deleteBreakfast(index)"></el-button>
                </el-form-item>
                <PieChart :series="arrValueBreakfast" />
            </div>
            <el-button type="success" icon="el-icon-plus" @click="addBreakfast">Add</el-button>
        </div>
        <div class="flex flex-col items-start">Lunch
            <el-form-item label="Name" v-for="(food, index) in form.lunch" :key="`lunch${index}`">
                <el-autocomplete
                        popper-class="my-autocomplete"
                        v-model="food.name"
                        :fetch-suggestions="querySearch"
                        placeholder="Please input"
                        @select="handleSelectLunchFoods"
                        value-key="name"
                    >
                        <i
                            class="el-icon-edit el-input__icon"
                            slot="suffix"
                            >
                        </i>
                        <template slot-scope="{ item, index }">
                            <div class="value">{{ item.name }}</div>
                            <span class="protein">{{ item.protein }}</span>
                        </template>
                </el-autocomplete>
                <span class="text-black ml-5"> Serving </span>
                <el-input-number class="ml-2 w-36" :min="0.1" v-model="food.serving" />
                <el-button type="danger" icon="el-icon-minus" @click="deleteLunch(index)"></el-button>
            </el-form-item>
            <PieChart :series="arrValueLunch" />
            <el-button type="success" icon="el-icon-plus" @click="addLunch">Add</el-button>
        </div>
        <div class="flex flex-col items-start">Dinner
            <el-form-item label="Name" v-for="(food, index) in form.dinner" :key="`dinner${index}`">
                <el-autocomplete
                        popper-class="my-autocomplete"
                        v-model="food.name"
                        :fetch-suggestions="querySearch"
                        placeholder="Please input"
                        @select="handleSelectDinnerFoods"
                        value-key="name"
                    >
                        <i
                            class="el-icon-edit el-input__icon"
                            slot="suffix"
                            >
                        </i>
                        <template slot-scope="{ item, index }">
                            <div class="value">{{ item.name }}</div>
                            <span class="protein">{{ item.protein }}</span>
                        </template>
                </el-autocomplete>
                <span class="text-black ml-5">Serving</span>
                <el-input-number class="ml-2 w-36" :min="0.1" v-model="food.serving" />
                <el-button type="danger" icon="el-icon-minus" @click="deleteDinner(index)"></el-button>
            </el-form-item>
            <PieChart :series="arrValueDinner" />
            <el-button type="success" icon="el-icon-plus" @click="addDinner">Add</el-button>
        </div>
        <div class="flex flex-col items-start">Snacks
            <el-form-item label="Name" v-for="(food, index) in form.snacks" :key="`snacks${index}`">
                <el-autocomplete
                        popper-class="my-autocomplete"
                        v-model="food.name"
                        :fetch-suggestions="querySearch"
                        placeholder="Please input"
                        @select="handleSelectSnacksFoods"
                        value-key="name"
                    >
                        <i
                            class="el-icon-edit el-input__icon"
                            slot="suffix"
                            >
                        </i>
                        <template slot-scope="{ item, index }">
                            <div class="value">{{ item.name }}</div>
                            <span class="protein">{{ item.protein }}</span>
                        </template>
                </el-autocomplete>
                <span class="text-black ml-5" >Serving</span>
                <el-input-number class="ml-2 w-36" :min="0.1" v-model="food.serving" />
                <el-button type="danger" icon="el-icon-minus" @click="deleteSnacks(index)"></el-button>
            </el-form-item>
            <PieChart :series="arrValueSnacks" />
            <el-button type="success" icon="el-icon-plus" @click="addSnacks">Add</el-button>
        </div>
        <div class="flex flex-col items-center">
        <div>Total:</div>
        <PieChart :series="totalvalue" />
        </div>
        <div class="text-center">
            <el-button type="primary" class="bg-lime-400 text-center" @click="submit"> Save </el-button>
        </div>
    </el-form>
</div>
</template>
<script>
const formDefault = {
    meats: [],
    vegetables: [],
    fruits: [],
}
const snacksForm = [
    {
        meats: [],
        vegetables: [],
        fruits: [],
    }
]
import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import _forEach from 'lodash/forEach';
import { index } from '~/api/meal'
import DatePick from '~/components/DatePick.vue'
import PieChart from '~/components/user/PieChart.vue'
export default {
    components:{
        DatePick,
        PieChart
    },

    async asyncData({ app, query, params }){
        const { data : meal } = await index(app.$axios , params.user, query)
        const form = {
            breakfast: _get(meal, '[0].breakfast', []),
            lunch: _get(meal, '[0].lunch', []),
            dinner: _get(meal, '[0].dinner', []),
            snacks:  _get(meal, '[0].snacks', []),
        }
        return { meal, form }
    },
    
    data() {
        return {
           dinnerForm: '',
           snacksForm: '',
           state: '',
           breakfastSend : '',
           selectedItem: '',
           arrValueBreakfast: [],
           arrValueLunch: [],
           arrValueDinner: [],
           arrValueSnacks: [],
        }
    },
    
    computed: {
        totalvalue(){
           return [
            this.arrValueBreakfast[0] + this.arrValueLunch[0] + this.arrValueDinner[0] + this.arrValueSnacks[0],
            this.arrValueBreakfast[1] + this.arrValueLunch[1] + this.arrValueDinner[1] + this.arrValueSnacks[1],
            this.arrValueBreakfast[2] + this.arrValueLunch[2] + this.arrValueDinner[2] + this.arrValueSnacks[2],
            this.arrValueBreakfast[3] + this.arrValueLunch[3] + this.arrValueDinner[3] + this.arrValueSnacks[3],
           ]
        },
    },

    watch: {
        'form.breakfast': {
            handler(){
            this.arrValueBreakfast = this.changeArrValue(this.form.breakfast)
            },
            deep: true
        },

        'form.lunch': {
            handler(){
            this.arrValueLunch = this.changeArrValue(this.form.lunch)
            },
            deep: true
        },

        'form.dinner': {
            handler(){
            this.arrValueDinner = this.changeArrValue(this.form.dinner)
            },
            deep: true
        },

        'form.snacks': {
            handler(){
            this.arrValueSnacks = this.changeArrValue(this.form.snacks)
            },
            deep: true
        },
        
    },

    watchQuery: true,
    
    methods:{
        addBreakfast() {
            const element = {
                id: '',
                name: '',
                protein: 0,
                carb: 0,
                fat: 0,
                cenluloza: 0,
                serving: 1
            }
            this.form.breakfast.push(element)
        },

        addLunch() {
            const element = {
                id: '',
                name: '',
                protein: 0,
                carb: 0,
                fat: 0,
                cenluloza: 0,
                serving: 1
            }
            this.form.lunch.push(element)
        },

        addDinner() {
            const element = {
                id: '',
                name: '',
                protein: 0,
                carb: 0,
                fat: 0,
                cenluloza: 0,
                serving: 1
            }
            this.form.dinner.push(element)
        },

        addSnacks() {
            const element = {
                id: '',
                name: '',
                protein: 0,
                carb: 0,
                fat: 0,
                cenluloza: 0,
                serving: 1
            }
            this.form.snacks.push(element)
        },
        
        deleteBreakfast(index) {
            this.form.breakfast.splice(index, 1)
        },

        deleteLunch(index) {
            this.form.lunch.splice(index, 1)
        },

        deleteDinner(index) {
            this.form.dinner.splice(index, 1)
        },

        deleteSnacks(index) {
            this.form.snacks.splice(index, 1)
        },

        handleSelectBreakfastFoods(item) {
            this.form.breakfast.map( (value) => {
                if(value.name === item.name){
                    value.id = item.id
                    value.protein = item.protein
                    value.carb = item.carb
                    value.fat = item.fat
                    value.cenluloza = item.cenluloza
                    value.vitaminA = item.vitaminA
                    value.vitaminB = item.vitaminB
                    value.natri = item.natri
                    value.kali = item.kali
                    value.classify_id = item.classify_id
                    value.calo = item.calo
                }
                return value
            })
            
        },
        handleSelectLunchFoods(item) {
            this.form.lunch.map( (value) => {
                if(value.name === item.name){
                    value.id = item.id
                    value.protein = item.protein
                    value.carb = item.carb
                    value.fat = item.fat
                    value.cenluloza = item.cenluloza
                    value.vitaminA = item.vitaminA
                    value.vitaminB = item.vitaminB
                    value.natri = item.natri
                    value.kali = item.kali
                    value.classify_id = item.classify_id
                    value.calo = item.calo
                }
                return value
            })
            
        },
        handleSelectDinnerFoods(item) {
            this.form.dinner.map( (value) => {
                if(value.name === item.name){
                    value.id = item.id
                    value.protein = item.protein
                    value.carb = item.carb
                    value.fat = item.fat
                    value.cenluloza = item.cenluloza
                    value.vitaminA = item.vitaminA
                    value.vitaminB = item.vitaminB
                    value.natri = item.natri
                    value.kali = item.kali
                    value.classify_id = item.classify_id
                    value.calo = item.calo
                }
                return value
            })
            
        },

        handleSelectSnacksFoods(item) {
            this.form.snacks.map( (value) => {
                if(value.name === item.name){
                    value.id = item.id
                    value.protein = item.protein
                    value.carb = item.carb
                    value.fat = item.fat
                    value.cenluloza = item.cenluloza
                    value.vitaminA = item.vitaminA
                    value.vitaminB = item.vitaminB
                    value.natri = item.natri
                    value.kali = item.kali
                    value.classify_id = item.classify_id
                    value.calo = item.calo
                }
                return value
            })
            
        },

        querySearch(queryString, cb) {
            let links = this.foodList;
            let results = queryString ? links.filter(this.createFilter(queryString)) : links;
            // call callback function to return suggestion objects
            cb(results);
        },

        createFilter(queryString) {
            return (link) => {
            return (link.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
            };
        },

         getStoreLocal() {
            if(process.client) {
                this.foodList = JSON.parse(localStorage.foods)
            }
        },

        changeArrValue(form) {
            const arr = []
            let protein = 0
            let lipit = 0
            let cenluloza = 0
            let cacbohydrat = 0
            _forEach(form, (value) => {
                protein += value.protein*value.serving
                lipit += value.fat*value.serving
                cenluloza += value.cenluloza*value.serving
                cacbohydrat += value.carb*value.serving
            })
            arr.push(cacbohydrat,cenluloza,lipit,protein)
            return arr
        },

        submit() {

        },

    },

    mounted() {
        this.getStoreLocal()
       
    },

    created() {
        this.getStoreLocal()
        this.breakfastSend = this.breakfast
        this.arrValueBreakfast = this.changeArrValue(this.form.breakfast)
        this.arrValueLunch = this.changeArrValue(this.form.lunch)
        this.arrValueDinner = this.changeArrValue(this.form.dinner)
        this.arrValueSnacks = this.changeArrValue(this.form.snacks)
   
    }
}
</script>
<style lang="scss">
    .diet-index {
        .el-button--success {
            color: #0bef0b;
            border: none;
            background-color: transparent;
            font-size: large;
        }
        .el-button--danger {
            color: #ef1a0b;
            border: none;
            background-color: transparent;
            font-size: large;
        }
    }
    
</style>