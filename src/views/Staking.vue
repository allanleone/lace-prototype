<script>
import QACodeAddFunds from '../components/static/AddFunds.vue';
import Table from '../components/static/Table.vue';
import Input from '../components/static/ui/Input.vue';
//-
import PillsCategoryMenu from '../components/dappstore/PillsCategoryMenu.vue';
import StakingCard from '../components/static/StakingCard.vue';
import Toggle from '../components/static/ui/Toggle.vue'

export default {
    props: {
        store: Object,
    },
    data() {
        return {
            props: {
                store: Object,
            },
            design: {
                showIcon: true,
                grid: "2fr .5fr 1fr auto",
                columns: ['lace.labels.pool-name', 'lace.labels.ros', 'lace.labels.transaction-costs', 'lace.labels.total'],
                template: 'staking',
            },
            stakepools: [
                {
                    thumb: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%3E%3Cpath%20fill%3D%22%234c4c4c%22%20d%3D%22M9%206L12%203L15%206L12%209ZM18%203L21%206L18%209L15%206ZM21%2024L18%2027L15%2024L18%2021ZM12%2027L9%2024L12%2021L15%2024ZM3%2012L6%209L9%2012L6%2015ZM24%209L27%2012L24%2015L21%2012ZM27%2018L24%2021L21%2018L24%2015ZM6%2021L3%2018L6%2015L9%2018Z%22%2F%3E%3Cpath%20fill%3D%22%23ccc566%22%20d%3D%22M3%209L3%203L9%203ZM21%203L27%203L27%209ZM27%2021L27%2027L21%2027ZM9%2027L3%2027L3%2021Z%22%2F%3E%3Cpath%20fill%3D%22%23e5e2b2%22%20d%3D%22M9%209L15%209L15%2015L9%2015ZM10.5%2012.8L12.8%2015L15%2012.8L12.8%2010.5ZM21%209L21%2015L15%2015L15%209ZM17.3%2010.5L15%2012.8L17.3%2015L19.5%2012.8ZM21%2021L15%2021L15%2015L21%2015ZM19.5%2017.3L17.3%2015L15%2017.3L17.3%2019.5ZM9%2021L9%2015L15%2015L15%2021ZM12.8%2019.5L15%2017.3L12.8%2015L10.5%2017.3Z%22%2F%3E%3C%2Fsvg%3E",
                    label: "RETIR",
                    address: "pool12jhasjd3i4uhahsidha",
                    ros: "15",
                    cost: "1.25% + 120ADA",
                    saturation: "12.14"
                },
                {
                    thumb: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%3E%3Cpath%20fill%3D%22%2370cc66%22%20d%3D%22M12%203L15%206L12%209L9%206ZM21%206L18%209L15%206L18%203ZM18%2027L15%2024L18%2021L21%2024ZM9%2024L12%2021L15%2024L12%2027ZM6%209L9%2012L6%2015L3%2012ZM27%2012L24%2015L21%2012L24%209ZM24%2021L21%2018L24%2015L27%2018ZM3%2018L6%2015L9%2018L6%2021ZM6%209L3%206L6%203L9%206ZM21%206L24%203L27%206L24%209ZM24%2021L27%2024L24%2027L21%2024ZM9%2024L6%2027L3%2024L6%2021Z%22%2F%3E%3Cpath%20fill%3D%22%234c4c4c%22%20d%3D%22M11.4%2015a3.6%2C3.6%200%201%2C1%207.2%2C0a3.6%2C3.6%200%201%2C1%20-7.2%2C0%22%2F%3E%3C%2Fsvg%3E",
                    label: "RETIR",
                    address: "pool12jhasjd3i4uhahsidha",
                    ros: "15",
                    cost: "1.25% + 120ADA",
                    saturation: "12.14"
                },
                {
                    thumb: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%3E%3Cpath%20fill%3D%22%23eaeaea%22%20d%3D%22M9%203L15%203L15%209ZM21%203L21%209L15%209ZM21%2027L15%2027L15%2021ZM9%2027L9%2021L15%2021ZM3%209L9%209L9%2015ZM27%209L27%2015L21%2015ZM27%2021L21%2021L21%2015ZM3%2021L3%2015L9%2015Z%22%2F%3E%3Cpath%20fill%3D%22%23643db7%22%20d%3D%22M9%206L6%209L3%206L6%203ZM24%209L21%206L24%203L27%206ZM21%2024L24%2021L27%2024L24%2027ZM6%2021L9%2024L6%2027L3%2024Z%22%2F%3E%3Cpath%20fill%3D%22%239e84d6%22%20d%3D%22M15%209L15%2013L12%209ZM21%2015L17%2015L21%2012ZM15%2021L15%2017L18%2021ZM9%2015L13%2015L9%2018Z%22%2F%3E%3C%2Fsvg%3E",
                    label: "RETIR",
                    address: "pool12jhasjd3i4uhahsidha",
                    ros: "15",
                    cost: "1.25% + 120ADA",
                    saturation: "12.14"
                },
                {
                    thumb: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%3E%3Cpath%20fill%3D%22%234c4c4c%22%20d%3D%22M9%203L15%203L15%209ZM21%203L21%209L15%209ZM21%2027L15%2027L15%2021ZM9%2027L9%2021L15%2021ZM3%209L9%209L9%2015ZM27%209L27%2015L21%2015ZM27%2021L21%2021L21%2015ZM3%2021L3%2015L9%2015Z%22%2F%3E%3Cpath%20fill%3D%22%2386cc66%22%20d%3D%22M9%203L9%209L3%209ZM27%209L21%209L21%203ZM21%2027L21%2021L27%2021ZM3%2021L9%2021L9%2027ZM9%209L15%209L15%2010L12.5%2015L9%2015ZM21%209L21%2015L20%2015L15%2012.5L15%209ZM21%2021L15%2021L15%2020L17.5%2015L21%2015ZM9%2021L9%2015L10%2015L15%2017.5L15%2021Z%22%2F%3E%3C%2Fsvg%3E",
                    label: "RETIR",
                    address: "pool12jhasjd3i4uhahsidha",
                    ros: "15",
                    cost: "1.25% + 120ADA",
                    saturation: "12.14"
                },
            ],
            onStakes: [],
            activeTab: 1,
            advFilter: false,
        }
    },
    methods: {
        openSidedrawer(item) {
            this.store.set({ key: 'sidedrawerVisible', value: true })
        }
    },
    components: {
        QACodeAddFunds,
        Input,
        Table,
        //
        PillsCategoryMenu,
        StakingCard,
        Toggle,
    }
}
</script>

