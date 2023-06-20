<script>


//- App --------------------------------------------------
import { RouterLink, RouterView, useRouter  } from 'vue-router'
// -------------------------------------------------------

//- Static -----------------------------------------------
import UserMenu from '../components/static/UserMenu.vue';
import MainMenu from '../components/static/MainMenu.vue';
import Input from '../components/static/ui/Input.vue';
import MainNetworkStatus from '../components/static/ui/MainNetworkStatus.vue';
import SideDrawer from '../components/static/ui/SideDrawer.vue';
import Tracker from '../components/tracker/Tracker.vue';
// ------------------------------------------------------- 

//- Widgets ----------------------------------------------
import AboutYourWallet from '../components/widgets/AboutYourWallet.vue'
import AboutLace from '../components/widgets/AboutLace.vue'
import Search from '../components/widgets/Search.vue'
import NetworkInfo from '../components/widgets/NetworkInfo.vue'
import AddressBook from '../components/widgets/AddressBook.vue'
// -------------------------------------------------------

export default {
    props: { 
        store: Object,
    }, 
    data() {
        return { 
            theme: this.store.theme,
            page: null,
            popupRestore: false,
            stage: 1, 
            termsChecked: false,
            helpImprove: true,
            password: "",
            checkpassword: "",
            walletName: "",
            tabRecovery: 1,
            newWord: "",
            showSugestions: false,
            wordsRecovery: [
                'horse',
                'autumn',
                'water',
                'colorful',
                'powerful',
                'crypto',
                'sunflower',
                'spider',
            ],
            suggestionsRecovery: [
                'alright',
                'amusing',
                'autonomo',
                'artistic',
                'absense'
            ]

        }
    },
    components: {
        UserMenu,
        MainMenu,
        Input,
        //
        SideDrawer,
        //
        AboutYourWallet,
        AboutLace,
        Search,
        NetworkInfo,
        MainNetworkStatus,
        AddressBook,
        Tracker,
    },
    methods: {
        toggleSidebar() {
            if (this.store.get('sidebarVisible') == true) {
                this.store.set({ key: 'widgetTransition', value: false })
                this.store.setDelayed({ key: 'sidebarVisible', value: false })
            } else {  
                this.store.set({ key: 'widgetTransition', value: true })
                this.store.set({ key: 'sidebarVisible', value: true })
            }
        },
        showOrHideSidebarOnThisPage(){
            const router = useRouter().currentRoute.value.name;
            if(router == "DAppStore" || router == "Onboarding"){
                return false;
            }else{
                return true;
            }
        },
        showOrHideMainMenuOnThisPage(){
            const router = useRouter().currentRoute.value;
            // console.log(router)
            if (router.fullPath == "/") {
                return false; 
            } else { 
                return true;
            }   
        },
        checkPageName(){ 
            return useRouter().currentRoute.value.name
        }, 
        changeStageTo(st, timer){
            if(this.stage == 5){
                window.location.href = "/tokens"
            }else{
                // 
                if(st == "back"){  
                    return this.stage = (this.stage - 1);
                }
                if(st == "next"){  
                    return this.stage = (this.stage + 1);
                }
                if(!timer){
                    this.popupRestore = false;
                    this.stage = st; 
                }else{
                    window.setTimeout(()=>{
                        this.stage = st;
                    }, timer)
                }
                // 
            }
        },
        nextShouldBeEnabled(){
            if(this.stage == 2){
                if(this.termsChecked == false){
                    return true; 
                }
            }else if (this.stage == 3) {
                if (this.password.length < 5 || this.checkpassword.length < 5 || this.walletName.length < 3) {
                    return true;
                }
            }
        },
        focusRecovery(){
            document.querySelector("#txtrecovery").focus();
            this.showSugestions = true;
        },
        filterSuggestions(){
            this.suggestionsRecovery.filter(r => { 
                r.includes(this.addWord.toLowerCase()) 
            })
        }
    }, 
    updated(){
        this.page = useRouter().currentRoute.value.name;
        setTimeout(() => { 
            console.log(this.page)
            if(this.page == "onboarding"){
                document.querySelector("#lace").style.backgroundImage = "url('assets/images/background-onboarding.png')"
            }
        }, 500);   
        // let minimum = document.querySelector(".content").offsetWidth;
        // window.addEventListener("resize", ()=>{
        //     minimum = minimum < document.querySelector(".content").offsetWidth ? minimum : document.querySelector(".content").offsetWidth
        //     document.querySelector(".debug").innerHTML = "c: " + document.querySelector(".content").offsetWidth + " | " + "m: " + minimum;
        // }); 
        // minimum = minimum < document.querySelector(".content").offsetWidth ? minimum : document.querySelector(".content").offsetWidth
        // document.querySelector(".debug").innerHTML = "c: " + document.querySelector(".content").offsetWidth + " | " + "m: " + minimum;
    }, 
} 
</script>
 
