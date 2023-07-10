<script>
import Toggle from './ui/Toggle.vue'
import MainNetworkStatus from './ui/MainNetworkStatus.vue'
export default {
    props: {
        store: Object,
    },
    data() {
        return {
            theme: this.store.get("theme"),
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
                    z-index: -1;
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
        display: none;
        position: fixed;
        // background: var(--gradientTransparent);
        top: 0;
        left: 0;
        width: 100%;
        height: 90px;
        z-index: -1;
        backdrop-filter: blur(5px);
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
    z-index: 1;
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
    .item{
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        padding: 16px 16px;
        margin: 4px -15px;
        transition: background-color .25s ease-in-out;
        border-radius: var(--radius);
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
.user-menu
    .brand 
        img(class="symbol", :src="'assets/images/' + theme + '/lace_symbol.svg'", alt="")
        MainNetworkStatus/
    button.receive(@click="openSidedrawer({global: 'receive', action: 'receive', title: 'Receive'})")
        span
            .icon 
                <svg width="1em" height="1em" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path style="fill: var(--orange);" d="M13.5 4a1 1 0 1 0-2 0h2Zm-2 1a1 1 0 1 0 2 0h-2Zm7 10a1 1 0 1 0 0 2v-2Zm2 2a1 1 0 1 0 0-2v2Zm-8-1v-1a1 1 0 0 0-1 1h1Zm2 1a1 1 0 1 0 0-2v2Zm-3 3a1 1 0 1 0 2 0h-2Zm2-11a1 1 0 1 0-2 0h2Zm-1 3h-1a1 1 0 0 0 1 1v-1Zm4 7a1 1 0 1 0 0 2v-2Zm4 2a1 1 0 1 0 0-2v2Zm-16-10a1 1 0 1 0 0 2v-2Zm4 2a1 1 0 1 0 0-2v2Zm4.01 0a1 1 0 1 0 0-2v2Zm4 0a1 1 0 1 0 0-2v2Zm3.99-2a1 1 0 1 0 0 2v-2Zm.01 2a1 1 0 1 0 0-2v2ZM5.5 5h2V3h-2v2Zm2 0v2h2V5h-2Zm0 2h-2v2h2V7Zm-2 0V5h-2v2h2Zm0 0h-2a2 2 0 0 0 2 2V7Zm2 0v2a2 2 0 0 0 2-2h-2Zm0-2h2a2 2 0 0 0-2-2v2Zm-2-2a2 2 0 0 0-2 2h2V3Zm12 2h2V3h-2v2Zm2 0v2h2V5h-2Zm0 2h-2v2h2V7Zm-2 0V5h-2v2h2Zm0 0h-2a2 2 0 0 0 2 2V7Zm2 0v2a2 2 0 0 0 2-2h-2Zm0-2h2a2 2 0 0 0-2-2v2Zm-2-2a2 2 0 0 0-2 2h2V3Zm-12 14h2v-2h-2v2Zm2 0v2h2v-2h-2Zm0 2h-2v2h2v-2Zm-2 0v-2h-2v2h2Zm0 0h-2a2 2 0 0 0 2 2v-2Zm2 0v2a2 2 0 0 0 2-2h-2Zm0-2h2a2 2 0 0 0-2-2v2Zm-2-2a2 2 0 0 0-2 2h2v-2Zm6-11v1h2V4h-2Zm7 13h2v-2h-2v2Zm-6 0h2v-2h-2v2Zm-1-1v4h2v-4h-2Zm0-7v3h2V9h-2Zm5 12h4v-2h-4v2Zm-12-8h4v-2h-4v2Zm8 0h.01v-2h-.01v2Zm8 0h.01v-2h-.01v2Zm-8 0h4.01v-2H12.5v2Z" fill="url(#arrow-diagonal-down_component_svg__a)"></path><defs><linearGradient id="arrow-diagonal-down_component_svg__a" x1="1.57" y1="1.072" x2="25.027" y2="2.803" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"></stop><stop offset="1" stop-color="#FDC300"></stop></linearGradient></defs></svg>
            .label Receive 
            .chevron
    button.send(@click="openSidedrawer({global: 'send', action: 'send', title: 'Send'})")
        span
            .icon 
                <svg width="1em" height="1em" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path style="fill: var(--orange);"  d="M8.964 4.636a1 1 0 1 0 0 2v-2Zm9.9 1h1a1 1 0 0 0-1-1v1Zm-1 9.9a1 1 0 1 0 2 0h-2Zm-12.435 2.12a1 1 0 0 0 1.414 1.415L5.43 17.657Zm3.535-11.02h9.9v-2h-9.9v2Zm8.9-1v9.9h2v-9.9h-2Zm.293-.707L5.429 17.657l1.414 1.414L19.571 6.343 18.157 4.93Z" fill="url(#arrow-diagonal-up_component_svg__a)"></path><defs><linearGradient id="arrow-diagonal-up_component_svg__a" x1="14.432" y1="-3.454" x2="28.133" y2="11.915" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"></stop><stop offset="1" stop-color="#FDC300"></stop></linearGradient></defs></svg>
            .label Send 
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
            .icon A
            .label
            .chevron
                span.arrow
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 9L12 16L5 9" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                span.menu
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M4 18H20" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            .expanded-options.animated.cubeInDown(v-if="this.store.get('userMenu') == 'opened' ? true : false")
                .user-info-expanded
                    .icon A
                    span
                        .name Allan
                        .address ajshdjkashdkjashd
                .wallet-status 
                    .pill
                        .status-icon
                        .status-label Synced
                hr/
                router-link(:to="'/address-book'")
                    .item Address book
                router-link(:to="'/settings'")
                    .item Settings
                hr/
                .item.without-hover-effect
                    Toggle(
                        @click.stop="changeTheme()"
                        :status="this.store.theme == 'light' ? true : false"
                        labelOn="Light Mode"
                        labelOff="Dark Mode"
                        tooltip="Turn on or off the lights 💡"
                        colorOn="var(--orange)"
                        colorOff="var(--accentPurple)"
                        iconSvgOn='<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.333c.46 0 .833.373.833.834V3a.833.833 0 0 1-1.667 0v-.833c0-.46.373-.834.834-.834ZM11.333 8a3.333 3.333 0 1 1-6.667 0 3.333 3.333 0 0 1 6.667 0ZM10.946 12.125l.59.589a.833.833 0 0 0 1.178-1.178l-.59-.59a.833.833 0 0 0-1.178 1.179ZM12.714 3.286a.833.833 0 0 1 0 1.178l-.59.59a.833.833 0 1 1-1.178-1.179l.59-.59a.833.833 0 0 1 1.178 0ZM13.833 8.833a.833.833 0 0 0 0-1.666H13a.833.833 0 1 0 0 1.666h.833ZM8 12.167c.46 0 .833.373.833.833v.833a.833.833 0 1 1-1.667 0V13c0-.46.373-.833.834-.833ZM3.875 5.054a.833.833 0 0 0 1.178-1.179l-.589-.59a.833.833 0 1 0-1.178 1.18l.589.589ZM5.053 12.125l-.589.589a.833.833 0 0 1-1.178-1.178l.589-.59a.833.833 0 0 1 1.178 1.179ZM3 8.833a.833.833 0 1 0 0-1.666h-.834a.833.833 0 0 0 0 1.666H3Z" fill="#fff"></path></svg>'
                        iconSvgOff='<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.307A6.277 6.277 0 0 1 5.694 2 6.279 6.279 0 1 0 14 10.307Z" fill="#fff"></path></svg>'
                    )/
                hr/
                .item Lock wallet
    button.secondary.sidemenu.animated.zoomIn(@click.stop="toggleSidebar()", :class="store.sidebarVisible ? 'active' : ''")
        span
            .icon-custom(:class="store.sidebarVisible ? 'normal' : 'reverse'")
                .square
                .square
                .arrow(:class="store.theme")
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.83333 2.08398L8.75 5.00065M8.75 5.00065L5.83333 7.91732M8.75 5.00065L1.25 5.00065" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            //- .icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M13 18H20" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                //- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7V5Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 13C4 12.4477 4.44772 12 5 12H11C11.5523 12 12 12.4477 12 13V19C12 19.5523 11.5523 20 11 20H5C4.44772 20 4 19.5523 4 19V13Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 13C16 12.4477 16.4477 12 17 12H19C19.5523 12 20 12.4477 20 13V19C20 19.5523 19.5523 20 19 20H17C16.4477 20 16 19.5523 16 19V13Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                //- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 16L3 12M3 12L7 8M3 12L21 12" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                //- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            //- .label
                span(v-if="!store.sidebarVisible") Show
                span(v-if="store.sidebarVisible") Hide
            .chevron
    .underlay
</template>