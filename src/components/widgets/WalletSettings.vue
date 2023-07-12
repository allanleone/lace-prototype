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
            transition: false,
            directionIn: 'fadeInLeft',
            directionOut: 'fadeOutLeft',
        }
    },
    components: {
        QR,
    },
    methods: {
        openSidedrawer(item) {
            this.store.set({ key: 'sidedrawerStorage', value: item })
            this.store.set({ key: 'sidedrawerVisible', value: true })
        },
        transitionEffect(dir){
            this.transition = true;
            console.log(dir)
            setTimeout(()=>{
                this.transition = false;
                if(dir == 1){
                    this.directionIn = 'fadeInLeft'
                    this.directionOut = 'fadeOutLeft'
                    this.index = (this.index > 0 ? (this.index - 1) : (this.index = 0))
                }else{
                    this.directionIn = 'fadeInRight'
                    this.directionOut = 'fadeOutRight'
                    this.index = (this.index >= (this.wallets.length - 1) ? (this.wallets.length - 1) : (this.index + 1))
                }
            }, 500)
        },
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
    overflow: hidden;
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
            overflow: hidden;
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
            &.disabled{
                opacity: .15;
            }
        }
        &.inactive{
            .qr-section{
                animation-duration: .25s !important;
                transition-duration: .25s !important;
                .address-qr{
                    opacity: .25;
                    filter: saturate(0);
                    &:before{
                        position: absolute;
                        width: auto;
                        height: auto;
                        content: 'disabled';
                        z-index: 1;
                        background-color: var(--bgCard);
                        border-radius: 100px;
                        padding: 10px;
                        left: calc(50% - 40px);
                        top: calc(50% - 20px);
                    }
                }
            }
        }
    }
    .qr-section{
        display: grid;
        grid-template-columns: 120px 1fr;
        gap: 20px;
        padding: 0 10px;
        cursor: pointer;
        &:hover{
            background-color: var(--lightGray);
            border-radius: var(--radius);
        }
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
    .addresses(v-if="index != null", :class="wallets[index] ? (wallets[index].active ? '' : 'inactive') : ''")
        .title-section
            .label Addresses 
            .chevron.inverted(
                @click="transitionEffect(1); "
                :class="index == 0 ? 'disabled' : ''"
            )
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5L16 12L9 19" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            .chevron(
                @click="transitionEffect(2);"
                :class="(index >= (wallets.length - 1)) ? 'disabled' : ''"    
            )
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5L16 12L9 19" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        .qr-section.animated(
            :class="transition == true ? directionOut : directionIn"
            @click="openSidedrawer({action: 'network', title: 'Settings'})"
        )
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