<template lang="pug"> 
.main#lace(:class="(showOrHideSidebarOnThisPage() == false ? 'no-widgets ' : ' ') + (showOrHideMainMenuOnThisPage() == false ? 'no-mainmenu ' : ' ')")
    .col(v-if="showOrHideMainMenuOnThisPage()")
        .sticky  
            //- Lace Brand         
            .brand 
                img(class="standard", :src="'assets/images/' + store.theme + '/lace.svg'", alt="")
                img(class="symbol", :src="'assets/images/' + store.theme + '/lace_symbol.svg'", alt="")
                MainNetworkStatus/       
            //-           
            //-  Main menu    
            MainMenu(theme="theme")/   
    .col(v-if="showOrHideMainMenuOnThisPage()")  
        .sticky     
            .global-search-content-placeholder
                //- Input(type="text", placeholder="Search")
        .content
            UserMenu(class="middle", :theme="theme", :store="store", :class="showOrHideSidebarOnThisPage() == false ? 'no-widgets' : ''")/
            .widgets-overlay.animated(@click="toggleSidebar()", :class="(store.widgetTransition ? 'fadeIn' : 'fadeOut delay-0-5s') + (store.sidebarVisible ? ' visible ' : ' hidden ')")
                .widgets(:class="(store.widgetTransition ? '' : 'animated toggleOutRight')")
                    .static-top  
                    //- Search.animated.toggleInRight.delay-0-2s/
                    AboutLace.animated.toggleInRight.delay-0-4s(title="About Lace")/
                    NetworkInfo.animated.toggleInRight.delay-0-6s(title="Network Info")/
                    AboutYourWallet.animated.toggleInRight.delay-0-8s(title="About your wallet")/
                .underlay    
            //- .debug(style="position: fixed; font-size: 42px; bottom: 20px; left: 20px; background-color: #eeeeeeee; border-radius: 10px; z-index: 99999999999; padding: 10px;") 768
            <RouterView :store="store" />   
    .col(v-if="showOrHideMainMenuOnThisPage()") 
        .sticky 
            UserMenu(class="side", :theme="theme", :store="store",)/    
            .widgets.animated
                //- Search.animated.toggleInLeft.delay-0-2s/
                NetworkInfo.animated.toggleInLeft.delay-0-2s(title="Network Info", v-show="checkPageName() == 'staking'")/
                AboutLace.animated.toggleInLeft.delay-0-2s(title="About Lace", v-show="checkPageName() == 'settings'")/
                //- AddressBook.animated.toggleInLeft.delay-0-2s(title="Add new address", v-show="checkPageName() == 'addressBook'")/
                AboutYourWallet.animated.toggleInLeft.delay-0-2s(title="About your wallet", v-show="checkPageName() == 'addressBook' || checkPageName() == 'tokens' || checkPageName() == 'nfts' || checkPageName() == 'activity' || checkPageName() == 'staking' || checkPageName() == 'dashboard'")/
    SideDrawer(:store="store", v-if="store.sidedrawerVisible")/
    
    //-     
    include includes/onboarding.pug 
    //- 
    
    Tracker/
</template>
  
<style lang="scss">

// Static & prototype related
@import '../scss/static/_animate';
@import '../scss/static/_brand';
@import '../scss/static/transitions';