<template lang="pug">
.staking 
    .page-title
        h1.animated.fadeInUp
            span(v-html="'Staking'")
            span (WIP)
            span.counter ({{ onStakes.length }})
    //- QACodeAddFunds.add-funds(:store="store")/
    //- .search-stake-pools.animated.fadeInUp.delay-0-6s
        h3 
            span(v-html="store.translate('lace.labels.stake-pools')")
            span.count (2456)
        Input.search-staking(:placeholder="store.translate('lace.input-placeholders.search-by-id-or-name', true)")/
        Table.animated.fadeInUp.delay-0-8s(
            :design="design"
            :data="stakepools"
            :store="store"
        )/
    .tabs-a.animated.fadeInUp.delay-0-5s
        .tab-a(@click="activeTab = 0", :class="activeTab == 0 ? 'active' : ''") Overview
        .tab-a(@click="activeTab = 1", :class="activeTab == 1 ? 'active' : ''") Browse Pools


    //content
    .recommended-header
        h5 
            span Recommended 
            span.small ({{ this.store.get('poolRecommended').length }})
        button.tertiary 
            .icon 
                <svg style="transform: rotate(180deg)" class="feather feather-chevron-right" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"/></svg>
        button.tertiary 
            .icon 
                <svg class="feather feather-chevron-right" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"/></svg>
    .recommended-list 
        StakingCard(
            :store="store", 
            :items="this.store.get('poolRecommended').slice(0, 4)"
            :hoverEffect="true"
            :promoted="true"
        )/
    //- .recommended-showmore
        button.tertiary 
            .ico 
                <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"/></svg>
            .label Show More
    .more-header 
        h5 
            span Pools 
            span.small ({{ this.store.get('pools').length }})
        .decentralization 
            //- Toggle(
                    :store="store"
                    @click.stop=""
                    :status="this.store.theme == 'light' ? true : false"
                    labelOn="prototype.staking.decentralization-on"
                    labelOff="prototype.staking.decentralization-off"
                    tooltip="Turn on or off the lights 💡"
                    colorOn="var(--orange)"
                    colorOff="var(--accentPurple)"
                    iconSvgOn=''
                    iconSvgOff=''
                )/
        .advanced-filters
            button.tertiary(@click="advFilter = !advFilter")
                .label Advanced filters
                .ico(:style="advFilter ? 'transform: rotate(180deg); margin-top: -3px;' : ''")
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><polyline points="112 184 256 328 400 184" style="fill:none;stroke:#000;stroke-linecap:square;stroke-miterlimit:10;stroke-width:48px"/></svg>
            .adv-filter(v-show="advFilter")
                h5 Advanced Filters
                .item 
                    .label List Style
                    .toggle
                        span grid
                        span table
                .item 
                    .label List Density
                    .toggle
                        span 0
                        span 50
                        span 100
                .item 
                    .label Decentralization
                    .toggle
                        span on
                        span off 
                .item 
                    .label Sort by
                    .toggle
                        span sat
                        span cost 
                .item 
                    .label Saturation
                    .toggle
                        span 0
                        span 100
                .item 
                    .label Cost
                    .toggle
                        span 0
                        span 100
                .item 
                    .label Margin
                    .toggle
                        span 0
                        span 100
                .item 
                    .label Pledge
                    .toggle
                        span 0
                        span 100
                
    .search 
        Input.search-staking(:placeholder="store.translate('lace.input-placeholders.search-by-id-or-name', true)")/
    .pools 
        StakingCard(
            :store="store", 
            :items="this.store.get('pools').slice(0, 999)"
            :hoverEffect="true"
            :promoted="false"
        )/
