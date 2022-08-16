<template>
    <div>
        <el-table
            :data="foods"
            height="250"
            style="width: 100%"
        >
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
                prop="calcium"
                label="Calcium"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="sodium"
                label="Sodium"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="trans"
                label="Trans"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="cholesteron"
                label="Cholesteron"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="calo"
                label="Calories/100g"
            >
            </el-table-column>
            <el-table-column
                prop="classify"
                label="Classify"
                filter-placement="bottom-end"
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.classify">{{scope.row.classify.name}}</span>
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
        foods: {
            type: Array,
            default: []
        },
        currentPage: Number,
        total: Number,
        pageSize: Number,
    }
}
</script>