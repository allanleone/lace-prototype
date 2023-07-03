<script>
import QACodeAddFunds from '../components/static/AddFunds.vue';
import Toggle from '../components/static/ui/Toggle.vue';
export default {
    props: {
        store: Object,
    },
    data() {
        return {
            theme: true,
        }
    },
    methods: {
        changeTheme(){
            if(this.theme){
                document.querySelector("html").classList.add("dark");
                document.querySelector("html").classList.remove("light");
                this.store.set({ key: 'theme', value: 'dark' })
                this.theme = false;
            }else{
                document.querySelector("html").classList.remove("dark");
                document.querySelector("html").classList.add("light");
                this.store.set({ key: 'theme', value: 'light' })
                this.theme = true;
            }
        },
        openSidedrawer(item) {
            this.store.set({ key: 'sidedrawerStorage', value: item })
            this.store.set({ key: 'sidedrawerVisible', value: true })
        },
    },
    components: {
        QACodeAddFunds,
        Toggle,
    }
}
</script>

<template lang="pug">
.settings
    h1.animated.fadeInUp Settings
    .list-settings
        h4.animated.fadeInUp Wallet
        .animated.fadeInUp.delay-0-1s
            .item-row(@click="openSidedrawer({action: 'network', title: 'Settings'})")
                span
                    p.bold Network 
                    p.secondary Add or remove networks and switch from mainnet to testnet
                .status
                    //- .bold Mainnet
                    .networks 
                        .chain(v-for="(n, i) in store.get('wallets')")
                            img(:src="n.icon")
                            //- span CA
            hr/
        .animated.fadeInUp.delay-0-2s
            .item-row
                span
                    p.bold Authorized DApps
                    p.secondary See and manage authorized DApps
                .status
                    .bold 
            hr/
        .animated.fadeInUp.delay-0-3s
            .item-row
                span
                    p.bold Your keys
                    p.secondary View and copy your public and staking keys
                .status
                    .bold 
            hr/
        .animated.fadeInUp.delay-0-4s
            .item-row
                span
                    p.bold Collateral
                    p.secondary Add and remove collateral in order to interact with smart contracts on Cardano
                .status
                    .bold Inactive
        h4.animated.fadeInUp.delay-0-5s Preferences
        .animated.fadeInUp.delay-0-5s
            .item-row
                span
                    p.bold Currency
                    p.secondary Select your preferred local currency
                .status
                    .bold USD
            hr/
        .animated.fadeInUp.delay-0-5s
            .item-row.w-toggle
                span
                    p.bold Theme
                    p.secondary Choose between light or dark for your workstation's theme
                .status
                    .bold 
                        .item.without-hover-effect
                            Toggle(
                                @click.stop="changeTheme()"
                                :status="theme ? true : false"
                                labelOn=" " 
                                labelOff=" "
                                tooltip="Change the main theme"
                                colorOn="var(--orange)"
                                colorOff="var(--accentPurple)"
                                iconSvgOn='<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.333c.46 0 .833.373.833.834V3a.833.833 0 0 1-1.667 0v-.833c0-.46.373-.834.834-.834ZM11.333 8a3.333 3.333 0 1 1-6.667 0 3.333 3.333 0 0 1 6.667 0ZM10.946 12.125l.59.589a.833.833 0 0 0 1.178-1.178l-.59-.59a.833.833 0 0 0-1.178 1.179ZM12.714 3.286a.833.833 0 0 1 0 1.178l-.59.59a.833.833 0 1 1-1.178-1.179l.59-.59a.833.833 0 0 1 1.178 0ZM13.833 8.833a.833.833 0 0 0 0-1.666H13a.833.833 0 1 0 0 1.666h.833ZM8 12.167c.46 0 .833.373.833.833v.833a.833.833 0 1 1-1.667 0V13c0-.46.373-.833.834-.833ZM3.875 5.054a.833.833 0 0 0 1.178-1.179l-.589-.59a.833.833 0 1 0-1.178 1.18l.589.589ZM5.053 12.125l-.589.589a.833.833 0 0 1-1.178-1.178l.589-.59a.833.833 0 0 1 1.178 1.179ZM3 8.833a.833.833 0 1 0 0-1.666h-.834a.833.833 0 0 0 0 1.666H3Z" fill="#fff"></path></svg>'
                                iconSvgOff='<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.307A6.277 6.277 0 0 1 5.694 2 6.279 6.279 0 1 0 14 10.307Z" fill="#fff"></path></svg>'
                            )/
        h4.animated.fadeInUp.delay-0-5s Security
        .animated.fadeInUp.delay-0-5s
            .item-row
                span
                    p.bold Show recovery phrase
                    p.secondary View the recovery phrase associated with your wallet
                .status
                    .bold
            hr/
        .animated.fadeInUp.delay-0-5s
            .item-row.w-toggle
                span
                    p.bold Analytics
                    p.secondary We'll collect anonymous analytics info from your browser extension to help us improve the quality and performance of Lace
                .status
                    .item.without-hover-effect
                        Toggle(
                            :status="theme ? true : false"
                            labelOn=" " 
                            labelOff=" "
                            tooltip="Change the main theme"
                            colorOn="var(--orange)"
                            colorOff="var(--accentPurple)"
                            iconSvgOn=" "
                            iconSvgOff=" "
                        )/
        h4.animated.fadeInUp.delay-0-5s Support
        .animated.fadeInUp.delay-0-5s
            .item-row
                span
                    p.bold FAQs
                    p.secondary Get the answers to our most frequently asked questions
                .status
                    .bold  
            hr/
        .animated.fadeInUp.delay-0-5s
            .item-row
                span
                    p.bold Help
                    p.secondary Create a support ticket
                .status
                    .bold
            h4 Legal
        .animated.fadeInUp.delay-0-5s
            .item-row
                span
                    p.bold Terms and conditions
                    p.secondary Read our terms of use
                .status
                    .bold
            hr/
        .animated.fadeInUp.delay-0-5s
            .item-row
                span
                    p.bold Privacy policy
                    p.secondary Read our privacy policy
                .status
                    .bold
            hr/
        .animated.fadeInUp.delay-0-5s
            .item-row
                span
                    p.bold Privacy Cookie policy
                    p.secondary Read our cookie policy
                .status
                    .bold
        h4.animated.fadeInUp.delay-0-5s Remove wallet
        .animated.fadeInUp.delay-0-5s
            .item-row.w-toggle
                span
                    p Removing it does not affect the wallet balance, and it can be restored at any time.
                .status
                    .bold 
                        button.red Remove wallet
        .padding(style="height: 50px;")
