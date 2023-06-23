<script>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import Input from '../ui/Input.vue'
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
            //////////////
            
        }
    },
    props: {
        store: Object,
    },
    components: {
        Input,
        QR
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
            // this.animationChainDone = false;
            this.typeOfChain = null;
            setTimeout(()=>{
                this.typeOfChain = 1;
                setTimeout(() => {
                    this.typeOfChain = 2;
                    // this.animationChainDone = true;
                }, 1000)
            }, 2000)
        }
        ///////////////
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

        // Address Book ////////////////////
        span.address-book(v-if="router == 'addressBook'")
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

        // !
    .sidedrawer-underlay(@click="close()")
</template>