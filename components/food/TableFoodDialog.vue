<template>
    <el-dialog
        title="Tips"
        :visible.sync="dialog"
        width="70%"
        :before-close="handleClose"
        >
        <!-- <exercise-filter :categories="categories" :muscles="muscles" @search="search" /> -->
            <div>
            <SearchFood />
            </div>
            <el-table
                :data="foods.filter(foods => !search || foods.name.toLowerCase().includes(search.toLowerCase()))"
                height="250"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="Name"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="carb"
                    label="Carb"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="protein"
                    label="Protein"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="fat"
                    label="Fat"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="vitaminA"
                    label="Vitamin A"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="vitaminB"
                    label="Vitamin B"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="natri"
                    label="Natri"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="kali"
                    label="Kali"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="calo"
                    label="Calories/100g"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="classify"
                    label="Classify"
                    :filters="classifies"
                    :filter-method="filterClassifies"
                    filter-placement="bottom-end"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.classify.name}}</span>
                    </template>
                </el-table-column>
            </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFalse">Cancel</el-button>
            <el-button type="success" plain @click="emitFood">Confirm</el-button>
        </span>
    </el-dialog>
</template>
<script>
import _cloneDeep from 'lodash/cloneDeep';
import _mapKeys from 'lodash/mapKeys';
import _forEach from 'lodash/forEach';
import SearchFood from '~/components/shared/food/SearchFood.vue';
export default {

    components: {
        SearchFood
    },
    
    props: {
        classifies: Array,
        dialogVisible: Boolean,
        foods: Array
  },
    data () {
        return {
            dialog: true,
            classifyList: [],
            search: ''
        }
    },

    watch:{
        dialogVisible () {
            console.log(this.dialogVisible)
            this.dialog = this.dialogVisible
        }
    },

    methods: {

        filterClassifies(value, row) {
            return row.classify.id === value
        },

        handleClose () {
            this.dialogFalse()
        },

        dialogFalse () {
            this.dialog = false
            this.$emit('offDialog', this.dialog)
        },
        emitFood () {
            this.dialog = false
            this.$emit('emitFood', this.multipleSelection, this.dialog)
        
        },

        handleSelectionChange (val) {
            this.multipleSelection = val;
        },
    },

    created () {
        this.dialog = this.dialogVisible
        const classifies = this.classifies.map((value) => {
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
        this.classifyList = classifies
    }
}
</script>