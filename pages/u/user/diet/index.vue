<template>
<div class="text-black diet-index">
    <date-pick  @chooseDate="chooseDate"/>
    <el-form :model="form" ref="dinnerForm" label-width="120px" class="demo-ruleForm bg-slate-50 rounded-xl mt-10 px-5 py-5">
        <div class="flex flex-col items-start">Breakfast
            <div>
                <el-form-item label="Name" v-for="(food, index) in form.breakfast" :key="`breakfast${index}`">
                    <el-input v-model="food.name" disabled class="w-24"></el-input>
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
                <el-input v-model="food.name" disabled class="w-24"></el-input>
                <span class="text-black ml-5"> Serving </span>
                <el-input-number class="ml-2 w-36" :min="0" v-model="food.serving" />
                <el-button type="danger" icon="el-icon-minus" @click="deleteLunch(index)"></el-button>
            </el-form-item>
            <PieChart :series="arrValueLunch" v-if="!showPieLunch" />
            <el-button type="success" icon="el-icon-plus" plain @click="addLunch">Add</el-button>
        </div>
        <div class="flex flex-col items-start">Dinner
            <el-form-item label="Name" v-for="(food, index) in form.dinner" :key="`dinner${index}`">
                <el-input v-model="food.name" disabled class="w-24"></el-input>
                <span class="text-black ml-5">Serving</span>
                <el-input-number class="ml-2 w-36" :min="0" v-model="food.serving" />
                <el-button type="danger" icon="el-icon-minus" @click="deleteDinner(index)"></el-button>
            </el-form-item>
            <PieChart :series="arrValueDinner" v-if="!showPieDinner" />
            <el-button type="success" icon="el-icon-plus" plain @click="addDinner">Add</el-button>
        </div>
        <div class="flex flex-col items-start">Snacks
            <el-form-item label="Name" v-for="(food, index) in form.snacks" :key="`snacks${index}`">
                <el-input v-model="food.name" disabled class="w-24"></el-input>
                <span class="text-black ml-5" >Serving</span>
                <el-input-number class="ml-2 w-36" :min="0" v-model="food.serving" />
                <el-button type="danger" icon="el-icon-minus" @click="deleteSnacks(index)"></el-button>
            </el-form-item>
            <PieChart :series="arrValueSnacks" v-if="!showPieSnacks" />
            <el-button type="success" icon="el-icon-plus" plain @click="addSnacks">Add</el-button>
        </div>
            <el-form-item v-if="form.training !== null && form.training.name !== undefined" label="Name training session" prop="name training session">
                <el-input class="w-40" v-model="form.training.name"></el-input>
            </el-form-item>
            <div v-if="form.training">
                <el-form-item v-for="(exercise, index) in form.training.exercises" :key="exercise.id" :label="exercise.name" prop="categories_id">
                    <div v-if="exercise.category.id === 2">
                        <div v-for="exer in exercise.sets">
                            <span>Weight</span>
                            <el-input-number class="w-40" v-model="exer.weight" placeholder="weight" :min="0"></el-input-number>
                            <span>Reps</span>
                            <el-input-number class="w-40" v-model="exer.reps" placeholder="reps" :min="0"></el-input-number>
                            <span>Rm</span>
                            <el-input-number class="w-40" v-model="exer.rm" :min="0"  placeholder="How many rm . is this weight"></el-input-number>
                        </div>
                        <br>
                        <el-button type="success" plain @click="addSet(index)">Add set</el-button>
                    </div>
                    <div v-else>
                        <span>Time</span>
                        <el-input-number class="w-40" v-model="exercise.time" placeholder="time"></el-input-number>
                        <span>min</span>
                    </div>
                </el-form-item>
            </div>
        <div class="flex flex-col items-center">
        <el-button type="success" @click="dialogTrain = true" plain>Add training session</el-button>
        <div>Total:</div>
        <PieChart :series="totalvalue" v-if="!showPieTotal" />
        </div>
        <div class="text-center">
            <el-tag
                type="success"
                effect="plain"
            >
                <i class="el-icon-bottom">
                    <span>Calories nạp vào: {{calories_in}} </span>
                </i>
            </el-tag>
            <el-tag
                type="warning"
                effect="plain"
            >
                <i class="el-icon-top">
                    <span>Calories tiêu thụ: {{calories_out}} </span>
                </i>
            </el-tag>
        </div>
        <br>
        <div class="border-green-300 border-4 rounded-lg px-1 py-1">
            <div>Đánh giá từ hệ thống: </div>
            <div v-if="form.evaluate">
            <div>
                <span>Dinh dưỡng: </span>
                <el-tag
                type="warning"
                effect="plain"
                v-if="form.evaluate.needProtein"
                >
                <span v-if="form.evaluate.protein == -1">Thiếu protein</span>
                <span v-if="form.evaluate.protein == 1"> Thừa protein</span>
                <span v-if="form.evaluate.needProtein">(mức protein phù hợp nhất với thể trạng và mục tiêu của bạn: {{form.evaluate.needProtein}}) </span>
                </el-tag>
                <el-tag
                type="warning"
                effect="plain"
                v-if="form.evaluate.needCarb"
                >
                <span v-if="form.evaluate.carb == -1">Thiếu carb</span>
                <span v-if="form.evaluate.carb == 1"> Thừa carb</span>
                <span v-if="form.evaluate.needCarb">(mức cacbohydrat phù hợp nhất với thể trạng và mục tiêu của bạn: {{form.evaluate.needCarb}}) </span>
                </el-tag>
                <el-tag
                type="warning"
                effect="plain"
                v-if="form.evaluate.needFat"
                >
                <span v-if="form.evaluate.fat == -1">Thiếu fat</span>
                <span v-if="form.evaluate.fat == 1"> Thừa fat</span>
                <span v-if="form.evaluate.needFat">(mức fat phù hợp nhất với thể trạng và mục tiêu của bạn: {{form.evaluate.needFat}}) </span>
                </el-tag>
                <el-tag
                type="warning"
                effect="plain"
                v-if="form.evaluate.needCenluloza"
                >
                <span v-if="form.evaluate.cenluloza == -1">Thiếu cenluloza</span>
                <span v-if="form.evaluate.cenluloza == 1"> Thừa cenluloza</span>
                <span>(mức cenluloza phù hợp nhất với thể trạng và mục tiêu của bạn: {{form.evaluate.needCenluloza}}) </span>
                </el-tag>
            </div>
            <br>
            <div class="flex">
                <span>Tập luyện: </span>
                <div class="flex flex-col">
                <el-tag
                type="warning"
                effect="plain"
                v-if="form.evaluate.trainingLevel"
                >
                <span>
                    Buổi tập có độ khó cao chưa phù hợp với kinh nghiệm của bạn
                </span>
                </el-tag>
                <el-tag
                type="warning"
                effect="plain"
                class="mt-2"
                v-if="form.evaluate.cardio"
                >
                <span>Thời gian cardio cao không phù hợp với mục tiêu của bạn </span>
                </el-tag>
                </div>
            </div>
            <br>
            <div>
                <span>Tổng thể: </span>
                <el-tag
                type="warning"
                effect="plain"
                >
                <span>Calo thiếu hụt: 109</span>
                <span>Trong ngưỡng an toàn, chưa đúng với mục tiêu</span>
                </el-tag>
            </div>
            </div>
        </div>
        <br>
        <div class="text-center">
            <el-button type="success" plain @click="submit"> Save </el-button>
            <el-button type="info" plain @click="evaluate"> Evaluate </el-button>
        </div>
    </el-form>
    <table-food-dialog
        :classifies="classifies"  
        :dialogVisible="dialogVisible"
        @emitFood="pushFood"
        @offDialog="offDialog"     
    />
    <dialog-table-training-session
        :dialogTrain="dialogTrain"
        @offDialogTraining="offDialogTraining"
        @addTraining="addTraining"
    />
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
import _isEqual from 'lodash/isEqual';
import _forEach from 'lodash/forEach';
import { index, store } from '~/api/user/diary'
import { evaluate } from '~/api/user/evaluate'
import { index as indexClassify } from '~/api/classify'
import { index as indexFood } from '~/api/user/food'
import { index as indexTrainingSession } from '~/api/user/training_session'
import DatePick from '~/components/DatePick.vue'
import PieChart from '~/components/user/PieChart.vue'
import TableFoodDialog from '~/components/food/TableFoodDialog.vue'
import DialogTableTrainingSession from '~/components/user/TrainingSession/DialogTableTrainingSession.vue';
export default {
    components:{
        DatePick,
        PieChart,
        TableFoodDialog,
        DialogTableTrainingSession
    },
    
    async asyncData({ app, query, params }){
        const { data : meal } = await index(app.$axios , params.user, query)
        const { data: classifies } = await indexClassify(app.$axios)
        // const {data: foods} = await indexFood(app.$axios)
        // const  training_sessions = await indexTrainingSession(app.$axios)
        const form = {
            breakfast: _get(meal, '[0].breakfast', []),
            lunch: _get(meal, '[0].lunch', []),
            dinner: _get(meal, '[0].dinner', []),
            snacks:  _get(meal, '[0].snacks', []),
            training: _get(meal, '[0].training', ''),
            evaluate: _get(meal, '[0].evaluate', ''),
            day_use: _get(meal, '[0].day_use', '')
        }
        return { 
            meal, form, classifies, 
            //foods, 
            // training_sessions: training_sessions.data,
            // total: training_sessions.meta.total,
            // pageSize: training_sessions.meta.per_page,
            // currentPage: training_sessions.meta.current_page
            }
    },
    watchQuery: true,
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
           dialogVisible: false,
           mealSelected: 1,
           dialogTrain: false,
           breakfastKey: 0,
           evaluateRes:''
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

        calories_out(){
            let calo = 0;
            if(this.form.training.exercises !== undefined){
                this.form.training.exercises.forEach((item) => {
                    calo += this.caculateCalorieExercise(item)
                })
            }
            return (calo + this.caloriesBMI).toFixed(2)
        },

        caloriesBMI(){
            let calories =  9.99*this.$auth.user.data.weight + 6.25*this.$auth.user.data.height - 4.92*this.$auth.user.data.age
            if(this.$auth.user.data.sex === 1)
            calories += 5
            else 
            calories-= 161
            return calories
        },

        caloriesTDE() {
            if(this.form.training === '')
            return this.caloriesBMI * 1.5
            else
            return this.caloriesBMI * 1.2
        },

        calories_in() {
            return this.totalCalories(this.form.breakfast) + this.totalCalories(this.form.lunch) + this.totalCalories(this.form.dinner) + this.totalCalories(this.form.snacks)
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
    
    methods:{
        addSet (index) {
            const set = {
                weight: 0,
                reps: 0,
                rm: 0
            }
            this.form.training.exercises[index].sets.push(set)
        },

        caculateCalorieExercise (exercise) {
            let calo = 8
            let calories = 0
            let time = 0
            if (exercise.categories_id === 2) {
            if(exercise.failure > 7 &&  exercise.failure <=10)
                calo += 2
            if(exercise.failure <7 && exercise.failure !== 0)
                calo += 4
            if(exercise.failure > 12)
                calo += -1
            }
            if(exercise.compound == true)
                calo = calo * 2
            if (exercise.sets.length > 0){
                _forEach(exercise.sets, (val) => {
                    let rep = val.reps || 0
                    console.log('rep', rep)
                    time += (rep*5)/60
                    let timing = (rep*5)/60
                    calories += timing*calo
                    console.log(timing, calories, calo)
                })
            } else {
                let timing = exercise.time || 0
                time += timing
                // console.log(123, time)
                calories += timing*calo
            }
            return calories
        },

        totalCalories (form) {
            let calories = 0
            _forEach(form, (value) => {
                calories += value.calo*value.serving
            })
            return calories
        },

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
            console.log(123)
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
        
        async evaluate() {
            try {
                const form = _cloneDeep(this.form)
                form.caloTDE = this.caloriesTDE.toFixed(2)
                form.caloIn = this.calories_in.toFixed(2)
                form.caloBMI = this.caloriesBMI.toFixed(2)
                form.caloOut = this.calories_out
                this.form.evaluate = await evaluate(this.$axios, form)
                console.log(this.evaluateRes)
                this.$message.success('Caculate successfully')
            } catch (error) {
                this.$message.error('Some thing went wrong')
            }
            
        },

        reloadPage () {

        }

    },

    created() {
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
        .el-button--danger {
            color: #ef1a0b;
            border: none;
            background-color: transparent;
            font-size: large;
        }
    }
    
</style>