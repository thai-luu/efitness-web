<template>
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
            filter-placement="bottom-end"
        >
            <template slot-scope="scope">
                <span>{{scope.row.classify.name}}</span>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    props :{
        foods: {
            type: Array,
            default: []
        }
    }
}
</script>