<template>
    <van-empty description="页面不存在"></van-empty>
</template>

<script>
import { Empty } from 'vant';
export default {
    name: "NotFound",
    components: {
        [Empty.name]: Empty,
    }
}
</script>

<style scoped>

</style>
