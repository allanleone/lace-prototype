<script>


//- App --------------------------------------------------
import { RouterLink, RouterView, useRouter  } from 'vue-router'
// -------------------------------------------------------

//- Static -----------------------------------------------
import UserMenu from '../components/static/UserMenu.vue';
import MainMenu from '../components/static/MainMenu.vue';
import Input from '../components/static/ui/Input.vue';
// -------------------------------------------------------

//- Widgets ----------------------------------------------
import AboutYourWallet from '../components/widgets/AboutYourWallet.vue'
import AboutLace from '../components/widgets/AboutLace.vue'
import Search from '../components/widgets/Search.vue'
import NetworkInfo from '../components/widgets/NetworkInfo.vue'
// -------------------------------------------------------

export default {
    props: {
        store: Object,
    },
    data() {
        return {
            theme: this.store.theme,
        }
    },
    components: {
        UserMenu,
        MainMenu,
        Input,
        //
        AboutYourWallet,
        AboutLace,
        Search,
        NetworkInfo,
    },
    methods: {
        toggleSidebar() {
            if (this.store.get('sidebarVisible') == true) {
                this.store.set({ key: 'sidebarVisible', value: false })
            } else {
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
        }
    },
    mounted(){

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
                //- 
                //-  Main menu
                MainMenu(theme="theme")/
        .col
            .sticky
                .global-search
                    //- Input(type="text", placeholder="Search")
            .content
                UserMenu(class="middle", :theme="theme", :store="store", :class="showOrHideSidebarOnThisPage() == false ? 'no-widgets' : ''")/
                .widgets-overlay.animated.fadeIn(@click="toggleSidebar()", :class="store.sidebarVisible ? 'visible' : ''")
                    .widgets
                        .static-top
                        //- Search.animated.toggleInRight.delay-0-2s/
                        //- AboutLace.animated.toggleInRight.delay-0-4s(title="About Lace")/
                        NetworkInfo.animated.toggleInRight.delay-0-6s(title="Network Info")/
                        AboutYourWallet.animated.toggleInRight.delay-0-8s(title="About your wallet")/
                    .underlay
                <RouterView />
        .col
            .sticky
                UserMenu(class="side", :theme="theme", :store="store")/
                .widgets(v-if="showOrHideSidebarOnThisPage()")
                    //- Search.animated.toggleInLeft.delay-0-2s/
                    //- AboutLace.animated.toggleInLeft.delay-0-4s(title="About Lace")/
                    NetworkInfo.animated.toggleInLeft.delay-0-6s(title="Network Info")/
                    AboutYourWallet.animated.toggleInLeft.delay-0-8s(title="About your wallet")/
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
@import '../scss/components/globalSearch';
@import '../scss/components/buttons';
@import '../scss/components/pills';
@import '../scss/components/toggle';
@import '../scss/components/tooltip';
@import '../scss/components/input';

.widgets{
    z-index: 0;
    padding-bottom: 50px;
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
    background-color: #ffffffdd;
    display: none;
    @media screen and (min-width: 1280px) {
        display: none !important;
        &.visible{
            display: none !important;
        }
    }
    &.visible{
        display: grid;
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
        width: 400px;
        height: 100px;
        background: linear-gradient(var(--bg) 80%, transparent);
        z-index: 1;
    }
}

</style>