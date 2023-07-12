<script>
import LineChart from '../charts/LineTypeChart.vue'
import { useRouter } from 'vue-router'
export default {
    props: {
        store: Object,
        data: Object,
        status: Boolean,
        design: Object,
    },
    data() {
        return {
            // theme: this.store.get("theme"),
            route:  useRouter(),
        }
    },
    components: {
        LineChart,
    },
    methods:{
        tokenDetailsTrade(d){
            let r = this.route.push("trading");
            this.store.set({ key: 'storedTrading', value: d })
            setTimeout(()=>{
                this.$forceUpdate();
            }, 1000);
        },
        convertTimestap(d){
            const timestamp = d;
            const dateObj = new Date(timestamp);

            const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
            return dateObj.toLocaleTimeString(undefined, options).toUpperCase();
        },
        openSidedrawer(item) {
            this.store.set({ key: 'sidedrawerStorage', value: item })
            this.store.set({ key: 'sidedrawerVisible', value: true })
        },
        standardNumberFormat(number) {
            return "" + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        tokenPriceNumberFormat(number) {
            return "" + number.toFixed(4);
        },
        percentageNumberFormat(number) {
            return "" + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        tokenNumberFormat(number) {
            function toFixedIfNecessary(value, dp) {
                return +parseFloat(value).toFixed(dp);
            }
            return "" + toFixedIfNecessary(number);
        },
        checkToken(token){
            let r = true;
            this.store.get("wallets").forEach((w) => {
                if (w.active == false) {
                    if (w.network == token.network) {
                        r = false;
                    }
                } else if (token.balance <= 0) {
                    r = false;
                }
            })
            return r;
        }
    },
}
</script>
<style lang="scss">
.table{
    display: grid;
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    min-width: 335px;
    hr{
        opacity: .10;
        margin: 10px 0 30px 0;
    }
    .legal-source{
        font-size: 12px;
        a{
            color: var(--blue);
        }
    }
    .token-label{
        position: relative;
        margin: 10px 0;
        .ico{
            position: absolute;
            top: 20px;
            left: 20px;
        }
        input{
            padding-left: 50px;
            margin: 0;
            width: calc(100% - 80px);
        }
    }
    .table-row{
        display: grid;
        grid-template-columns: auto;
        padding: 20px 10px;
        gap: 20px;
        align-content: center;
        position: relative;
        cursor: pointer;
        border-radius: var(--radius);
        &:hover{
            background-color: var(--bgCardHover);
        }
        .table-col{
            display: grid;
            align-content: center;
        }
        .data-with-icon{
            display: grid;
            grid-template-columns: 60px 1fr;
            gap: 10px;
            &.without-icon{
                grid-template-columns: 1fr;
            }
            .thumb{
                width: 48px;
                height: 48px;
                overflow: hidden;
                // padding: 4px;
                border: solid 1px var(--bgCardBorder);
                border-radius: 100px;
                position: relative;
                span{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                }
                img, svg{
                    border-radius: 100px;
                    width: 100%;
                    height: auto;
                }
            }
            .label{
                color: var(--textColorPrimary);
            }
            .address{
                color: var(--textColorSecondary);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .label, .address{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .data-with-status{
            display: grid;
            grid-template-columns: 8px 1fr;
            gap: 10px;
            align-content: center;
            &.without-status{
                grid-template-columns: 1fr;
            }
            .status{
                width: 8px;
                height: 8px;
                background-color: #ccc;
                border-radius: 100px;
                display: inline-grid;
                margin-top: 6px;
                &.positive{
                    background-color: var(--green);
                }
                &.negative{
                    background-color: var(--orange);
                }
            }
        }
    }
    .positive{
        color: var(--green) !important;
    }
    .negative{
        color: var(--orange) !important;
    }
    .secondary{
        color: var(--textColorSecondary);
    }
    .primary{
        color: var(--textColorPrimary);
    }
    .chart-overlay{
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: var(--radius);
        z-index: 1;
    }
    .button-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        button{
            position: absolute;
            min-width: 120px;
            right: 10px;
            top: 20px;
            left: auto;
            z-index: 1;
        }
    }
    .table-header{
        &.table-row{
            color: var(--textColorSecondary);
            &:hover{
                background-color: transparent;
                cursor: default;
            }
        }
        .table-col{
            &:last-child{
                text-align: right;
            }
        }
    }
    @media screen and (max-width: 512px){
        width: calc(100% + 18px);
        min-width: auto;
        display: flex;
        grid-template-rows: 1fr;
        gap: 10px;
        padding: 20px 10px;
        margin: 0px -15px;
        .table-row{
            &:nth-child(2){
                margin-left: 10px;
            }
            &:last-child{
                margin-right: 15px;
            }
            &.table-header{
                display: none;
            }
            .data-stake{
                grid-template-columns: 40px 100px;
            }
            .table-col{
                width: 100%;
                width: 150px;
            }
            background-color: var(--bgCard);
            box-shadow: var(--tinyShadow);
            width: 150px;
            display: grid;
            grid-template-columns: 1fr;
        }
    }
}
</style>
<template lang="pug">
.table

    label.token-label.animated.fadeInUp.delay-1s(v-if="design.template == 'tokens'")
        input(type="text", placeholder="Search")
        .ico
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><path fill-rule="evenodd" clip-rule="evenodd" d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10Z" fill="url(#search_component_svg__a)"></path><defs><linearGradient id="search_component_svg__a" x1="-1.66" y1="-1.66" x2="27.643" y2="0.502" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"></stop><stop offset="1" stop-color="#FDC300"></stop></linearGradient></defs></svg>       
    
    // repeat columns from 'design' prop
    .table-header.table-row.animated.fadeInUp.delay-1s(
        :style="'grid-template-columns:' + design.grid + ';'"
        v-if="design.template != 'activity'"
    )    
        .table-col(v-for="d in design.columns")
            span {{ d }}

    // STAKING /////////////////////////////////////////////////////////////
    .table-body.table-row.animated.fadeInUp(
        v-if="design.template == 'staking'"
        v-for="(d, i) in data", 
        :style="'grid-template-columns:' + design.grid + ';'"
        :class="i > 9 ? 'delay-2s' : 'delay-1-' + (i + 1) + 's'"
        @click="openSidedrawer({action: 'staking', title: 'Staking'})"
    ) 
        // type 'full' (name + icon + address)
        .table-col
            .data-with-icon(:class="design.showIcon ? '' : 'without-icon'")
                .thumb(v-if="design.showIcon")
                    img(:src="d.thumb")
                .info
                    .label {{ d.label }}
                    .address {{ d.address }}
        
        // type 'ros' (string)
        .table-col
            span {{ d.ros }}%
        
        // type 'cost' (string)
        .table-col
            span {{ d.cost }}
    
        // type 'saturation' (label + status)
        .table-col
            .data-with-status
                .status(:class="d.saturation > 0 ? 'positive' : 'negative'")
                div {{ d.saturation }}%
    // STAKING /////////////////////////////////////////////////////////////
    
    
    // TOKENS //////////////////////////////////////////////////////////////
    .table-body.table-row.animated.fadeInUp(
        v-if="design.template == 'tokens'"
        v-for="(d, i) in data", 
        v-show="checkToken(d)"
        :style="'grid-template-columns:' + design.grid + ';'"
        :class="i > 9 ? 'delay-2s' : 'delay-1-' + (i + 1) + 's'"
        @click="openSidedrawer({action: 'token', title: 'Token details', value: d})"
        @mouseenter="d.overlay = true"
        @mouseleave="d.overlay = false"
    ) 
        // type 'full' (name + icon + address)
        .table-col
            .data-with-icon(:class="design.showIcon ? '' : 'without-icon'")
                .thumb(v-if="design.showIcon")
                    img(:src="d.thumb")
                .info
                    .label {{ d.label }}
                    .address {{ d.address }}
        
        // type 'price' (number)
        //.table-col(:style="'visibility: hidden;'")
        .table-col(:style="d.overlay ? 'visibility: hidden;' : ''") 
            div 
                number(
                    ref="tokenPercentage"
                    :from="0"
                    :to="d.currentPrice"
                    :format="tokenPriceNumberFormat"
                    :duration="2"
                    :delay="0"
                    easing="Power1.easeOut"
                )
                //- span {{ d.currentPrice }}
            div(:class="d.variation > 0 ? 'positive' : 'negative'") 
                span {{d.variation > 0 ? '+' : ''}}
                number(
                    ref="tokenPercentage"
                    :from="0"
                    :to="d.variation"
                    :format="standardNumberFormat"
                    :duration="2"
                    :delay="0"
                    easing="Power1.easeOut"
                )
        
        // type 'balance' (string)
        .table-col(:style="d.overlay ? 'visibility: hidden;' : ''") 
            div.right
                number(
                    ref="tokenPercentage"
                    :from="0"
                    :to="d.balance"
                    :format="tokenNumberFormat"
                    :duration="2"
                    :delay="0"
                    easing="Power1.easeOut"
                )
                span &nbsp;{{ d.address }}
            div.right.secondary 
                number(
                    ref="tokenPercentage"
                    :from="0"
                    :to="(d.balance * d.currentPrice)"
                    :format="standardNumberFormat"
                    :duration="2"
                    :delay="0"
                    easing="Power1.easeOut"
                )
                span &nbsp;USD
                //- {{ (Number(d.balance.replace(',','')) * Number(d.currentPrice)).toFixed(2) }} USD
    
        .chart-overlay.animated.fadeIn(v-if="d.overlay")
            LineChart(
                :mainData="d.last24HoursVariation"
                :currentPrice="d.currentPrice"
                :ref="'lineTokensChart_' + i"
            )/
        .button-overlay(
            v-if="d.overlay"
            @click.stop="tokenDetailsTrade(d)"
        )
            button.purple.animated.fadeIn Trade
    .raw-row.animated.fadeIn.delay-2s(
        v-if="design.template == 'tokens'"
    ) 
        .table-column 
            hr/
            .legal-source.right
                span Powered by 
                a(href="https://www.coingecko.com/", target="_blank") CoinGecko
    // TOKENS //////////////////////////////////////////////////////////////

    // ACTIVITY //////////////////////////////////////////////////////////////

    // timestamp
    .table-header.table-row.animated.fadeIn.delay-1s(
        v-for="(dt, id, indx) in data", 
        v-if="design.template == 'activity'"
        :class="indx > 9 ? 'delay-2s' : 'delay-1-' + (i + 1) + 's'"
        )
        .table-col
            span {{ id }}
        .table-col 
            //empty
            span

        .table-body.table-row.animated.fadeInUp(
            v-if="design.template == 'activity'"
            v-for="(d, i) in dt", 
            :style="'grid-template-columns:' + design.grid + ';'"
            :class="i > 9 ? 'delay-2s' : 'delay-' + indx + '-' + (i + 1) + 's'"
            @click="openSidedrawer({action: 'activity', title: 'Activity details', value: d})"
        ) 
            // type 'full' (name + icon + address)
            .table-col
                .data-with-icon(:class="design.showIcon ? '' : 'without-icon'")
                    .thumb(v-if="design.showIcon")
                        span(v-if="d.thumb == 'received'")
                            <svg width="1em" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><circle opacity="0.1" cx="24" cy="24" r="24" fill="#2CB67D"></circle><path d="M30.364 20.464v9.9m0 0h-9.9m9.9 0L17.636 17.636" stroke="#2CB67D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        span(v-if="d.thumb == 'delegation'")
                            <svg width="1em" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><circle opacity="0.1" r="24" transform="matrix(1 0 0 -1 24 24)" fill="#2CB67D"></circle><path d="m16 33 .335.67A.75.75 0 0 1 15.25 33H16Zm16 0h.75a.75.75 0 0 1-1.085.67L32 33Zm-8 0 .335.67a.75.75 0 0 1-.67 0L24 33Zm4-2-.335-.67a.75.75 0 0 1 .67 0L28 31Zm-8 0-.335-.67a.75.75 0 0 1 .67 0L20 31Zm.75-4a.75.75 0 0 1-1.5 0h1.5ZM28 22l.53-.53a.75.75 0 0 1 0 1.06L28 22Zm-2.47 3.53a.75.75 0 1 1-1.06-1.06l1.06 1.06Zm-1.06-6a.75.75 0 1 1 1.06-1.06l-1.06 1.06ZM30 15.75H18v-1.5h12v1.5ZM16.75 17v16h-1.5V17h1.5Zm14.5 16V17h1.5v16h-1.5Zm-7.585-.67 4-2 .67 1.34-4 2-.67-1.34Zm4.67-2 4 2-.67 1.34-4-2 .67-1.34Zm-12.67 2 4-2 .67 1.34-4 2-.67-1.34Zm4.67-2 4 2-.67 1.34-4-2 .67-1.34ZM18 15.75c-.69 0-1.25.56-1.25 1.25h-1.5A2.75 2.75 0 0 1 18 14.25v1.5Zm12-1.5A2.75 2.75 0 0 1 32.75 17h-1.5c0-.69-.56-1.25-1.25-1.25v-1.5ZM19.25 27v-1h1.5v1h-1.5ZM24 21.25h4v1.5h-4v-1.5ZM19.25 26A4.75 4.75 0 0 1 24 21.25v1.5A3.25 3.25 0 0 0 20.75 26h-1.5Zm5.22-1.53 3-3 1.06 1.06-3 3-1.06-1.06Zm3-1.94-3-3 1.06-1.06 3 3-1.06 1.06Z" fill="#2CB67D"></path></svg>
                        span(v-if="d.thumb == 'sent'")
                            <svg width="1em" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><circle opacity="0.1" cx="24" cy="24" r="24" fill="#2CB67D"></circle><path d="M20.465 17.636h9.9m0 0v9.9m0-9.9L17.635 30.364" stroke="#2CB67D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        span(v-if="d.thumb == 'self'")
                            <svg width="1em" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><circle opacity="0.1" r="24" transform="matrix(1 0 0 -1 24 24)" fill="#2CB67D"></circle><path d="M16.75 16a.75.75 0 0 0-1.5 0h1.5ZM16 21h-.75c0 .414.336.75.75.75V21Zm15.194 2.093a.75.75 0 1 0 1.488-.186l-1.488.186ZM21 21.75a.75.75 0 0 0 0-1.5v1.5ZM31.25 32a.75.75 0 0 0 1.5 0h-1.5Zm.75-5h.75a.75.75 0 0 0-.75-.75V27Zm-5-.75a.75.75 0 0 0 0 1.5v-1.5Zm-10.194-1.343a.75.75 0 1 0-1.488.186l1.488-.186ZM15.25 16v5h1.5v-5h-1.5Zm8.75.75a7.251 7.251 0 0 1 7.194 6.343l1.488-.186A8.751 8.751 0 0 0 24 15.25v1.5Zm-6.723 4.531A7.253 7.253 0 0 1 24 16.75v-1.5a8.753 8.753 0 0 0-8.114 5.469l1.39.562ZM16 21.75h.581v-1.5H16v1.5Zm.581 0H21v-1.5h-4.419v1.5ZM32.75 32v-5h-1.5v5h1.5Zm-2.027-5.281A7.253 7.253 0 0 1 24 31.25v1.5a8.753 8.753 0 0 0 8.114-5.469l-1.39-.562ZM32 26.25h-.581v1.5H32v-1.5Zm-.581 0H27v1.5h4.419v-1.5Zm-7.419 5a7.251 7.251 0 0 1-7.194-6.343l-1.488.186A8.751 8.751 0 0 0 24 32.75v-1.5Z" fill="#2CB67D"></path></svg>
                    .info
                        .label.bold {{ d.label }}
                        .address.secondary {{ convertTimestap(d.timestamp) }}
        
            // type 'bundle' (String)
            .table-col
                div.primary.bold
                    span(v-for="(b, bid) in d.bundle.slice(0, 2)")
                        span {{ b }} {{ (bid + 1) < d.bundle.length ? ', ' : '' }} {{ d.bundle.length > 2 ? '+' + (d.bundle.length - 2) : '' }}
                div {{ d.convertedTotal }} USD
        
    // ACTIVITY //////////////////////////////////////////////////////////////


</template>