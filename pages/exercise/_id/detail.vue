<template>
    
</template>
<script>
import { show } from '~/api/exercise'
export default {
    async asyncData ({app,params}) {
        try {
            const {data : exercise } = await show(app.$axios,params.id)
            return { exercise: exercise}
        } catch (error) {
            return { exercise: [] }
        }
    }
}
</script>