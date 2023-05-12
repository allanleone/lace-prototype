<script lang="ts">
import QACodeAddFunds from '../components/static/AddFunds.vue';
export default {
    data() {
        return {}
    },
    components: {
        QACodeAddFunds,
    }
}
</script>

<template lang="pug">
.tokens
    h1.animated.fadeInUp Tokens
    QACodeAddFunds/
</template>

<style lang="scss">
.tokens{
    display: grid;
}
</style>