<template>
    
</template>
<script>
import { index } from '~/api/lesson';
export default {
    async asyncData({app}){
        const {data: lessons} = await index(app.$axios)
    }
}
</script>