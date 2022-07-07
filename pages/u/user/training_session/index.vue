<template>
    <div class="text-black">
        <div>System training session</div>
        <br>
        <div>My training session</div>
        <br>
        <el-button type="success" plain @click="create_training_session">Create training session</el-button>
    </div>
</template>
<script>
export default {
    methods: {
        create_training_session() {
            this.$router.push(`/u/${this.$route.params.user}/training_session/create`)
        }
    }
}
</script>