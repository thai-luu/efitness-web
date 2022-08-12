<template>
    <el-dialog
        title="Tips"
        :visible.sync="dialog"
        width="70%"
        >
        <!-- <exercise-filter :categories="categories" :muscles="muscles" @search="search" /> -->
            <div>
            <SearchExercise />
            </div>
            <el-table
                :data="exercises.filter(exercises => !search || exercises.name.toLowerCase().includes(search.toLowerCase()))"
                height="250"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="level"
                    label="Level"
                    width="180"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.level">{{scope.row.level.name_vi}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="Name"
                    width="180"
                >
                </el-table-column>
                <el-table-column
                    prop="category"
                    label="Category"
                    :filters="categoryList"
                    :filter-method="filterCategory"
                    filter-placement="bottom-end"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.category.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="muscle"
                    label="Muscle group"
                    :filters="musclesGroup"
                    :filter-method="filterMuscle"
                    filter-placement="bottom-end"
                >
                    <template slot-scope="scope">
                        <el-tag v-for="muscle in scope.row.muscle"
                            type="success"
                            :key="muscle.id"
                            class="ml-1"
                            disable-transitions>{{muscle.name}}
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFalse">Cancel</el-button>
            <el-button type="success" plain @click="emitExercise">Confirm</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { index } from '~/api/exercise'
import Pagination from '~/components/shared/Pagination.vue'
import _forEach from 'lodash/forEach';
import _cloneDeep from 'lodash/cloneDeep';
import _mapKeys from 'lodash/mapKeys'
import _findIndex from 'lodash/findIndex'
import SearchExercise from '~/components/shared/exercise/SearchExercise.vue';
export default {
  props: {
    exercises: Array,
    categories: Array,
    muscles: Array,
    dialogVisible: Boolean,
  },
  
  components: {
    Pagination,
    SearchExercise
  },

  data () {

    return {
        search: '',
        musclesGroup : [],
        categoryList: [],
        multipleSelection: [],
        dialog: false,
    }
  },


    watch:{
        dialogVisible () {
            console.log(this.dialogVisible)
            this.dialog = this.dialogVisible
        }
    },

  methods: {
    filterMuscle(value, row) {
        
        return _findIndex(row.muscle, { 'id': value}) !== -1
    },

    async reloadData (queryPage) {
        const {data: exercises} = await index(this.$axios, queryPage.query)
        this.exerciseLists = exercises.data
        this.currentPageTable = exercises.meta.current_page
    },
    dialogFalse () {
        this.dialog = false
        this.$emit('offDialog', this.dialog)
    },

    filterCategory(value, row) {
        
        return row.category.id === value
    },

    handleSelectionChange (val) {
        console.log(val)
        this.multipleSelection = val;
    },

    emitExercise () {
        this.dialog = false
        this.$emit('emitExercise', this.multipleSelection, this.dialog)
        
    }
  },

  created () {
    const muscles = this.muscles.map((value) => {
           value =  _mapKeys(value , (val, key) => {
                if(key === 'id'){
                return 'value'
                }
                if(key === 'name'){
                return 'text'
                }
                
            })
            return value
        })
    const categories = this.categories.map((value) => {
           value =  _mapKeys(value , (val, key) => {
                if(key === 'id'){
                return 'value'
                }
                if(key === 'name'){
                return 'text'
                }
                
            })
            //console.log(value)
            return value
        })
    this.musclesGroup = muscles
    this.categoryList = categories
    this.dialog = this.dialogVisible
    console.log(this.exercises)
  },


}
</script>