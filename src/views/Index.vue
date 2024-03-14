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
import DappStoreGuide from '../components/widgets/DappStoreGuide.vue'
import WalletSettings from '../components/widgets/WalletSettings.vue'
import AboutLace from '../components/widgets/AboutLace.vue'
import Search from '../components/widgets/Search.vue'
import NetworkInfo from '../components/widgets/NetworkInfo.vue'
import AddressBook from '../components/widgets/AddressBook.vue'
import PromotedDapp from '../components/widgets/PromotedDapp.vue'
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
            editingWordNum: null,
            newWord: "",
            addWord: "",
            editWord: "",
            showSugestions: false,
            showSugestionsEdit: false,
            createOrRestore: "",
            showModalWords: true,
            modalTerms: false,
            modalPrivacy: false,
            langSelectionOpened: false,
            wordsRecovery: [
            ],
            indexKeyNavigation: 0,
            suggestionsRecovery: [
                "dog",
                "cat",
                "hat",
                "sun",
                "cup",
                "pen",
                "key",
                "box",
                "run",
                "toy",
                "day",
                "car",
                "bed",
                "cow",
                "fly",
                "egg",
                "jam",
                "lip",
                "fan",
                "bus",
                "pie",
                "fox",
                "rug",
                "leg",
                "nut",
                "pig",
                "bat",
                "ant",
                "cap",
                "bat",
                "map",
                "fan",
                "toy",
                "egg",
                "gum",
                "hut",
                "ink",
                "jaw",
                "kit",
                "lip",
                "apple",
                "table",
                "house",
                "mouse",
                "chair",
                "clock",
                "phone",
                "plant",
                "river",
                "shirt",
                "beach",
                "smile",
                "cloud",
                "music",
                "green",
                "light",
                "water",
                "bread",
                "heart",
                "happy"
            ],
            suggestionsRecoveryFiltered: [],

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
        WalletSettings,
        AboutLace,
        Search,
        NetworkInfo,
        MainNetworkStatus,
        AddressBook,
        Tracker,
        DappStoreGuide,
        PromotedDapp,
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
            if(router == "DAppStore" || router == "Onboarding" || router == "Dashboard"){
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
            setTimeout(()=>{
                console.log(st, timer)
                if(this.stage == 5){
                    window.location.href = "/dashboard"
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
            },0)
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
        focusEdit(){
            setTimeout(()=>{
                this.showSugestionsEdit = true;
                document.querySelector("#txtrecoveryedit").focus();
            }, 100)
        },
        filterSuggestions(){
            return this.suggestionsRecovery.filter((item, i) => {
                let r = item.toLowerCase().indexOf(this.addWord.toLowerCase()) > -1
                this.wordsRecovery.forEach((wr)=>{
                    if(wr && item){
                        if(wr == item){
                            r = false;
                        }
                    }
                })
                return r;
            });
        },
        enterOnAutocomplete(word){
            if(!word){
                this.addWord = this.filterSuggestions()[this.indexKeyNavigation].toString();
            }else{
                this.addWord = word;
            }
            this.wordsRecovery.push(this.addWord);
            this.showSugestions = false; 
            this.addWord = "";
            this.indexKeyNavigation = 0;
            setTimeout(()=>{
                document.querySelector(".textarea-recovery").focus();
                this.showSugestions = true; 
            }, 250);
        },
        enterOnAutocompleteEdit(word){
            this.editWord = word;
            // if
            this.wordsRecovery[this.editingWordNum] = this.editWord;
            this.showSugestionsEdit = true; 
            this.editWord = "";
            this.indexKeyNavigation = 0;
            setTimeout(()=>{
                this.editingWordNum = null;
            }, 100)
        },
        hideSuggestions(){
            setTimeout(()=>{
                this.showSugestions = false; 
                this.showSugestionsEdit = false; 
                this.addWord = ''
                this.editWord = ''
                this.indexKeyNavigation = 0;
            }, 100);
        },
        checkSelectedIndex(i){
            if(i == this.indexKeyNavigation){
                return 'highlight'
            }
        },
        acKeyUp(){
            // if (this.indexKeyNavigation < 1) {
                this.indexKeyNavigation--;
                document.querySelector(".auto-complete").scrollTop = document.querySelector(".auto-complete").scrollTop - 42.5;
            // }else{
            //     this.indexKeyNavigation = 1;
            // }
        },
        acKeyDown(){
            // if(this.indexKeyNavigation < this.filterSuggestions().length){
                this.indexKeyNavigation++;
                document.querySelector(".auto-complete").scrollTop = document.querySelector(".auto-complete").scrollTop + 42.5;
            // }else{
                // this.indexKeyNavigation = this.filterSuggestions().length - 1;
            // }
        },
        checkTabType(){
            let r = false;
            if(this.tabRecovery == 1){
                if(this.wordsRecovery.length < 12){ r = true }
            }else if(this.tabRecovery == 2){
                if(this.wordsRecovery.length < 15){ r = true }    
            }else if(this.tabRecovery == 3){
                if(this.wordsRecovery.length < 24){
                    r = true
                }
            }
            return r;
        },
        removeItemAuto(i){
            this.wordsRecovery.splice(i, 1);
        },
    }, 
    updated(){
        this.page = useRouter().currentRoute.value.name;
        setTimeout(() => { 
            // console.log(this.page)
            if(this.page == "onboarding"){
                document.querySelector("#lace").style.backgroundImage = "url('assets/images/background-onboarding.png')"
            }else{
                document.querySelector("#lace").style.backgroundImage = "none"
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
    created(){
        this.store.LoadTranslationAPI('en');
    },
} 
</script>
 
<template lang="pug"> 
.main#lace(:class="(showOrHideSidebarOnThisPage() == false ? 'no-widgets ' : ' ') + (showOrHideMainMenuOnThisPage() == false ? 'no-mainmenu ' : ' ')")
    .col(v-if="showOrHideMainMenuOnThisPage()")
        .sticky  
            //- Lace Brand         
            .brand 
                router-link(to="/tokens")
                    img(class="standard", src="@/assets/images/light/lace.svg", alt="", v-if="store.theme == 'light'")
                    img(class="standard", src="@/assets/images/dark/lace.svg", alt="", v-if="store.theme == 'dark'")
                    img(class="symbol", src="@/assets/images/light/lace_symbol.svg", alt="", v-if="store.theme == 'light'")
                    img(class="symbol", src="@/assets/images/dark/lace_symbol.svg", alt="", v-if="store.theme == 'dark'")
                .net(style="padding: 5px; position: absolute; background-color: #ff000022; border-radius: 10px; margin-left: 280px; white-space: nowrap;") Midnight (testnet)
                //- MainNetworkStatus/       
            //-           
            //-  Main menu    
            MainMenu(:theme="theme", :store="store")/   
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
            <RouterView path="*" :store="store" />   
    .col(v-if="showOrHideMainMenuOnThisPage()") 
        .sticky 
            UserMenu(class="side", :theme="theme", :store="store",)/    
            .widgets.animated
                WalletSettings.animated.toggleInLeft.delay-0-2s(title="Allan's Wallet", v-show="checkPageName() == 'settings'", :store="store")/
                //- Search.animated.toggleInLeft.delay-0-2s/
                NetworkInfo.animated.toggleInLeft.delay-0-2s(title="Network Info", v-show="checkPageName() == 'staking'")/
                AboutLace.animated.toggleInLeft.delay-0-2s(title="About Lace", v-show="checkPageName() == 'settings'")/
                //- AddressBook.animated.toggleInLeft.delay-0-2s(title="Add new address", v-show="checkPageName() == 'addressBook'")/
                AboutYourWallet.animated.toggleInLeft.delay-0-2s(title="About your wallet", v-show="checkPageName() == 'addressBook' || checkPageName() == 'tokens' || checkPageName() == 'nfts' || checkPageName() == 'activity' || checkPageName() == 'staking' || checkPageName() == 'dashboard' || checkPageName() == 'trading'")/
                DappStoreGuide.animated.toggleInLeft.delay-0-2s(title="DApp Store Guide", v-show="checkPageName().indexOf('DAppStore') != -1 ? true : false")/
                PromotedDapp.animated.toggleInRight.delay-0-8s(title="Promoted DApp", :store="store", v-show="checkPageName().indexOf('DAppStore') != -1 ? true : false")/
    SideDrawer(:store="store", v-if="store.sidedrawerVisible")/
    
    //-     
    //-     
    //-     
    //-     
    //-     
    //-     
    //-     
    //-     
    //- 
    .onboarding(v-if="!showOrHideMainMenuOnThisPage()")

        //- 
        .nav-onboarding.animated.fadeInDown.delay-0-5s 
            .brand-onboarding
                img(class="standard", src="@/assets/images/light/lace.svg", alt="", v-if="store.theme == 'light'")
                img(class="standard", src="@/assets/images/dark/lace.svg", alt="", v-if="store.theme == 'dark'")
            //- button.help-and-support
                span
                    .icon 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12.0001 8C10.5283 8 9.47159 8.70623 9.13224 9.4263C8.89681 9.92589 8.30095 10.14 7.80136 9.90458C7.30178 9.66914 7.08764 9.07329 7.32308 8.5737C8.08197 6.96338 9.98852 6 12.0001 6C13.3001 6 14.5155 6.39395 15.4285 7.07868C16.3418 7.76364 17.0001 8.78625 17.0001 10C17.0001 12.0693 15.166 13.5082 13.1827 13.8887C13.11 13.9026 13.0522 13.9386 13.0206 13.972C13.0064 13.9871 13.0014 13.9974 13.0002 14.0001C13.0002 14.0003 13.0001 14.0004 13.0001 14.0005C12.9998 14.5526 12.5522 15 12.0001 15C11.4478 15 11.0001 14.5523 11.0001 14C11.0001 12.8579 11.9097 12.0964 12.8059 11.9245C14.2788 11.6419 15.0001 10.7295 15.0001 10C15.0001 9.5569 14.7629 9.0795 14.2285 8.67868C13.6937 8.27763 12.9092 8 12.0001 8ZM11 17C11 16.4477 11.4477 16 12 16H12.01C12.5623 16 13.01 16.4477 13.01 17C13.01 17.5523 12.5623 18 12.01 18H12C11.4477 18 11 17.5523 11 17Z" fill="url(#paint0_linear_6610_345401)"/><defs><linearGradient id="paint0_linear_6610_345401" x1="-1.65957" y1="-1.65957" x2="27.6428" y2="0.501649" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient></defs></svg>
                    .label 
                        //- Translate(:store="store", t="prototype.onboarding.extras.btn-help")
                        span(v-html='store.translate("prototype.onboarding.extras.btn-help")')
                    .chevron
            UserMenu(class="middle no-widgets", :theme="theme", :store="store", style="margin-top: -20px;")/

        //-
        .body-onboarding.animated.fadeIn

            //- 
            .main-window
                //- 
                h1.bold.animatedIntro
                    TransitionGroup(name="fade")
                        div(:key="1") 
                            span(v-html='store.translate("prototype.onboarding.stage-1.intro-1")')
                        div.gradient(:key="2")
                            span(v-html='store.translate("prototype.onboarding.stage-1.intro-2")')
                Transition(name="fade")
                    .stage-1
                        .content-column.animated.fadeIn.delay-4s
                            h1.bold.placeholder
                                div(:key="1")
                                    span(v-html='store.translate("prototype.onboarding.stage-1.intro-1")')
                                div.gradient(:key="2")
                                    span(v-html='store.translate("prototype.onboarding.stage-1.intro-2")')
                            h4
                                div.animated.fadeIn.delay-3-5s 
                                    span(v-html='store.translate("prototype.onboarding.stage-1.subtitle")')
                            .networks(:class="store.get('theme') == 'dark' ? 'dark' : ''")
                                div
                                    span(v-html='store.translate("prototype.onboarding.stage-1.compatibility")')
                                div 
                                    <svg data-name="Layer 1" id="Layer_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><circle cx="45.9" cy="63.84" r="7.82"/><circle cx="82.1" cy="63.84" r="7.82"/><circle cx="54.95" cy="79.51" r="7.82"/><circle cx="73.05" cy="48.17" r="7.82"/><circle cx="73.05" cy="79.51" r="7.82"/><circle cx="54.95" cy="48.17" r="7.82"/><circle cx="103.98" cy="64" r="4.1"/><circle cx="24.02" cy="64" r="4.1"/><circle cx="9.48" cy="64" r="2.6"/><circle cx="118.52" cy="64" r="2.6"/><circle cx="83.99" cy="29.37" r="4.1"/><circle cx="44.01" cy="98.63" r="4.1"/><circle cx="36.74" cy="111.21" r="2.6"/><circle cx="91.26" cy="16.79" r="2.6"/><circle cx="44.01" cy="29.37" r="4.1"/><circle cx="83.99" cy="98.63" r="4.1"/><circle cx="91.26" cy="111.21" r="2.6"/><circle cx="36.74" cy="16.79" r="2.6"/><circle cx="64" cy="32.71" r="4.72"/><circle cx="64" cy="14.05" r="3.23"/><circle cx="64" cy="95.29" r="4.72"/><circle cx="64" cy="113.95" r="3.23"/><circle cx="36.9" cy="48.36" r="4.72"/><circle cx="20.74" cy="39.02" r="3.23"/><circle cx="91.1" cy="79.64" r="4.72"/><circle cx="107.26" cy="88.98" r="3.23"/><circle cx="36.9" cy="79.64" r="4.72"/><circle cx="20.74" cy="88.98" r="3.23"/><circle cx="91.1" cy="48.36" r="4.72"/><circle cx="107.26" cy="39.02" r="3.23"/></svg>
                                    <svg data-name="Layer 1" id="Layer_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M85.52,45.58l-43,24.85a5.24,5.24,0,0,1-5.2,0L23.55,62.5A5.2,5.2,0,0,1,21,58V42.14a5.2,5.2,0,0,1,2.6-4.5l13.73-7.93a5.24,5.24,0,0,1,5.2,0l13.73,7.93a5.2,5.2,0,0,1,2.6,4.5v7.61a1.3,1.3,0,0,0,1.94,1.13l7.15-4.13a2.59,2.59,0,0,0,1.29-2.25V36.14a5.21,5.21,0,0,0-2.59-4.5L42.48,17.72a5.19,5.19,0,0,0-5.2,0L13.16,31.64a5.2,5.2,0,0,0-2.6,4.5V64a5.2,5.2,0,0,0,2.6,4.5L37.28,82.42a5.19,5.19,0,0,0,5.2,0l43-24.85a5.24,5.24,0,0,1,5.2,0l13.73,7.93a5.2,5.2,0,0,1,2.6,4.5V85.86a5.2,5.2,0,0,1-2.6,4.5L90.72,98.29a5.24,5.24,0,0,1-5.2,0L71.79,90.36a5.2,5.2,0,0,1-2.6-4.5V78.24a1.29,1.29,0,0,0-1.94-1.12L60.1,81.24a2.6,2.6,0,0,0-1.29,2.25v8.37a5.21,5.21,0,0,0,2.59,4.5l24.12,13.92a5.19,5.19,0,0,0,5.2,0l24.12-13.92a5.2,5.2,0,0,0,2.6-4.5V64a5.2,5.2,0,0,0-2.6-4.5L90.72,45.58A5.19,5.19,0,0,0,85.52,45.58Z"/></svg>
                                    <svg enable-background="new 0 0 226.777 226.777" height="226.777px" id="Layer_1" version="1.1" viewBox="0 0 226.777 226.777" width="226.777px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon fill="#231F20" points="112.553,157 112.553,86.977 44.158,116.937  "/><polygon fill="#231F20" points="112.553,82.163 112.553,-0.056 46.362,111.156  "/><polygon fill="#231F20" points="116.962,-0.09 116.962,82.163 184.083,111.566  "/><polygon fill="#231F20" points="116.962,86.977 116.962,157.002 185.405,116.957  "/><polygon fill="#231F20" points="112.553,227.406 112.553,171.085 44.618,131.31  "/><polygon fill="#231F20" points="116.962,227.406 184.897,131.31 116.962,171.085  "/></g></svg>
                        .content-column.animated.fadeIn.delay-4s
                            .items
                                .select-option-item.animated.fadeInUp.delay-3-5s
                                    .ico 
                                        <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.9998 7.16602V33.8327M33.3332 20.4993L6.6665 20.4993" stroke="url(#paint0_linear_19020_401772)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="paint0_linear_19020_401772" x1="1.78707" y1="2.28659" x2="40.8569" y2="5.16821" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient></defs></svg>
                                    .label 
                                        .title  
                                            span(v-html='store.translate("prototype.onboarding.stage-1.title-1")')
                                        .desc 
                                            span(v-html='store.translate("prototype.onboarding.stage-1.desc-1")')
                                    button.primary(@click="showModalWords = true; createOrRestore = 'create'; changeStageTo(2, false);") 
                                        span(v-html='store.translate("prototype.onboarding.stage-1.button-1")')
                                hr/
                                .select-option-item.animated.fadeInUp.delay-3-7s
                                    .ico 
                                        <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25 12.1667C26.8409 12.1667 28.3333 13.6591 28.3333 15.5M35 15.5C35 21.0228 30.5228 25.5 25 25.5C23.9897 25.5 23.0144 25.3502 22.0951 25.0715L18.3333 28.8333H15V32.1667H11.6667V35.5H6.66667C5.74619 35.5 5 34.7538 5 33.8333V29.5237C5 29.0817 5.17559 28.6577 5.48815 28.3452L15.4285 18.4049C15.1498 17.4856 15 16.5103 15 15.5C15 9.97715 19.4772 5.5 25 5.5C30.5228 5.5 35 9.97715 35 15.5Z" stroke="url(#paint0_linear_19020_401779)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="paint0_linear_19020_401779" x1="-0.489362" y1="0.0106457" x2="43.4642" y2="3.25247" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient></defs></svg>
                                    .label 
                                        .title 
                                            span(v-html='store.translate("prototype.onboarding.stage-1.title-2")')
                                        .desc 
                                            span(v-html='store.translate("prototype.onboarding.stage-1.desc-2")')
                                    button.primary 
                                        span(v-html='store.translate("prototype.onboarding.stage-1.button-2")')
                                hr/
                                .select-option-item.animated.fadeInUp.delay-3-9s
                                    .ico 
                                        <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3332 18.8333V12.1667C13.3332 8.48477 16.3179 5.5 19.9998 5.5C23.6817 5.5 26.6665 8.48477 26.6665 12.1667M19.9998 25.5V28.8333M9.99984 35.5H29.9998C31.8408 35.5 33.3332 34.0076 33.3332 32.1667V22.1667C33.3332 20.3257 31.8408 18.8333 29.9998 18.8333H9.99984C8.15889 18.8333 6.6665 20.3257 6.6665 22.1667V32.1667C6.6665 34.0076 8.15889 35.5 9.99984 35.5Z" stroke="url(#paint0_linear_19020_401786)" stroke-width="2" stroke-linecap="round"/><defs><linearGradient id="paint0_linear_19020_401786" x1="1.78707" y1="0.0106457" x2="40.9013" y2="2.575" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient></defs></svg>
                                    .label 
                                        .title 
                                            span(v-html='store.translate("prototype.onboarding.stage-1.title-3")')
                                        .desc 
                                            span(v-html='store.translate("prototype.onboarding.stage-1.desc-3")')
                                    button.primary(@click="showModalWords = false; createOrRestore = 'restore'; popupRestore = true;") 
                                        span(v-html='store.translate("prototype.onboarding.stage-1.button-3")')
                Transition(name="fade")
                    
                    //- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    .stage-2(v-if="stage >= 2")

                            .content-column
                                .timeline 
                                    .point.animated.fadeInUp.delay-0-5s(:class="stage >= 3 ? 'path-done' : ''")
                                        .selection.selected
                                        .label  
                                            span(v-html='store.translate("prototype.onboarding.timeline.item-1")')
                                    .point.animated.fadeInUp.delay-0-6s(:class="stage >= 4 ? 'path-done' : ''")
                                        .selection(:class="stage >= 3 ? 'selected' : ''")
                                        .label 
                                            span(v-html='store.translate("prototype.onboarding.timeline.item-2")')
                                    .point.animated.fadeInUp.delay-0-7s(:class="stage >= 5 ? 'path-done' : ''")
                                        .selection(:class="stage >= 4 ? 'selected' : ''")
                                        .label 
                                            span(v-html='store.translate("prototype.onboarding.timeline.item-3")')
                                    .point.animated.fadeInUp.delay-0-8s
                                        .selection(:class="stage >= 5 ? 'selected' : ''") 
                                        .label 
                                            span(v-html='store.translate("prototype.onboarding.timeline.item-4")')
                            
                            .content-column.animated.fadeIn.delay-1s
                                //- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                .content-stage(v-if="stage == 2", style="position: relative;")
                                    h2 
                                        span(v-html='store.translate("prototype.onboarding.stage-2.title")')
                                    div 
                                        span(v-html='store.translate("prototype.onboarding.stage-2.desc")')
                                    .clear(style="height: 30px;")
                                    .buttons-terms
                                        .item-term(@click="modalTerms = true")
                                            .label 
                                                span(v-html='store.translate("prototype.onboarding.stage-2.item-terms")')
                                            .chevron
                                                <svg width="1em" height="12px" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="SocialLink-module_arrow__II2PS"><path fill-rule="evenodd" clip-rule="evenodd" d="M.293 9.707a1 1 0 0 1 0-1.414L3.586 5 .293 1.707A1 1 0 0 1 1.707.293l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z" fill="currentColor"></path></svg>
                                        .item-term(@click="modalPrivacy = true")
                                            .label 
                                                span(v-html='store.translate("prototype.onboarding.stage-2.item-privacy")')
                                            .chevron
                                                <svg width="1em" height="12px" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="SocialLink-module_arrow__II2PS"><path fill-rule="evenodd" clip-rule="evenodd" d="M.293 9.707a1 1 0 0 1 0-1.414L3.586 5 .293 1.707A1 1 0 0 1 1.707.293l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z" fill="currentColor"></path></svg>
                                    .content-section
                                        .padding(style="height: 30px;") 
                                        div 
                                            label.terms-input(:style="!termsChecked ? 'background-color: transparent;' : ''")
                                                span
                                                    input(type="checkbox", v-model="termsChecked")
                                                    span 
                                                        span(v-html='store.translate("prototype.onboarding.stage-2.accept-the-terms")')
                                                .info(v-if="!termsChecked")
                                                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 0 0 3 21h18a.998.998 0 0 0 .883-1.467L12.884 2.532zM13 18h-2v-2h2v2zm-2-4V9h2l.001 5H11z"/></svg>
                                                    span.required-label 
                                                        span(v-html='store.translate("prototype.onboarding.stage-2.terms-required")')
                                        .padding(style="height: 20px;")
                                    .overlay-terms(v-if="modalTerms || modalPrivacy")
                                        .scrollable(v-if="modalTerms")
                                            include includes/terms.pug
                                        .scrollable(v-if="modalPrivacy")
                                            .clear(style="height: 50px;")
                                            div.title-know-more 
                                                pre 
                                                    span(v-html='store.translate("prototype.onboarding.stage-2.full-privacy")')
                                //- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                                //- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                .content-stage.animated.toggleInUp(v-if="stage == 3")
                                    h2 
                                        span(v-html='store.translate("prototype.onboarding.stage-3.title")')
                                    br/
                                    .content-section
                                        span 
                                            span(v-html='store.translate("prototype.onboarding.stage-3.choose-a-wallet-name")')
                                        label
                                            input(type="text", :placeholder='this.store.translate("prototype.onboarding.placeholder.wallet-name", true)', v-model="walletName")/
                                    br/
                                    span  
                                        span(v-html='store.translate("prototype.onboarding.stage-3.setup-password")')
                                    .content-section.passwd
                                        label
                                            input(type="password", :placeholder='this.store.translate("prototype.onboarding.placeholder.password", true)', v-model="password")/
                                            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ant-input-password-icon" data-testid="password-input-show-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.512 12a9.004 9.004 0 0 0 16.977 0 9.004 9.004 0 0 0-16.977 0Zm-2.008-.3C2.906 7.238 7.074 4 12 4c4.927 0 9.095 3.238 10.497 7.7a1 1 0 0 1 0 .6C21.095 16.762 16.927 20 12 20c-4.927 0-9.095-3.238-10.497-7.7a1 1 0 0 1 0-.6ZM12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" fill="#878E9E"></path></svg>
                                            .score(:class="password.length < 3 ? (password.length < 1 ? 'none' : 'low') : (password.length < 5 ? 'medium' : (password.length >=7 ? 'great' : 'high'))")
                                                .bar 
                                                .bar 
                                                .bar  
                                                .bar 
                                            span(vv-if="password.length > 0")
                                                .feedback-passwd(:class="password.length < 3 ? 'red' : 'green'") 
                                                    span(style="height: 22px; display: block;", :style="password.length < 4 ? '' : 'visibility: hidden;'")
                                                        <svg v-if="password.length > 0 && password.length < 3" width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L5.29289 17.2929ZM18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L18.7071 6.70711ZM6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L6.70711 5.29289ZM17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L17.2929 18.7071ZM6.70711 18.7071L18.7071 6.70711L17.2929 5.29289L5.29289 17.2929L6.70711 18.7071ZM5.29289 6.70711L17.2929 18.7071L18.7071 17.2929L6.70711 5.29289L5.29289 6.70711Z' fill='#FF5470'/></svg>
                                                        <svg v-if="password.length > 0 && password.length >= 3" width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5 13L9 17L19 7' stroke='#2CB67D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg> 
                                                    span 
                                                        span(v-if="password.length > 0",v-html='store.translate("prototype.onboarding.stage-3.password-validation-1")', :style="password.length < 4 ? '' : 'visibility: hidden;'")
                                                //- .feedback-passwd(:class="password.length < 5 ? 'red' : 'green'") 
                                                    span 
                                                        <svg v-if="password.length < 5" width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L5.29289 17.2929ZM18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L18.7071 6.70711ZM6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L6.70711 5.29289ZM17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L17.2929 18.7071ZM6.70711 18.7071L18.7071 6.70711L17.2929 5.29289L5.29289 17.2929L6.70711 18.7071ZM5.29289 6.70711L17.2929 18.7071L18.7071 17.2929L6.70711 5.29289L5.29289 6.70711Z' fill='#FF5470'/></svg>
                                                        <svg v-if="password.length >= 5" width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5 13L9 17L19 7' stroke='#2CB67D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg> 
                                                    span 
                                                        span(v-html='store.translate("prototype.onboarding.stage-3.password-validation-2")')
                                                //- .feedback-passwd.green(:class="password.length < 7 ? 'red' : 'green'") 
                                                    span 
                                                        <svg v-if="password.length < 7" width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L5.29289 17.2929ZM18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L18.7071 6.70711ZM6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L6.70711 5.29289ZM17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L17.2929 18.7071ZM6.70711 18.7071L18.7071 6.70711L17.2929 5.29289L5.29289 17.2929L6.70711 18.7071ZM5.29289 6.70711L17.2929 18.7071L18.7071 17.2929L6.70711 5.29289L5.29289 6.70711Z' fill='#FF5470'/></svg>
                                                        <svg v-if="password.length >= 7" width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5 13L9 17L19 7' stroke='#2CB67D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg> 
                                                    span 
                                                        span(v-html='store.translate("prototype.onboarding.stage-3.password-validation-3")')
                                        label.animated(v-if="password.length > 4", style="height: 85px; margin-top: -40px;")
                                            input(type="password", :placeholder='this.store.translate("prototype.onboarding.placeholder.confirm-password", true)', v-model="checkpassword")/
                                            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ant-input-password-icon" data-testid="password-input-show-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.512 12a9.004 9.004 0 0 0 16.977 0 9.004 9.004 0 0 0-16.977 0Zm-2.008-.3C2.906 7.238 7.074 4 12 4c4.927 0 9.095 3.238 10.497 7.7a1 1 0 0 1 0 .6C21.095 16.762 16.927 20 12 20c-4.927 0-9.095-3.238-10.497-7.7a1 1 0 0 1 0-.6ZM12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" fill="#878E9E"></path></svg>
                                            //- .score(:class="checkpassword.length < 3 ? (checkpassword.length < 1 ? 'none' : 'low') : (checkpassword.length < 6 ? 'medium' : (checkpassword.length >=7 ? 'great' : 'high'))")
                                                .bar 
                                                .bar 
                                                .bar 
                                                .bar 
                                            //- .feedback-passwd(v-if="checkpassword.length > 0")
                                                span 
                                                    <svg v-if="checkpassword.length < 5" width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L5.29289 17.2929ZM18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L18.7071 6.70711ZM6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L6.70711 5.29289ZM17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L17.2929 18.7071ZM6.70711 18.7071L18.7071 6.70711L17.2929 5.29289L5.29289 17.2929L6.70711 18.7071ZM5.29289 6.70711L17.2929 18.7071L18.7071 17.2929L6.70711 5.29289L5.29289 6.70711Z' fill='#FF5470'/></svg>
                                                    <svg v-if="checkpassword.length >= 5" width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5 13L9 17L19 7' stroke='#2CB67D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg> 
                                                span
                                                    span.red(v-if="checkpassword.length < 5") 
                                                        span(v-html='store.translate("prototype.onboarding.stage-3.password-validation-4")')
                                                    span.green(v-if="checkpassword.length >= 5") 
                                                        span(v-html='store.translate("prototype.onboarding.stage-3.password-validation-4")')
                                //- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                                //- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                .content-stage.animated.toggleInUp(v-if="stage == 4")
                                    h2(v-show="createOrRestore == 'create' && showModalWords") 
                                        span(v-html='store.translate("prototype.onboarding.stage-4.title")')
                                    h2(v-show="createOrRestore == 'create' && !showModalWords") 
                                        span(v-html='store.translate("prototype.onboarding.stage-4.title")')
                                    h2(v-show="createOrRestore == 'restore'") 
                                        span(v-html='store.translate("prototype.onboarding.stage-4.title")')
                                    .content-section
                                        span(v-show="createOrRestore == 'create' && showModalWords") 
                                            span(v-html='store.translate("prototype.onboarding.stage-4.desc")')
                                        span(v-show="createOrRestore == 'create' && !showModalWords") 
                                            span(v-html='store.translate("prototype.onboarding.stage-5.desc")')
                                        span(v-show="createOrRestore == 'restore'") 
                                            span(v-html='store.translate("prototype.onboarding.stage-5.desc")')
                                    .new-wallet-mockup(v-if="createOrRestore == 'create' && showModalWords")
                                        .pass-wall
                                            .word 1. mouse
                                            .word 2. cloud
                                            .word 3. apple
                                            .word 4. fox
                                            .word 5. light
                                            .word 6. bus
                                            .word 7. bat
                                            .word 8. bread
                                            .word 9. sun
                                            .word 10. music
                                            .word 11. egg
                                            .word 12. happy
                                        .understood-button
                                            button.purple.animated.fadeInDown.delay-2s(@click="showModalWords = false") 
                                                span(v-html='store.translate("prototype.onboarding.timeline.btn-continue")')
                                        
                                    .tabs 
                                        .tab(@click="tabRecovery = 1;", :class="tabRecovery == 1 ? 'active' : ''") 
                                            span(v-html='store.translate("prototype.onboarding.stage-5.passphrase-type-1")')
                                        .tab(@click="tabRecovery = 2;", :class="tabRecovery == 2 ? 'active' : ''") 
                                            span(v-html='store.translate("prototype.onboarding.stage-5.passphrase-type-2")')
                                        .tab(@click="tabRecovery = 3;", :class="tabRecovery == 3 ? 'active' : ''") 
                                            span(v-html='store.translate("prototype.onboarding.stage-5.passphrase-type-3")')
                                    .input-passphrase(@click="focusRecovery()")
                                        .textarea-recovery 
                                            .item-rec(
                                                v-for="(w, i) in wordsRecovery"
                                            )
                                                span.bold {{i+1}}.
                                                span &nbsp;{{w}}
                                                .overlay-hover(@click.stop="editingWordNum = i; focusEdit();")
                                                    span
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V13M17.5858 3.58579C18.3668 2.80474 19.6332 2.80474 20.4142 3.58579C21.1953 4.36683 21.1953 5.63316 20.4142 6.41421L11.8284 15H9L9 12.1716L17.5858 3.58579Z" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                                    span 
                                                        button.link(@click.stop="removeItemAuto(i)") X
                                                .edit-word(v-if="editingWordNum == i")
                                                    label
                                                        input(
                                                            autocomplete="off"
                                                            :placeholder='store.translate("prototype.onboarding.extras.type-here", true)'
                                                            type="text"
                                                            id="txtrecoveryedit"
                                                            v-model="editWord" 
                                                            @click.stop=""
                                                            @focus="showSugestionsEdit = true;"
                                                            @blur="hideSuggestions()"
                                                            @keyup.enter="enterOnAutocompleteEdit()"
                                                            @keyup.up.exact="acKeyUp()"
                                                            @keyup.space.exact="enterOnAutocompleteEdit()"
                                                            @keyup.tab.exact="enterOnAutocompleteEdit()"
                                                            @keyup.down.exact="acKeyDown()"
                                                            v-show="checkTabType()"
                                                        )
                                                        .auto-complete.animate.toggleInUp(v-if="showSugestionsEdit")
                                                            .item(
                                                                v-for="(f, ii) in filterSuggestions()"
                                                                :class="checkSelectedIndex(ii)"
                                                                @click="enterOnAutocompleteEdit(f)"
                                                                @mousehover="indexKeyNavigation = ii"

                                                            ) {{ f }}
                                            label
                                                input(
                                                    autocomplete="off"
                                                    :placeholder='store.translate("prototype.onboarding.extras.type-here", true)'
                                                    type="text"
                                                    id="txtrecovery"
                                                    v-model="addWord" 
                                                    @focus="showSugestions = true;"
                                                    @blur="hideSuggestions()"
                                                    @keyup.enter="enterOnAutocomplete()"
                                                    @keyup.space.exact="enterOnAutocomplete()"
                                                    @keyup.tab.exact="enterOnAutocomplete()"
                                                    @keyup.up.exact="acKeyUp()"
                                                    @keyup.down.exact="acKeyDown()"
                                                    v-show="checkTabType()"
                                                )
                                                .auto-complete.animate.toggleInUp(v-if="showSugestions && checkTabType()")
                                                    //- .item(v-for="f in suggestionsRecovery") {{f}} 
                                                    .item(
                                                        v-for="(f, ii) in filterSuggestions()"
                                                        :class="checkSelectedIndex(ii)"
                                                        @click="enterOnAutocomplete(f)"
                                                        @mousehover="indexKeyNavigation = ii"

                                                    ) {{ f }}

                                //- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                                //- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                .content-stage.animated.toggleInUp(v-if="stage == 5")
                                    h2 
                                        span(v-html='store.translate("prototype.onboarding.stage-6.title")')
                                    .content-section
                                        span 
                                            span(v-html='store.translate("prototype.onboarding.stage-6.desc")')
                                        .padding(style="height: 50px;")
                                        .follow 
                                            .ico 
                                                <svg width="1em" height="1em" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.29 17.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 20 2.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 .8 6.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.232 8.232 0 0 1 0 15.407a11.616 11.616 0 0 0 6.29 1.84" fill="currentColor"></path></svg>
                                            span 
                                                span(v-html='store.translate("prototype.onboarding.stage-6.twitter")')
                                            .chevron
                                                <svg width="1em" height="12px" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="SocialLink-module_arrow__II2PS"><path fill-rule="evenodd" clip-rule="evenodd" d="M.293 9.707a1 1 0 0 1 0-1.414L3.586 5 .293 1.707A1 1 0 0 1 1.707.293l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z" fill="currentColor"></path></svg>
                                        .follow 
                                            .ico 
                                                <svg width="1em" height="1em" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 2.963a3.067 3.067 0 0 0-.775-1.37 3.007 3.007 0 0 0-1.346-.795C19.505.286 12 .286 12 .286s-7.505 0-9.376.512c-.51.14-.975.414-1.347.794-.372.38-.64.853-.775 1.37C0 4.873 0 8.858 0 8.858s0 3.986.502 5.895c.135.517.403.99.775 1.37.372.38.837.654 1.347.795 1.871.512 9.376.512 9.376.512s7.505 0 9.377-.512c.51-.14.974-.415 1.346-.795.373-.38.64-.852.775-1.37C24 12.842 24 8.857 24 8.857s0-3.986-.502-5.894ZM9.546 12.475V5.24l6.272 3.618-6.272 3.618Z" fill="currentColor"></path></svg>
                                            span 
                                                span(v-html='store.translate("prototype.onboarding.stage-6.youtube")')
                                            .chevron
                                                <svg width="1em" height="12px" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="SocialLink-module_arrow__II2PS"><path fill-rule="evenodd" clip-rule="evenodd" d="M.293 9.707a1 1 0 0 1 0-1.414L3.586 5 .293 1.707A1 1 0 0 1 1.707.293l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z" fill="currentColor"></path></svg>
                                        .follow 
                                            .ico 
                                                <svg width="1em" height="1em" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.47 1.453A18.968 18.968 0 0 0 14.79.001a.071.071 0 0 0-.075.036 13.2 13.2 0 0 0-.583 1.197 17.51 17.51 0 0 0-5.258 0A12.119 12.119 0 0 0 8.28.037.074.074 0 0 0 8.205 0a18.914 18.914 0 0 0-4.681 1.452.067.067 0 0 0-.031.027C.51 5.934-.306 10.28.095 14.57a.079.079 0 0 0 .03.055 19.075 19.075 0 0 0 5.743 2.903c.03.009.062-.002.08-.027.443-.604.838-1.24 1.176-1.91.02-.04 0-.086-.04-.102a12.566 12.566 0 0 1-1.794-.855.074.074 0 0 1-.008-.123c.121-.09.242-.184.357-.279a.071.071 0 0 1 .074-.01c3.764 1.719 7.84 1.719 11.559 0a.07.07 0 0 1 .075.01c.115.094.236.19.357.28a.074.074 0 0 1-.006.122 11.79 11.79 0 0 1-1.795.854.073.073 0 0 0-.039.102c.345.67.74 1.306 1.174 1.91.018.026.05.037.08.028a19.01 19.01 0 0 0 5.753-2.903.073.073 0 0 0 .03-.053c.48-4.961-.803-9.271-3.4-13.091a.059.059 0 0 0-.03-.028ZM7.687 11.958c-1.133 0-2.067-1.04-2.067-2.318s.915-2.318 2.067-2.318c1.16 0 2.085 1.05 2.067 2.318 0 1.277-.916 2.318-2.067 2.318Zm7.642 0c-1.133 0-2.067-1.04-2.067-2.318s.916-2.318 2.067-2.318c1.16 0 2.085 1.05 2.067 2.318 0 1.277-.906 2.318-2.067 2.318Z" fill="currentColor"></path></svg>
                                            span 
                                                span(v-html='store.translate("prototype.onboarding.stage-6.discord")')
                                            .chevron
                                                <svg width="1em" height="12px" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="SocialLink-module_arrow__II2PS"><path fill-rule="evenodd" clip-rule="evenodd" d="M.293 9.707a1 1 0 0 1 0-1.414L3.586 5 .293 1.707A1 1 0 0 1 1.707.293l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z" fill="currentColor"></path></svg>
                                //- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                    
                                .button-area.fadeIn.delay-1s
                                    button.tertiary(v-if="!modalTerms && !modalPrivacy", @click="changeStageTo('back')") 
                                        span(v-html='store.translate("prototype.onboarding.timeline.btn-previous")')
                                    button.tertiary(v-if="modalTerms", @click="modalTerms = false; modalPrivacy = false;", style="white-space: nowrap; width: 540px;") 
                                        span(v-html='store.translate("prototype.onboarding.stage-2.full-terms-button")')
                                    button.tertiary(v-if="modalPrivacy", @click="modalPrivacy = false; modalPrivacy = false;", style="white-space: nowrap; width: 540px;") {{this.store.translate("prototype.onboarding.stage-2.full-privacy-button")}}
                                    span(v-if="!modalTerms && !modalPrivacy")
                                    span(v-if="!modalTerms && !modalPrivacy")
                                        button.purple(v-if="(stage >= 2) && (!modalTerms && !modalPrivacy)", @click="(createOrRestore == 'create' ? (showModalWords = true) : (showModalWords = false)); changeStageTo('next')", :disabled="nextShouldBeEnabled()") 
                                            span(v-if="stage > 2 && stage != 5") 
                                                span(v-html='store.translate("prototype.onboarding.timeline.btn-next")')
                                            span(v-if="stage == 2 && stage != 5") 
                                                span(v-html='store.translate("prototype.onboarding.timeline.btn-next")')
                                            span(v-if="stage == 5") 
                                                span(v-html='store.translate("prototype.onboarding.timeline.btn-go-to-wallet")')
                                        //- .tooltip(v-if="(!termsChecked && stage == 2)") Please read and accept the terms
                    //- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


                //- 
                //- 
                //- 
                Transition(name="fade")
                    .modal-restore-overlay(v-if="popupRestore")
                        .background-overlay 
                        .floating-window
                            .title 
                                span(v-html='store.translate("prototype.onboarding.stage-1.modal-title")')
                            .desc 
                                span(v-html='store.translate("prototype.onboarding.stage-1.modal-desc")')
                            .buttons 
                                button.tertiary(@click="popupRestore = false;") 
                                    span(v-html='store.translate("prototype.onboarding.timeline.btn-previous")')
                                button.purple(@click="changeStageTo(2, false);") 
                                    span(v-html='store.translate("prototype.onboarding.timeline.btn-continue")')
                //- 
                //- 
                //- 
            //- 
            
        //-

        .footer-onboarding.animated.fadeIn.delay-2s
            .links
                a() 
                    span(v-html='store.translate("prototype.onboarding.extras.footer-help")')
                a() 
                    span(v-html='store.translate("prototype.onboarding.extras.footer-private")')
                a() 
                    span(v-html='store.translate("prototype.onboarding.extras.footer-terms")')
        //-
    //-   
    //- 
    //- 
    //- 
    //- 
    //- 
    //- 
    //- 
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
@import '../scss/structure/loader';

// General Components
@import '../scss/components/buttons';
@import '../scss/components/pills';
@import '../scss/components/input';

#lace{
    background-position: center center;
    background-size: cover;
}

.lang-selection{
    position: fixed;
    width: 16px;
    height: 16px;
    bottom: 15px;
    left: 15px;
    z-index: 9999999999999999999999999;
    padding: 10px;
    background-color: var(--lightGray);
    border-radius: 10px;
    cursor: pointer;
    &:hover{
        background-color: var(--lightGrayPlus);
    }
    .selected{
        img{
            width: 100%;
            box-shadow: var(--tinyShadow);
        }
    }
    .list{
        position: absolute;
        bottom: 40px;
        width: 250px;
        background-color: var(--bgCard);
        box-shadow: var(--tinyShadow);
        padding: 20px;
        border-radius: var(--radius);
        .item{
            grid-template-columns: 24px 1fr;
            display: grid;
            align-items: center;
            gap: 10px;
            padding: 15px 10px;
            border-bottom: solid 1px var(--lightGray);
            &:last-child{
                border-bottom: none;
            }
            &:hover{
                background-color: var(--lightGray);
                border-radius: var(--radius);
                cursor: pointer;
            }
            &.selected{
                background-color: var(--lightGrayPlus);
                border-radius: var(--radius);
                cursor: pointer;
            }
        }
        .img{
            width: 24px;
            height: 24px;
            border-radius: 100px;
            box-shadow: var(--tinyShadow);
            img{
                width: 100%;
            }
        }
        .label{

        }
    }
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
    overflow: hidden;
    .overlay-terms {
        position: absolute;
        top: 100px;
        left: 0px;
        width: 100%;
        height: calc(100% - 120px);
        background-color: var(--bgCard);
        overflow-x: hidden;
        overflow-y: auto;
        z-index: 1;
        pre{
            white-space: pre-wrap !important;
        }
    }
    .buttons-terms{
        padding: 20px;
        border: solid 1px var(--bgCardBorder);
        border-radius: var(--radius);
        width: calc(100% - 50px);
        min-width: 0;
        .item-term{
            padding: 30px;
            display: grid;
            grid-template-columns: 1fr 20px;
            align-items: center;
            justify-content: left;
            text-align: left;
            border-radius: var(--radius);
            cursor: pointer;
            border-color: var(--bgCardBorder) !important;
            &:first-child{
                margin: -20px -20px 0 -20px;
                border-bottom: solid 1px var(--bgCardBorder);
            }
            &:last-child{
                margin: 0px -20px -20px -20px;
                padding: 30px;
            }
            &:hover{
                background-color: var(--bgCardHover);
            }
            .label{

            }
            .chrevron{
                
            }
        }
    }


    .nav-onboarding {
        display: grid;
        grid-template-columns: 1fr 200px;
        width: 100%;
        width: calc(100% - 60px);
        place-content: center;
        margin: 20px 30px;
        gap: 20px;
        z-index: 1;
        position: absolute;
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
        height: calc(100% - 0px); 
        margin: auto auto auto auto;

        .new-wallet-mockup{
            position: absolute;
            width: calc(100% - 30px);
            height: calc(100% - 40px);
            background-color: var(--bgCard);
            z-index: 1;
            margin-top: 0px;
            padding: 20px;
            text-align: center;
            .pass-wall{
                padding-top: 40px;
            }
            .word{
                padding: 20px;
                display: inline-grid;
                background-color: var(--bgCardActive);
                border-radius: 200px;
                margin: 10px;
            }
            .understood-button{
                position: absolute;
                bottom: 40px;
                width: auto;
                right: 20px;
                bottom: 20px;
            }
        }
        
        .main-window{
            // width: 10px;
            // height: 10px;
            width: 840px;
            height: 585px;
            background-color: var(--bgCardTransparent);
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
                    background: var(--bgCardTransparent);
                    border-radius: var(--radius);
                    width: 480px;
                    height: auto;
                    z-index: 2;
                    position: absolute;
                    padding: 40px;
                    top: calc(50% - 220px);
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
                        &.dark{
                            svg, img{
                                filter: brightness(0) invert(1);
                            }
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
                .improve-input{
                    width: calc(100% - 20px);
                    display: grid;
                    grid-template-columns: 1fr 110px;
                    align-items: center; 
                    margin: 10px 0 10px 0;
                    .info{
                        text-align: right; 
                        .required-label{
                            font-size: 14px;
                            color: var(--darkGray);
                            margin-left: 12px;
                        }
                        svg{
                            width: 16px;
                            margin-right: 5px;
                            margin-bottom: -7px;
                            opacity: 1 !important;
                            path{
                                // fill: var(--darkGray);
                                stroke: var(--darkGray);
                            }
                        }
                    }
                } 
                .terms-input{
                    display: grid;
                    grid-template-columns: 1fr 200px;
                    align-content: center;
                    border-radius: 10px;
                    width: calc(100% - 60px);
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
                --positionClip: 370px 250px;
                @keyframes circleRevealRestore {
                    0%{clip-path: circle(0px at var(--positionClip));}
                    100%{clip-path: circle(1000px at var(--positionClip));}
                    // 100%{display: none;}
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
                background-color: var(--bgCard); 
                border-radius: var(--radius); 
                animation: circleRevealRestore .75s ease-in-out forwards;
                animation-delay: .5s;
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
                            max-width: 540px;
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
                            grid-template-columns: 1fr;
                            gap: 20px;
                            overflow: hidden;
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
                                input{
                                    margin: 10px auto;
                                }
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
                            background: var(--bgCardTransparent);
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
                        background-color: var(--bgCardActive);
                        border-radius: 12px;
                        margin: 15px 0;
                        .tab{
                            padding: 15px 10px;
                            border-radius: 12px;
                            text-align: center;
                            cursor: pointer;
                            &.active{
                                background-color: var(--bgCardHover);
                            }
                        }
                    }
                    .follow {
                        width: calc(100% - 30px);
                        height: auto;
                        padding: 10px;
                        display: grid;
                        grid-template-columns: 50px 1fr 50px;
                        background-color: var(--bgCardActive);
                        margin: 10px;
                        border-radius: 100px;
                        cursor: pointer;
                        &:hover{
                            background-color: var(--bgCardHover);
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
                    // overflow-x: hidden;
                    // overflow-y: scroll;
                    overflow: visible;
                    .item-rec{
                        padding: 20px;
                        background-color: var(--bgCardActive);
                        width: auto;
                        display: inline-block;
                        margin: 5px 10px;
                        border-radius: 100px;
                        position: relative;
                        &:hover{
                            .overlay-hover{
                                display: grid;
                            }
                        }
                        .edit-word{
                            position: absolute;
                            width: calc(100% + 20px);
                            height: 100%;
                            top: 0;
                            left: 0;
                            margin: 0px -10px;
                            border: solid 1px var(--bgCardBorder);
                            border-radius: 100px;
                            input{
                                width: calc(100% - 20px);
                                margin-left: -10px !important;
                                background: var(--inputTextBg);
                            }
                        }
                        .textarea-recovery{
                            background: var(--bgCard) !important;
                            color: var(--textColorPrimary) !important;
                        }
                        .auto-complete{
                            background: var(--bgCard) !important;
                            color: var(--textColorPrimary) !important;
                            .item{
                                background: var(--bgCard) !important;
                                color: var(--textColorPrimary) !important;
                            }
                        }
                        .overlay-hover{
                            display: none;
                            position: absolute;
                            // background-color: #e6e1f7;
                            background-color: var(--bgCardActive);
                            width: 100%;
                            height: 100%;
                            top: 0;
                            left: 0;
                            border-radius: 100px;
                            place-content: center;
                            white-space: nowrap;
                            grid-template-columns: 1fr 1fr;
                            place-content: center;
                            place-items: center;
                            cursor: pointer;
                            svg{
                                width: 18px;
                                margin-left: 25px;
                            }
                            button{
                                width: 18px;
                                height: 18px;
                                display: grid;
                                place-content: center;
                                padding: 15px;
                                margin: 0;
                                border: none;
                                background-color: transparent;
                            }
                        }
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
                        border-radius: 5px;
                        width: 150px;
                        bottom: 60px;
                        height: auto;
                        max-height: 150px;
                        overflow-x: hidden;
                        overflow-y: scroll;
                        background: var(--bgCard);
                        .item{
                            padding: 10px;
                            border-radius: 3px;
                            margin: 3px 0;
                            &.highlight{
                                // background-color: var(--accentPurpleTransparent);
                                background-color: var(--bgCardActive);
                            }
                            &:hover{
                                background-color: var(--bgCardActive);
                            }
                        }
                        &:hover{
                            .item{
                                &.highlight{
                                    // background-color: var(--accentPurpleTransparent);
                                    &:not(:hover){
                                        background-color: transparent;
                                    }
                                }
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
                            &.dark{
                                filter: brightness(0) invert(1);
                            }
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