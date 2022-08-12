<template>
    <div>
        <search-exercise />
        <el-table
            :data="exercises"
            style="width: 100%"
            ref="multipleTable"
            @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="Name"
            width="120">
        </el-table-column>
        <el-table-column
            prop="note"
            label="Note"
            width="320">
            <template slot-scope="scope">
                <span v-if="!scope.row.note">Empty</span>
            </template>
        </el-table-column>
        <el-table-column
            prop="compound"
            label="Compound"
            width="100">
            <template slot-scope="scope">
                <span v-if="scope.row.compound === true"><i class="el-icon-check text-green-500"></i></span>
                <span v-else><i class="el-icon-close text-rose-600"></i></span>
            </template>
        </el-table-column>
        <el-table-column
            prop="category"
            label="Catgory"
            width="100">
            <template slot-scope="scope">
                <span>{{scope.row.category.name}}</span>
            </template>
        </el-table-column>
        <el-table-column
            prop="linkVd"
            label="Link video"
            width="300">
            <template slot-scope="scope">
                <span v-if="!scope.row.linkVd">Empty</span>
            </template>
        </el-table-column>
        <el-table-column
            prop="muscle"
            label="Muscles"
            width="300">
            <template slot-scope="scope">
                <el-tag type="success" class="ml-1 mt-1" v-for="(muscle, index) in scope.row.muscle" :key="muscle.id || index">{{muscle.name}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="Operations"
            width="120">
        <template slot-scope="scope">
            <el-button @click="onDialog(scope.row)" type="text" size="small">Edit</el-button>
            <el-button type="text" size="small" @click="deleteExercise(scope.row)">Delete</el-button>
        </template>
        </el-table-column>
        </el-table>
        <pagination v-bind="{ currentPage, total, pageSize }" />
        <el-button type="danger" plain @click="deleteExercises" :disabled="!disableDelete" >Delete</el-button>
    </div>
</template>

<script>
import Pagination from '~/components/shared/Pagination.vue'
import SearchExercise from '~/components/shared/exercise/SearchExercise.vue'
import { allMuscles } from '~/api/static' 
export default {
  components: { SearchExercise, Pagination },
    props: {
        exercises: Array,
        currentPage: Number,
        total: Number,
        pageSize: Number,
    },
    
    data () {
        return {
            arrayExercise: [],
            muscles: []
        }
    },

    computed: {
        disableDelete () {
            return this.arrayExercise.length > 0
        }
    },
    methods: {
        onDialog (exercise) {
            console.log(exercise)
            this.$emit('onDialog', exercise)
        },

        deleteExercise () {
            this.$emit('fetchExercise')
        },

        deleteExercises () {
            const arrayId = []
            this.arrayExercise.forEach((item) => {
                arrayId.push(item.id)
            })
            this.$emit('fetchExercise')
        },

        handleSelectionChange (value) {
            this.arrayExercise = value
        },

        async fetchMuscle () {
            const {data: muscles} = await allMuscles(axios)
            this.muscles = muscles
        },

        getLocalMuscles () {
            if(process.client) {
                this.muscles = JSON.parse(localStorage.muscles).data
            }
        }
    },

     created () {
        this.getLocalMuscles()
        if(this.muscles === undefined){
            this.fetchMuscle()
        }
        console.log(this.muscles)
    }
}
</script>