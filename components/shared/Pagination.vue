<template>
    <el-pagination
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-count="lastPage"
        :layout="layout"
        class="text-center mt-1"
        background
        @current-change="go"
        @size-change="size => go(currentPage, { limit: size })"
    />
</template>

<script>
    import _assign from 'lodash/assign'

    export default {
        props: {
            currentPage: {
                type: Number,
                default: 1,
            },
            total: Number,
            lastPage: {
                type: Number,
                default: 1,
            },
            queryParam: {
                type: String,
                default: 'page',
            },
            layout: {
                type: String,
                default: 'prev, pager, next, jumper',
            },
            pageSize: {
                type: Number,
                default: 10,
            },
        },

        methods: {
            async go(page, query) {
                const queryPage = this.to(page, query)
                this.$router.push(queryPage)

                this.$emit('changeData', queryPage)
            },

            to(page, params = {}) {
                const path = this.$route.path
                const nextParams = _assign({}, this.$route.query, params)
                const query = _assign({}, nextParams, { [this.queryParam]: page })

                return { path, query }
            },
        },
    }
</script>
