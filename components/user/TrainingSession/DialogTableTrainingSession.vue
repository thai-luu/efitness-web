<template>
    <el-dialog
        title="Training Sesion"
        :visible.sync="dialog"
        @close="offDialog"
    >
        <TableTraining 
            :training_sessions="training_sessions"
            :currentPage="currentPage" 
            :total="total"
            :pageSize="pageSize"
            @emitChange="emitTrainingSession"
        />
</el-dialog>
</template>
<script>
import TableTraining from '~/components/user/TrainingSession/TableTraining.vue'
import Pagination from '~/components/shared/Pagination.vue'
import _cloneDeep from 'lodash/cloneDeep';
import SearchTraining from '~/components/shared/training_session/SearchTraining.vue';
export default {
    components: {
        Pagination,
        SearchTraining,
        TableTraining
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

        emitTrainingSession (value) {
            this.$emit('addTraining', value)
        },
        
    }
}
</script>