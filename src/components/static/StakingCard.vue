<script>
import DAppStatus from '../dappstore/DappStatus.vue';
export default {
    props: {
        store: Object,    
        items: Object, 
        size: String,   
        hoverEffect: Boolean,
        promoted: Boolean,
    },
    data() {
        return {
            selected: [],
        }
    },
    components:{
        DAppStatus,
    },
    methods: {
        selectOrAddPool(p){
            let n = JSON.parse(JSON.stringify(p))
            n.id= Math.floor(Math.random() * (9999999999 - 1 + 1)) + 1
            n.hover = false;
            n.promoted = true;
            this.selected.push(n)
            this.store.set({ key: 'selectedPools', value: this.selected })
            p.hover = false;
            p.promoted = true;
            // document.querySelector("body").scrollTo({ top: 0, behavior: 'smooth' });
        },
        removePool(p){
             this.store.selectedPools.forEach((sp, i)=>{
                if(sp.id == p.id){
                    this.store.selectedPools.splice(i, 1)
                }
             })
        }
    },
    created(){
    },
    mounted(){

    }
}
</script>
<style lang="scss" scoped>
.dapp-card {

    --animationHoverDuration: .35s;
    --delayHover: .45s;
    display: grid;
    gap: 20px;
    .card{
        border-radius: var(--radius);
        border: solid 1px var(--bgCardBorder);
        padding: 30px 20px;
        max-width: calc(100% - 40px);
        min-width: calc(100% - 40px);
        width: calc(100% - 40px);
        position: relative;
        display: grid;
        gap: 20px;
        align-items: center;
        cursor: pointer;
        background-color: var(--bgCard);
        transition: background-color .25s ease-in-out;
        white-space: nowrap;
        // overflow: hidden;
        text-overflow: ellipsis;
        .desc{
            color: var(--textColorSecondary);
            font-size: 14px;
        }
        .grid{
            grid-template-columns: 1fr 45px;
            max-width: calc(100% - 0px);
            // min-width: calc(100% - 40px);
            width: calc(100% - 0px);
            position: relative;
            display: grid;
            gap: 15px;
            align-items: center;
            &.grid-hover{
                position: absolute;
                width: 100%;
            }
        }
        &:hover{
            background-color: var(--bgCardHover);
        }
        //- TYPES
        .hover{
            position: absolute;
            // background-color: var(--bgCard);
            // border: solid 1px var(--bgCardBorder);
            box-shadow: 0px 0px 0px transparent;
            padding: 20px;
            border-radius: var(--radius);
            top: -1px;
            left: -1px;
            z-index: 2;
            width: calc(100% - 40px);
            height: var(--h);
            // background-color: var(--bgCardHover);
            transition: background-color .25s ease-in-out;
            .grid{
                margin: 0 !important;
                bottom: 0 !important;
                margin-top: 3px !important;
                grid-template-columns: 1fr;
                hr{
                    padding: 0;
                    margin: 0;
                }
                .desc{
                    height: 70px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .data-card{
                    grid-template-columns: 1fr 50px;
                    // max-width: calc(100% - 0px);
                    // min-width: calc(100% - 40px);
                    width: calc(100% - 0px);
                    position: relative;
                    display: grid;
                    gap: 15px;
                    align-items: center;
                }
                .grid-item{
                    grid-template-columns: 50% 50%;
                    display: grid;
                    width: calc(100% - 16px);
                    margin: -3px 0;
                }
                .per{
                    color: var(--midGray);
                    text-align: right;
                }
            }
            //
            .row{
                opacity: 0;
                animation: fadeIn .45s ease-in-out forwards;
                animation-delay: .65s;
            }
            @keyframes fd {
                0%{opacity: 0;}
                100%{opacity: .15;}
            }
            hr{
                opacity: 0;
                animation: fd .45s ease-in-out forwards;
                animation-delay: .65s;
            }
            //
            &:hover{
                // background-color: var(--bgCardHover);
                
            }
            --topStart: 0;
            --topEnd: -160px;
            --h: 45px;
            --expandedHeight: 370px;
            @keyframes expandHover{
                0%{height: var(--h); top: var(--topStart); left:0; background-color: var(--bgCardHover);}
                100%{height: var(--expandedHeight); width: calc(100% - 20px); box-shadow: var(--tinyShadow); left: -10px; top: var(--topEnd); background-color: var(--bgCard);}
            }
            animation: expandHover var(--animationHoverDuration) ease-in-out forwards;
            animation-delay: var(--delayHover);
            .grid{
                margin-bottom: 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .short-desc{
                margin-top: 20px;
            }
            .certification-status{
                margin-top: 22px;
            }
            @keyframes dappNameAdjust {
                0%{ overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                100%{ overflow: hidden; text-overflow: ellipsis; white-space: wrap; max-height: var(--mht); }
            }
            .dapp-name{
                --mht: 40px;
                animation: dappNameAdjust .1s forwards;
                animation-delay: .5s;
                // white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;
            }
            .short-desc{
                --mht: 95px;
                max-height: var(--mht);
                margin-bottom: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .short-desc{
            white-space: wrap;
            align-self: flex-start;
            height: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            // margin: 20px auto;
        }
        //- TYPES
        .ico{
            width: 48px;
            height: 48px;
            border-radius: var(--radius);
            background-color: var(--midGray);
        }
        .info{
            display: grid;
            gap: 5px;
            position: relative;
            width: calc(100% - 0px);
            overflow: hidden;
            text-overflow: ellipsis;
            .row, .row.desc, .dapp-name{
                width: calc(100% - 0px);
                overflow: hidden;
                text-overflow: ellipsis;
                max-height: 20px;
            }
        }
        .row{
            position: relative;
        }
    }
    .promoted-tiny{

        // --radius: 8%;
        border: solid 1px transparent;
        position: relative;
        background-color: transparent;
        border-radius: var(--radius);
        animation: glowShadow 3.14s linear infinite;
        animation-delay: .5s;
        overflow: hidden;
        &:hover{
            background-color: transparent;
            overflow: visible;
            &:after, &:before{
                display: none;
                background-color: var(--bgCardHover);
            }
        }

        &::before {
            content: "";
            position: absolute;
            top: 0px;
            right: 0px;
            bottom: 0px;
            left: 0px;
            z-index: -2;
            background: conic-gradient(
                from 0deg,
                var(--bgCardBorder),
                var(--bgCardBorder),
                var(--accentPurpleTransparent),
                var(--bgCardBorder),
                var(--bgCardBorder),
            );
            background-clip: content-box;
            animation: glow 3.14s linear infinite;
            animation-delay: .5s;
        }
        &::after{
            content: "";
            position: absolute;
            top: 1px;
            right: 1px;
            bottom: 1px;
            left: 1px;
            z-index: -1;
            background: var(--bgCard);
            border-radius: var(--radius);
            transition: background-color .25s ease-in-out;
        }

        @keyframes glow {
            0% {
                transform: rotate(0deg) scale(3.5);
            }
            100% {
                transform: rotate(360deg) scale(3.5);
            }
        }
        --blurShadow: 20px;
        --collorIntensity: #7f5af011;
        --distanceMinus: -10px;
        --distancePlus: 10px;
        @keyframes glowShadow {
            0% {
                box-shadow: var(--distancePlus) var(--distanceMinus) var(--blurShadow) var(--collorIntensity) inset;
            }
            25%{
                box-shadow: var(--distancePlus) var(--distancePlus) var(--blurShadow) var(--collorIntensity) inset;
            }
            50%{
                box-shadow: var(--distanceMinus) var(--distancePlus) var(--blurShadow) var(--collorIntensity) inset;
            }
            75%{
                box-shadow: var(--distanceMinus) var(--distanceMinus) var(--blurShadow) var(--collorIntensity) inset;
            }
            100% {
                box-shadow: var(--distancePlus) var(--distanceMinus) var(--blurShadow) var(--collorIntensity) inset;
            }
        }
    }
    .promoted-border{
        border-color: var(--accentPurple);
        // background-color: var(--accentPurpleTransparent);
    }
    .percentage{
        .small{
            font-size: 14px;
            color: var(--textColorSecondary);
        }
        .badge{
            width: 8px;
            height: 8px;
            border-radius: 100px;
            background-color: var(--accentPurpleTransparent);
            margin-top: 6px;
            margin-left: -1px;
            &.red{background-color: red;}
            &.green{background-color: var(--green);}
            &.yellow{background-color: var(--orange);}
        }
        .metric{
            padding-left: 6px;
            font-size: 14px;
            color: var(--midGray);
        }
        
    }
    .bar{
        width: 100%;
        height: 5px;
        border-radius: 100px;
        position: relative;
        .bar-bg, .bar-progress{
            background-color: var(--lightGrayPlus);
            width: 100%;
            height: 100%;
            position: absolute;
            border-radius: 100px;
            z-index: 0;
        }
        .bar-progress{
            background-color: var(--green);
            width: 50%;
            border-radius: 100px;
            z-index: 1;
        }
    }
    .ctas{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        button{
            padding: 8px 20px !important;
            width: 100%;
            height: auto;
        }
    }
}
</style>
<template lang="pug">
.dapp-card

    //---- size "small"
    .card(
        v-for="(pool, i) in items"
        @mouseenter="pool.hover = true"
        @mouseleave="pool.hover = false"
        :class="(pool.promoted ? 'promoted-border' : '')"
    ) 
        .grid
            .info 
                .row
                    span.dapp-name(v-html="pool.metadata.ticker")
                .row
                    .bar 
                        .bar-progress(:style="'width:' + (5 + (pool.metrics.saturation * 100).toFixed(0)) + 'px;'")
                        .bar-bg
                        .bar-pct
                //- .row.desc
                    span.dapp-name(v-html="pool.metadata.description")
            .percentage
                .row 
                    span &nbsp;
                .row(style="display: grid; grid-template-columns: 5px 1fr")
                    //- .badge(:class="(pool.metrics.saturation * 100) < 2 ? ((pool.metrics.saturation * 100) < 5 ? 'yellow' : 'green') : 'green'")
                    span.metric {{(pool.metrics.saturation * 100).toFixed(2)}}%
        //- Hover
        .hover(
            v-show="pool.hover && hoverEffect"
            :class="(pool.promoted ? 'promoted' : '')"
            )
            .grid
                .row.data-card
                    .info 
                        .row
                            span.dapp-name(v-html="pool.metadata.name.substr(0, 15)")
                        //- .row.desc
                            span.dapp-name(v-html="pool.metadata.description")
                    .percentage
                        .row 
                            //- span.small Sat.
                        .row(style="display: grid; grid-template-columns: 5px 1fr")
                            //- .badge(:class="(pool.metrics.saturation * 100) < 2 ? ((pool.metrics.saturation * 100) < 5 ? 'yellow' : 'green') : 'green'")
                            //- span.metric {{(pool.metrics.saturation * 100).toFixed(2)}}%
                //- hr/
                .row.desc
                    span.dapp-name(v-html="pool.metadata.description.substr(0, 100) + '...'")
                //- hr/
                .row.ctas
                    button.purple(@click="selectOrAddPool(pool)", v-if="!pool.promoted") Add
                    button.purple(@click="removePool(pool)", v-if="pool.promoted") Remove
                    button.tertiary Details
                .row.grid-item
                    .label Saturation
                    .value(style="display: grid; place-content:center; grid-template-columns: 50% 20px;")
                        .bar
                            .bar-progress(:style="'width:50% !important;'")
                            .bar-bg
                            .bar-pct
                        .per
                            .number(style="position: absolute; margin-top: -8px; margin-left: 5px;") 50%
                .row.grid-item
                    .label Live Stake
                    .value.per 0.18%
                .row.grid-item
                    .label Pool margin
                    .value.per 1.15%
                .row.grid-item
                    .label Pledge
                    .value.per ₳ 7,343,390
                .row.grid-item    
                    .label Cost p/ epoch
                    .value.per ₳ 500
                .row.grid-item    
                    .label Blocks
                    .value.per 123,456
                .row.grid-item    
                    .label Rewards
                    .value.per ₳ 0.452512
        //- 
</template>