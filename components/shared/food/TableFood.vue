<template>
    <div>  
        <el-table
        :data="foods"
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
            width="120">
        </el-table-column>
        <el-table-column
            prop="carb"
            label="Carb"
            width="120">
        </el-table-column>
        <el-table-column
            prop="protein"
            label="Protein"
            width="120">
        </el-table-column>
        <el-table-column
            prop="fat"
            label="Fat"
            width="120">
        </el-table-column>
        <el-table-column
            prop="cenluloza"
            label="Cenluloza"
            width="120">
        </el-table-column>
        <el-table-column
            prop="calcium"
            label="calcium"
            width="120">
        </el-table-column>
        <el-table-column
            prop="sodium"
            label="sodium"
            width="120">
        </el-table-column>
        <el-table-column
            prop="trans"
            label="trans"
            width="120">
        </el-table-column>
        <el-table-column
            prop="cholesteron"
            label="cholesteron"
            width="120">
        </el-table-column>
        <el-table-column
            prop="classify"
            label="Classify"
            width="120">
            <template slot-scope="scope"><span>{{ scope.row.classify.name }}</span></template>
        </el-table-column>
        <el-table-column
            prop="calo"
            label="Calo"
            width="120">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="Operations"
            width="120">
            <template slot-scope="{row}">
            <el-button @click="onDialog(row)" type="text" size="small">Edit</el-button>
            <el-button type="text" size="small">Delete</el-button>
            </template>
        </el-table-column>
        </el-table>
        <pagination v-bind="{ currentPage, total, pageSize }" />
  </div>
</template>
<script>
import Pagination from '~/components/shared/Pagination.vue'
export default {
    components: {
      Pagination
    },
    props :{
        currentPage: Number,
        total: Number,
        pageSize: Number,
        foods: Array
    },

    data () {
        return {
            multipleSelection: []
        }
    },

    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.$emit('emitFood', this.multipleSelection)
        },
        
        onDialog (food) {
            console.log(food)
            this.$emit('onDialog', food)
        },
    }
}
</script>