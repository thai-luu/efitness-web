<template>
    <el-dialog
        title="Training Sesion"
        :visible.sync="dialog"
        @close="offDialog"
        class="training-dialog"
    >
        <el-button :class="active === 1 ? 'active':''" @click="changeTab(1)">System training</el-button >
        <el-button :class="active === 0 ? 'active':''" style="margin-left:0px" @click="changeTab(0)">My training</el-button >
        <TableTraining 
            :training_sessions="training_sessions"
            :currentPage="currentPage" 
            :total="total"
            :pageSize="pageSize"
            @emitTraining="emitTrainingSession"
            @fetchExercise="fetchExercise"
            @offDialog="offDialog"
        />
</el-dialog>
</template>
<script>
import TableTraining from '~/components/user/TrainingSession/TableTraining.vue'
import Pagination from '~/components/shared/Pagination.vue'
import _cloneDeep from 'lodash/cloneDeep';
import _assign from 'lodash/assign'
import SearchTrainingDialog from '~/components/shared/training_session/SearchTrainingDialog.vue';
import { index as indexTrainingSession } from '~/api/user/training_session'
export default {
    components: {
        Pagination,
        SearchTrainingDialog,
        TableTraining
    },

    props: {
        //currentPage: Number,
        //total: Number,
        //pageSize: Number,
        //training_sessions: Array,
        dialogTrain: Boolean
    },

    async fetch() {
        const training_sessions = await indexTrainingSession(this.$axios, this.$route.query)
        this.training_sessions = training_sessions.data,
        this.total = training_sessions.meta.total,
        this.pageSize = training_sessions.meta.per_page,
        this.currentPage = training_sessions.meta.current_page
    },
    data () {
        return {
            training_sessions:[],
            total : null,
            pageSize : null,
            currentPage : null,
            dialog: false,
            active: 1
        }
    },

    watch: {
        dialogTrain () {
            this.dialog = this.dialogTrain
        }
    },

    methods: {
        async fetchExercise(search) {
            search.sys = this.active
            const training_sessions = await indexTrainingSession(this.$axios, search)
            this.training_sessions = training_sessions.data,
            this.total = training_sessions.meta.total,
            this.pageSize = training_sessions.meta.per_page,
            this.currentPage = training_sessions.meta.current_page
        },

        offDialog () {
            this.$emit('offDialogTraining', false)
        },
        async changeTab (value) {
            this.active = value
            const search= {
                sys: this.active
            }
            const training_sessions = await indexTrainingSession(this.$axios, search)
            this.training_sessions = training_sessions.data,
            this.total = training_sessions.meta.total,
            this.pageSize = training_sessions.meta.per_page,
            this.currentPage = training_sessions.meta.current_page
            // this.$router.push({
            //     query: _assign({}, this.$route.query, {
            //         ['sys']: value,
            //     }),
            // })
            
        },
        
        

        emitTrainingSession (value) {
            this.$emit('addTraining', value)
        },
        
    }
}
</script>
<style lang="scss">
    .training-dialog{
        .active {
            color: white;
            background-color: #67C23A;
        }
    }
</style>