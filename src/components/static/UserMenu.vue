<script>
import Toggle from './ui/Toggle.vue'
import MainNetworkStatus from './ui/MainNetworkStatus.vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
export default {
    props: {
        store: Object,
    },
    data() {
        return {
            theme: this.store.get("theme"),
            langMenu: false,
        }
    },
    components: {
        Toggle,
        MainNetworkStatus,
    },
    methods:{
        changeTheme(){
            if(this.store.theme == "light"){
                document.querySelector("html").classList.add("dark");
                document.querySelector("html").classList.remove("light");
                this.store.set({ key: 'theme', value: 'dark' })
            }else{
                document.querySelector("html").classList.remove("dark");
                document.querySelector("html").classList.add("light");
                this.store.set({ key: 'theme', value: 'light' })
            }
        },
        toggleUserMenu(){
            if(this.store.get('userMenu') == 'opened'){
                this.store.set({ key: 'userMenu', value: 'closed' })
            }else{
                this.store.set({ key: 'userMenu', value: 'opened' })
            }
        },
        toggleSidebar() {
            if (this.store.get('sidebarVisible') == true) {
                this.store.set({ key: 'widgetTransition', value: false })
                this.store.setDelayed({ key: 'sidebarVisible', value: false })
            } else {
                this.store.set({ key: 'widgetTransition', value: true })
                this.store.set({ key: 'sidebarVisible', value: true })
            }
        },
        openSidedrawer(item) {
            this.store.set({ key: 'sidedrawerStorage', value: item })
            this.store.set({ key: 'sidedrawerVisible', value: true })
        },
        toggleLang(){
            this.langMenu = !this.langMenu;
        },
        AmIOnOnboarding() {
            const router = useRouter().currentRoute.value.name;
            if(!router){
                return false;
            }else{
                if (router == "onboarding") {
                    return true;
                } else {
                    return false;
                }
            }
        },
    },
}
</script>
<style lang="scss">
.user-menu {
    cursor: pointer;
    display: grid;
    padding-top: 20px;
    grid-template-columns: 1fr 1fr auto auto;
    gap: 10px;
    z-index: 2;
    &.onboarding-stage{
        grid-template-columns: auto 90px auto ;
    }
    //
    .user-profile{
        position: relative;
        span{
            width: 100%;
            justify-content: left;
            grid-template-columns: auto 1fr 1fr;
            @keyframes updateStatus {
                0%{background-color: var(--green);}
                14%{background-color: var(--green);}
                15%{background-color: var(--yellow);}
                17%{background-color: var(--green);}
                19%{background-color: var(--yellow);}
                21%{background-color: var(--green);}
                23%{background-color: var(--yellow);}
                25%{background-color: var(--green);}
                100%{background-color: var(--green);}
            }
            .status{
                position: absolute;
                width: 8px;
                height: 8px;
                border-radius: 100px;
                background-color: var(--green);
                place-self: center;
                // margin: auto 5px;
                margin: -20px 5px 0 0;
                animation: updateStatus 10s ease-in-out infinite;
            }
            .label{
                display: none;
            }
            .icon{
                display: grid;
                place-content: center;
                font-weight: 700;
                width: 32px;
                height: 32px;
                border-radius: 100px;
                background: var(--gradient);
                color: var(--white);
                &:before{
                    // position: absolute;
                    // top: 0;
                    // left: 0;
                    // width: 100%;
                    // height: 100%;
                    // background: red; //conic-gradient(red, orange, yellow, green, blue);
                    // transform: scale(1.1);
                }
                &.dark{
                    img, svg{
                        filter: brightness(0) invert(1);
                    }
                }
            }
            .chevron, svg{
                margin: 0px 3px;
                width: 10px;
            }
        }
    }
    .brand{
        display: none;
        visibility: visible;
    }
    .expand{
        width: 48px;
        transition: width .5s ease-in-out;
        display: none;
        .label{
            transition: width .5s ease-in-out;
            overflow: hidden;
            width: 0;
        }
        .icon{
            transition: transform .5s ease-in-out;
            padding: 0px 8px;
            margin: auto;
        }
        &:hover{
            width: 130px;
            .icon{
                transform: rotate(-180deg);
            }
            .label{
                // margin-right: 5px;
                width: 60px;
                display: grid;
            }
        }
    }
    .sidemenu{
        width: 50px;
        // transition: width .25s ease-in-out;
        display: none;
        @media screen and (max-width: 1280px) {
            display: grid;
        }
        .label{
            // transition: width .25s ease-in-out;
            overflow: hidden;
            width: 0;
        }
        .icon{
            padding: 0px 8px;
            margin: auto;
        }
        .icon-custom{
            display: grid;
            grid-template-columns: auto auto;
            padding: 0px 8px;
            margin: auto;
            .arrow{
                position: absolute;
                width: 6px;
                height: auto;
                margin-left: 7px;
                margin-top: 1px;
                transform: rotate(180deg);
                // transition: transform .25s ease-in-out, opacity .25s ease-in-out;
                // display: none;
                opacity: 0;
                svg, img{
                    width: 100%;
                    height: auto;
                }
                &.dark{
                    svg, img{
                        filter: brightness(0) invert(1);
                    }
                }
            }
            .square{
                transition: margin .25s ease-in-out,width .25s ease-in-out, background-color .25s ease-in-out, border-radius .25s ease-in-out, border-color .25s ease-in-out;
                width: 6px;
                height: 14px;
                --iconRadius: 4px;
                border: solid 2px var(--textColorPrimary);
                &:nth-child(1){
                    width: 10px;
                    border-right-color: transparent;
                    border-radius: var(--iconRadius) 0px 0px var(--iconRadius);
                    background: var(--transparent);
                    // z-index: -1;
                }
                &:nth-child(2){
                    border-left-color: transparent;
                    // background: var(--midGray);
                    border-radius: 0px var(--iconRadius) var(--iconRadius) 0px ;
                    margin-left: -2px;
                    width: 4px;
                }
            }
            &.reverse{
                .square{
                    &:nth-child(1){
                        border-right-color: var(--textColorPrimary);
                    }
                }
            }
            
        }
        &.active{
            .square{
                &:nth-child(1){
                    background-color: var(--darkGray);
                }
                &:nth-child(2){
                    // background-color: var(--midGray);
                    // margin-left: 0px;
                }
            }
        }
        &:hover{
            // width: 100px;
            .label{
                margin-right: 5px;
                width: 50px;
                display: grid;
            }
            .arrow{
                opacity: 1;
                display: block;
                svg{
                    filter: brightness(0) invert(1);
                }
            }
            .icon-custom{
                // margin-left: 10px;
                &.normal{
                    .square:nth-child(1){
                        width: 12px;
                        background-color: var(--transparent);
                        border-right-color: transparent;
                    }
                    .square:nth-child(2){
                        width: 2px;
                        background: var(--darkGray);
                        // border-left-color: transparent;
                    }
                    @keyframes pingpongarrow1 {
                        0%{margin-left: 10px}
                        100%{margin-left: 13px}
                    }
                    .arrow{
                        display: block;
                        opacity: 1;
                        transform: rotate(0deg);
                        margin-left: 13px;
                        animation: pingpongarrow1 .25s forwards;
                        margin-top: -4px;
                        svg{
                            filter: brightness(0);
                        }
                    }
                }
                &.reverse{
                    .square:nth-child(1){
                        width: 8px;
                        background-color: var(--darkGray);
                        border-right-color: transparent;
                    }
                    .square:nth-child(2){
                        width: 6px;
                        // background: var(--white);
                        border-left-color: transparent;
                    }
                    @keyframes pingpongarrow2 {
                        0%{margin-left: 15px}
                        100%{margin-left: 11px}
                    }
                    .arrow{
                        display: block;
                        opacity: 1;
                        margin-left: 11px;
                        animation: pingpongarrow2 .25s forwards;
                    }

                }
            }
            .icon{
                transition: transform .45s ease-in-out;
            }
            &.active{
                .square{
                    &:nth-child(1){
                        background-color: var(--white);
                    }
                    &:nth-child(2){
                        background-color: var(--midGray);
                        // margin-left: 0px;
                    }
                }
            }
        }
    }
    .chevron{
        .arrow{
            margin-left: 2px;
            display: block;
        }
        .menu{
            margin-left: 2px;
            display: none;
        }
        @media screen and (max-width: 1024px) {
            .arrow{
                display: none;
            }
            .menu{
                display: grid;
            }
        }
    }
    &.middle{
        display: none;
        width: auto;
        position: fixed;
        right: 64px;
        top: 0px;
        &.no-widgets{
            transition: width .5s ease-in-out;
            display: grid;
            @media screen and (min-width: 768px) {
                width: auto;
            }
            @media screen and (min-width: 1280px) {
                width: 363px;
            }
            @media screen and (min-width: 1440px) {
                width: 420px;
            }
        }
    }
    .underlay{
        position: fixed;
        background: var(--gradientTransparent);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        // backdrop-filter: blur(5px);
    }
    @media screen and (max-width: 1280px) {
        &.middle{
            display: grid;
            .receive, .send{
                width: 100px;
            }
            @media screen and (max-width: 1024px) {
                right: 32px;
                // grid-template-columns: auto auto;
                .receive, .send, .expand{
                    // display: none;
                }
            }
            @media screen and (max-width: 512px) {
                .receive, .send, .expand{
                    display: none;
                }
                // grid-template-columns: auto auto;
                right: 16px;
                grid-template-columns: auto auto;
                .expand{
                    display: grid;
                }
                .brand{
                    display: block;
                }
                .underlay{
                    display: block;
                }
                .sidemenu {
                    display: none;
                }
            }
        }
    }
}
.expanded-options{
    position: absolute;
    width: 250px;
    right: 0;
    top: 55px;
    padding: 20px;
    text-align: left;
    background-color: var(--bgCard);
    color: var(--textColorPrimary);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    z-index: 2;
    .user-info-expanded{
        display: grid;
        grid-template-columns: 50px 1fr;
        span{
            display: block;
            .name, .address{
                width: 100%;
                display: block;
            }
            .name{
                font-size: 16px;
                font-weight: 700;
            }
            .address{
                color: var(--textColorSecondary);
            }
        }
    }
    .wallet-status{
        margin: 20px auto;
    }
    .dropdown{
        display: grid;
        grid-template-columns: 1fr 1fr 20px;
        position: relative;
        .lang{
            text-align: right;
            color: var(--accentPurple);
            padding: 20px;
            display: grid;
            grid-template-columns: 1fr;
        }
        .list-lang {
            display: flex;
            direction: row;
            flex-wrap: wrap;
            position: absolute;
            box-shadow: var(--shadow);
            border-radius: var(--radius);
            background-color: var(--bgCard);
            bottom: 60px;
            padding: 10px;
            right: 0;
            .l{
                padding: 15px 10px;
                width: calc(50% - 20px);
                border-radius: 10px;
                &:hover{
                    background-color: var(--bgCardHover);
                }
            }
        }
    }
    .item{
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        padding: 16px 16px;
        margin: 4px -15px;
        transition: background-color .25s ease-in-out;
        border-radius: var(--radius);
        &.lang{
            text-align: right;
        }
        &:hover{
            // background-color: var(--bgCardHover);
        }
        &.without-hover-effect{
            background-color: transparent !important;
            &:hover{
                // background-color: transparent !important;
            }
        }
    }
    hr{
        opacity: .15;
        margin: 0 -20px;
    }
}

