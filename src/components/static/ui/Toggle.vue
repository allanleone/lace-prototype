<script>
import Tooltip from './Tooltip.vue'
export default {
    data() {
        return {
            tooltipIsHover: false,
        }
    },
    props: {
        status: Boolean,
        tooltip: String,
        labelOn: String,
        labelOff: String,
        iconSvgOn: String,
        iconSvgOff: String,
        colorOn: String,
        colorOff: String,
    },
    components: {
        Tooltip,
    },
}
</script>
<style lang="scss">
// style -> @/src/scss/components/toggle.scss
</style>
<template lang="pug">
.toggle
    .toggle-label 
        .on.animated.toggleInLeft(v-if="status") {{ status ? labelOn : labelOff }}
        .off.animated.toggleInRight(v-if="!status") {{ status ? labelOn : labelOff }}
    .info(v-if="tooltip.length > 0", @mouseenter="tooltipIsHover = true", @mouseleave="tooltipIsHover = false")
        Tooltip(:label="tooltip", :visibility="tooltipIsHover")/
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#6F7786" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    .switch(:class="status ? 'on' : 'off'")
        .switch-bg(:style="status ? ('background: ' + colorOn) :  ('background: ' + colorOff)")
            .switch-toggle
            .icon-on.animated.zoomIn.delay-0-5s(v-html="iconSvgOn")
            .icon-off.animated.zoomIn.delay-0-5s(v-html="iconSvgOff")
</template>