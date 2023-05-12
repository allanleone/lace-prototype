<script>
import Tooltip from '../static/ui/Tooltip.vue'
import Input from '../static/ui/Input.vue'
export default {
    props: {
        store: Object,
        title: String,
    },
    data() {
        return {
            // theme: this.store.get("theme"),
            addressess: [
                {
                    name: "Allan Leone",
                    wallet: "addr_test1qzhxwe9270lh76chk8pjmh2x8hzsjnwphm8aqkju6czlsms2hcl5vqku7atfuzgfpqhlkyec0ufv9084p8lqvthnjzcss4rvu2"
                },
            ]
        }
    },
    components: {
        Tooltip,
        Input,
    },
    methods: {
    },
    mounted(){

    }
}
</script>
<style lang="scss">
.address-book-widget {
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
</style>
<template lang="pug">
.address-book-widget
    h3.title-address-book(v-html="title")
    h5.subtitle-address-book Save your favorite addressess to find them easily.
    .items-address-book 
        Input(placeholder="Name")/
        Input(placeholder="Address")/
        button 
            span
                .icon 
                    <svg width="1em" height="1em" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="AddressForm-module_icon__2FZuj"><path d="M8.5 1a1 1 0 0 0-2 0h2Zm-2 12a1 1 0 1 0 2 0h-2Zm7-5a1 1 0 1 0 0-2v2Zm-12-2a1 1 0 1 0 0 2V6Zm5-5v6h2V1h-2Zm0 6v6h2V7h-2Zm7-1h-6v2h6V6Zm-6 0h-6v2h6V6Z" fill="url(#plus_component_svg__a)"></path><defs><linearGradient id="plus_component_svg__a" x1="-0.696" y1="-1.196" x2="16.886" y2="0.101" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"></stop><stop offset="1" stop-color="#FDC300"></stop></linearGradient></defs></svg>
                .label Add Address
</template>