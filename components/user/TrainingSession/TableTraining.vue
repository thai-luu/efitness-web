<template>
    <div>
        <search-training-dialog @fetch="fetchExercise" />
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
                    prop="exercise"
                    label="Exercise"
                >
                    <template slot-scope="{row}">
                    <el-tag class="ml-1 mt-1" v-for="exercise in row.exercises" :key="exercise.id" type="success">{{exercise.name}}</el-tag>
                    </template>
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
import SearchTrainingDialog from '~/components/shared/training_session/SearchTrainingDialog.vue';
import _cloneDeep from 'lodash/cloneDeep';
import Pagination from '~/components/shared/Pagination.vue'
export default {
    components: {
        Pagination,
        SearchTrainingDialog
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
        fetchExercise(search) { 
            this.$emit('fetchExercise', search)
        },

        offDialog() {
            this.$emit('offDialog')
        },

        handleCurrentChange(val) {
            this.trainingSelected = val;
        },

        emitTrainingSession () {
            console.log(this.trainingSelected)
            this.$emit('emitTraining', this.trainingSelected)
        },
    
    }
}
</script>