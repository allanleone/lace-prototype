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
        addOrRemove(p){
            p.effect = true;
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
        formatCash(n){
            n = Number(n)
            if (n < 1e3) return n;
            if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(2) + "K";
            if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(2) + "M";
            if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(2) + "B";
            if (n >= 1e12) return +(n / 1e12).toFixed(2) + "T";
        },
    },
    created(){
    },
    mounted(){

    }
}
</script>
<style lang="scss" scoped>
.dapp-table{
    table{
        width: 100%;
        text-align: left;
        border: none;
        border-color: transparent;
        border-spacing: 0;
        padding: 0;
        .header{
            color: var(--midGray);
            &:hover{
                background-color: transparent;
                cursor: default;
            }
        }
        .checkbox{
            width: auto !important;
        }
        td{
            border: none;
            border-color: transparent;
            padding: 10px 5px;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: auto;
        }
        tr{
            // border-radius: 20px !important;
            cursor: pointer;
            border: none;
            border-color: transparent;
            &:hover{
                background-color: var(--lightGray);
            }
            @keyframes fadeEffectUp {
                0%{opacity: 1; transform: translateY(0) scale(.95);background-color: var(--lightGray);}
                30%{opacity: 1; transform: translateY(0) scale(1.15); height: 20px; background-color: transparent;}
                80%{display: none;opacity: 0; transform: translateY(-300px) scale(.75); height: 0;  background-color: transparent;}
                100%{display: none;background-color: transparent; }
            }
            &.active{
                position: absolute;
                background-color: var(--lightGray);
                z-index: 1;
                &:hover{
                    background-color: transparent;
                }
                td{
                    min-width: 89px;
                    &:nth-child(1), &:nth-child(2){
                        min-width: auto;
                    }
                    &:nth-child(2){
                        min-width: 95px;
                    }
                    &:nth-child(3), &:nth-child(4),&:nth-child(5),&:nth-child(6),&:nth-child(7),&:nth-child(8),&:nth-child(9){
                        transform: scale(1) !important;
                    }
                    animation: fadeEffectUp .75s ease-in-out forwards;
                }
            }
        }
    }
}
</style>
<template lang="pug">
.dapp-table
    table
        tr.header
            td.checkbox
                input(type="checkbox", style="visibility: hidden;")
            td Ticker
            td Saturation
            td ROS
            td Cost
            td Margin
            td Blocks
            td Pledge
            td Live Stake
        tr(
            v-for="(pool, i) in items", 
            vv-show="(promoted || !pool.promoted)"
            :class="pool.effect && !promoted ? 'active' : ''"
            @mouseenter="pool.hover = true"
            @mouseleave="pool.hover = false"
            )
            td.checkbox
                input(type="checkbox", v-model="pool.promoted", @click="addOrRemove(pool)")
            td {{ pool.metadata.ticker }}
            td {{ pool.metrics.saturation.toFixed(2) }}
            td {{ (pool.metrics.saturation * 20.7).toFixed(2) }}%
            td {{ formatCash(Number(pool.cost.value)) }}
            td {{ formatCash(Number(pool.margin.numerator)) }}%
            td {{ formatCash(Number(pool.metrics.blocksCreated)) }}
            td {{ formatCash(Number(pool.pledge.value)) }}
            td {{ formatCash(Number(pool.metrics.livePledge.value)) }}
            //- td {{ Number(pool.metrics.live.value ? pool.metrics.live.value : 0).toFixed(2) }}
</template>