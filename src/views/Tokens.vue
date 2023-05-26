<script>
import QACodeAddFunds from '../components/static/AddFunds.vue';
import Table from '../components/static/Table.vue';
export default {
    props: {
        store: Object,
    },
    data() {
        return {
            design: {
                showIcon: true,
                grid: "1.5fr 1fr 1fr",
                columns: ['Token', 'Price / 24hr %', 'Balance'],
                template: 'tokens',
            },
            tokens: [
                {
                    thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tXNYaJZUHNddtcvDz8w-U2kQM_gbZsUeqA&usqp=CAU",
                    label: "Cardano",
                    address: "tADA",
                    currentPrice: "0.376",
                    variation: "2.43",
                    balance: "8804.51",
                    last24HoursVariation: [0.710, 0.945, 0.715, 0.556, 0.431, 0.500, 0.777, 0.406, 0.698, 0.485, 0.896, 0.453, 0.823, 0.886, 0.409, 0.701, 0.732, 0.623, 0.844, 0.597, 0.412, 0.529, 0.497, 0.723, 0.788],
                },
                {
                    thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb14_Ix10ND-gRhOBTdPVPrdwdZ-sjyyOMaw&usqp=CAU",
                    label: "Lace 1",
                    address: "L1",
                    currentPrice: "3.376",
                    variation: "-1.43",
                    balance: "1806.08",
                    last24HoursVariation: [5.587, 7.654, 4.118, 6.289, 4.843, 8.568, 8.829, 4.679, 8.241, 4.452, 4.799, 4.125, 4.845, 8.888, 3.979, 7.583, 9.791, 6.046, 6.331, 4.995, 3.989, 3.481, 6.227, 6.658, 3.675],
                },
                {
                    thumb: "https://cryptologos.cc/logos/cardano-ada-logo.png",
                    label: "Cardano 2",
                    address: "tADA2",
                    currentPrice: "0.376",
                    variation: "2.43",
                    balance: "8804.51",
                    last24HoursVariation: [0.546, 2.320, 1.578, 0.902, 2.274, 1.451, 0.708, 1.725, 0.672, 1.783, 1.298, 2.789, 0.925, 0.533, 1.979, 2.512, 0.516, 0.932, 2.874, 2.620, 0.830, 2.175, 1.145, 1.687, 1.941],
                },
                {
                    thumb: "https://pbs.twimg.com/profile_images/1534535126318817282/Jb8Go2sm_400x400.jpg",
                    label: "Lace 2",
                    address: "L2",
                    currentPrice: "3.376",
                    variation: "14.43",
                    balance: "1806.08",
                    last24HoursVariation: [3.671, 3.768, 3.587, 3.084, 4.188, 3.764, 4.067, 4.253, 4.080, 3.429, 4.219, 3.599, 3.835, 2.730, 2.811, 4.276, 3.212, 4.385, 4.456, 4.501, 4.382, 2.689, 2.960, 3.754, 3.782],
                },
            ]
        }
    },
    methods: {
        openSidedrawer(item) {
            this.store.set({ key: 'sidedrawerVisible', value: true })
        },
        standardNumberFormat(number) {
            return "" + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        simpleNumberFormat(number) {
            return "" + number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    components: {
        QACodeAddFunds,
        Table,
    }
}
</script>

<template lang="pug">
.tokens
    h1.animated.fadeInUp
        span Tokens
        span.counter 
            span (
            number(
                    ref="walletBalance"
                    :from="0"
                    :to="tokens.length"
                    :format="simpleNumberFormat"
                    :duration="2"
                    :delay="1"
                    easing="Power1.easeOut"
                )
            span )
    //- QACodeAddFunds/
    .balance.animated.fadeInUp.delay-0-8s
        .info-label
            h6 Total wallet balance
            .icon 
                <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="h2F_3zS1iuR_cDZ_XOEP"><path d="M11 14h-1v-4H9m1-4h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        .balance-amount
            .amount
                number(
                    ref="walletBalance"
                    :from="0"
                    :to="3315.16"
                    :format="standardNumberFormat"
                    :duration="2"
                    :delay="1"
                    easing="Power1.easeOut"
                )
            .coin USD
    Table(
        :design="design"
        :data="tokens"
        :store="store"
    )/
</template>

<style lang="scss" scoped>
.tokens{
    display: grid;
    .balance{
        .info-label{
            display: grid;
            flex-wrap: nowrap;
            justify-content: left;
            align-content: center;
            grid-template-columns: auto auto;
            gap: 10px;
            .icon{
                place-self: center;
            }
        }
        .balance-amount{
            display: grid;
            flex-wrap: nowrap;
            justify-content: left;
            align-content: center;
            grid-template-columns: auto auto;
            gap: 10px;
            margin-bottom: 20px;
            .amount{
                font-size: 54px;
                font-weight: bold;
            }
            .coin{
                font-size: 24px;
                font-weight: bold;
                color: var(--textColorSecondary);
                display: grid;
                height: 100%;
                align-items: end;
                margin-top: -12px;
            }
        }
    }
}
</style>