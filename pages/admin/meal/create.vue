<template>
    <div>
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
                                </template>
                        </el-autocomplete>
                        <span class="text-black ml-5"> Serving </span>
                        <el-input-number class="ml-2 w-36" :min="0" v-model="food.serving" />
                        <el-button type="danger" icon="el-icon-minus" @click="deleteBreakfast(index)"></el-button>
                    </el-form-item>
                    <PieChart :series="arrValueBreakfast" v-if="!showPieBreak" />
                </div>
                <el-button type="success" icon="el-icon-plus" plain @click="addBreakfast">Add</el-button>
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
                    <el-input-number class="ml-2 w-36" :min="0" v-model="food.serving" />
                    <el-button type="danger" icon="el-icon-minus" @click="deleteLunch(index)"></el-button>
                </el-form-item>
                <PieChart :series="arrValueLunch" v-if="!showPieLunch" />
                <el-button type="success" icon="el-icon-plus" plain @click="addLunch">Add</el-button>
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
                    <el-input-number class="ml-2 w-36" :min="0" v-model="food.serving" />
                    <el-button type="danger" icon="el-icon-minus" @click="deleteDinner(index)"></el-button>
                </el-form-item>
                <PieChart :series="arrValueDinner" v-if="!showPieDinner" />
                <el-button type="success" icon="el-icon-plus" plain @click="addDinner">Add</el-button>
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
                    <el-input-number class="ml-2 w-36" :min="0" v-model="food.serving" />
                    <el-button type="danger" icon="el-icon-minus" @click="deleteSnacks(index)"></el-button>
                </el-form-item>
                <PieChart :series="arrValueSnacks" v-if="!showPieSnacks" />
                <el-button type="success" icon="el-icon-plus" plain @click="addSnacks">Add</el-button>
            </div>
            <div class="flex flex-col items-center">
            <div>Total:</div>
            <PieChart :series="totalvalue" v-if="!showPieTotal" />
            </div>
            <div class="text-center">
                <el-tag
                    type="success"
                    effect="plain"
                >
                    <i class="el-icon-bottom">
                        <span>Calories nạp vào: 2351 </span>
                    </i>
                </el-tag>
            </div>
            <div class="text-center">
                <el-button type="success" plain @click="submit"> Save </el-button>
            </div>
        </el-form>
        <table-food-dialog
            :classifies="classifies"  
            :dialogVisible="dialogVisible"
            :foods="foods"
            @emitFood="pushFood"
            @offDialog="offDialog"     
        />
    </div>
</template>
<script>
import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _forEach from 'lodash/forEach';
import { index, store } from '~/api/user/diary'
import { index as indexClassify } from '~/api/classify'
import { index as indexFood } from '~/api/user/food'
import PieChart from '~/components/user/PieChart.vue'
import TableFoodDialog from '~/components/food/TableFoodDialog.vue'
import DialogTableTrainingSession from '~/components/user/TrainingSession/DialogTableTrainingSession.vue';
export default {
    layout: 'admin',
    components:{
        PieChart,
        TableFoodDialog,
        DialogTableTrainingSession
    },

    async asyncData({ app, query, params }){
        const { data: classifies } = await indexClassify(app.$axios)
        const foods = await indexFood(app.$axios)
        return { 
            classifies, 
            foods: foods.data, 
            total: foods.meta.total,
            pageSize: foods.meta.per_page,
            currentPage: foods.meta.current_page
            }
    },
    
    data() {
        return {
            form: {
                breakfast: [],
                lunch: [],
                dinner: [],
                snacks: [],
            },
           dinnerForm: '',
           snacksForm: '',
           state: '',
           breakfastSend : '',
           selectedItem: '',
           arrValueBreakfast: [],
           arrValueLunch: [],
           arrValueDinner: [],
           arrValueSnacks: [],
           dialogVisible: false,
           mealSelected: 1,
           dialogTrain: false,
           breakfastKey: 0,
           calories_in: 0,
           calories_out: 0,
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
        showPieBreak(){
            return _isEqual(this.arrValueBreakfast,[0,0,0,0])
        },

        showPieLunch(){
            return _isEqual(this.arrValueLunch,[0,0,0,0])
        },

        showPieDinner(){
            return _isEqual(this.arrValueDinner,[0,0,0,0])
        },

        showPieSnacks(){
            return _isEqual(this.arrValueSnacks,[0,0,0,0])
        },
        
        showPieTotal(){
            return _isEqual(this.totalvalue,[0,0,0,0])
        }
    },

    watch: {
        'form.breakfast': {
            handler(){
            this.arrValueBreakfast = this.changeArrValue(this.form.breakfast)
            
            console.log(this.arrValueBreakfast, this.breakfastKey)
            
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
        chooseDate (value) {
            this.form.day_use = value
            
        },

        offDialog (value) {
            this.dialogVisible = value
        },

        offDialogTraining (value) {
            this.dialogTrain = value
        },

        addTraining (training) {
            this.form.training = training
            this.dialogTrain = false
        },

        addBreakfast () {
            this.mealSelected = 1
            this.dialogVisible = true
        },

        addLunch () {
            this.mealSelected = 2
            this.dialogVisible = true
        },

        addDinner () {
            this.mealSelected = 3
            this.dialogVisible = true
        },

        addSnacks () {
            this.mealSelected = 4
            this.dialogVisible = true
        },
        
        pushFood (form, dialog){
            this.dialogVisible = dialog
            switch (this.mealSelected) {
                case 1:
                    this.form.breakfast.push(...form)
                    break;
                case 2:
                    this.form.lunch.push(...form)
                    break;
                case 3:
                    this.form.dinner.push(...form)
                    break;
                case 4:
                    this.form.snacks.push(...form)
                    break;
                default:
                    break;
            }
        },

        deleteBreakfast (index) {
            this.form.breakfast.splice(index, 1)
        },

        deleteLunch (index) {
            this.form.lunch.splice(index, 1)
        },

        deleteDinner (index) {
            this.form.dinner.splice(index, 1)
        },

        deleteSnacks (index) {
            this.form.snacks.splice(index, 1)
        },

        handleSelectBreakfastFoods (item) {
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
        handleSelectLunchFoods (item) {
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
        handleSelectDinnerFoods (item) {
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

        handleSelectSnacksFoods (item) {
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

        querySearch (queryString, cb) {
            let links = this.foodList;
            let results = queryString ? links.filter(this.createFilter(queryString)) : links;
            // call callback function to return suggestion objects
            cb(results);
        },

        createFilter (queryString) {
            return (link) => {
            return (link.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
            };
        },

         getStoreLocal () {
            if(process.client) {
                this.foodList = JSON.parse(localStorage.foods)
            }
        },

        changeArrValue (form) {
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

        async submit() {
            if(this.form.day_use === '')
            this.form.day_use = this.$route.query.day_use
            try {
                await store(this.$axios, this.form)
                this.$message.success('Update diary successfully')
            } catch (error) {
                this.$message.error('Some thing went wrong')
            }
            
        },

        reloadPage () {

        }

    },

    mounted () {
        this.getStoreLocal()
        // this.changeArrValue(this.form.breakfast)
        // this.changeArrValue(this.form.lunch)
        // this.changeArrValue(this.form.dinner)
        // this.changeArrValue(this.form.snacks)
         
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