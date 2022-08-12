<template>
    <div>
        <search-training />
        <div class="flex flex-wrap">  
            <el-table
            :data="training_sessions"
            style="width: 100%"
            highlight-current-row
            @current-change="handleCurrentChange"
            >
                <el-table-column
                    prop="name"
                    label="Name"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="desc"
                    label="Description"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="calories"
                    label="Calories"
                    width="120">

                </el-table-column>
                <el-table-column
                    prop="time"
                    label="Time"
                    width="120">

                </el-table-column>
            </el-table>
        </div>
        <pagination v-bind="{ currentPage, total, pageSize }" />
        <span slot="footer" class="dialog-footer">
            <el-button @click="offDialog">Cancel</el-button>
            <el-button type="success" plain @click="emitTrainingSession">Confirm</el-button>
        </span>
    </div>
</template>
<script>
import SearchTraining from '~/components/shared/training_session/SearchTraining.vue';
import _cloneDeep from 'lodash/cloneDeep';
import Pagination from '~/components/shared/Pagination.vue'
export default {
    components: {
        Pagination,
        SearchTraining
    },

    props: {
        currentPage: Number,
        total: Number,
        pageSize: Number,
        training_sessions: Array,
    },

    data () {
        return {
            trainingSelected: null,
        }
    },

    methods: {

        handleCurrentChange(val) {
            this.trainingSelected = val;
        },

        emitTrainingSession () {
            this.$emit('emitTraining', this.trainingSelected)
        },
    
    }
}
</script>