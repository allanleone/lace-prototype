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
.toggle{
    display: grid;
    grid-template-columns: auto auto 50px;
    .toggle-label{

    }
    .info{
        width: 20px !important;
        height: 20px !important;
        position: relative;
        svg{
            width: 100% !important;
            height: 100% !important;
        }
    }
    .icon-on{

    }
    .icon-off{

    }
    .switch{
        width: 50px;
        height: 100%;
        .switch-bg{
            height: 100%;
            width: 100%;
            background: var(--gradient);
            border-radius: 100px;
            position: relative;
            transition: background .25s ease-in-out;
        }
        .switch-toggle{
            transition: all .5s ease-in-out;
            width: 20px;
            height: 20px;
            background-color: var(--white);
            position: absolute;
            border-radius: 100px;
            margin: 2px 0 2px 2px;
        }
        .icon-on, .icon-off{
            position: absolute;
            display: none;
            margin-top: 2px;
            svg{
                width: 16px !important;
                height: 16px !important;
            }
            &.visible{
                display: block;
            }
        }
        .icon-on{
            left: 4px;
        }
        .icon-off{
            right: 4px;
        }
        @keyframes turnOn {
            0%{transform: translateX(2px); width: 20px;}
            50%{width: 30px;}
            100%{transform: translateX(24px); width: 20px;}
        }
        @keyframes turnOff {
            0%{transform: translateX(24px); width: 20px;}
            50%{width: 30px;}
            100%{transform: translateX(2px); width: 20px;}
        }
        &.on{
            .switch-toggle{
                animation: turnOn .40s ease-in-out forwards;
            }
            .icon-on{
                display: block;
            }
        }
        &.off{
            .switch-toggle{
                animation: turnOff .40s ease-in-out forwards;
            }
            .icon-off{
                display: block;
            }
        }
    }
    &:hover{

    }
}
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