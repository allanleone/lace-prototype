<script>
import QR from '../static/ui/QR.vue';
export default {
    props: {
        store: Object,
        title: String,
    },
    data() {
        return {
            // theme: this.store.get("theme"),
            index: null,
            wallets: [],
        }
    },
    components: {
        QR,
    },
    methods: {

    },
    mounted(){
        this.wallets = this.store.get("wallets");
        this.index = 0;
    }
}
</script>
<style lang="scss">
.wallet-settings {
    padding: 20px 20px;
    background: var(--bgCard);
    border: solid 2px var(--bgCardBorder);
    margin-top: 20px;
    border-radius: var(--defaultRadius);
    hr{
        opacity: .2;
        margin: 25px 0;
    }
    .wallet-title{
        display: grid;
        grid-template-columns: 32px 1fr 30px;
        gap: 10px;
        .thumb{
            display: grid;
            place-content: center;
            font-weight: 700;
            width: 32px;
            height: 32px;
            border-radius: 100px;
            background: var(--gradient);
            color: var(--white);
        }
        .name{
            align-items: center;
            display: grid;
            font-weight: bold;
        }
    }
    .addresses{
        .title-section{
            grid-template-columns: 1fr 20px 20px;
            display: grid;
            gap: 10px;
        }
        .label{
            color: var(--textColorSecondary);
        }
        .chevron{
            width: 24px;
            height: 24px;
            border-radius: 100px;
            padding: 0px;
            place-content: center;
            display: grid;
            cursor: pointer;
            &:hover{
                background-color: var(--lightGray);
            }
            svg{
                width: 16px;
                height: auto;
            }
            &.inverted{
                svg{
                    transform: rotate(180deg);
                }
            }
        }
    }
    .qr-section{
        display: grid;
        grid-template-columns: 120px 1fr;
        gap: 20px;
        .info{
            display: grid;
            align-items: center;
            .content{
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;    
            }
            .address{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;    
                text-overflow: ellipsis;
                color: var(--textColorSecondary);
                width: 100%;
            }
        }
        .address-qr{
            margin: 10px auto;
            max-width: 200px;
            position: relative;
            border: 2px solid transparent;
            color: var(--text-color-primary);
            padding: 5px;
            border-radius: var(--radius);
            background: linear-gradient(var(--bgCard), var(--bgCard)) padding-box,linear-gradient(to right, #ff92e1, #fdc300) border-box;
            .chain{
                display: grid;
                place-items: center;
                width: 30px;
                height: 30px;
                margin-top: 0px;
                background-color: var(--lightGrayPlus);
                border: solid 10px var(--bgCard);
                border-radius: 100px;
                overflow: hidden;
                font-size: 12px;
                position: absolute;
                top: calc(50% - 22px);
                left: calc(50% - 22px);
                border-radius: 100px;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
        }
    }
    .staking-status{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}
</style>
<template lang="pug">
.wallet-settings
    .wallet-title
        .thumb A
        .name Allan's wallet
        .settings.bold ...
    hr/
    .addresses(v-if="index != null")
        .title-section
            .label Addresses 
            .chevron.inverted(@click="index = (index > 0 ? (index - 1) : (index = 0))")
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5L16 12L9 19" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            .chevron(@click="index = (index >= (wallets.length - 1) ? (wallets.length - 1) : (index + 1))")
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5L16 12L9 19" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        .qr-section
            .address-qr
                .chain 
                    img(:src="wallets[index].icon")
                QR/
            .info
                .content
                    .name.bold 
                        span {{wallets[index].name}}
                        span.secondary   ({{(index + 1)}} of {{ wallets.length }})
                    .address {{wallets[index].addr}}
        //- .center {{(index + 1)}} of {{ wallets.length }}
    hr/
    .staking-status 
        .label Staking
        .status.bold.right Active

</template>