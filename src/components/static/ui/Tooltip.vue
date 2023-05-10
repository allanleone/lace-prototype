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
// style -> @/src/scss/components/toggle.scss
</style>
<template lang="pug">
.tooltip(v-if="visibility")
    .tooltip-content.animated.fadeInUp
        .icon-tooltip(v-html="icon")
        .label-tooltip(v-html="label")
</template>