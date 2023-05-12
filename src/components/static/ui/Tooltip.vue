<script>
export default {
    data() {
        return {}
    },
    props: {
        icon: String,
        label: String,
        position: String,
        visibility: Boolean,
    },
    methods: {

    }
}
</script>
<style lang="scss">
.tooltip{
    position: absolute;
    .tooltip-content{
        height: auto;
        z-index: 1;
        margin-top: -60px;
        margin-left: calc(-50% - 33px);
        display: grid;
        justify-content: center;
    }
    .icon-tooltip{
        //
    }
    .label-tooltip{
        width: auto;
        padding: 10px;
        background-color: var(--bgCard);
        box-shadow: var(--shadow);
        border-radius: 12px;
        max-width: 300px;
        white-space: nowrap;
        text-align: center;
    }
}
</style>
<template lang="pug">
.tooltip(v-if="visibility")
    .tooltip-content.animated.fadeInUp
        .icon-tooltip(v-html="icon")
        .label-tooltip(v-html="label")
</template>