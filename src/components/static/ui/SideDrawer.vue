<script>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import Input from '../ui/Input.vue'
import Toggle from '../ui/Toggle.vue';
import QR from './QR.vue';
export default {
    data() {
        return {
            router: useRouter().currentRoute.value.name,

            //address book
            addressBookName: "",
            addressBookWalletAddress: "",
            addressBookEditing: false,
            addressBookEditingTemporaryFields: {name: null, wallet: null},
            typeOfChain: null,
            animationChainDone: true,
            insertNetworkURLSettings: "",
            sendToThisAddress: "",
            globalSendAssets: [
                {
                    name: "ADA",
                    balance: 10000,
                    amount: 0,
                    cost: 50,
                    ico: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tXNYaJZUHNddtcvDz8w-U2kQM_gbZsUeqA&usqp=CAU",
                },
                {
                    name: "MATIC",
                    balance: 3000,
                    amount: 0,
                    cost: 150,
                    ico: "https://seeklogo.com/images/P/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png",
                },
            ]
            //////////////
            
        }
    },
    props: {
        store: Object,
    },
    components: {
        Input,
        QR,
        Input,
        Toggle,
    },
    methods: {
        close(){
             this.store.set({ key: 'sidedrawerVisible', value: false })

            // Work on this later 👍🏻
            //  window.localStorage.setItem("prototypeSaveFile", JSON.stringify(this.store.get("addressBookContacts")))

        },
        // Address Book
        addressBookAddContact(){
            this.store.pushItem({ key: 'addressBookContacts', value: {name: this.addressBookName , wallet: this.addressBookWalletAddress } })
            this.close()
        },
        addressBookEditContact(){
            this.addressBookEditingTemporaryFields.name = String(this.store.get('sidedrawerStorage').data.name);
            this.addressBookEditingTemporaryFields.wallet = String(this.store.get('sidedrawerStorage').data.wallet);
            this.addressBookEditing = true;
            this.checkTypeOfChain()
        },
        addressBookEditSaveContact() {
            this.addressBookEditing = false;
            this.store.get('sidedrawerStorage').data.name = this.addressBookEditingTemporaryFields.name;
            this.store.get('sidedrawerStorage').data.wallet = this.addressBookEditingTemporaryFields.wallet;
        },
        checkTypeOfChain(){
            this.typeOfChain = null;
            setTimeout(()=>{
                this.typeOfChain = 1;
                setTimeout(() => {
                    this.typeOfChain = 2;
                    // this.animationChainDone = true;
                }, 1000)
            }, 2000)
        },
        ///////////////
        // 
        // Settings
        insertNetworkURLSettingsFunc(){
            this.store.set({ key: 'settingsPage', value: 1 });
            this.close();
            this.store.pushItem({ key: 'wallets', value: 
                {
                    name: "Bitcoin",
                    type: "BTC",
                    addr: "addrajshdjashdjiah9a8sdua98sdu98asud9a8sud89asd",
                    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
                    expanded: false,
                    netSelection: 1,
                    active: true,
                }
            })
        },
        ////////////////
        //
        // Send
        showSendAddress(){
            let s = this.store.get("sidedrawerStorage");
            s.action = "send-address-book";
            this.store.set({ key: 'sidedrawerStorage', value: s })
        },
        showSendAddressDone(){
            let s = this.store.get("sidedrawerStorage");
            s.action = "send";
            this.store.set({ key: 'sidedrawerStorage', value: s })
        },
        setAddressToSend(addr){
            this.sendToThisAddress = addr;
            this.showSendAddressDone();
        },
        checkAddressBalance(){
            let r = false;
            this.globalSendAssets.forEach((g)=>{
                if(g.amount <= 0) r = "disabled"
            });
            return r;
        },
        ////////////////
    },
    mounted(){

        // Work on this later 👍🏻
        // if(localStorage.getItem('prototypeSaveFile') !== null && localStorage.getItem('prototypeSaveFile')  !== undefined){
        //     let s = JSON.parse(localStorage.getItem('prototypeSaveFile'))
        //     this.store.set({ key: 'addressBookContacts', value: s })
        // }

        switch(this.router){
            case "addressBook":
                // if(this.store.get("sidedrawerStorage").action == "add"){

                // }
            break;
        }
    },
}
</script>
<style lang="scss">
.sidedrawer{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    .sidedrawer-window{
        width: calc(665px - 40px);
        background-color: var(--bgCard);
        margin: 20px;
        position: absolute;
        right: 0;
        height: calc(100% - 40px);
        border-radius: var(--radius);
        z-index: 2;
        .window-header {
            width: calc(100% - 60px);
            padding: 20px 30px;
            top: 0;
            position: absolute;
            border-bottom: solid 1px var(--bgCardHover);
            grid-template-columns: 1fr 50px;
            &.with-back-button{
                grid-template-columns: 50px 1fr 50px;
            }
            display: grid;
            .title{
                text-align: center;
                display: grid;
                place-content: center;
                font-weight: bold;
                color: var(--textColorPrimary);
            }
        }
        .window-content {
            width: calc(100% - 60px);
            height: calc(100% - 270px);
            &.with-2-buttons{
                height: calc(100% - 328px);
            }
            &.no-buttons{
                height: calc(100% - 155px);
            }
            padding: 30px;
            position: absolute;
            margin-top: 80px;
            overflow-x: hidden;
            overflow-y: scroll;
            display: grid;
            .middle{
                display: grid;
                place-self: center;
                justify-self: left;
                width: 100%;
            }
        }
        .window-footer {
            width: calc(100% - 60px);
            padding: 30px;
            bottom: 0;
            position: absolute;
            border-top: solid 1px var(--bgCardHover);
            button{
                width: 100%;
                margin: 10px auto;
            }
        }

        // Settings
        .settings{

            .description, .desc{
                color: var(--textColorSecondary);
            }

            .warning{
                background-color: var(--warning);
                border-radius: var(--radius);
                padding: 20px;
                display: grid;
                grid-template-columns: 40px 1fr;
                align-items: center;
                margin-top: 20px;
                svg{
                    path{
                        stroke: var(--accentPurple);
                    }
                }
            }

            .wallets{
                .wallet{
                    display: grid;
                    grid-template-rows: auto auto;
                    border-radius: var(--radius);
                    border: solid 1px var(--lightGrayPlus);
                    margin: 20px auto;
                    .data-wallet{
                        display: grid;
                        grid-template-columns: 50px 1fr auto auto auto auto;
                        gap: 10px;
                        padding: 15px;
                        align-items: center;
                    }
                    &.add-custom{
                        display: grid;
                        grid-template-columns: 50px 1fr auto;
                        padding: 15px;
                        align-items: center;
                        background-color: var(--lightGray);
                        cursor: pointer;
                        &:hover{
                            background-color: var(--lightGrayPlus);
                        }
                        .chain{
                            background-color: var(--bgCard);
                        }
                        .data {
                            display: grid;
                            grid-template-columns: auto;
                            span{
                                display: inline-block;
                                width: auto;
                                svg{
                                    width: 18px;
                                    height: auto;
                                    position: absolute;
                                    margin-left: 10px;
                                    margin-top: -14px;
                                }
                            }
                        }
                        .chevron{
                            svg{
                                transform: rotate(-90deg) !important;
                            }
                        }
                    }
                    .chain{
                        display: inline-grid;
                        place-items: center;
                        width: 40px;
                        height: 40px;
                        margin-top: 0px;
                        background-color: var(--lightGrayPlus);
                        border: solid 1px var(--lightGrayPlus);
                        border-radius: 100px;
                        font-size: 12px;
                        overflow: hidden;
                        margin-right: -10px;
                        img{
                            width: 100%;
                            height: auto;
                        }
                    }
                    .network{
                        .net{
                            display: grid;
                            grid-template-columns: 1fr;
                            align-items: center;
                            color: var(--textColorSecondary);
                            font-size: 14px;
                            padding: 10px;
                            border-radius: var(--radius);
                            border: solid 1px var(--lightGrayPlus);
                        }
                    }
                    .toggle-structure{
                        .toggle{
                            display: grid;
                            grid-template-columns: auto 1fr;
                        }
                        .toggle-label{
                            display: none;
                        }
                        .switch-bg{
                            padding: 3px 0;
                        }
                        .switch-toggle{
                            margin: 0;
                            margin-left: 2px;
                        }
                        .info{
                            svg{
                                display: none;
                            }
                        }
                    }
                    .status {
                        .sync{
                            display: grid;
                            grid-template-columns: 16px 1fr;
                            align-items: center;
                            color: var(--textColorSecondary);
                            font-size: 14px;
                            padding: 10px;
                            border-radius: var(--radius);
                            border: solid 1px var(--lightGrayPlus);
                            .stat{
                                width: 8px;
                                height: 8px;
                                background-color: var(--green);
                                border-radius: 100px;
                            }
                        }
                    }
                    .name{
                        font-weight: bold;
                    }
                    .net{
                        color: var(--textColorSecondary);
                    }
                    .chevron{
                        svg{
                            transition: all .25s ease-in-out;
                        }
                        &.expanded{
                            svg{
                                transform: rotate(-180deg);
                            }
                        }
                    }
                    .tabs{
                        display: grid;
                        gap: 10px;
                        grid-template-columns: 1fr 1fr 1fr;
                        padding: 5px;
                        background-color: var(--lightGrayPlus);
                        border-radius: 12px;
                        margin: 10px auto 20px auto;
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
                }
            }
        }
        // !!!!!!!

        // Address Book
        .address-book{
            .spinner{
                @keyframes spinLoading{
                    0%{transform: rotate(0deg)}
                    100%{transform: rotate(360deg)}
                }
                svg{
                    animation: spinLoading 2s linear infinite;
                }
            }
            .w-icon{
                input{
                    padding-right: 60px;
                    width: calc(100% - 80px);
                }
            }
            .chain-ico.input{
                width: 24px;
                position: absolute;
                right: 20px;
                top: -2px;
                img, svg{
                    width: 100%;
                }
            }
            .wallet-name{
                text-align: center;
                display: grid;
                grid-template-columns: 42px 1fr 100px;
                gap: 15px;
                align-items: center;
                // margin-top: 20px;
                margin-bottom: 20px;
                text-align: left;
                .chain-ico{
                    width: 42px;
                    img{
                        width: 100%;
                    }
                }
            }
            .wallet-address{
                text-align: center;
                overflow-wrap: break-word;
                max-width: 310px;
                margin: 20px auto;
                color: var(--textColorSecondary)
            }
            .copy-wallet-address{
                max-width: 200px;
                margin: 10px auto 0 auto;
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
                    width: 50px;
                    height: 50px;
                    margin-top: 0px;
                    background-color: var(--lightGrayPlus);
                    border: solid 10px var(--bgCard);
                    border-radius: 100px;
                    overflow: hidden;
                    font-size: 12px;
                    position: absolute;
                    top: calc(50% - 30px);
                    left: calc(50% - 30px);
                    border-radius: 100px;
                    overflow: hidden;
                    img{
                        width: 100%;
                    }
                }
            }
            .delete{
                color: var(--hoverDataPink);
            }
        }
        ///////////////
        
        // send (global)
        .send-global{
            .recipient-address{
                position: relative;
                .icon-btn-recipient{
                    position: absolute;
                    display: grid;
                    width: 50px;
                    height: 50px;
                    right: 5px;
                    top: -16px;
                    background: var(--bgCard);
                    place-content: center;
                    border-radius: calc(var(--radius) / 2);
                    cursor: pointer;
                    svg{
                        width: 75%;
                        margin: auto;
                    }
                }
            }
            .add-note{
                position: relative;
                .icon-btn-recipient{
                    position: absolute;
                    display: grid;
                    width: 50px;
                    height: 50px;
                    right: 5px;
                    top: -16px;
                    background: var(--bgCard);
                    place-content: center;
                    border-radius: calc(var(--radius) / 2);
                    svg{
                        width: 75%;
                        margin: auto;
                        path{
                            stroke: var(--textColorPrimary);
                        }
                    }
                }
            }
            .address-transfer{
                background-color: var(--lightGray);
                border-radius: var(--radius);
                padding: 30px;
                hr{
                    opacity: .1;
                }
                .item{
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding: 10px 0;
                    border-bottom: solid 1px var(--lightGrayPlus);
                    &:last-child{
                        border-bottom: none;
                    }
                    .coin{
                        .name{
                            font-size: 18px;
                            font-weight: bold;
                            .chevron{
                                display: inline-grid;
                                place-content: center;
                                padding: 10px;
                                width: auto;
                                svg{
                                    path{
                                        stroke: var(--textColorPrimary);
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
                button{
                    width: 100%;
                    margin: 20px 0 0px 0;
                    text-align: center;
                    border-color: var(--lightGray);
                    color: var(--textColorSecondary);
                    .ico{
                        margin-right: 10px;
                    }
                }
            }
            .button-bundle{
                width: 100%;
                margin: 20px 0 0px 0;
                text-align: center;
                border-color: var(--lightGray);
                color: var(--textColorPrimary);
                .ico{
                    margin-right: 10px;
                }
            }
            .center{
                margin: 20px auto;
                color: var(--textColorSecondary);
            }
            .cost-breakdown{
                display: grid;
                grid-template-columns: 1fr 30px;
                h5{
                    font-weight: bold;
                }
                .amount{
                    color: var(--textColorSecondary);
                    font-size: 16px;
                    font-weight: normal;
                }
                .chevron{
                    border: solid 1px var(--lightGrayPlus);
                    width: 32px;
                    height: 32px;
                    border-radius: 10px;
                    display: grid;
                    place-content: center;
                    svg{
                        width: 80%;
                        transform: rotate(90deg);
                        transition: transform .5s ease-in-out;
                    }
                    &.expanded{
                        svg{
                            transform: rotate(-90deg);
                        }
                    }
                }
            }
            .expanded-list{
                .items-list{
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding: 10px 0;
                    align-items: center; 
                    .detail{
                        display: grid;
                        grid-template-columns: 30px 1fr;
                        .label{
                            display: inline-grid;
                        }
                        .ico, .info{
                            width: 24px;
                            height: 24px;
                            border-radius: 100px;
                            overflow: hidden;
                            img{
                                width: 100%;
                            }
                            svg{
                                width: 80%;
                            }
                        }
                        .info-detail{
                            width: 24px;
                            height: 24px;
                            border-radius: 100px;
                            overflow: hidden;
                            display: inline-grid;
                            position: absolute;
                            margin-left: 10px;
                            img{
                                width: 100%;
                            }
                            svg{
                                width: 80%;
                            }
                        }
                    }
                    .amount{
                        text-align: right;
                        .converted{
                            font-size: 14px;
                            color: var(--textColorSecondary);
                        }
                    }
                }
    
            }
            .select-address-book{
                label{
                    position: relative;
                    .ico{
                        position: absolute;
                        top: 0px;
                        left: 20px;
                    }
                    input{
                        padding-left: 50px;
                    }
                }
            }
            .search-by-id{
                width: calc(100% - 70px);
            }
            .list-address{
                clear: both;
               .list-item-addr{
                    grid-template-columns: 50px .5fr .5fr;
                    display: grid;
                    align-items: center;
                    padding: 20px;
                    margin: 10px -0px;
                    cursor: pointer;
                    &:hover{
                        background-color: var(--lightGray);
                        border-radius: var(--radius);
                    }
                    .ico{
                        background-color: var(--accentPurpleTransparent);
                        width: 40px;
                        height: 40px;
                        border-radius: 100px;
                        place-content: center;
                        display: grid;
                        color: var(--accentPurple);
                        font-weight: bold;
                        text-transform: uppercase;
                    }
                    .name{
                        display: inline-grid;
                    }
                    .addr-data{
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: grid;
                        align-items: center;
                        grid-template-columns: 30px 1fr;
                        .network{
                            width: 24px;
                            height: auto;
                            display: inline-grid;
                            img{
                                width: 100%;
                            }
                        }
                        .addr{
                            color: var(--textColorSecondary);
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }
        }
        ///////////////
        
        /// 
        
    }
    .sidedrawer-underlay{
        cursor: pointer;
        background-color: var(--underlay);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
}
</style>
<template lang="pug">
.sidedrawer.animated.fadeIn
    .sidedrawer-window.animated.toggleInRight.delay-0-5s
        // !

        // Settings ////////////////////
        //- 
        span.settings(v-if="router == 'settings' && store.get('settingsPage') == 1 && store.get('sidedrawerStorage').global !== 'send'")
            .window-header
                .title
                    //- span Address Book
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content.no-buttons
                 div
                    div
                        h3.bold Networks
                        .desc Select which networks you would like your wallet to operate on.
                    .wallets
                        .wallet(v-for="wallet in store.get('wallets')")
                            .data-wallet
                                .chain 
                                    img(:src="wallet.icon")
                                .data 
                                    .name {{ wallet.name }}
                                    .net  {{ wallet.type }}
                                .network
                                    .net(v-if="wallet.netSelection == 1") Mainnet
                                    .net(v-if="wallet.netSelection == 2") Testnet
                                    .net(v-if="wallet.netSelection == 3") Pre-prod
                                .status 
                                    .sync 
                                        .stat
                                        span Synced
                                .toggle-structure
                                    Toggle(
                                        @click.stop="wallet.active = !wallet.active"
                                        :status="wallet.active ? true : false"
                                        labelOn=" " 
                                        labelOff=" "
                                        tooltip="Change the main theme"
                                        colorOn="var(--orange)"
                                        colorOff="var(--accentPurple)"
                                        iconSvgOn=''
                                        iconSvgOff=''
                                    )/
                                .chevron(:class="wallet.expanded ? 'expanded' : ''",@click="wallet.expanded = !wallet.expanded")
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 9L12 16L5 9" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            .tabs(v-if="wallet.expanded")
                                .tab(@click="wallet.netSelection = 1", :class="wallet.netSelection == 1 ? 'active' : ''") Mainet
                                .tab(@click="wallet.netSelection = 2", :class="wallet.netSelection == 2 ? 'active' : ''") Testnet
                                .tab(@click="wallet.netSelection = 3", :class="wallet.netSelection == 3 ? 'active' : ''") Pre-prod
                        .wallet.add-custom(@click="store.set({ key: 'settingsPage', value: 2 })")
                            .chain 
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4V20M20 12L4 12" stroke="#7F5AF0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            .data 
                                span.name 
                                    span Add custom network 
                                    span <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            .chevron
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 9L12 16L5 9" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            //- .window-footer  
                // add
                button.purple(
                    v-if="store.get('sidedrawerStorage').action == 'add'"
                    @click="addressBookAddContact()"
                    :disabled="(addressBookName.length == 0 || addressBookWalletAddress == 0) || (addressBookName.length > 20) || (addressBookWalletAddress.length > 0 && addressBookWalletAddress.length < 3)"
                ) Confirm
                // edit
                button.purple(
                    v-if="!addressBookEditing && store.get('sidedrawerStorage').action == 'edit'"
                    @click="addressBookEditContact()", 
                ) Send
                button.purple(
                    v-if="addressBookEditing"
                    :disabled="(addressBookEditingTemporaryFields.name.length == 0 || addressBookEditingTemporaryFields.wallet == 0) || (addressBookEditingTemporaryFields.name.length > 20) || (addressBookEditingTemporaryFields.wallet.length > 0 && addressBookEditingTemporaryFields.wallet.length < 3)"
                    @click="addressBookEditSaveContact()", 
                ) Done
                button.tertiary.delete(
                    @click="close()"
                    v-show="addressBookEditing"
                ) Delete
                button.tertiary(
                    @click="close()"
                    v-show="!addressBookEditing"
                ) Close
        //- 
        span.settings(v-if="router == 'settings' && store.get('settingsPage') == 2 && store.get('sidedrawerStorage').global !== 'send'")
            .window-header.with-back-button 
                .back(@click="store.set({ key: 'settingsPage', value: 1 })")
                    button.navigation
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 19L3 12M3 12L10 5M3 12L21 12" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                 
                .title
                    //- span Address Book
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content
                 div
                    div
                        h3.bold Custom network
                        .desc Enter the network URL you want to connect to.
                        br/
                        .desc When connecting to a custom node, Lace connects to a different backend source but functions the same as usual. By choosing this option you acknowledge you're connecting to a third-party service outside of IOGs authority.
                    .warning
                        .ico 
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        .label This option should only be used by advanced users who are aware of the risks.
                    .network-input
                        label
                            input(
                                type="text"
                                placeholder="Enter network URL"    
                                v-model="insertNetworkURLSettings"
                            )/                    


            .window-footer  
                button.purple(
                    v-if="store.get('settingsPage') == 2"
                    :disabled="insertNetworkURLSettings.length < 3 ? 'disabled' : false"
                    @click="insertNetworkURLSettingsFunc()"
                ) Confirm
                button.tertiary(
                    @click="close()"
                    v-show="store.get('settingsPage') == 1"
                ) Cancel
        //- 
        //////////////////////////////////////////////////////////////


        // Address Book ////////////////////
        span.address-book(v-if="router == 'addressBook' && store.get('sidedrawerStorage').global !== 'send'")
            //- .window-header.with-back-button
            .window-header
                //- .back
                //-     button.navigation
                //-         span
                //-             .icon
                //-                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 19L3 12M3 12L10 5M3 12L21 12" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                .title
                    //- span Address Book
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content.with-2-buttons
                
                // !
                // ADD
                div(v-if="store.get('sidedrawerStorage').action == 'add'")
                    div
                        h3.bold Add new address
                        //- .desc Save your favorite addressess to find then easily
                    div
                        label
                            input(type="text", placeholder="Name", v-model="addressBookName", autocomplete="off")/
                            .error-feedback(v-if="addressBookName.length > 20")
                                div.animated.fadeInDown Max 20 characters
                        //- label
                        //-     input(type="text", placeholder="Address", v-model="addressBookWalletAddress", autocomplete="off")/
                        //-     .error-feedback(v-if="addressBookWalletAddress.length > 0 && addressBookWalletAddress.length < 3")
                        //-         div.animated.fadeInDown Incorrect Cardano address or Alias
                        label.w-icon
                            input(
                                type="text", 
                                placeholder="Address", v-model="addressBookWalletAddress", 
                                autocomplete="off"
                                @keyup="checkTypeOfChain()"
                            )/
                            .error-feedback(v-if="addressBookWalletAddress.length > 0 && addressBookWalletAddress.length < 3")
                                div.animated.fadeInDown Incorrect Cardano address or Alias
                            .chain-ico.input(v-if="addressBookWalletAddress.length > 0")
                                .spinner(v-if="typeOfChain == null && addressBookWalletAddress.length > 2")
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C12.1491 2.5 14.0871 3.40394 15.4545 4.85236" stroke="#6F7786" stroke-width="2" stroke-linecap="round"/></svg>
                                .checked(v-if="typeOfChain == 1 && addressBookWalletAddress.length > 2")
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13L9 17L19 7" stroke="#2CB67D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                .error(v-if="addressBookWalletAddress.length < 3")
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#E84D66" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                img.animated.zoomIn(v-if="typeOfChain == 2 && addressBookWalletAddress.length > 2", src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png")
                // !

                // !
                // EDIT
                div(v-if="store.get('sidedrawerStorage').action == 'edit'", :class="addressBookEditing ? '' : 'middle'")
                    div(v-if="addressBookEditing")
                        h3.bold Edit Contact
                        //- .desc edit or delete this contact details
                    div(v-if="addressBookEditing")
                        label
                            input(type="text", placeholder="Name", v-model="addressBookEditingTemporaryFields.name", autocomplete="off")/
                            .error-feedback(v-if="addressBookEditingTemporaryFields.name.length > 20")
                                div.animated.fadeInDown Max 20 characters
                        label.w-icon
                            input(
                                type="text", 
                                placeholder="Address", v-model="addressBookEditingTemporaryFields.wallet", 
                                autocomplete="off"
                                @keyup="checkTypeOfChain()"
                            )/
                            .error-feedback(v-if="addressBookEditingTemporaryFields.wallet.length > 0 && addressBookEditingTemporaryFields.wallet.length < 3")
                                div.animated.fadeInDown Incorrect Cardano address or Alias
                            .chain-ico.input(v-if="addressBookEditingTemporaryFields.wallet.length > 0")
                                .spinner(v-if="typeOfChain == null && addressBookEditingTemporaryFields.wallet.length > 2")
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C12.1491 2.5 14.0871 3.40394 15.4545 4.85236" stroke="#6F7786" stroke-width="2" stroke-linecap="round"/></svg>
                                .checked(v-if="typeOfChain == 1 && addressBookEditingTemporaryFields.wallet.length > 2")
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13L9 17L19 7" stroke="#2CB67D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                .error(v-if="addressBookEditingTemporaryFields.wallet.length < 3")
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#E84D66" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                img.animated.zoomIn(v-if="typeOfChain == 2 && addressBookEditingTemporaryFields.wallet.length > 2", src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png")

                    .middle.address-book(v-if="!addressBookEditing")
                        .wallet-name 
                            .chain-ico
                                img(src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png")
                            h4.bold {{ store.get('sidedrawerStorage').data.name }}
                            button.tertiary(@click="addressBookEditContact()") Edit
                        .address-qr
                            .chain 
                                img(src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png")
                            QR/
                        .wallet-address {{ store.get('sidedrawerStorage').data.wallet }}
                        button.tertiary.copy-wallet-address
                            span
                                .icon <svg width="1em" height="1em" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><path fill-rule="evenodd" clip-rule="evenodd" d="M3 2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1V7a3 3 0 0 1 3-3h5V3a1 1 0 0 0-1-1H3Zm11 2V3a3 3 0 0 0-3-3H3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h1v1a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-1ZM7 6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7Z" fill="currentColor"></path></svg>
                                .label Copy
                // !

            .window-footer  
                // add
                button.purple(
                    v-if="store.get('sidedrawerStorage').action == 'add'"
                    @click="addressBookAddContact()"
                    :disabled="(addressBookName.length == 0 || addressBookWalletAddress == 0) || (addressBookName.length > 20) || (addressBookWalletAddress.length > 0 && addressBookWalletAddress.length < 3)"
                ) Confirm
                // edit
                button.purple(
                    v-if="!addressBookEditing && store.get('sidedrawerStorage').action == 'edit'"
                    @click="addressBookEditContact()", 
                ) Send
                button.purple(
                    v-if="addressBookEditing"
                    :disabled="(addressBookEditingTemporaryFields.name.length == 0 || addressBookEditingTemporaryFields.wallet == 0) || (addressBookEditingTemporaryFields.name.length > 20) || (addressBookEditingTemporaryFields.wallet.length > 0 && addressBookEditingTemporaryFields.wallet.length < 3)"
                    @click="addressBookEditSaveContact()", 
                ) Done
                button.tertiary.delete(
                    @click="close()"
                    v-show="addressBookEditing"
                ) Delete
                button.tertiary(
                    @click="close()"
                    v-show="!addressBookEditing"
                ) Cancel
        /////////////////////////////////////

        // Send ////////////////////
        //- 
        span.send-global(v-if="store.get('sidedrawerStorage').global ? (store.get('sidedrawerStorage').global == 'send' && store.get('sidedrawerStorage').action == 'send' ? true : false) : false")

            .window-header
                //- .back
                //-     button.navigation
                //-         span
                //-             .icon
                //-                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 19L3 12M3 12L10 5M3 12L21 12" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                .title
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content.with-2-buttons
                
                // !

                // Default
                div
                    label.recipient-address
                        input(type="text", placeholder="Recipient's address", v-model="sendToThisAddress")/
                        .icon-btn-recipient(@click="showSendAddress()")
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    .address-transfer
                        div
                            .item(v-for="asset in globalSendAssets")
                                .coin 
                                    .name 
                                        span {{ asset.name }}
                                        span.chevron 
                                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 5.33268L10.6667 9.99935L6 14.666" stroke="#3D3B39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    .balance 
                                        span Balance: 
                                        span   {{ asset.balance }}
                                .value
                                    .amount
                                        label
                                            input(type="number", v-model="asset.amount")
                                    .cost-usd 
                                        span ≈ {{ asset.cost }} USD
                        button.white
                            span
                                .ico 
                                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 1V7M7.5 7V13M7.5 7H13.5M7.5 7L1.5 7" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                .label Add asset
                    button.button-bundle
                        span
                            .ico 
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 14V20M14 17H20M6 10H8C9.10457 10 10 9.10457 10 8V6C10 4.89543 9.10457 4 8 4H6C4.89543 4 4 4.89543 4 6V8C4 9.10457 4.89543 10 6 10ZM16 10H18C19.1046 10 20 9.10457 20 8V6C20 4.89543 19.1046 4 18 4H16C14.8954 4 14 4.89543 14 6V8C14 9.10457 14.8954 10 16 10ZM6 20H8C9.10457 20 10 19.1046 10 18V16C10 14.8954 9.10457 14 8 14H6C4.89543 14 4 14.8954 4 16V18C4 19.1046 4.89543 20 6 20Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            .label Add bundle
                    .center
                        span Click ‘Add bundle’ to send assets to another recipient in this transaction. 
                    label.add-note
                        input(type="text", placeholder="Add a note (max 160 char.)")/
                        .icon-btn-recipient
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.24"><path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="#C0C0C0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                    .cost-breakdown
                        h5 
                            span Transaction costs
                            span.amount  0.36 USD
                        .chevron.expanded
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 5.33268L10.6667 9.99935L6 14.666" stroke="#3D3B39" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    .expanded-list
                        .items-list(v-for="fee in globalSendAssets")
                            .detail
                                .ico 
                                    img(:src="fee.ico")
                                .label-detail
                                    span Transaction fee
                                    span.info-detail
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#6F7786" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            .amount
                                .cost {{ (((fee.cost / 100) * (fee.amount + 1)) / 50).toFixed(2) }} {{ fee.name }}
                                .converted {{ (((fee.cost / 100) * (fee.amount + 1)) / 50).toFixed(2) }} USD
            
            .window-footer  
                // review
                button.purple(
                    v-if="store.get('sidedrawerStorage').action == 'send'"
                    @click="addressBookAddContact()"
                    :disabled="checkAddressBalance()"
                ) Review transaction
                // edit
                button.tertiary(
                    @click="close()"
                    v-if="store.get('sidedrawerStorage').action == 'send'"
                ) Cancel
            // !

            /////////////////////////////////////
        //-

        // Send > Select Address
        //- 
        span.send-global(v-if="store.get('sidedrawerStorage').global ? (store.get('sidedrawerStorage').global == 'send' && store.get('sidedrawerStorage').action == 'send-address-book' ? true : false) : false")
        
            .window-header.with-back-button
                .back
                    button.navigation(@click="showSendAddressDone()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 19L3 12M3 12L10 5M3 12L21 12" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                .title
                    span(v-if="store.get('sidedrawerStorage').title") {{store.get("sidedrawerStorage").title}}
                    span(v-if="store.get('sidedrawerStorage').title === null || store.get('sidedrawerStorage').title === undefined") Lace.io
                .close
                    button.navigation(@click="close()")
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>

            .window-content.no-buttons
                
                // !

                // Default
                .select-address-book
                    h4.bold Address book
                    label
                        input.search-by-id(type="text", placeholder="Search by ID or name")
                        .ico
                            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><path fill-rule="evenodd" clip-rule="evenodd" d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10Z" fill="url(#search_component_svg__a)"></path><defs><linearGradient id="search_component_svg__a" x1="-1.66" y1="-1.66" x2="27.643" y2="0.502" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"></stop><stop offset="1" stop-color="#FDC300"></stop></linearGradient></defs></svg>       
                    .list-address 
                        .list-item-addr(
                            v-for="addr in store.get('addressBookContacts')"
                            @click="setAddressToSend(addr.wallet)"
                        )
                            .ico 
                                span {{addr.name.substr(0,1)}} 
                            .name {{addr.name}}  
                            .addr-data
                                span.network
                                    img(:src="addr.ico")
                                span.addr {{addr.wallet}} 
        
            .window-footer
        ////////////////////////////

        // !
    .sidedrawer-underlay(@click="close()")
</template>