</template>

<style lang="scss" scoped>
.staking{
    display: grid;
    .count{
        color: var(--textColorSecondary);
        font-size: var(--bodyFontSize);
        margin-left: 10px;
    }
    .search-staking{
        input{
            margin-top: 10px !important;
        }
        margin-bottom: 10px;
    }
    .tabs-a{
        width: 100%;
        // display: grid;
        align-items: center;
        border-bottom: solid 1px var(--lightGrayPlus);
        .tab-a{
            padding: 20px;
            display: inline-grid;
            width: auto;
            cursor: pointer;
            border-bottom: solid 4px transparent;
            transition: border .25s ease-in-out;
            &.active{
                font-weight: bold;
                border-bottom: solid 4px var(--orange);
            }
        }
    }
    //-
    .recommended-header{
        padding: 20px 0;
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 10px;
        button{
            padding: 0;
            border-radius: 100px;
            width: 40px;
            height: 40px;
            place-content: center;
            svg{
                width: 90%;
                height: 90%;
            }
            
        }
    }
    .recommended-showmore{
        padding: 20px;
        margin: auto;
        text-align: center;
        button{
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 10px;
        }
    }
    //
    .more-header {
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 20px;
        margin-top: 50px;
    }
    .advanced-filters{
        position: relative;
        button{
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 10px;
            border-radius: 100px;
            svg{
                width: 16px;
                height: 16px;
            }
        }
        .adv-filter{
            position: absolute;
            width: 220px;
            height: auto;
            min-height: 200px;
            top: 55px;
            right: 0px;
            background-color: var(--bgCard);
            box-shadow: var(--tinyShadow);
            z-index: 1;
            padding: 10px 30px;
            border-radius: var(--radius);
            h4,h5,h6{
                margin-bottom: 20px;
            }
            .item{
                display: grid;
                grid-template-columns: 1fr auto;
                font-size: 14px;
                span{
                    padding: 5px;
                    display: inline-flex;
                    justify-self: end;
                }
                .label{
                    text-align: left;
                }
                .toggle{
                    text-align: right;
                    display: block;
                    justify-items: end;
                }
            }
        }
    }
    span.small{
        font-size: 14px;
        color: var(--textColorSecondary);
    }
    .decentralization{
        display: grid;
        place-content: center;
        .toggle{
            height: 25px;
        }
    }
    .recommended-list {
        width: calc(100% - 0px);
        height: 65px;
        overflow-x: hidden;
        overflow-y: hidden;
        .dapp-card{
            // grid-template-columns: repeat(4, 25%);
            @media screen and (max-width: 668px) {
                width: calc(100% - 20px);
                grid-template-columns: repeat(2,50%);
            }
            @media screen and (min-width: 668px) and (max-width: 1023px) {
                width: calc(100% - 20px);
                grid-template-columns: repeat(3, 33.33%);
            }
            @media screen and (min-width: 1024px) and (max-width: 1280px) {
                width: calc(100% - 60px);
                grid-template-columns: repeat(4, 25%);
            }
            @media screen and (min-width: 1280px) and (max-width: 1439px) {
                width: calc(100% - 40px);
                grid-template-columns: repeat(3, 33.33%);
            }
            @media screen and (min-width: 1440px) {
                width: calc(100% - 60px);
                grid-template-columns: repeat(4, 25%);
            }
        }
    }
    .pools{
        .dapp-card{
            @media screen and (max-width: 668px) {
                grid-template-columns: repeat(2,50%);
            }
            @media screen and (min-width: 668px) and (max-width: 1023px) {
                grid-template-columns: repeat(3, 33.33%);
            }
            @media screen and (min-width: 1024px) and (max-width: 1280px) {
                grid-template-columns: repeat(4, 25%);
            }
            @media screen and (min-width: 1280px) and (max-width: 1439px) {
                grid-template-columns: repeat(3, 33.33%);
            }
            @media screen and (min-width: 1440px) {
                grid-template-columns: repeat(4, 25%);
            }
        }
        margin-bottom: 100px;
        width: calc(100% - 60px);
    }
}
</style>