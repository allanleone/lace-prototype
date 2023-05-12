<script lang="ts">
import QACodeAddFunds from '../components/static/AddFunds.vue';
export default {
    data() {
        return {}
    },
    methods: {

    },
    components: {
        QACodeAddFunds,
    }
}
</script>

<template lang="pug">
.dashboard 
    h1.animated.fadeInUp Dashboard
    QACodeAddFunds/
</template>

<style lang="scss">
.dashboard{
    display: grid;
}
</style>