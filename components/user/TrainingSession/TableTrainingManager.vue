<template>
    <div>
        <search-training />
        <div class="flex flex-wrap">  
            <el-table
            :data="trainingSessions"
            style="width: 100%"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="Name"
                    >
                </el-table-column>
                <el-table-column
                    prop="desc"
                    label="Description"
                    >
                </el-table-column>
                <el-table-column
                    prop="calories"
                    label="Calories"
                    >

                </el-table-column>
                <el-table-column
                    prop="time"
                    label="Time"
                    >

                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="Operations"
                    width="120"
                >
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="small">Edit</el-button>
                    <el-button type="text" @click="deleteTraining" size="small">Delete</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <pagination v-bind="{ currentPage, total, pageSize }" />
        <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="create">Create</el-button> -->
            <el-button type="danger" plain @click="deleteAllTraining">Delete</el-button>
        </span>
    </div>
</template>
<script>
import SearchTraining from '~/components/shared/training_session/SearchTraining.vue';
import _cloneDeep from 'lodash/cloneDeep';
import Pagination from '~/components/shared/Pagination.vue'
export default {
    components: {
        SearchTraining,
        Pagination
    },

    props: {
        currentPage: Number,
        total: Number,
        pageSize: Number,
        trainingSessions: Array,
    },

    data () {
        return {
            multipleSelection: []
        }
    },

    created () {
        console.log(this.trainingSessions,'table')
    },

    methods: {
        deleteTraining () {

        },

        deleteAllTraining () {

        },

        edit(row) {
            this.$router.push(`training_session/${row.id}/edit`)
        },

        
        handleSelectionChange (value) {
            this.multipleSelection = value
        },

        create () {

        }


    }
}
</script>