</template>

<style lang="scss">
.settings{
    display: grid;
    .list-settings{
        .toggle{
            .info, .toggle-label{
                svg{
                    display: none;
                }
            }
            .switch-bg{
                padding: 4px 0;
            }
            .switch-toggle{
                margin-top: 0px;
            }
        }
        h4{
            margin-top: 60px;
            margin-bottom: 20px;
        }
        hr{
            opacity: .15;
            margin: 20px auto;
        }
        .item-row  {
            display: grid;
            grid-template-columns: 1fr 150px;
            margin: 0px -10px;
            padding: 0px 20px;
            &:not(.w-toggle):hover{
                background-color: var(--lightGray);
                border-radius: var(--radius);
                cursor: pointer;
            }
            .secondary{
                color: var(--textColorSecondary);
            }
            .status{
                text-align: right;
                display: grid;
                align-items: center;
                color: var(--accentPurple);
            }
            .networks{
                white-space: nowrap;
                padding-right: 10px;
            }
            .chain{
                display: inline-grid;
                place-items: center;
                width: 24px;
                height: 24px;
                margin-top: 0px;
                background-color: var(--lightGrayPlus);
                border: solid 1px var(--lightGrayPlus);
                border-radius: 100px;
                font-size: 12px;
                overflow: hidden;
                margin-right: -10px;
                img{
                    width: 100%;
                }
            }
        }
        p:not(.bold){
            max-width: 400px;
        }
    }
}
</style>