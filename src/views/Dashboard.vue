<script lang="ts">

import HomeChart from '../components/widgets/HomeChart.vue'
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
                { x: 0, y: 0, w: 2, h: 1.5, i: '0', static: false, resizable: true, draggable: true, },
                { x: 0, y: 0, w: 2, h: 1, i: '1',   static: false, resizable: true, draggable: true, },
                { x: 0, y: 0, w: 1, h: 1, i: '2',   static: false, resizable: true, draggable: true, },
                { x: 1, y: 1, w: 1, h: 1, i: '3',   static: false, resizable: false, draggable: true, },
            ],
            responsive: true,
            bounded: true,
            useCSSTransforms: true,
        }
    },
    methods: {
    },
    components: {
        HomeChart,
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
    h1.animated.fadeInUp Dashboard (WIP)
    .grid 
        //- 
        GridLayout(
            v-model:layout="layout"
            :col-num="2"
            :row-height="250"
            :is-bounded="bounded"
        )
            //- :is-draggable="draggable"
            //- :is-resizable="resizable"
            //- vertical-compact
            //- :use-css-transforms="useCSSTransforms"
            GridItem(
                 v-for="item in layout"
                 :key="item.i"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 :is-draggable="item.draggable"
                 :is-resizable="item.resizable"
                 :is-bounded="item.static"
                 :class="item.static ? 'static' : ''"
             ) 
                .resize-widget.animated.fadeIn(v-if="item.i == 0")
                    .move-icon 
                        span(v-if="!item.static")
                            <svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><title/><polyline points="176 112 256 32 336 112" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="255.98" x2="256" y1="32" y2="480"/><polyline points="176 400 256 480 336 400" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="400 176 480 256 400 336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="112 176 32 256 112 336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="32" x2="480" y1="256" y2="256"/></svg>
                        span.static(v-if="item.static")
                            <svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M21.436,7.586l-3.998-4.02c-0.752-0.756-2.063-0.764-2.83-0.006c-0.196,0.196-0.35,0.436-0.418,0.629  c-0.653,1.362-1.354,2.215-2.254,2.727l-0.217,0.105C10.751,7.506,9.434,8,7,8C6.734,8,6.479,8.052,6.234,8.152  C5.75,8.354,5.355,8.747,5.152,9.236c-0.199,0.484-0.199,1.041,0,1.525c0.104,0.249,0.25,0.471,0.435,0.651l3.235,3.235L5,20  l5.352-3.822l3.227,3.227c0.186,0.189,0.406,0.339,0.656,0.441C14.482,19.949,14.738,20,15.001,20s0.519-0.052,0.765-0.154  c0.498-0.205,0.883-0.592,1.08-1.078c0.103-0.242,0.155-0.507,0.155-0.768c0-2.436,0.494-3.752,0.978-4.721  c0.496-0.992,1.369-1.748,2.754-2.414c0.271-0.104,0.51-0.256,0.711-0.457C22.216,9.626,22.212,8.357,21.436,7.586z M16.188,12.387  c-0.819,1.643-1.188,3.37-1.195,5.604L7,10c2.139,0,3.814-0.335,5.396-1.084l0.235-0.105c1.399-0.699,2.468-1.893,3.388-3.834  l3.924,4.051C18.08,9.921,16.887,10.988,16.188,12.387z"/></svg>
                    HomeChart(:store=store,title="Total Wallet Balance")/
                .resize-widget.animated.fadeIn.animated.fadeIn(v-if="item.i == 1")
                    .move-icon 
                        span(v-if="!item.static")
                            <svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><title/><polyline points="176 112 256 32 336 112" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="255.98" x2="256" y1="32" y2="480"/><polyline points="176 400 256 480 336 400" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="400 176 480 256 400 336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="112 176 32 256 112 336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="32" x2="480" y1="256" y2="256"/></svg>
                        span.static(v-if="item.static")
                            <svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M21.436,7.586l-3.998-4.02c-0.752-0.756-2.063-0.764-2.83-0.006c-0.196,0.196-0.35,0.436-0.418,0.629  c-0.653,1.362-1.354,2.215-2.254,2.727l-0.217,0.105C10.751,7.506,9.434,8,7,8C6.734,8,6.479,8.052,6.234,8.152  C5.75,8.354,5.355,8.747,5.152,9.236c-0.199,0.484-0.199,1.041,0,1.525c0.104,0.249,0.25,0.471,0.435,0.651l3.235,3.235L5,20  l5.352-3.822l3.227,3.227c0.186,0.189,0.406,0.339,0.656,0.441C14.482,19.949,14.738,20,15.001,20s0.519-0.052,0.765-0.154  c0.498-0.205,0.883-0.592,1.08-1.078c0.103-0.242,0.155-0.507,0.155-0.768c0-2.436,0.494-3.752,0.978-4.721  c0.496-0.992,1.369-1.748,2.754-2.414c0.271-0.104,0.51-0.256,0.711-0.457C22.216,9.626,22.212,8.357,21.436,7.586z M16.188,12.387  c-0.819,1.643-1.188,3.37-1.195,5.604L7,10c2.139,0,3.814-0.335,5.396-1.084l0.235-0.105c1.399-0.699,2.468-1.893,3.388-3.834  l3.924,4.051C18.08,9.921,16.887,10.988,16.188,12.387z"/></svg>
                    NetworkInfo(:store=store,title="Network Info")/
                .resize-widget.animated.fadeIn(v-if="item.i == 2")
                    .move-icon 
                        span(v-if="!item.static")
                            <svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><title/><polyline points="176 112 256 32 336 112" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="255.98" x2="256" y1="32" y2="480"/><polyline points="176 400 256 480 336 400" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="400 176 480 256 400 336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="112 176 32 256 112 336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="32" x2="480" y1="256" y2="256"/></svg>
                        span.static(v-if="item.static")
                            <svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M21.436,7.586l-3.998-4.02c-0.752-0.756-2.063-0.764-2.83-0.006c-0.196,0.196-0.35,0.436-0.418,0.629  c-0.653,1.362-1.354,2.215-2.254,2.727l-0.217,0.105C10.751,7.506,9.434,8,7,8C6.734,8,6.479,8.052,6.234,8.152  C5.75,8.354,5.355,8.747,5.152,9.236c-0.199,0.484-0.199,1.041,0,1.525c0.104,0.249,0.25,0.471,0.435,0.651l3.235,3.235L5,20  l5.352-3.822l3.227,3.227c0.186,0.189,0.406,0.339,0.656,0.441C14.482,19.949,14.738,20,15.001,20s0.519-0.052,0.765-0.154  c0.498-0.205,0.883-0.592,1.08-1.078c0.103-0.242,0.155-0.507,0.155-0.768c0-2.436,0.494-3.752,0.978-4.721  c0.496-0.992,1.369-1.748,2.754-2.414c0.271-0.104,0.51-0.256,0.711-0.457C22.216,9.626,22.212,8.357,21.436,7.586z M16.188,12.387  c-0.819,1.643-1.188,3.37-1.195,5.604L7,10c2.139,0,3.814-0.335,5.396-1.084l0.235-0.105c1.399-0.699,2.468-1.893,3.388-3.834  l3.924,4.051C18.08,9.921,16.887,10.988,16.188,12.387z"/></svg>
                    AddressBook(:store=store,title="Address Book")/
                .resize-widget.animated.fadeIn(v-if="item.i == 3")
                    .move-icon 
                        span(v-if="!item.static")
                            <svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><title/><polyline points="176 112 256 32 336 112" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="255.98" x2="256" y1="32" y2="480"/><polyline points="176 400 256 480 336 400" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="400 176 480 256 400 336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="112 176 32 256 112 336" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" x1="32" x2="480" y1="256" y2="256"/></svg>
                        span.static(v-if="item.static")
                            <svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M21.436,7.586l-3.998-4.02c-0.752-0.756-2.063-0.764-2.83-0.006c-0.196,0.196-0.35,0.436-0.418,0.629  c-0.653,1.362-1.354,2.215-2.254,2.727l-0.217,0.105C10.751,7.506,9.434,8,7,8C6.734,8,6.479,8.052,6.234,8.152  C5.75,8.354,5.355,8.747,5.152,9.236c-0.199,0.484-0.199,1.041,0,1.525c0.104,0.249,0.25,0.471,0.435,0.651l3.235,3.235L5,20  l5.352-3.822l3.227,3.227c0.186,0.189,0.406,0.339,0.656,0.441C14.482,19.949,14.738,20,15.001,20s0.519-0.052,0.765-0.154  c0.498-0.205,0.883-0.592,1.08-1.078c0.103-0.242,0.155-0.507,0.155-0.768c0-2.436,0.494-3.752,0.978-4.721  c0.496-0.992,1.369-1.748,2.754-2.414c0.271-0.104,0.51-0.256,0.711-0.457C22.216,9.626,22.212,8.357,21.436,7.586z M16.188,12.387  c-0.819,1.643-1.188,3.37-1.195,5.604L7,10c2.139,0,3.814-0.335,5.396-1.084l0.235-0.105c1.399-0.699,2.468-1.893,3.388-3.834  l3.924,4.051C18.08,9.921,16.887,10.988,16.188,12.387z"/></svg>
                    AboutLace(:store=store,title="Network Info")/
        //- 
</template>

<style lang="scss">
.dashboard{
    display: grid;
    .grid{
        margin-bottom: 50px;
        .resize-widget{
                height: 100%;
                overflow: hidden;
                background: transparent;
                position: relative;
                .move-icon {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    right: 30px;
                    top: 30px;
                    opacity: .25;
                    svg{
                        width: 100%;
                        height: 100%;
                    }
                    .static{
                        svg{
                            width: 130%;
                            height: 130%;
                        }
                    }
                }
            > div{
                margin: auto;
                width: calc(100% - 44px);
                height: calc(100% - 44px);
              h3{
                    font-size: 16px !important;
                    margin-top: 0;
                    padding-top: 0;
                    //- display: none !important;
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
            border-radius: 16px !important;
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
        .vgl-item__resizer{
            opacity: .15;
            width: 20px;
            height: 20px;

            &:before{
                inset: 0 8px 8px 0;
                border-radius: 0px;
            }
        }
    }
}
</style>