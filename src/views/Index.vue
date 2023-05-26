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
            if(router == "DAppStore"){
                return false;
            }else{
                return true;
            }
        },
        checkPageName(){
            return useRouter().currentRoute.value.name
        }
    },
    mounted(){
        // this.page = useRouter().currentRoute.value.name
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
.main#lace(:class="showOrHideSidebarOnThisPage() == false ? 'no-widgets' : ''")
    .col
        .sticky
            //- Lace Brand
            .brand 
                img(class="standard", :src="'assets/images/' + store.theme + '/lace.svg'", alt="")
                img(class="symbol", :src="'assets/images/' + store.theme + '/lace_symbol.svg'", alt="")
                MainNetworkStatus/
            //- 
            //-  Main menu
            MainMenu(theme="theme")/
    .col
        .sticky
            .global-search-content-placeholder
                //- Input(type="text", placeholder="Search")
        .content
            UserMenu(class="middle", :theme="theme", :store="store", :class="showOrHideSidebarOnThisPage() == false ? 'no-widgets' : ''")/
            .widgets-overlay.animated(@click="toggleSidebar()", :class="(store.widgetTransition ? 'fadeIn' : 'fadeOut delay-0-5s') + (store.sidebarVisible ? ' visible ' : ' hidden ')")
                .widgets(v-if="showOrHideSidebarOnThisPage()", :class="(store.widgetTransition ? '' : 'animated toggleOutRight')")
                    .static-top
                    //- Search.animated.toggleInRight.delay-0-2s/
                    AboutLace.animated.toggleInRight.delay-0-4s(title="About Lace")/
                    NetworkInfo.animated.toggleInRight.delay-0-6s(title="Network Info")/
                    AboutYourWallet.animated.toggleInRight.delay-0-8s(title="About your wallet")/
                .underlay
            //- .debug(style="position: fixed; font-size: 42px; bottom: 20px; left: 20px; background-color: #eeeeeeee; border-radius: 10px; z-index: 99999999999; padding: 10px;") 768
            <RouterView :store="store" />
    .col
        .sticky
            UserMenu(class="side", :theme="theme", :store="store")/
            .widgets.animated
                //- Search.animated.toggleInLeft.delay-0-2s/
                NetworkInfo.animated.toggleInLeft.delay-0-2s(title="Network Info", v-show="checkPageName() == 'staking'")/
                AboutLace.animated.toggleInLeft.delay-0-2s(title="About Lace", v-show="checkPageName() == 'settings'")/
                //- AddressBook.animated.toggleInLeft.delay-0-2s(title="Add new address", v-show="checkPageName() == 'addressBook'")/
                AboutYourWallet.animated.toggleInLeft.delay-0-2s(title="About your wallet", v-show="checkPageName() == 'addressBook' || checkPageName() == 'tokens' || checkPageName() == 'nfts' || checkPageName() == 'activity' || checkPageName() == 'staking' || checkPageName() == 'dashboard'")/
    SideDrawer(:store="store", v-if="store.sidedrawerVisible")/
</template>

<style lang="scss">

// Static & prototype related
@import '../scss/static/_animate';
@import '../scss/static/_brand';

// Layout structure
@import '../scss/structure/layout';
@import '../scss/structure/theme';
@import '../scss/structure/headers';

// General Components
@import '../scss/components/buttons';
@import '../scss/components/pills';
@import '../scss/components/input';

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

</style>