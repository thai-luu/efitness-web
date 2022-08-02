<template>
    <el-tabs @tab-click="changeFoods" type="border-card">
            <el-tab-pane label="System Food" ></el-tab-pane>
            <el-tab-pane label="My Food" ></el-tab-pane>
    </el-tabs>
</template>
<script>
import _assign from 'lodash/assign'
export default {
    props: {
        tab: String
    },
    data () {
        return {
            tabIndex: ''
        }
    },
    methods: {
        async changeFoods (value) {
            await this.$emit('changeTab',this.tabIndex)
            this.$router.push({
                query: _assign({}, this.$route.query, {
                    ['sys']: value.index,
                }),
            })
            

    }
    },
    watch :{
        tab () {
            this.tabIndex = this.tab
        }
    },

    mounted () {
        this.tabIndex = this.tab
    }
}
</script>