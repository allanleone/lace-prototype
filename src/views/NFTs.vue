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
.nfts
    h1.animated.fadeInUp NFTs
    QACodeAddFunds/
</template>

<style lang="scss">
.nfts{
    display: grid;
}
</style>