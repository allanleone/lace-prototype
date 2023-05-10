<script>

//- App --------------------------------------------------
import { RouterLink, useRoute } from 'vue-router'
// -------------------------------------------------------

export default {
    data() {
        return {
            mainMenu: [
                {
                    selected: true,
                    label: 'Dashboard',
                    route: '/',
                    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="#3D3B39" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                    iconSelected: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.3397 3.34781C11.8759 2.88406 11.1241 2.88406 10.6603 3.34781L2.34781 11.6603C1.88406 12.1241 1.88406 12.8759 2.34781 13.3397C2.81156 13.8034 3.56344 13.8034 4.02719 13.3397L4.375 12.9919V20.8125C4.375 21.4683 4.90666 22 5.5625 22H7.9375C8.59334 22 9.125 21.4683 9.125 20.8125V18.4375C9.125 17.7817 9.65666 17.25 10.3125 17.25H12.6875C13.3433 17.25 13.875 17.7817 13.875 18.4375V20.8125C13.875 21.4683 14.4067 22 15.0625 22H17.4375C18.0933 22 18.625 21.4683 18.625 20.8125V12.9919L18.9728 13.3397C19.4366 13.8034 20.1884 13.8034 20.6522 13.3397C21.1159 12.8759 21.1159 12.1241 20.6522 11.6603L12.3397 3.34781Z" fill="url(#paint0_linear_4865_467252)"/><defs><linearGradient id="paint0_linear_4865_467252" x1="-1.4766" y1="-0.476591" x2="26.3606" y2="1.57657" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient></defs></svg>',
                },
                {
                    selected: false,
                    label: 'Tokens',
                    route: '/tokens',
                    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6C4 4.89543 4.89543 4 6 4H8C9.10457 4 10 4.89543 10 6V8C10 9.10457 9.10457 10 8 10H6C4.89543 10 4 9.10457 4 8V6Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 6C14 4.89543 14.8954 4 16 4H18C19.1046 4 20 4.89543 20 6V8C20 9.10457 19.1046 10 18 10H16C14.8954 10 14 9.10457 14 8V6Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16C4 14.8954 4.89543 14 6 14H8C9.10457 14 10 14.8954 10 16V18C10 19.1046 9.10457 20 8 20H6C4.89543 20 4 19.1046 4 18V16Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 16C14 14.8954 14.8954 14 16 14H18C19.1046 14 20 14.8954 20 16V18C20 19.1046 19.1046 20 18 20H16C14.8954 20 14 19.1046 14 18V16Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                    iconSelected: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.28571 4C5.02335 4 4 5.02335 4 6.28571V8.57143C4 9.83379 5.02335 10.8571 6.28571 10.8571H8.57143C9.83379 10.8571 10.8571 9.83379 10.8571 8.57143V6.28571C10.8571 5.02335 9.83379 4 8.57143 4H6.28571Z" fill="url(#paint0_linear_4869_467253)"/><path d="M6.28571 13.1429C5.02335 13.1429 4 14.1662 4 15.4286V17.7143C4 18.9767 5.02335 20 6.28571 20H8.57143C9.83379 20 10.8571 18.9767 10.8571 17.7143V15.4286C10.8571 14.1662 9.83379 13.1429 8.57143 13.1429H6.28571Z" fill="url(#paint1_linear_4869_467253)"/><path d="M13.1429 6.28571C13.1429 5.02335 14.1662 4 15.4286 4H17.7143C18.9767 4 20 5.02335 20 6.28571V8.57143C20 9.83379 18.9767 10.8571 17.7143 10.8571H15.4286C14.1662 10.8571 13.1429 9.83379 13.1429 8.57143V6.28571Z" fill="url(#paint2_linear_4869_467253)"/><path d="M13.1429 15.4286C13.1429 14.1662 14.1662 13.1429 15.4286 13.1429H17.7143C18.9767 13.1429 20 14.1662 20 15.4286V17.7143C20 18.9767 18.9767 20 17.7143 20H15.4286C14.1662 20 13.1429 18.9767 13.1429 17.7143V15.4286Z" fill="url(#paint3_linear_4869_467253)"/><defs><linearGradient id="paint0_linear_4869_467253" x1="1.07234" y1="1.07234" x2="24.5142" y2="2.80132" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient><linearGradient id="paint1_linear_4869_467253" x1="1.07234" y1="1.07234" x2="24.5142" y2="2.80132" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient><linearGradient id="paint2_linear_4869_467253" x1="1.07234" y1="1.07234" x2="24.5142" y2="2.80132" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient><linearGradient id="paint3_linear_4869_467253" x1="1.07234" y1="1.07234" x2="24.5142" y2="2.80132" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient></defs></svg>',
                },
                {
                    selected: false,
                    label: 'NFTs',
                    route: '/nfts',
                    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 16L8.15901 11.4142C9.03769 10.6332 10.4623 10.6332 11.341 11.4142L16.5 16M14.25 14L16.034 12.4142C16.9127 11.6332 18.3373 11.6332 19.216 12.4142L21 14M14.25 8H14.2613M5.25 20H18.75C19.9926 20 21 19.1046 21 18V6C21 4.89543 19.9926 4 18.75 4H5.25C4.00736 4 3 4.89543 3 6V18C3 19.1046 4.00736 20 5.25 20Z" stroke="#3D3B39" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                    iconSelected: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.99999 18.6207V16.7854L8.41492 11.9722C9.07094 11.389 10.1704 11.389 10.8264 11.9722L14.0285 14.8185C14.0342 14.8237 14.04 14.8288 14.0458 14.8338L16.5191 17.0323C16.8607 17.336 17.3838 17.3052 17.6875 16.9636C17.9912 16.622 17.9604 16.0989 17.6188 15.7953L15.8319 14.2069L17.1046 13.0756C17.7606 12.4925 18.8601 12.4925 19.5161 13.0756L21.2069 14.5785V18.6207C21.2069 19.2935 20.5602 20 19.5517 20H4.65516C3.6467 20 2.99999 19.2935 2.99999 18.6207ZM11.9261 10.7351L14.5862 13.0996L16.0049 11.8385C17.2881 10.698 19.3326 10.698 20.6157 11.8385L21.2069 12.364V5.37932C21.2069 4.70649 20.5602 4.00001 19.5517 4.00001H4.65516C3.6467 4.00001 2.99999 4.70649 2.99999 5.37932V14.5709L7.31528 10.7351C8.59842 9.59451 10.6429 9.59451 11.9261 10.7351ZM14.5862 6.75863C14.1291 6.75863 13.7586 7.12915 13.7586 7.58622C13.7586 8.04328 14.1291 8.4138 14.5862 8.4138H14.5986C15.0557 8.4138 15.4262 8.04328 15.4262 7.58622C15.4262 7.12915 15.0557 6.75863 14.5986 6.75863H14.5862Z" fill="url(#paint0_linear_4869_467255)"/><defs><linearGradient id="paint0_linear_4869_467255" x1="-0.331475" y1="1.07234" x2="26.3013" y2="3.3076" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient></defs></svg>',
                },
                {
                    selected: false,
                    label: 'Activity',
                    route: '/activity',
                    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16" stroke="#3D3B39" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                    iconSelected: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.6 14.8C5.6 15.4627 6.13726 16 6.8 16C7.46274 16 8 15.4627 8 14.8L8 8.09705L9.55147 9.64852C10.0201 10.1171 10.7799 10.1171 11.2485 9.64852C11.7172 9.17989 11.7172 8.42009 11.2485 7.95146L7.64853 4.35147C7.42349 4.12643 7.11826 4 6.8 4C6.48174 4 6.17652 4.12643 5.95147 4.35147L2.35147 7.95146C1.88284 8.42009 1.88284 9.17989 2.35147 9.64851C2.8201 10.1171 3.5799 10.1171 4.04853 9.64851L5.6 8.09705L5.6 14.8Z" fill="url(#paint0_linear_4869_467257)"/><path d="M17.6 9.99999C17.6 9.33725 17.0627 8.79999 16.4 8.79999C15.7373 8.79999 15.2 9.33725 15.2 9.99999L15.2 16.7029L13.6485 15.1514C13.1799 14.6828 12.4201 14.6828 11.9515 15.1514C11.4828 15.6201 11.4828 16.3799 11.9515 16.8485L15.5515 20.4485C15.7765 20.6735 16.0817 20.8 16.4 20.8C16.7183 20.8 17.0235 20.6735 17.2485 20.4485L20.8485 16.8485C21.3172 16.3799 21.3172 15.6201 20.8485 15.1514C20.3799 14.6828 19.6201 14.6828 19.1515 15.1514L17.6 16.7029L17.6 9.99999Z" fill="url(#paint1_linear_4869_467257)"/><defs><linearGradient id="paint0_linear_4869_467257" x1="-1.51319" y1="0.925969" x2="26.5706" y2="3.29322" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient><linearGradient id="paint1_linear_4869_467257" x1="-1.51319" y1="0.925969" x2="26.5706" y2="3.29322" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient></defs></svg>',
                },
                {
                    selected: false,
                    label: 'Staking',
                    route: '/staking',
                    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7V17C4 19.2091 7.58172 21 12 21C16.4183 21 20 19.2091 20 17V7M4 7C4 9.20914 7.58172 11 12 11C16.4183 11 20 9.20914 20 7M4 7C4 4.79086 7.58172 3 12 3C16.4183 3 20 4.79086 20 7M20 12C20 14.2091 16.4183 16 12 16C7.58172 16 4 14.2091 4 12" stroke="#3D3B39" stroke-width="2"/></svg>',
                    iconSelected: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.75 17.6V16.4556C5.16223 16.7508 5.64137 17.0106 6.16486 17.2349C7.79879 17.9352 10.0038 18.35 12.4 18.35C14.7962 18.35 17.0012 17.9352 18.6351 17.2349C19.1586 17.0106 19.6378 16.7508 20.05 16.4556V17.6C20.05 17.8434 19.9381 18.1381 19.6061 18.4745C19.2709 18.8141 18.7487 19.1543 18.0443 19.4562C16.638 20.0589 14.643 20.45 12.4 20.45C10.157 20.45 8.16201 20.0589 6.75574 19.4562C6.05127 19.1543 5.52909 18.8141 5.19392 18.4745C4.86194 18.1381 4.75 17.8434 4.75 17.6ZM4.75 11.6V10.4556C5.16223 10.7508 5.64137 11.0106 6.16486 11.2349C7.79879 11.9352 10.0038 12.35 12.4 12.35C14.7962 12.35 17.0012 11.9352 18.6351 11.2349C19.1586 11.0106 19.6378 10.7508 20.05 10.4556V11.6C20.05 11.8434 19.9381 12.1381 19.6061 12.4745C19.2709 12.8141 18.7487 13.1543 18.0443 13.4562C16.638 14.0589 14.643 14.45 12.4 14.45C10.157 14.45 8.16201 14.0589 6.75574 13.4562C6.05127 13.1543 5.52909 12.8141 5.19392 12.4745C4.86194 12.1381 4.75 11.8434 4.75 11.6ZM20.05 5.6C20.05 5.84343 19.9381 6.13807 19.6061 6.47446C19.2709 6.81407 18.7487 7.15431 18.0443 7.45623C16.638 8.05891 14.643 8.45 12.4 8.45C10.157 8.45 8.16201 8.05891 6.75574 7.45623C6.05127 7.15431 5.52909 6.81407 5.19392 6.47446C4.86194 6.13807 4.75 5.84343 4.75 5.6C4.75 5.35657 4.86194 5.06193 5.19392 4.72554C5.52909 4.38593 6.05127 4.04569 6.75574 3.74377C8.16201 3.14109 10.157 2.75 12.4 2.75C14.643 2.75 16.638 3.14109 18.0443 3.74377C18.7487 4.04569 19.2709 4.38593 19.6061 4.72554C19.9381 5.06193 20.05 5.35657 20.05 5.6Z" fill="url(#paint0_linear_4869_467259)" stroke="url(#paint1_linear_4869_467259)" stroke-width="1.5"/><defs><linearGradient id="paint0_linear_4869_467259" x1="0.925957" y1="-1.51319" x2="25.5712" y2="0.0773254" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient><linearGradient id="paint1_linear_4869_467259" x1="0.925957" y1="-1.51319" x2="25.5712" y2="0.0773254" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient></defs></svg>',
                },
                {
                    selected: false,
                    label: 'DApp Store',
                    route: '/dappstore',
                    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="#3D3B39" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                    iconSelected: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4C7.33726 4 6.8 4.53726 6.8 5.2C6.8 5.86274 7.33726 6.4 8 6.4H15.2C15.8627 6.4 16.4 5.86274 16.4 5.2C16.4 4.53726 15.8627 4 15.2 4H8Z" fill="url(#paint0_linear_4869_467261)"/><path d="M4.4 8.8C4.4 8.13726 4.93726 7.6 5.6 7.6H17.6C18.2627 7.6 18.8 8.13726 18.8 8.8C18.8 9.46274 18.2627 10 17.6 10H5.6C4.93726 10 4.4 9.46274 4.4 8.8Z" fill="url(#paint1_linear_4869_467261)"/><path d="M2 13.6C2 12.2745 3.07452 11.2 4.4 11.2H18.8C20.1255 11.2 21.2 12.2745 21.2 13.6V18.4C21.2 19.7255 20.1255 20.8 18.8 20.8H4.4C3.07452 20.8 2 19.7255 2 18.4V13.6Z" fill="url(#paint2_linear_4869_467261)"/><defs><linearGradient id="paint0_linear_4869_467261" x1="-1.51319" y1="0.925962" x2="26.5706" y2="3.29321" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient><linearGradient id="paint1_linear_4869_467261" x1="-1.51319" y1="0.925962" x2="26.5706" y2="3.29321" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient><linearGradient id="paint2_linear_4869_467261" x1="-1.51319" y1="0.925962" x2="26.5706" y2="3.29321" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient></defs></svg>',
                },
            ],
            hoverIndex: 0,
        }
    },
    props: {
        theme: String,
    },
    methods: {
        selectMenu(item) {
            this.mainMenu.forEach((e) => {
                e.selected = false;
            })
            item.selected = true;
        },
    },
    created() {
        this.mainMenu.forEach((m) => {
            if (m.route == ("/" + useRoute().name)) {
                this.selectMenu(m)
            }
        })
    },
}
</script>
<!--  -->
<template lang="pug">
.main-menu 
    ul 
        router-link(v-for="(menu, index) in mainMenu", @click="selectMenu(menu)", :to="menu.route")
            li(
                :class="menu.selected ? 'active' : ''"
                @mouseenter="hoverIndex = index"
            )
                .icon(
                    v-html="menu.iconSelected"
                    v-if="menu.selected || hoverIndex == index"
                )
                .icon(
                    v-html="menu.icon"
                    v-if="!menu.selected && hoverIndex != index"
                )
                .label {{menu.label}}
</template>
<!--  -->
<style lang="scss">
.main-menu{
    height: calc(100% - 65px);
    ul{
        font-size: var(--mainMenuFontSize);
        font-weight: 500;
        list-style: none;
        padding: 0;
        a{
            text-decoration: none;
            color: var(--textColorPrimary);
        }
        li{
            cursor: pointer;
            display: flex;
            padding: 20px;
            align-items: center;
            justify-content: left;
            margin-bottom: 16px;
            white-space: nowrap;
            .icon{
                margin-right: 10px;
            }
            &.active{
                .label{
                    font-weight: 700;
                }
            }
            &:hover{

            }
        }
        @media screen and (max-width: 1024px) {
            .label{
                display: none;
            }
        }
    }
    @media screen and (max-width: 512px) {
        display: block;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: var(--bgCard);
        height: 70px;
        box-shadow: 0px 0px 3px rgba(0,0,0,.10);
        ul{
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            white-space: nowrap;
            height: 100%;
            margin: auto;
            li{
                display: inline-grid;
                width: calc(100% / 6);
                align-items: center;
                justify-content: center;
                margin: auto;
                .icon{
                    margin: auto;
                }
            }
        }
    }
    @media screen and (min-width: 512px) and (max-width: 1024px) {
        width: 50px;
        transition: width .25s ease-in-out;
        &:hover{
            width: 150px;
            overflow: hidden;
            position: fixed;
            background-color: var(--bg);
            z-index: 99;
            box-shadow: 25px 0px 20px var(--bgCard);
            // li:hover{
            //     .label{
            //         display: block;
            //     }
            // }
            .label{
                display: block;
            }
        }
    }
}
</style>