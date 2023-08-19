<script lang="ts">

import Chart from '../components/widgets/Chart.vue'
import NetworkInfo from '../components/widgets/NetworkInfo.vue'
import AddressBook from '../components/widgets/NetworkInfo.vue'
import AboutYourWallet from '../components/widgets/AboutYourWallet.vue'
import AboutLace from '../components/widgets/AboutLace.vue'

//- DnD
import { GridLayout, GridItem } from 'grid-layout-plus'
//-----

export default {
    props: {
        store: Object,
    },
    data() {
        return {
            layout: [
                { x: 0, y: 0, w: 4, h: 3, i: 0 },
                { x: 0, y: 2, w: 2, h: 3, i: 1 },
                { x: 2, y: 2, w: 2, h: 3, i: 2 },
                { x: 0, y: 4, w: 2, h: 3, i: 3 },
            ],
            draggable: true,
            resizable: true,
            responsive: true,
        }
    },
    methods: {
    },
    components: {
         GridLayout,
         GridItem,
         NetworkInfo,
         AddressBook,
         AboutYourWallet,
         AboutLace,
    }
}
</script>

<template lang="pug">
.dashboard 
    h1.animated.fadeInUp Dashboard
    .grid 
        //- 
        GridLayout(
            v-model:layout="layout"
            :col-num="4"
            :row-height="120"
            is-draggable
            is-resizable
            vertical-compact
            use-css-transforms
        )
            GridItem(
                 v-for="item in layout"
                 :key="item.i"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
             ) 
                .resize-widget.animated.zoomIn(v-if="item.i == 0")
                    .move-icon 
                        <svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><title/><polyline points="176 112 256 32 336 112" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="255.98" x2="256" y1="32" y2="480"/><polyline points="176 400 256 480 336 400" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="400 176 480 256 400 336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="112 176 32 256 112 336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="32" x2="480" y1="256" y2="256"/></svg>
                    AboutYourWallet(:store=store,title="About Lace")/
                .resize-widget.animated.zoomIn.animated.zoomIn(v-if="item.i == 1")
                    .move-icon 
                        <svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><title/><polyline points="176 112 256 32 336 112" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="255.98" x2="256" y1="32" y2="480"/><polyline points="176 400 256 480 336 400" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="400 176 480 256 400 336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="112 176 32 256 112 336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="32" x2="480" y1="256" y2="256"/></svg>
                    NetworkInfo(:store=store,title="Network Info")/
                .resize-widget.animated.zoomIn(v-if="item.i == 2")
                    .move-icon 
                        <svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><title/><polyline points="176 112 256 32 336 112" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="255.98" x2="256" y1="32" y2="480"/><polyline points="176 400 256 480 336 400" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="400 176 480 256 400 336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="112 176 32 256 112 336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="32" x2="480" y1="256" y2="256"/></svg>
                    AddressBook(:store=store,title="Address Book")/
                .resize-widget.animated.zoomIn(v-if="item.i == 3")
                    .move-icon 
                        <svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><title/><polyline points="176 112 256 32 336 112" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="255.98" x2="256" y1="32" y2="480"/><polyline points="176 400 256 480 336 400" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="400 176 480 256 400 336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="112 176 32 256 112 336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="32" x2="480" y1="256" y2="256"/></svg>
                    AboutYourWallet(:store=store,title="About")/
        //- 
</template>

<style lang="scss" scoped>
.dashboard{
    display: grid;
    .grid{
        .resize-widget{
                height: 100%;
                overflow: hidden;
                background: transparent;
                position: relative;
                .move-icon {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    right: 20px;
                    top: 20px;
                    opacity: .25;
                    svg{
                        width: 100%;
                        height: 100%;
                    }
                }
            > div{
                margin: auto;
                width: calc(100% - 44px);
                height: calc(100% - 44px);
              h3{
                    font-size: 14px !important;
                    display: none !important;
                }
            }
        }
        .vgl-layout {
            --vgl-placeholder-bg: var(--vgl-placeholder-bg);
            --vgl-placeholder-opacity: 20%;
            --vgl-placeholder-z-index: 2;

            --vgl-item-resizing-z-index: 3;
            --vgl-item-resizing-opacity: 60%;
            --vgl-item-dragging-z-index: 3;
            --vgl-item-dragging-opacity: 100%;

            --vgl-resizer-size: 10px;
            --vgl-resizer-border-width: 2px;
        }
        .vgl-item--placeholder {
            z-index: var(--vgl-placeholder-z-index, 2);
            user-select: none;
            background-color: var(--vgl-placeholder-bg);
            opacity: var(--vgl-placeholder-opacity, 20%);
            transition-duration: 100ms;
            border-radius: 100px !important;
        }
        .vgl-layout {
            --vgl-placeholder-bg: var(--accentPurpleTransparent);
        }
        .vgl-layout::before {
            position: absolute;
            width: calc(100% - 5px);
            height: calc(100% - 5px);
            margin: 5px;
            content: '';
            border-radius: 10px;
            background-image:
                linear-gradient(to right,var(--accentPurpleTransparent) 1px,transparent 1px),
                linear-gradient(to bottom, var(--accentPurpleTransparent) 1px, transparent 1px);
            background-repeat: repeat;
            background-size: calc(calc(100% - 5px) / 12) 40px;
            display: none;
        }
    }
}
</style>