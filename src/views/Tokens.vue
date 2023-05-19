<script lang="ts">
import QACodeAddFunds from '../components/static/AddFunds.vue';
import Table from '../components/static/Table.vue';
export default {
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
                    balance: "8,804.51",
                },
                {
                    thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb14_Ix10ND-gRhOBTdPVPrdwdZ-sjyyOMaw&usqp=CAU",
                    label: "Lace 1",
                    address: "L1",
                    currentPrice: "3.376",
                    variation: "-1.43",
                    balance: "1,806.08",
                },
                {
                    thumb: "https://cryptologos.cc/logos/cardano-ada-logo.png",
                    label: "Cardano 2",
                    address: "tADA2",
                    currentPrice: "0.376",
                    variation: "2.43",
                    balance: "8,804.51",
                },
                {
                    thumb: "https://pbs.twimg.com/profile_images/1534535126318817282/Jb8Go2sm_400x400.jpg",
                    label: "Lace 2",
                    address: "L2",
                    currentPrice: "3.376",
                    variation: "14.43",
                    balance: "1,806.08",
                },
            ]
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
        span.counter ({{ tokens.length }})
    //- QACodeAddFunds/
    .balance.animated.fadeInUp.delay-0-8s
        .info-label
            h6 Total wallet balance
            .icon 
                <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="h2F_3zS1iuR_cDZ_XOEP"><path d="M11 14h-1v-4H9m1-4h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        .balance-amount
            .amount 3,315.16
            .coin USD
    Table(
        :design="design"
        :data="tokens"
    )/
</template>

<style lang="scss">
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