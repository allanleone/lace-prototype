<script>
import QACodeAddFunds from '../components/static/AddFunds.vue';
import Card from '../components/3d/Card.vue';
export default {
    props: {
        store: Object,
    },
    data() {
        return {
            nfts: this.store.get("nfts"),
        }
    },
    methods: {
        openSidedrawer(item){
            this.store.set({ key: 'sidedrawerVisible', value: true })
        }
    },
    components: {
        QACodeAddFunds,
        Card,
    }
}
</script>

<template lang="pug">
.nfts
    .page-title
        h1.animated.fadeInUp
            span NFTs
            span.counter ({{ nfts.length }})
        span.floating-add-button.animated.toggleInRight
            button
                span
                    .icon 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 13H15M12 10V16M3 17V7C3 5.89543 3.89543 5 5 5H11L13 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17Z" stroke="url(#paint0_linear_17397_113264)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="paint0_linear_17397_113264" x1="-0.293617" y1="2.4383" x2="25.9856" y2="4.93033" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient></defs></svg>
                    .label Create folder
    //- QACodeAddFunds/
    .cards-space
        .nft-card.animated.fadeInUp(
            v-for="(nft, i) in nfts", 
            :class="i < 9 ? 'delay-1-' + (i + 1) + 's' : 'delay-2s'"
            @click="openSidedrawer(nft)"
            )
            .poster
                .nft-thumb-image(:style="'background-image: url(' + nft.thumb +')'")
            .nft-title {{ nft.label }}
        Card(data-image="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=")
            h1(slot="header") Canyons
            p(slot="content") Lorem ipsum dolor sit amet, consectetur adipisicing elit.
</template>

<style lang="scss" scoped>
.nfts{
    .cards-space{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        text-align: center;
        gap: 10px;
        .nft-card{
            width: auto;
            height: auto;
            position: relative;
            margin-bottom: 60px;
            cursor: pointer;
            padding: 10px;
            border-radius: var(--radius);
            transition: background-color .25s ease-in-out;
            &:hover{

            }
            .poster{
                width: 100%;
                aspect-ratio: 1 / 1;
                position: relative;
                transition: all .5s ease-in-out;
                background: transparent;
                border-radius: var(--radius);
                .nft-thumb-image{
                    border-radius: var(--radius);
                    overflow: hidden;
                    box-shadow: var(--tinyShadow);
                    aspect-ratio: 1 / 1;
                    transition: background-size 1s ease-in-out;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                    background-position: 50% 50%;
                    background-size: auto 120%;
                    background-repeat: no-repeat;
                }
            }
            .nft-title{
                margin-top: 20px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: calc(100% - 20px);
                margin-left: 10px;
                margin-right: 10px;
                position: absolute;
            }
            &:hover{
                // background-color: var(--bgCardHover);
                z-index: 1;
                .nft-title{
                    // white-space: normal;
                }
            }
        }
    }
    .page-title{
        grid-template-columns: 1fr 300px;
        display: grid;
        align-content: center;
        z-index: 1;
        margin-bottom: 20px;
        .floating-add-button{
            float: right;
            display: block;
            position: relative;
            z-index: 1;
            align-self: center;
            justify-self: right;
            button{
                width: 180px;
                float: right;
                z-index: 1;
            }
        }
    }
}
</style>