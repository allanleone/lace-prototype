<script>
export default {
    props: {
        store: Object,
    },
    data() {
        return {
            activeTab: 0,
            activeTabSlippage: 0.25,
            slippageExpanded: false,
            swapDataFrom: [
                {
                    name: "ADA",
                    address: "ADA",
                    balance: 1400,
                    amount: 1,
                    cost: 0.254,
                    thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tXNYaJZUHNddtcvDz8w-U2kQM_gbZsUeqA&usqp=CAU",
                    ico: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tXNYaJZUHNddtcvDz8w-U2kQM_gbZsUeqA&usqp=CAU",
                    type: "token",
                    hotSwap: false,
                },
            ],
            swapDataTo: [
                {
                    name: "Select",
                    address: "Select",
                    balance: 0,
                    amount: 0,
                    cost: 0,
                    thumb: "https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Menu-512.png",
                    ico: "https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Menu-512.png",
                    type: "token",
                    hotSwap: false,
                },
                // {
                //     name: "tADA2",
                //     address: "tADA2",
                //     balance: 804.51,
                //     amount: 1,
                //     cost: 0.376,
                //     thumb: "https://cryptologos.cc/logos/cardano-ada-logo.png",
                //     ico: "https://cryptologos.cc/logos/cardano-ada-logo.png",
                //     type: "token",
                //     hotSwap: false,
                // },
            ],
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
        swapTokenFrom(a, st, type) {

            // console.log(a, t)

            let t;

            if (st) {
                if (!st.type) {
                    st.type = type;
                }
            }

            if (st.type == "nft") {
                t = {
                    name: st.label ? st.label : st.address,
                    address: st.label ? st.label : st.address,
                    balance: st.balance,
                    amount: 1,
                    cost: st.aproxPrice,
                    ico: st.thumb,
                    thumb: st.thumb,
                    type: "nft",
                    hotSwap: false,
                }
            }
            if (st.type == "token") {
                t = {
                    name: st.address,
                    address: st.address,
                    balance: st.balance,
                    amount: 1,
                    cost: st.currentPrice,
                    ico: st.thumb,
                    thumb: st.thumb,
                    type: "token",
                    hotSwap: false,
                }
            }

            this.swapDataFrom.forEach((g, i) => {
                if (g.name == a.name) {
                    this.swapDataFrom[i] = t
                }
            })
        },
        swapTokenTo(a, st, type) {

            // console.log(a, t)

            let t;

            if (st) {
                if (!st.type) {
                    st.type = type;
                }
            }

            if (st.type == "nft") {
                t = {
                    name: st.label ? st.label : st.address,
                    address: st.label ? st.label : st.address,
                    balance: st.balance,
                    amount: 1,
                    cost: st.aproxPrice,
                    ico: st.thumb,
                    thumb: st.thumb,
                    type: "nft",
                    hotSwap: false,
                }
            }
            if (st.type == "token") {
                t = {
                    name: st.address,
                    address: st.address,
                    balance: st.balance,
                    amount: 1,
                    cost: st.currentPrice,
                    ico: st.thumb,
                    thumb: st.thumb,
                    type: "token",
                    hotSwap: false,
                }
            }

            this.swapDataTo.forEach((g, i) => {
                if (g.name == a.name) {
                    this.swapDataTo[i] = t
                }
            })
        }
    },
    components: {

    },
    created(){
        // return console.log("D", this.store.get("storedTrading"))
        if(this.store.get("storedTrading") != null){
            this.swapDataFrom.length = 0;
            const d = this.store.get("storedTrading");
            let l = {
                name: d.name,
                address: d.address,
                balance: d.balance,
                amount: d.amount,
                cost: d.cost,
                thumb: d.thumb,
                ico: d.ico,
                type: d.type,
                hotSwap: false,
            }
            this.swapDataFrom.push(d);
        }
    },  
    mounted(){    

    }
}
</script>

<template lang="pug">
.activity
    h1.animated.fadeInUp 
        span Trading
    .tabs-a.animated.fadeInUp.delay-0-5s
        .tab-a(@click="activeTab = 0", :class="activeTab == 0 ? 'active' : ''") Swap
        .tab-a(@click="activeTab = 1", :class="activeTab == 1 ? 'active' : ''") Buy & Sell
        .tab-a(@click="activeTab = 2", :class="activeTab == 2 ? 'active' : ''") Activity
    
    .swap.animated.toggleInUp.delay-0-8s(v-if="activeTab == 0")
        .transfer
            .orign
                .item(v-for="(asset, index) in swapDataFrom")
                    .coin(@click="asset.hotSwap = !asset.hotSwap; selectTokenSend = 1;", :class="asset.hotSwap ? 'active' : ''")
                        .name 
                            span.ico(:class="asset.type",:style="'background-image: url(' + (asset.ico ? asset.ico : asset.thumb) + ')'")
                                //- img(:src="asset.ico")
                            span.name-long {{ asset.address ? (asset.address.length > 20 ? asset.address.substr(0,17) + '...' : asset.address) : '' }}
                            span.chevron(:class="asset.hotSwap ? 'expanded' : ''")
                                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 5.33268L10.6667 9.99935L6 14.666" stroke="#3D3B39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        .balance 
                            span Balance: 
                            span
                                number(
                                        ref="walletBalance"
                                        :from="0"
                                        :to="asset.balance"
                                        :format="standardNumberFormat"
                                        :duration="1"
                                        :delay="0"
                                        easing="Power1.easeOut"
                                    )
                    .value
                        .amount
                            label
                                input(type="number", v-model="asset.amount")
                        .cost-usd 
                            span ≈ {{ asset.cost }} USD
                    // !
                    .modal-clickable.send-select-add-asset.animated.fadeIn(v-if="asset.hotSwap")
                        .list-tokens
                            .list-item-tkn(
                                v-for="t in this.store.get('tokens')"
                                @click.stop="swapTokenFrom(asset,t)"
                                :class="t.address == swapDataFrom[0].address ? 'selected' : ''"
                            )
                                .ico 
                                    img(:src="t.thumb")
                                .info 
                                    .network {{ t.label }}
                                    .name {{ t.address }}
                                .balance 
                                    .amount 
                                        number(
                                            ref="walletBalance"
                                            :from="0"
                                            :to="t.balance"
                                            :format="standardNumberFormat"
                                            :duration="2"
                                            :delay="1"
                                            easing="Power1.easeOut"
                                        )
                                    .conversion {{(t.currentPrice * t.balance).toFixed(2) }} USD
                    //- 
            .transfer-btn 
                button.white 
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.5 14L12.5 21M12.5 21L5.5 14M12.5 21L12.5 3" stroke="#3D3B39" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            .dest
                .item(v-for="(asset, index) in swapDataTo")
                    .coin(@click="asset.hotSwap = !asset.hotSwap; selectTokenSend = 1;", :class="asset.hotSwap ? 'active' : ''")
                        .name 
                            span.ico(:class="asset.type",:style="'background-image: url(' + (asset.ico ? asset.ico : asset.thumb) + ')'")
                                //- img(:src="asset.ico")
                            span.name-long {{ asset.address ? (asset.address.length > 20 ? asset.address.substr(0,17) + '...' : asset.address) : '' }}
                            span.chevron(:class="asset.hotSwap ? 'expanded' : ''")
                                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 5.33268L10.6667 9.99935L6 14.666" stroke="#3D3B39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        .balance 
                            span Balance: 
                            span
                                number(
                                        ref="walletBalance"
                                        :from="0"
                                        :to="asset.balance"
                                        :format="standardNumberFormat"
                                        :duration="1"
                                        :delay="0"
                                        easing="Power1.easeOut"
                                    )
                    .value
                        .amount
                            label
                                input(type="number", v-model="asset.amount")
                        .cost-usd 
                            span ≈ {{ asset.cost }} USD
                    // !
                    .modal-clickable.send-select-add-asset.animated.fadeIn(v-if="asset.hotSwap")
                        .list-tokens
                            .list-item-tkn(
                                v-for="t in this.store.get('tokens')"
                                @click.stop="swapTokenTo(asset,t)"
                                :class="t.address == swapDataTo[0].address ? 'selected' : ''"
                            )
                                .ico 
                                    img(:src="t.thumb")
                                .info 
                                    .network {{ t.label }}
                                    .name {{ t.address }}
                                .balance 
                                    .amount {{t.balance}}
                                    .conversion {{(t.currentPrice * t.balance).toFixed(2) }} USD
                    //- 

        .slippage
            .info-label 
                span Slippage
                span.icon 
                    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="h2F_3zS1iuR_cDZ_XOEP"><path d="M11 14h-1v-4H9m1-4h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            .perc
                number(
                    ref="walletBalance"
                    :from="0"
                    :to="activeTabSlippage"
                    :format="standardNumberFormat"
                    :duration="1"
                    :delay="0"
                    easing="Power1.easeOut"
                )
                span %
            .chevron-sli(
                :class="slippageExpanded ? 'expanded' : ''"
                @click="slippageExpanded = !slippageExpanded"
            )
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 9L12 16L5 9" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        .tabs-s(v-if="slippageExpanded")
            .tab(@click="activeTabSlippage = 0.25", :class="activeTabSlippage == 0.25 ? 'active' : ''") 0.25%
            .tab(@click="activeTabSlippage = 0.5", :class="activeTabSlippage == 0.5 ? 'active' : ''") 0.5%
            .tab(@click="activeTabSlippage = 1", :class="activeTabSlippage == 1? 'active' : ''") 1%
            .tab(@click="activeTabSlippage = 2.5", :class="activeTabSlippage == 2.5 ? 'active' : ''") 2.5%
            .tab(@click="activeTabSlippage = 5", :class="activeTabSlippage == 5 ? 'active' : ''") Custom
        .review-btn
            button.purple Review swap
    
</template>

<style lang="scss" scoped>
.activity{
    display: grid;
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
    .swap{
        margin: 30px auto;
        padding: 20px;
        border-radius: var(--radius);
        border: solid 1px var(--lightGrayPlus);
        width: 100%;
        position: relative;
        .transfer{
            position: relative;
        }
        .orign, .dest{
            background-color: var(--lightGray);
            border-radius: var(--radius);
            position: relative;
            padding: 30px;
            hr{
                opacity: .1;
            }
            .item{
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: auto auto;
                padding: 10px 0;
                border-bottom: solid 1px var(--lightGrayPlus);
                &:last-child{
                    border-bottom: none;
                }
                .coin{
                    display: grid;
                    align-content: center;
                    padding: 10px;
                    cursor: pointer;
                    &:hover{
                        background-color: var(--bgCard);
                        border-radius: var(--radius);
                    }
                    &.active{
                        background-color: var(--bgCard);
                        border-radius: var(--radius) var(--radius) 0 0;
                    }
                    .name{
                        font-size: 18px;
                        font-weight: bold;
                        align-items: center;
                        .name-long{
                            padding-left: 30px;
                        }
                        .ico{
                            margin: auto;
                            padding: 0px;
                            margin-right: 10px;
                            margin-top: 2px;
                            position: absolute;
                            width: 24px;
                            height: 24px;
                            background-size: cover;
                            border-radius: 100px;
                            overflow: hidden;
                            background-position: center center;
                            &.nft{
                                background-size: 120% !important;
                                border-radius: 5px !important;
                            }
                            img{
                                // height: auto;
                            }
                        }
                        .chevron{
                            display: inline-grid;
                            place-content: center;
                            padding: 3px 10px;
                            width: auto;
                            svg{
                                transition: transform .5s ease-in-out;
                                path{
                                    stroke: var(--textColorPrimary);
                                }
                            }
                            &.expanded{
                                svg{
                                    transform: rotate(90deg);
                                }
                            }
                        }
                    }
                    .balance{
                        color: var(--textColorSecondary);
                        font-size: 14px;
                        padding: 5px 0;
                    }
                }
                .modal-clickable{
                    grid-column: 1;
                    width: calc(200% - 40px);
                    max-height: 300px;
                    background-color: var(--white);
                    overflow-y: scroll;
                    overflow-x: hidden;
                    display: grid;
                    position: relative;
                    padding: 20px;
                    border-radius: var(--radius);
                    margin-top: -10px;

                    .amount{
                        opacity: 0;
                    }
                    .conversion{
                        opacity: 0;
                    }
                }
                .value{
                    .amount{
                        input{
                            width: 100% !important;
                            font-size: 20px !important;
                            text-align: right !important;
                            margin: 0 !important;
                            padding: 5px !important;
                            border-radius: 0px;
                        }
                    }
                }
                .cost-usd{
                    text-align: right;
                    color: var(--textColorSecondary);
                    font-size: 14px;
                    padding: 5px 0;
                }
            }
            .send-select-add-asset{
            .select-multiple{
                display: grid;
                grid-template-columns: 1fr 150px;
            }
            .tabs{
                display: grid;
                gap: 10px;
                grid-template-columns: 1fr 1fr;
                padding: 5px;
                background-color: var(--lightGrayPlus);
                border-radius: 12px;
                margin: 20px auto;
                width: calc(100% - 30px);

                .tab{
                    padding: 15px 10px;
                    border-radius: 12px;
                    text-align: center;
                    cursor: pointer;
                    &.active{
                        background-color: var(--white);
                    }
                }
            }
            label{
                position: relative;
                .ico{
                    position: absolute;
                    top: 0px;
                    left: 20px;
                }
                input{
                    padding-left: 50px;
                    margin: 0;
                }
            }
            .list-tokens {
                padding-top: 10px;
                .list-item-tkn{
                    display: grid;
                    grid-template-columns: 42px 1fr 1fr;
                    gap: 10px;
                    padding: 20px;
                    border-radius: var(--radius);
                    align-items: center;
                    margin: 5px 0;
                    border: solid 2px transparent;
                    transition: all .25s ease-in-out;
                    position: relative;
                    &:hover{
                        background: var(--lightGray);
                        cursor: pointer;
                    }
                    &.selected{
                        border: solid 2px transparent;
                        opacity: .25;
                    }
                    .ico{
                        width: 42px;
                        img{ width: 100%; border-radius: 100px;}
                    }
                    .amount{
                        color: var(--textColorPrimary);
                    }
                    .balance{
                        text-align: right;
                        color: var(--textColorSecondary);
                    }

                }
            }
            .list-nfts{
                .cards-space{
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    text-align: center;
                    gap: 10px;
                    .nft-card{
                        &:before{
                            content: '✔';
                            color: var(--white);
                            position: absolute;
                            width: 24px;
                            height: 24px;
                            background-color: var(--green);
                            border-radius: 100px;
                            left: 10px;
                            top: 10px;
                            opacity: 0;
                            z-index: 1;
                            display: grid;
                            place-content: center;
                            transition: opacity .5s ease-in-out;
                        }
                        &.selected{
                            border: solid 2px var(--green);
                            background-color: #2CB67D11;
                            .nft-thumb-image{
                                transform: scale(1.1) !important;
                                border-radius: 15px !important;
                            }
                            .poster{
                                opacity: .25;
                            }
                            &:before{
                                opacity: 1;
                            }
                        }
                        width: auto;
                        height: auto;
                        position: relative;
                        margin-bottom: 60px;
                        cursor: pointer;
                        padding: 10px;
                        border-radius: var(--radius);
                        transition: background-color .25s ease-in-out;
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
            }
        }
        }
        .orign{
            margin-bottom: 10px;
        }
        .transfer-btn {
            position: absolute;
            left: calc(50% - 25px);
            margin-top: -25px;
            z-index: 1;
            button{
                width: 50px;
                height: 50px;
                border: solid 1px var(--lightGrayPlus);
                cursor: default;
                &:hover{
                    box-shadow: none;
                }
            }
        }
        .review-btn{
            margin: 20px 0;
            button{
                width: 100%;
            }
        }
        .slippage{
            display: grid;
            grid-template-columns: 1fr auto 50px;
            align-items: center;
            .info-label {
                .icon{
                    padding: 5px;
                    display: inline-grid;
                }
            }
            .chevron-sli{
                display: grid;
                width: 30px;
                height: 30px;
                place-content: center;
                margin: 10px;
                border-radius: 5px;
                cursor: pointer;
                &:hover{
                    background-color: var(--lightGray);
                }
                svg{
                    transform: rotate(-0deg);
                    transition: all .25s ease-in-out;
                }
                &.expanded{
                    svg{
                        transform: rotate(-180deg);
                    }
                }
            }
        }
        .tabs-s{
            display: grid;
            gap: 10px;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            padding: 5px;
            background-color: var(--lightGrayPlus);
            border-radius: 12px;
            margin: 5px auto;
            width: calc(100% - 10px);

            .tab{
                padding: 15px 10px;
                border-radius: 12px;
                text-align: center;
                cursor: pointer;
                &.active{
                    background-color: var(--white);
                }
            }
        }
    }
}
</style>