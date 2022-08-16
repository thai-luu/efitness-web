<template>
<div class="container mx-auto">
    <div class="container">
        <h1 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Giáo án mẫu
            </h1>
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="lesson in lessons" :key="lesson.id">
                    <lesson-item :lesson="lesson"/>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>
<script>
import LessonItem from './LessonItem.vue'
export default {
  components: { LessonItem },
    props: {
        lessons: Array
    }
}
</script>