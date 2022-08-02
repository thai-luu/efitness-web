<template>
    <el-dialog
        title="Training Sesion"
        :visible.sync="dialog"
        @close="offDialog"
    >
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
</el-dialog>
</template>
<script>
import Pagination from '~/components/shared/Pagination.vue'
import _cloneDeep from 'lodash/cloneDeep';
export default {
    components: {
        Pagination
    },

    props: {
        currentPage: Number,
        total: Number,
        pageSize: Number,
        training_sessions: Array,
        dialogTrain: Boolean
    },

    data () {
        return {
            trainingSelected: null,
            dialog: false
        }
    },

    watch: {
        dialogTrain () {
            this.dialog = this.dialogTrain
        }
    },

    methods: {
        offDialog () {
            this.$emit('offDialogTraining', false)
        },

        emitTrainingSession () {
            this.$emit('addTraining', this.trainingSelected)
        },

        handleCurrentChange(val) {
            this.trainingSelected = val;
        },
        
    }
}
</script>