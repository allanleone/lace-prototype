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
                columns: ["lace.menu.tokens", 'lace.labels.price', 'lace.labels.balance'],
                template: 'tokens',
                walletBalanceAmount: 0,
            },
            tokens: this.store.get('tokens'),
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
        },
        checkBalanceDisabledNetworks(){
            let r = false;
            this.store.get("wallets").forEach((w)=>{
                if(w.active == false){
                    this.store.get("tokens").forEach((t)=>{
                        if(w.network == t.network){
                            if(t.balance > 0){
                                r = true;
                            }
                        }
                    })
                }
            })
            return r;
        },
        walletBalance(){
            let r = 0;
            this.store.get('tokens').forEach((t) => {
                r += (Number(t.balance) * Number(t.currentPrice));
            });
            this.walletBalanceAmount = r;
            return this.walletBalanceAmount;
        }
    },
    components: {
        QACodeAddFunds,
        Table,
    },
    created(){
    },
}
</script>

<template lang="pug">
.tokens
    h1.animated.fadeInUp
        span(v-html='store.translate("lace.menu.tokens")')
        span.counter 
            span (
            number(
                    ref="walletBalanceAmount"
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
                    ref="walletBalanceAmount2"
                    :from="0"
                    :to="walletBalance()"
                    :format="standardNumberFormat"
                    :duration="2"
                    :delay="1"
                    easing="Power1.easeOut"
                )
            .coin USD
        .increase-or-decreased
            span +
            number(
                    ref="walletBalanceAmount3"
                    :from="0"
                    :to="2.46"
                    :format="standardNumberFormat"
                    :duration="2"
                    :delay="1"
                    easing="Power1.easeOut"
                )
            span %
    .balance-on-other-networks.animated.fadeIn.delay-1s(v-if="checkBalanceDisabledNetworks()")
        div We have identified a positive balance with a previously disabled network. 
        div Please go to the Settings, then Networks for more information.
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
        .increase-or-decreased{
            font-size: 24px;
            font-weight: bold;
            color: var(--green);
            margin: -20px 0 20px 0;
        }
    }
    .balance-on-other-networks {
        padding: 20px;
        margin: 0px 0 20px 0;
        border-radius: var(--radius);
        background-color: var(--greenTranparent);
    }
}
</style>