// Layout structure
@import '../scss/structure/layout';
@import '../scss/structure/theme';
@import '../scss/structure/headers';

// General Components
@import '../scss/components/buttons';
@import '../scss/components/pills';
@import '../scss/components/input';

#lace{
    background-position: center center;
    background-size: cover;
}

.widgets{
    z-index: 0;
    padding-bottom: 50px;
    margin-top: 55px;
}
.global-search-content-placeholder{
    display: grid;
    width: 100%;
    height: 50px;
    margin-bottom: 50px;
    top: 0;
    background: linear-gradient(180deg, var(--bg) 25%, transparent);
    // background: var(--bg);
    backdrop-filter: blur(0px);
    z-index: 99;
    visibility: hidden;
}
.widgets-overlay{
    width: 100%;
    position: fixed;
    right: 0px;
    top: 0;
    height: calc(100% - 70px);
    z-index: 1;
    padding-right: 16px;
    padding-top: 70px;
    overflow-x: hidden;
    overflow-y: scroll;
    justify-content: end;
    background-color: var(--underlay);
    display: none;
    // backdrop-filter: blur(5px);
    @media screen and (min-width: 1280px) {
        display: none !important;
        &.visible{
            display: none !important;
        }
    }
    &.visible{
        display: grid;
        .widgets{
        }
    }
    .widgets{
        max-width: 365px;
    }
    .underlay{
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        width: 500px;
        height: 100%;
        z-index: -2;
        background: var(--underlay);
    }
    .static-top{
        position: fixed;
        top: 0;
        right: 20px;
        width: 410px;
        height: 100px; 
        background: linear-gradient(var(--fadingGradient) 50%, transparent 100%);
        z-index: 1;
        // display: none;
        border-radius: 100px 0px 0px 100px;
    }
}
.onboarding{
    background-size: cover;
    position: relative;
    width: 100%;
    .nav-onboarding {
        display: grid;
        grid-template-columns: 1fr 200px;
        width: 100%;
        width: calc(100% - 60px);
        place-content: center;
        margin: 20px 30px;
        gap: 20px;
        .brand-onboarding{
            
        }
        .help-and-support{

        }
    }
    .background-onboarding{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 0;
        background-size: cover;
        img{
            width: 100%;
            height: 145%;
            margin-top: -12%;
            // aspect-ratio: 1/1;
        }
    }
    .footer-onboarding{
        position: absolute;
        padding: 20px 30px;
        width: calc(100% - 60px);
        margin-top: -70px;
        height: auto;
        // bottom: 0;
        // right: 0;
        z-index: 0;
        text-align: right;
        a, a:visited, a:hover, a:active{
            padding: 0px 10px;
            color: var(--midGray);
            font-weight: bold;
            cursor: pointer;
            span{
                font-weight: 300;
            }
        }
    }
    .body-onboarding {

        @keyframes introEffect{
            0%{opacity: 0;}
            90%{opacity: 0;}
            100%{opacity: 1;}
        }
        display: grid;
        place-self: center;
        display: grid;
        place-content: center;
        min-width: 840px;
        // min-height: 585px;
        height: calc(100% - 200px); 
        margin: auto auto 100px auto;
        
        .main-window{
            // width: 10px;
            // height: 10px;
            width: 840px;
            height: 585px;
            background-color: #ffffffCC;
            border-radius: var(--radius); 
            // animation: introEffect 4s ease-in-out forwards;
            box-shadow: var(--tinyShadow);

            .bold{
                font-weight: 900;
                margin: 30px auto;
            }
            .gradient{
                background: var(--gradient); 
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            h1{ 
                font-size: 54px;
                line-height: 54px; 

                &.animatedIntro{
                    @keyframes introHello{
                        0%{opacity: 0; top: calc(50% - 50px);left: calc(50% - 80px);}
                        33%{opacity: 1; transform: scale(1.5); top: calc(50% - 120px);left: calc(50% - 80px);}
                        50%{opacity: 1; transform: scale(1.5); top: calc(50% - 120px);left: calc(50% - 80px);}
                        70%{opacity: 1; transform: scale(1.5); top: calc(50% - 120px);left: calc(50% - 80px);}
                        80%{opacity: 1; top: calc(50% - 120px);left: calc(50% - 80px);}
                        99%{opacity: 1; top: calc(50% - 265px);left: calc(50% - 380px);}
                        100%{opacity: 1; top: calc(50% - 265px);left: calc(50% - 380px);}
                    }
                    position: absolute;
                    top: calc(50% - 265px);
                    left: calc(50% - 380px);
                    width: 160px;
                    height: 120px;
                    opacity: 0; 
                    animation: introHello 2s ease-in-out forwards;
                    animation-delay: 1.5s;
                }

            }
 

            .modal-restore-overlay{
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;  
                z-index: 1;
                .background-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    background: #00000099;
                    width: 100%;
                    height: 100%;  
                    z-index: 0;
                }
                .floating-window{ 
                    @keyframes popupwindowIntro {
                        0%{opacity: 0; transform: scale(.0) translate(100px, 100px); }
                        100%{opacity: 1; transform: scale(1) translate(0px, 0px); }
                    }
                    transform-origin: bottom right 60px;
                    animation: popupwindowIntro .35s ease-in-out;
                    background: #ffffff;
                    border-radius: var(--radius);
                    width: 480px;
                    height: 300px;
                    z-index: 2;
                    position: absolute;
                    padding: 40px;
                    top: calc(50% - 200px);
                    left: calc(50% - 280px);
                    text-align: center;
                    box-shadow: var(--shadow);
                    .title{
                        font-size: 28px;
                    }
                    .desc{ 
                        font-size: 22px;
                        font-weight: 300;
                        color: var(--textColorSecondary);
                        margin: 40px auto;
                    }
                    .buttons{
                        margin-top: 18px;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 20px;
                    }
                }
            }
            .stage-1{
                
            }
            .stage-1, .stage-2, .stage-3{ 
                display: grid; 
                position: relative;
                grid-template-columns: 200px 1fr;
                grid-template-rows: 1fr;
                gap: 20px;
                padding: 40px;
                width: calc(100% - 80px);
                height: calc(100% - 80px);
                justify-content: left;
                align-content: flex-start;
                .placeholder{
                    visibility: hidden;
                }
                .content-column:first-child{
                    display: grid;
                    height: 100%;
                    width: 100%;
                    grid-template-rows: 1fr 1fr 50px;
                    grid-template-columns: 1fr;
                    .networks{
                        svg, img{
                            width: 32px;
                            height: auto;
                            margin-right: 5px;
                            margin-top: 10px;
                            opacity: .25;
                        }
                    }
                }
                .content-column:last-child{
                    place-content: center;
                    display: grid;
                    .items{
                        place-content: center;
                        width: 100%;
                        height: auto;
                    }
                    hr{
                        opacity: .15;
                        margin: 20px auto;
                    }
                    .select-option-item{
                        grid-template-columns: auto auto 150px;
                        gap: 30px;
                        display: grid;
                        padding: 20px;
                        text-align: left;
                        .icon{
                            width: 32px;
                            margin: auto;
                            display: grid;
                            // place-content: center;
                            img, svg{
                                width: 100%;
                                height: auto;
                            }
                        }
                        .title{
                            font-weight: bold;
                            margin: 10px auto;
                        }
                        .desc{
                            height: 40px;    
                        }
                        .cta{
                            margin:  auto;
                            width: 100%;
                            button{
                                width: 100%;
                            }
                        }
                    }
                }
                .improve-input{
                    padding: 0px 10px;
                }
                .terms-input{
                    display: grid;
                    grid-template-columns: 1fr 170px;
                    align-content: center;
                    border-radius: 10px;
                    width: calc(100% - 30px);
                    padding: 0px 10px;
                    .info{
                        margin-top: 9px;
                        .required-label{
                            font-size: 14px;
                            color: var(--orange);
                        }
                        svg{
                            width: 16px;
                            margin-right: 5px;
                            margin-bottom: -7px;
                            path{
                                fill: var(--orange);
                            }
                        }
                    }
                }
            }
            .stage-2{
                --positionClip: 650px 440px;
                @keyframes circleRevealRestore {
                    0%{clip-path: circle(0px at var(--positionClip));}
                    100%{clip-path: circle(1000px at var(--positionClip));}
                }
                a, a:visited, a:active, a:hover{
                    color: var(--blue);
                }
                width: 760px;
                height: 500px;
                z-index: 3;
                position: absolute;  
                padding: 40px;
                top: calc(50% - 300px);
                left: calc(50% - 420px);
                background-color: #ffffff; 
                border-radius: var(--radius); 
                animation: circleRevealRestore .75s ease-in-out forwards;
                animation-delay: .25s;
                .content-column{
                    &:first-child{ 
                        grid-template-rows: 1fr;
                    }
                    &:last-child{
                        width: 100%;
                        justify-content: left;
                        grid-template-rows: 1fr 50px;
                        .content-stage{
                            grid-template-rows: 50px 1fr;
                        }   
                        h2{ 
                            white-space: nowrap;
                        } 
                        .content-section{
                            max-height: 350px;
                            overflow-x: hidden;
                            overflow-y: auto;
                        }
                        ul{
                            list-style: none;
                            padding: 5px 0;
                            li{ 
                                padding: 8px 0;
                                svg{
                                    margin-right: 5px;
                                    margin-bottom: -7px;
                                } 
                            }
                        }
                        .col-input{
                            display: grid;
                            grid-template-columns: 1fr 60px;
                            padding-bottom: 0px;
                            svg{
                                width: 16px;
                                margin-right: 20px;
                                margin-top: -5px;
                                opacity: .5;
                                z-index: 1;
                                position: absolute;
                                padding: 20px;
                                margin-top: -22px;
                                margin-left: -30px;
                                cursor: pointer;
                            } 
                        }
                        input{
                            margin-top: 15px;
                            margin-bottom: 15px;
                        }
                        .passwd{
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 20px;
                            svg{
                                width: 16px;
                                position: absolute;
                                background-color: var(--bgCard);
                                padding: 15px;
                                margin-top: 21px;
                                margin-left: -56px;
                                border-radius: 12px;
                            }
                            .score{
                                display: grid;
                                gap: 10px;
                                margin-top: -8px;
                                margin-bottom: 10px;
                                grid-template-columns: 1fr 1fr 1fr 1fr;
                                &.none{
                                    .bar{
                                        background-color: var(--midGray);
                                        &:nth-child(1){ opacity: .25; }
                                        &:nth-child(2){ opacity: .25; }
                                        &:nth-child(3){ opacity: .25; }
                                        &:nth-child(14){ opacity: .25; }
                                    }
                                }
                                &.low{
                                    .bar{
                                        background-color: var(--dataPink);
                                        &:nth-child(1){ opacity: 1; }
                                        &:nth-child(2){ opacity: .25; }
                                        &:nth-child(3){ opacity: .25; }
                                        &:nth-child(14){ opacity: .25; }
                                    }
                                }
                                &.medium{
                                    .bar{
                                        background-color: var(--orange);
                                        &:nth-child(1){ opacity: 1; }
                                        &:nth-child(2){ opacity: 1; }
                                        &:nth-child(3){ opacity: .25; }
                                        &:nth-child(14){ opacity: .25; }
                                    }
                                }
                                &.high{
                                    .bar{
                                        background-color: var(--green);
                                        &:nth-child(1){ opacity: 1; }
                                        &:nth-child(2){ opacity: 1; }
                                        &:nth-child(3){ opacity: 1; }
                                        &:nth-child(4){ opacity: .25; }
                                    }
                                }
                                &.great{
                                    .bar{
                                        background-color: var(--green);
                                        &:nth-child(1){ opacity: 1; }
                                        &:nth-child(2){ opacity: 1; }
                                        &:nth-child(3){ opacity: 1; }
                                        &:nth-child(4){ opacity: 1; }
                                    }
                                }
                                .bar{
                                    width: 100%;
                                    height: 4px;
                                    border-radius: var(--radius);
                                    background-color: var(--midGray);
                                    opacity: .25;
                                }
                            }
                            .feedback-passwd{ 
                                font-size: 12px;
                                color: var(--textColorSecondary);
                                display: grid;
                                grid-template-columns: 20px 1fr;
                                align-content: center;
                                align-self: center;
                                align-items: center;
                                svg{
                                    width: 16px;
                                    position: relative; 
                                    display: inline-grid;
                                    opacity: 1;
                                    margin: 0px;
                                    padding: 0;
                                }
                                &.green, .green{
                                    color: var(--green);
                                }
                                &.red, .red{
                                    color: var(--dataPink);
                                }
                            }
                        }
                        .know-more-privacy{
                            padding: 20px 20px 0 20px;
                            border: solid 1px var(--lightGrayPlus);
                            width: calc(100% - 80px);
                            border-radius: var(--radius);
                            .title-know-more{
                                background: var(--lightGray);
                                padding: 15px 20px; 
                                margin: -20px;
                                border-radius: 10px 0 10px 0;
                            }
                        }
                    }
                    .button-area{
                        display: grid;
                        grid-template-columns: 100px 1fr auto;
                        .tooltip{
                            position: absolute;
                            margin-top: -105px;
                            background: #fff;
                            box-shadow: var(--tinyShadow);
                            opacity: 1;
                            width: 210px;
                            margin-left: -80px;
                            padding: 15px;
                            font-size: 14px;
                            text-align: center;
                            border-radius: 16px;
                        }
                    }
                    .content-section{
                        width: 100%;
                        min-width: 540px;
                    }
                    .tabs{
                        display: grid;
                        gap: 10px;
                        grid-template-columns: 1fr 1fr 1fr;
                        padding: 5px;
                        background-color: var(--lightGrayPlus);
                        border-radius: 12px;
                        margin: 15px 0;
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
                    .follow {
                        width: calc(100% - 20px);
                        height: auto;
                        padding: 10px;
                        display: grid;
                        grid-template-columns: 50px 1fr 50px;
                        background-color: var(--lightGray);
                        margin: 10px;
                        border-radius: 100px;
                        cursor: pointer;
                        &:hover{
                            background-color: var(--lightGrayPlus);
                        }
                        span{
                            padding-left: 20px;
                            place-self: center;
                            justify-self: left;
                        }
                        .ico{
                            background: var(--darkGray);
                            width: 50px;
                            height: 50px;
                            border-radius: 100px;
                            display: grid;
                            place-content: center;
                            svg{
                                width: 24px;
                                path{
                                    fill: var(--white);
                                }
                            }
                        }
                        .chevron{
                            place-self: center;
                        }
                    }
                }
                .textarea-recovery{
                    width: calc(100% - 20px);
                    height: 200px;
                    border: solid 1px var(--midGray);
                    border-radius: 12px;
                    padding: 10px;
                    overflow-x: hidden;
                    overflow-y: scroll;
                    .item-rec{
                        padding: 20px;
                        background-color: var(--lightGrayPlus);
                        width: auto;
                        display: inline-block;
                        margin: 5px 10px;
                        border-radius: 100px;
                    }
                    label{
                        display: inline-block;
                        margin: 0 10px !important;
                        max-width: 150px;
                        input{
                            margin: 0px !important;
                            border-radius: 100px;
                            background-color: var(--bgCard);
                            &::placeholder{
                                color: var(--bgCard);
                            }
                            &:focus{
                                background-color: var(--inputTextBg);
                                &::placeholder{
                                    color: var(--textColorSecondary);
                                }
                            }
                        }
                    }
                    .auto-complete{
                        position: absolute;
                        border: solid 1px var(--midGray);
                        padding: 10px;
                        border-radius: var(--radius);
                        width: 130px;
                        bottom: 60px;
                        height: auto;
                        max-height: 75px;
                        overflow: scroll;
                        background: var(--white);
                        .item{
                            padding: 10px;
                            border-radius: 10px;
                            margin: 3px 0;
                            &:hover{
                                background-color: var(--lightGrayPlus);
                            }
                        }
                    }
                }
                @keyframes circleRevealIntro {
                    0%{clip-path: circle(0px at center);}
                    25%{clip-path: circle(0px at center);}
                    50%{clip-path: circle(1000px at center);}
                    75%{clip-path: circle(1000px at center);}
                    100%{clip-path: circle(0px at center);} 
                }
                .intro{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    display: grid; 
                    place-content: center;
                    text-align: center; 
                    width: 100%;
                    clip-path: circle(0px at center);
                    animation: circleRevealIntro 3s ease-in-out forwards;
                    background: #efefef;
                    z-index: 1;
                    .ico{ 
                        svg, img{
                            width: 64px !important;
                            height: auto;
                            margin: 20px auto;
                        } 
                    }
                    .label{
                        font-size: 18px;
                    }
                }  
                .timeline{
                    display: grid;
                    grid-template-rows: 1fr 1fr 1fr 1fr;
                    height: 100%;
                    .point{
                        display: grid;
                        grid-template-columns: 20px 1fr;
                        gap: 10px;
                        align-content: center;
                        position: relative;
                        &:before{
                            content: '';
                            width: 1px;
                            background: var(--lightGrayPlus);
                            position: absolute;
                            height: 100px;
                            bottom: -50px; 
                            left: 6px;
                            transition: background .5s ease-in-out;
                            z-index: -1;
                        }
                        &.path-done{ 
                            &:before{
                                background: var(--orange);
                            }
                        }
                        &:last-child{
                            &:before{
                                display: none;
                            }
                        }
                        .selection{
                            width: 15px;
                            height: 15px;
                            background: var(--lightGrayPlus);
                            border-radius: var(--radius);
                            transition: background .5s ease-in-out;
                            transition-delay: .5s;
                            &.selected{
                                background: var(--orange);
                            }
                        }
                    }
                }
            }

        }

        .main-card{
            width: 100%;
            place-content: center;
            grid-template-columns: 200px 1fr;
            gap: 20px;
            position: relative;
            display: grid;
            .left-sidebar-card{
                position: relative;
                // padding-bottom: 60px;
                .bold{
                    font-weight: 900;
                    margin: 30px auto;
                }
                .gradient{
                    background: var(--gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .logo{
                    svg, img{
                        width: 64px;
                        margin-bottom: 30px;
                    }
                }
                h5{
                    color: var(--textColorSecondary);
                }
                @media screen and (max-width: 1024px) {
                    // h1{
                    //     text-align: center;
                    //     width: 100%;
                    //     min-width: 250px;
                    // }
                    // .logo{
                    //     display: none;
                    // }
                }
                .networks{
                    position: absolute;
                    bottom: -20px;
                    span{
                        padding: 10px 5px;
                        display: inline-grid;
                        &:first-child{
                            margin-left: -10px;
                        }
                        img, svg{
                            width: 20px !important;
                            height: auto;
                            opacity: .25;
                        }
                    }
                    &.responsive{
                        display: none;
                        width: 100%;
                        text-align: center;
                        position: relative;
                    }
                    @media screen and (max-width: 1024px) {
                        // display: none;
                        // &.responsive{
                        //     display: block;
                        // }
                    }
                }
            }
            .right-sidebar-card{
                grid-template-rows: 1fr 1fr 1fr;
                grid-template-columns: 1fr;
                display: grid;
                place-content: center;
                place-self: center;
                .card-onboarding {
                    grid-template-columns: auto auto 150px;
                    gap: 30px;
                    display: grid;
                    padding: 20px;
                    text-align: left;
                    .icon{
                        width: 32px;
                        margin: auto;
                        display: grid;
                        // place-content: center;
                        img, svg{
                            width: 100%;
                            height: auto;
                        }
                    }
                    .title{
                        font-weight: bold;
                        margin: 10px auto;
                    }
                    .desc{
                        height: 40px;    
                    }
                    .cta{
                        margin:  auto;
                        width: 100%;
                        button{
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
}

</style>