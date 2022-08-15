<template>
    <div class="text-black">
        <!-- <div>System training session</div>
        <list-system-training :training-sessions="training_sessions" />
        <br> -->
        <div class="text-xl text-transform: uppercase font-bold">My training session</div>
        <table-training-manager 
            :training-sessions="training_sessions" 
            :currentPage="currentPage" 
            :total="total"
            :pageSize="pageSize"
        />
        <br>
        <el-button type="success" plain @click="create_training_session">Create training session</el-button>
    </div>
</template>
<script>
import TableTrainingManager from '~/components/user/TrainingSession/TableTrainingManager.vue'
import { indexProfile } from '~/api/training_session'
import { index as myIndex } from '~/api/user/training_session'
import ListSystemTraining from '~/components/training_session/ListSystemTraining.vue'
export default {
    async asyncData ({app, query}) {
        const training_sessions = await myIndex(app.$axios, query)
        
        return {
            training_sessions: training_sessions.data,
            total: training_sessions.meta.total,
            pageSize: training_sessions.meta.per_page,
            currentPage: training_sessions.meta.current_page
        }
    },

    data () {
        return {
            dialogVisible: false,
            training_session: {
                name: '',
                exercises: []
            }
        }
    },

    components : {
        TableTrainingManager
    },

    created () {
        console.log(this.training_sessions)
    },
    watchQuery: true,
    methods: {
        create_training_session() {
            this.$router.push(`/u/${this.$route.params.user}/training_session/create`)
        },
    }
    
}
</script>