</style>
<template lang="pug">
.user-menu(:class="AmIOnOnboarding() ? 'onboarding-stage' : ''", v-if="AmIOnOnboarding() != undefined ? true : false")
    .brand(v-if="!AmIOnOnboarding()")
        img(class="symbol", src="@/assets/images/light/lace_symbol.svg", alt="", v-if="store.theme == 'light'")
        img(class="symbol", src="@/assets/images/dark/lace_symbol.svg", alt="", v-if="store.theme == 'dark'")
        MainNetworkStatus/
    button.receive(v-if="!AmIOnOnboarding()", @click="openSidedrawer({global: 'receive', action: 'receive', title: 'Receive'})")
        span
            .icon 
                <svg width="1em" height="1em" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path style="fill: var(--orange);" d="M13.5 4a1 1 0 1 0-2 0h2Zm-2 1a1 1 0 1 0 2 0h-2Zm7 10a1 1 0 1 0 0 2v-2Zm2 2a1 1 0 1 0 0-2v2Zm-8-1v-1a1 1 0 0 0-1 1h1Zm2 1a1 1 0 1 0 0-2v2Zm-3 3a1 1 0 1 0 2 0h-2Zm2-11a1 1 0 1 0-2 0h2Zm-1 3h-1a1 1 0 0 0 1 1v-1Zm4 7a1 1 0 1 0 0 2v-2Zm4 2a1 1 0 1 0 0-2v2Zm-16-10a1 1 0 1 0 0 2v-2Zm4 2a1 1 0 1 0 0-2v2Zm4.01 0a1 1 0 1 0 0-2v2Zm4 0a1 1 0 1 0 0-2v2Zm3.99-2a1 1 0 1 0 0 2v-2Zm.01 2a1 1 0 1 0 0-2v2ZM5.5 5h2V3h-2v2Zm2 0v2h2V5h-2Zm0 2h-2v2h2V7Zm-2 0V5h-2v2h2Zm0 0h-2a2 2 0 0 0 2 2V7Zm2 0v2a2 2 0 0 0 2-2h-2Zm0-2h2a2 2 0 0 0-2-2v2Zm-2-2a2 2 0 0 0-2 2h2V3Zm12 2h2V3h-2v2Zm2 0v2h2V5h-2Zm0 2h-2v2h2V7Zm-2 0V5h-2v2h2Zm0 0h-2a2 2 0 0 0 2 2V7Zm2 0v2a2 2 0 0 0 2-2h-2Zm0-2h2a2 2 0 0 0-2-2v2Zm-2-2a2 2 0 0 0-2 2h2V3Zm-12 14h2v-2h-2v2Zm2 0v2h2v-2h-2Zm0 2h-2v2h2v-2Zm-2 0v-2h-2v2h2Zm0 0h-2a2 2 0 0 0 2 2v-2Zm2 0v2a2 2 0 0 0 2-2h-2Zm0-2h2a2 2 0 0 0-2-2v2Zm-2-2a2 2 0 0 0-2 2h2v-2Zm6-11v1h2V4h-2Zm7 13h2v-2h-2v2Zm-6 0h2v-2h-2v2Zm-1-1v4h2v-4h-2Zm0-7v3h2V9h-2Zm5 12h4v-2h-4v2Zm-12-8h4v-2h-4v2Zm8 0h.01v-2h-.01v2Zm8 0h.01v-2h-.01v2Zm-8 0h4.01v-2H12.5v2Z" fill="url(#arrow-diagonal-down_component_svg__a)"></path><defs><linearGradient id="arrow-diagonal-down_component_svg__a" x1="1.57" y1="1.072" x2="25.027" y2="2.803" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"></stop><stop offset="1" stop-color="#FDC300"></stop></linearGradient></defs></svg>
            .label(v-html="store.translate('lace.labels.receive')") 
            .chevron
    button.send(v-if="!AmIOnOnboarding()", @click="openSidedrawer({global: 'send', action: 'send', title: 'Send'})")
        span
            .icon 
                <svg width="1em" height="1em" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path style="fill: var(--orange);"  d="M8.964 4.636a1 1 0 1 0 0 2v-2Zm9.9 1h1a1 1 0 0 0-1-1v1Zm-1 9.9a1 1 0 1 0 2 0h-2Zm-12.435 2.12a1 1 0 0 0 1.414 1.415L5.43 17.657Zm3.535-11.02h9.9v-2h-9.9v2Zm8.9-1v9.9h2v-9.9h-2Zm.293-.707L5.429 17.657l1.414 1.414L19.571 6.343 18.157 4.93Z" fill="url(#arrow-diagonal-up_component_svg__a)"></path><defs><linearGradient id="arrow-diagonal-up_component_svg__a" x1="14.432" y1="-3.454" x2="28.133" y2="11.915" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"></stop><stop offset="1" stop-color="#FDC300"></stop></linearGradient></defs></svg>
            .label(v-html="store.translate('lace.labels.send')")
            .chevron
    button.help-and-support(style="padding: 10px 20px;", v-if="AmIOnOnboarding()", )
        span
            .icon 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12.0001 8C10.5283 8 9.47159 8.70623 9.13224 9.4263C8.89681 9.92589 8.30095 10.14 7.80136 9.90458C7.30178 9.66914 7.08764 9.07329 7.32308 8.5737C8.08197 6.96338 9.98852 6 12.0001 6C13.3001 6 14.5155 6.39395 15.4285 7.07868C16.3418 7.76364 17.0001 8.78625 17.0001 10C17.0001 12.0693 15.166 13.5082 13.1827 13.8887C13.11 13.9026 13.0522 13.9386 13.0206 13.972C13.0064 13.9871 13.0014 13.9974 13.0002 14.0001C13.0002 14.0003 13.0001 14.0004 13.0001 14.0005C12.9998 14.5526 12.5522 15 12.0001 15C11.4478 15 11.0001 14.5523 11.0001 14C11.0001 12.8579 11.9097 12.0964 12.8059 11.9245C14.2788 11.6419 15.0001 10.7295 15.0001 10C15.0001 9.5569 14.7629 9.0795 14.2285 8.67868C13.6937 8.27763 12.9092 8 12.0001 8ZM11 17C11 16.4477 11.4477 16 12 16H12.01C12.5623 16 13.01 16.4477 13.01 17C13.01 17.5523 12.5623 18 12.01 18H12C11.4477 18 11 17.5523 11 17Z" fill="url(#paint0_linear_6610_345401)"/><defs><linearGradient id="paint0_linear_6610_345401" x1="-1.65957" y1="-1.65957" x2="27.6428" y2="0.501649" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient></defs></svg>
            .label
                span(v-html='store.translate("prototype.onboarding.extras.btn-help")')
            .chevron
    button.secondary.expand
        span
            .icon
                <svg width="1em" height="1em" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path  d="M3.5 8a1 1 0 0 0 2 0h-2Zm1-4V3a1 1 0 0 0-1 1h1Zm4 1a1 1 0 0 0 0-2v2Zm11 3a1 1 0 1 0 2 0h-2Zm1-4h1a1 1 0 0 0-1-1v1Zm-4-1a1 1 0 1 0 0 2V3Zm-11 13a1 1 0 1 0-2 0h2Zm-1 4h-1a1 1 0 0 0 1 1v-1Zm4 1a1 1 0 1 0 0-2v2Zm1.707-5.293a1 1 0 0 0-1.414-1.414l1.414 1.414Zm4.586-7.414a1 1 0 0 0 1.414 1.414l-1.414-1.414Zm-6 1.414a1 1 0 0 0 1.414-1.414L8.793 9.707ZM20.5 20v1a1 1 0 0 0 1-1h-1Zm-4.293-5.707a1 1 0 0 0-1.414 1.414l1.414-1.414ZM21.5 16a1 1 0 1 0-2 0h2Zm-5 3a1 1 0 1 0 0 2v-2ZM5.5 8V4h-2v4h2Zm-1-3h4V3h-4v2Zm17 3V4h-2v4h2Zm-1-5h-4v2h4V3Zm-17 13v4h2v-4h-2Zm1 5h4v-2h-4v2Zm.707-.293 5-5-1.414-1.414-5 5 1.414 1.414Zm11-11 5-5-1.414-1.414-5 5 1.414 1.414Zm-6-1.414-5-5-1.414 1.414 5 5 1.414-1.414Zm11 11-5-5-1.414 1.414 5 5 1.414-1.414ZM19.5 16v4h2v-4h-2Zm1 3h-4v2h4v-2Z" fill="currentColor"></path></svg>
            .label Expand
            .chevron
    button.secondary.user-profile(@click="toggleUserMenu()", :class="store.get('userMenu') == 'opened' ? 'active' : ''")
        span
            //- .status
            span(v-if="!AmIOnOnboarding()")
                .icon A
                .label
                .chevron
                    span.arrow
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 9L12 16L5 9" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    span.menu
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M4 18H20" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            span(v-if="AmIOnOnboarding()")
                .icon(style="background: var(--bgCard);", :class="store.get('theme') == 'dark' ? 'dark' : ''")
                    <svg height="512px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M256.8,160c-25.7,0-49.8,10-67.9,28.1c-18.1,18.1-28.1,42.2-28.1,67.9s10,49.7,28.1,67.9C207,342,231.2,352,256.8,352   c25.7,0,49.8-10,67.9-28.1c18.1-18.1,28.1-42.2,28.1-67.9s-10-49.7-28.1-67.9C306.6,170,282.5,160,256.8,160z M256.8,336   c-44.3,0-80-35.9-80-80c0-44.1,35.7-80,80-80c44.3,0,80,35.9,80,80C336.8,300.1,301.1,336,256.8,336z"/><path d="M424.5,216h-15.2c-12.4,0-22.8-10.4-22.8-23.2c0-6.4,2.7-12.1,7.5-16.4l9.8-9.6c9.7-9.6,9.7-25.2,0-34.9l-22.3-22.1   c-4.4-4.4-10.9-7-17.5-7c-6.6,0-13,2.6-17.5,7l-9.4,9.4c-4.5,5-10.7,7.7-17.2,7.7c-12.8,0-23.7-10.4-23.7-22.7V89.1   c0-13.5-10.5-25.1-24-25.1h-30.4C228,64,217,75.5,217,89.1v15.2c0,12.3-10.6,22.7-23.4,22.7c-6.4,0-12.2-2.7-16.6-7.4l-9.7-9.6   c-4.4-4.5-10.9-7-17.5-7s-13,2.6-17.5,7L110,132c-9.6,9.6-9.6,25.3,0,34.8l9.4,9.4c5,4.5,7.8,10.2,7.8,16.7   c0,12.8-10.4,23.2-22.8,23.2H89.2C75.5,216,64,227.2,64,240.8V256v15.2c0,13.5,11.5,24.8,25.2,24.8h15.2   c12.4,0,22.8,10.4,22.8,23.2c0,6.4-2.8,12.3-7.8,16.8l-9.4,9.2c-9.6,9.6-9.6,25.2,0,34.8l22.3,22.2c4.4,4.5,10.9,7,17.5,7   c6.6,0,13-2.6,17.5-7l9.7-9.6c4.2-4.7,10.1-7.4,16.5-7.4c12.8,0,23.4,10.4,23.4,22.7v15.2c0,13.5,11,25.1,24.7,25.1h30.4   c13.6,0,24.9-11.5,24.9-25.1v-15.2c0-12.3,10.5-22.7,23.3-22.7c6.4,0,12.3,2.8,16.9,7.7l9.4,9.4c4.5,4.4,10.9,7,17.5,7   c6.6,0,13-2.6,17.5-7l22.3-22.2c9.6-9.6,9.6-25.3,0-34.9l-9.8-9.6c-4.8-4.3-7.5-10.4-7.5-16.7c0-12.8,10.4-23.6,22.8-23.6h15.2   c13.6,0,23.3-10.3,23.3-23.9V256v-15.2C447.8,227.2,438.1,216,424.5,216z M432,256v15.1c0,4.2-2.3,7.9-7.3,7.9h-15.2   c-10.3,0-20.1,4.4-27.5,12c-7.3,7.5-11.3,17.4-11.3,27.8c0,10.8,4.4,20.8,12.5,28.2l9.5,9.4c3.3,3.4,3.3,9,0,12.3l-22.3,22.2   c-1.6,1.5-3.9,2.4-6.3,2.4c-2.4,0-4.8-0.9-6.3-2.4l-9.1-9.1c-7.7-8.1-17.8-12.6-28.5-12.6c-10.4,0-20,4-27.5,11.2   c-7.6,7.4-11.6,17.1-11.6,27.5v15.2c0,4.9-4.3,9.1-8.9,9.1h-30.4c-4.6,0-8.7-4.2-8.7-9.1v-15.2c0-10.3-4.1-20.1-11.7-27.5   c-7.5-7.2-17.3-11.2-27.6-11.2c-10.6,0-20.8,4.5-28.1,12.4l-9.3,9.3c-1.6,1.5-3.9,2.4-6.3,2.4c-2.4,0-4.8-0.8-6.1-2.2l-0.1-0.1   l-0.1-0.1l-22.3-22.2c-3.3-3.3-3.3-8.8,0-12.2l9.1-9c8.2-7.6,12.7-17.7,12.7-28.5c0-10.4-4-19.9-11.3-27.4   c-7.4-7.6-17.2-11.5-27.5-11.5H89.2c-5,0-9.2-4.3-9.2-8.8V256v-15.2c0-4.5,4.2-8.8,9.2-8.8h15.2c10.3,0,20.1-3.9,27.5-11.5   c7.3-7.5,11.3-17.2,11.3-27.5c0-10.8-4.5-20.9-12.7-28.4l-9.2-9.1c-2.2-2.2-2.5-4.7-2.5-6.1c0-1.3,0.3-3.9,2.5-6.1l22.2-22.1   c1.6-1.5,3.9-2.4,6.3-2.4c2.4,0,4.8,0.8,6.1,2.2l0.1,0.1l0.1,0.1l9.4,9.4c7.4,8,17.4,12.4,28.1,12.4c10.4,0,20.1-4,27.6-11.2   c7.6-7.4,11.8-17.1,11.8-27.5V89.1c0-4.9,4-9.1,8.5-9.1H272c4.5,0,8,4.2,8,9.1v15.2c0,10.3,4.4,20.1,12,27.5   c7.5,7.2,17.4,11.2,27.8,11.2c10.8,0,21-4.5,28.6-12.6l9.1-9.1c1.6-1.5,3.9-2.4,6.3-2.4c2.4,0,4.8,0.9,6.3,2.3l22.3,22.1   c1.6,1.6,2.6,3.8,2.6,6.1c0,2.3-0.9,4.5-2.5,6.1l-9.5,9.4c-8,7.4-12.5,17.4-12.5,28.2c0,10.4,4,19.9,11.3,27.4   c7.4,7.6,17.2,11.5,27.5,11.5h15.2c5.4,0,7.4,5,7.5,9V256z"/></g></svg>
                .label
                .chevron
                    span.arrow
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 9L12 16L5 9" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    span.menu
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M4 18H20" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            .expanded-options.animated.cubeInDown(v-if="this.store.get('userMenu') == 'opened' ? true : false")
                .user-info-expanded(v-if="AmIOnOnboarding() ? false : true")
                    .icon A
                    span
                        .name Allan
                        .address ajshdjkashdkjashd
                .wallet-status(v-if="AmIOnOnboarding() ? false : true") 
                    .pill
                        .status-icon
                        .status-label(v-html="store.translate('lace.labels.syncing')")
                hr(v-if="AmIOnOnboarding() ? false : true")/
                router-link(v-if="AmIOnOnboarding() ? false : true",:to="'/address-book'")
                    .item(v-html="store.translate('lace.labels.address-book')")
                router-link(v-if="AmIOnOnboarding() ? false : true",:to="'/settings'")
                    .item(v-html="store.translate('lace.labels.settings')")
                hr(v-if="AmIOnOnboarding() ? false : true")/
                .item.without-hover-effect
                    Toggle(
                        :store="store"
                        @click.stop="changeTheme()"
                        :status="this.store.theme == 'light' ? true : false"
                        labelOn="lace.labels.light-mode"
                        labelOff="lace.labels.light-mode"
                        tooltip="Turn on or off the lights 💡"
                        colorOn="var(--orange)"
                        colorOff="var(--accentPurple)"
                        iconSvgOn='<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.333c.46 0 .833.373.833.834V3a.833.833 0 0 1-1.667 0v-.833c0-.46.373-.834.834-.834ZM11.333 8a3.333 3.333 0 1 1-6.667 0 3.333 3.333 0 0 1 6.667 0ZM10.946 12.125l.59.589a.833.833 0 0 0 1.178-1.178l-.59-.59a.833.833 0 0 0-1.178 1.179ZM12.714 3.286a.833.833 0 0 1 0 1.178l-.59.59a.833.833 0 1 1-1.178-1.179l.59-.59a.833.833 0 0 1 1.178 0ZM13.833 8.833a.833.833 0 0 0 0-1.666H13a.833.833 0 1 0 0 1.666h.833ZM8 12.167c.46 0 .833.373.833.833v.833a.833.833 0 1 1-1.667 0V13c0-.46.373-.833.834-.833ZM3.875 5.054a.833.833 0 0 0 1.178-1.179l-.589-.59a.833.833 0 1 0-1.178 1.18l.589.589ZM5.053 12.125l-.589.589a.833.833 0 0 1-1.178-1.178l.589-.59a.833.833 0 0 1 1.178 1.179ZM3 8.833a.833.833 0 1 0 0-1.666h-.834a.833.833 0 0 0 0 1.666H3Z" fill="#fff"></path></svg>'
                        iconSvgOff='<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.307A6.277 6.277 0 0 1 5.694 2 6.279 6.279 0 1 0 14 10.307Z" fill="#fff"></path></svg>'
                    )/
                a.dropdown(@click.stop.prevent="toggleLang()")
                    .item Language
                    .lang 
                        span(v-if="store.get('selectedLang') == 'en'") English 
                        span(v-if="store.get('selectedLang') == 'pt_br'") Português 
                        span(v-if="store.get('selectedLang') == 'jp'") 日本 
                        span(v-if="store.get('selectedLang') == 'ru'") Pусский 
                        span(v-if="store.get('selectedLang') == 'es'") Español 
                        span(v-if="store.get('selectedLang') == 'it'") Italiano 
                    .item 
                        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"/></svg>
                    .list-lang(v-if="langMenu", :style="AmIOnOnboarding() ? 'bottom: auto; top: 60px;' : ''")
                        .l(@click.stop.prevent="this.store.LoadTranslationAPI('en'); toggleLang(); toggleUserMenu();") English
                        .l(@click.stop.prevent="this.store.LoadTranslationAPI('pt_br'); toggleLang(); toggleUserMenu();") Português
                        .l(@click.stop.prevent="this.store.LoadTranslationAPI('jp'); toggleLang(); toggleUserMenu();") 日本
                        .l(@click.stop.prevent="this.store.LoadTranslationAPI('ru'); toggleLang(); toggleUserMenu();") Pусский
                        .l(@click.stop.prevent="this.store.LoadTranslationAPI('es'); toggleLang(); toggleUserMenu();") Español
                        .l(@click.stop.prevent="this.store.LoadTranslationAPI('it'); toggleLang(); toggleUserMenu();") Italiano
                hr(v-if="AmIOnOnboarding() ? false : true")/
                .item(v-if="AmIOnOnboarding() ? false : true", v-html="store.translate('lace.labels.lock-wallet')")
    button.secondary.sidemenu.animated.zoomIn(v-if="AmIOnOnboarding() ? false : true", @click.stop="toggleSidebar()", :class="store.sidebarVisible ? 'active' : ''")
        span
            .icon-custom(:class="store.sidebarVisible ? 'normal' : 'reverse'")
                .square
                .square
                .arrow(:class="store.theme")
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.83333 2.08398L8.75 5.00065M8.75 5.00065L5.83333 7.91732M8.75 5.00065L1.25 5.00065" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            .chevron
    .underlay(@click.stop="toggleUserMenu()", v-if="this.store.get('userMenu') == 'opened' ? true : false")
</template>