<script>
// import notFound from '../components/static/ui/NotFound.vue';
import Input from '../components/static/ui/Input.vue'
export default {
    props: {
        store: Object,
    },
    data() {
        return {
            contacts:this.store.get("addressBookContacts"),
            addAddressOverlay: false,
            copied: false,
        }
    },
    methods: {
        openSidedrawer(item) {
            this.store.set({ key: 'sidedrawerStorage', value: item })
            this.store.set({ key: 'sidedrawerVisible', value: true })
        },
        copyAddress(addr){
            this.copied = true;
            setTimeout(() => {
                this.copied = false;
            }, 2000);
        }
    },
    components: {
        // NotFound,
        Input,
    }
}
</script>

<template lang="pug">
.address-book
    .page-title
        h1.animated.fadeInUp Address book 
        span.floating-add-address.animated.toggleInRight
            button.purple(@click="openSidedrawer({action: 'add', title: 'Address book'})")
                span
                    .icon 
                        <svg width="1em" height="1em" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="AddressForm-module_icon__2FZuj"><path d="M8.5 1a1 1 0 0 0-2 0h2Zm-2 12a1 1 0 1 0 2 0h-2Zm7-5a1 1 0 1 0 0-2v2Zm-12-2a1 1 0 1 0 0 2V6Zm5-5v6h2V1h-2Zm0 6v6h2V7h-2Zm7-1h-6v2h6V6Zm-6 0h-6v2h6V6Z" fill="url(#plus_component_svg__a)"></path><defs><linearGradient id="plus_component_svg__a" x1="-0.696" y1="-1.196" x2="16.886" y2="0.101" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"></stop><stop offset="1" stop-color="#FDC300"></stop></linearGradient></defs></svg>
                    .label Add Address
    //
    //- NotFound/
    //
    .table-address-book.animated.fadeInUp.delay-0-4s
        .table-row.table-header 
            .table-col Name
            .table-col Address
        .table-row.animated.fadeInUp(v-for="contact in contacts", @click="openSidedrawer({action: 'edit', title: 'Address details', data: contact})")
            .table-col 
                .contact-data
                    .thumb {{ contact.name.substr(0,1) }}
                    .name {{ contact.name }}
            .table-col 
                .address 
                    .chain 
                        img(src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-512.png")
                        //- span CA
                    .addr 
                        span {{ contact.wallet }}
            .table-col 
                .copy-btn
                    button.tertiary.copy-wallet-address.animated.toggleInLeft(
                        @click.stop="copyAddress(contact.wallet)"
                        @mouseenter="contact.hover = true"
                        @mouseleave="contact.hover = false"
                    )
                        span
                            .icon
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16H6C4.89543 16 4 15.1046 4 14V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V8M10 20H18C19.1046 20 20 19.1046 20 18V10C20 8.89543 19.1046 8 18 8H10C8.89543 8 8 8.89543 8 10V18C8 19.1046 8.89543 20 10 20Z" stroke="#6F7786" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            //- .label(v-if="!copied") Copy
                            //- .label(v-if="copied") Copied
                .tooltip(v-if="contact.hover") Copy address
        //- hr/
    //
    .contacts 

</template>

<style lang="scss" scoped>
.address-book{
    display: grid;

    .address-book-box {
        display: block;
        padding: 20px 20px;
        background: var(--bgCard);
        border: solid 2px var(--bgCardBorder);
        margin-top: 20px;
        border-radius: var(--defaultRadius);
        .title-address-book{
            margin-bottom: 14px;
        }
        .subtitle-address-book{
            margin-top: 0px;
            color: var(--textColorSecondary);
        }
        .items-address-book{ 
            display: grid;
            gap: 20px;
            grid-template-columns: 1fr 1fr .8fr;
            place-content: center;
            input, button{
                margin-top: 20px;
            }
            button{
                height: 55px;
            }
        }
        button{
            display: grid;
            width: 100%;
            margin-top: 20px;
            grid-template-columns: auto 1fr auto;
            justify-content: center;
            align-items: center !important;
            justify-content: center !important;
            display: flex;
            cursor: pointer;
            span{
                width: auto;
            }
        }
    }
    
    .table-address-book{
        display: grid;
        width: 100%;
        // overflow-y: hidden;
        // overflow-x: auto;
        min-width: 335px;
        margin-top: 20px;
        margin-bottom: 40px;
        z-index: 0;
        hr{
            width: calc(100% - 10px);
            opacity: .15;
            margin-bottom: 50px;
            margin-top: 50px;
        }
        .table-row{
            display: grid;
            grid-template-columns: 1fr 1fr auto;
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
                height: 100%;
                .contact-data{
                    display: grid;
                    grid-template-columns: auto 1fr;
                    gap: 20px;
                    .thumb{
                        width: 42px;
                        height: 42px;
                        background-color: var(--accentPurpleTransparent);
                        display: grid;
                        place-content: center;
                        border-radius: 100px;
                        color: var(--accentPurple);
                        font-weight: bold;
                    }
                    .name{
                        display: grid;
                        align-content: center;
                        font-weight: bold;
                    }
                }
                .address{
                    display: inline-grid;
                    align-content: center;
                    color: var(--textColorSecondary);
                    white-space: nowrap;
                    grid-template-columns: auto 1fr;
                    gap: 10px;
                    align-self: center;
                    align-items: center;
                    .addr {
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .chain{
                        display: grid;
                        place-items: center;
                        width: 24px;
                        height: 24px;
                        margin-top: 0px;
                        background-color: var(--lightGrayPlus);
                        border: solid 1px var(--lightGrayPlus);
                        border-radius: 100px;
                        font-size: 12px;
                        overflow: hidden;
                        img{
                            width: 100%;
                        }
                    }
                }
            }
            .stake-ros, .stake-cost, .stake-saturation{
                color: var(--textColorPrimary);
            }
            .stake-saturation{
                display: grid;
                grid-template-columns: 8px 1fr;
                gap: 10px;
                align-content: center;
                .stake-status{
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
            transition: width .5s ease-in-out;
            // 
            width: calc(100% - 50px);
            // overflow: visible;
            .copy-btn{
                @keyframes inCopy {
                    0% {width: 0px;}
                    100% {width: 100px;}
                }
                display: grid;
                place-content: center;
                grid-template-columns: auto;
                margin-right: 10px;
                overflow: hidden;
                width: 0px;
                margin-top: -5px;
                transition: all .5s ease-in-out;
                animation: inCopy .5s forwards;
                display: none;
                position: absolute;
                opacity: .75;
                button{
                    background: transparent;
                    width: 40px !important;
                    grid-template-columns: auto;
                    .icon{
                        margin-left: 5px;
                    }
                }
            }
            .tooltip{
                position: absolute;
                margin-top: -55px;
                background: #fff;
                box-shadow: var(--tinyShadow);
                opacity: 1;
                width: 100px;
                margin-left: -15px;
                padding: 15px;
                font-size: 14px;
                text-align: center;
                border-radius: 16px;
                display: none;
            }
            &:hover{
                width: calc(100% - 80px);
                .tooltip{
                    display: block;
                }
                .copy-btn{
                    width: 60px;
                    display: grid;
                    &:hover{
                        opacity: 1;
                    }
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
        .table-header{
            &.table-row{
                color: var(--textColorSecondary);
                &:hover{
                    background-color: transparent;
                    cursor: default;
                }
            }
        } 
    }
    //
    .page-title{
        grid-template-columns: 1fr 300px;
        display: grid;
        align-content: center;
        z-index: 1;
    }
    .floating-add-address{
        float: right;
        display: block;
        position: relative;
        z-index: 1;
        align-self: center;
        justify-self: center;
        button{
            width: 180px;
            float: right;
            z-index: 1;
        }
        .overlay-add-contact {
            right: 0;
            top: 60px;
            width: 300px;
            position: absolute;
            .address-book-box{
                right: 0;
                position: absolute;
                background-color: var(--bgCard);
                .items-address-book {
                    grid-template-columns: 1fr;
                    grid-template-rows: 1fr 1fr 1fr;
                }
            }
            button{
                width: 100%;
            }
        }
    }
}
</style>