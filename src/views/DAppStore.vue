<script>
import FirstRun from '../components/dappstore/FirstRun.vue';
import PillsCategoryMenu from '../components/dappstore/PillsCategoryMenu.vue';
import GalleryDapp from '../components/dappstore/GalleryDapp.vue';
import DAppCard from '../components/dappstore/DAppCard.vue';
import DAppStatus from '../components/dappstore/DappStatus.vue';
import { RouterLink, RouterView, useRouter  } from 'vue-router';
export default {
    props: {
        store: Object,
    },
    data() {
        return {
            mockupLatestDapps: [],
        }
    },
    methods: {
        routeName(){
            const router = useRouter().currentRoute.value.name;
            return router;
        },
        routeSection(){
            const router = useRouter().currentRoute.value.params.section;
            return router;
        },
    },
    components: {
        FirstRun,
        PillsCategoryMenu,
        GalleryDapp,
        DAppCard,
        DAppStatus,
    },
    mounted(){
        this.mockupLatestDapps = JSON.parse(JSON.stringify(this.store.get('dapps')));
        this.mockupLatestDapps.forEach((m)=>{
            m.promoted = false;
        })
    },
}
</script>

<template lang="pug">
//- h1.animated.toggleInLeft DApp Store
span.dappstore
    span(v-if="routeName() == 'DAppStore'")
        FirstRun/

    //- Featured
    span(v-if="routeName() == 'DAppStoreDashboard'")

        //- Headers (standard)
        .dappstore-dashboard
            
            //- Title
            h1.title.animated.fadeInUp Dapp Store 
            
            //- Search
            div.search.animated.fadeInUp.delay-0-5s
                label
                    input(type="text", :placeholder="store.translate('lace.input-placeholders.search-by-id-or-name', true)")
                    .ico
                        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><path fill-rule="evenodd" clip-rule="evenodd" d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10Z" fill="url(#search_component_svg__a)"></path><defs><linearGradient id="search_component_svg__a" x1="-1.66" y1="-1.66" x2="27.643" y2="0.502" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"></stop><stop offset="1" stop-color="#FDC300"></stop></linearGradient></defs></svg>
            
            //- Pills Menu
            div.animated.fadeInUp.delay-1s
                PillsCategoryMenu(:store="store")/
            
            span(v-if="routeSection() == 'featured'")
                div.animated.fadeInUp.delay-1-2s
                    GalleryDapp.animated.fadeInUp.delay-1s(:store="store")/
                //- FEATURED
                //- .dapp-block.animated.fadeInUp.delay-1-5s
                    .latest-certified
                        h4 Featured
                        DAppCard(
                            :store="store", 
                            :items="this.store.get('dappFeature').slice(0, 3)"
                            :size="'description'"
                            :hoverEffect="true"
                            :promoted="true"
                        )/
                        //- :size="'certification-details'"
                
                //- MOST POPULAR
                .dapp-block.animated.fadeInUp.delay-1-5s
                    .most-popular
                        h4 Most Popular
                        DAppCard(
                            :store="store", 
                            :items="this.store.get('dapps').slice(0, 12)"
                            :size="'small'"
                            :hoverEffect="true"
                            :promoted="true"
                        )/
                
                //- Latest
                //- .dapp-block.animated.fadeInUp.delay-1-5s
                    .latest-certified
                        h4 Latest
                        DAppCard(
                            :store="store", 
                            :items="mockupLatestDapps.slice(0, 3)"
                            :size="'small'"
                            :hoverEffect="true"
                            :promoted="true"
                        )/
            
            //- Favourites
            span(v-if="routeSection() == 'favourites'")
                div.animated.fadeInUp.delay-0-2s
                .dapp-block.animated.fadeInUp.delay-0-4s
                    .most-popular
                        h4 Favorites
                        DAppCard(
                            :store="store", 
                            :items="this.store.get('dappFavorites').slice(0,5)"
                            :size="'description'"
                            :hoverEffect="true"
                            :promoted="true"
                        )/
                //- .dapp-block.animated.fadeInUp.delay-0-4s
                    .most-popular
                        h4 You may also like
                        DAppCard(
                            :store="store", 
                            :items="this.store.get('dapps').slice(0, 6)"
                            :size="'small'"
                            :hoverEffect="true"
                            :promoted="true"
                        )/
                //- .dapp-block.animated.fadeInUp.delay-0-5s
                    .promoted
                        h4 Promoted
                        DAppCard(
                            :store="store", 
                            :items="this.store.get('dappPromoted').slice(0, 3)"
                            :size="'with-image'"
                            :hoverEffect="true"
                            :promoted="false"
                        )/

            //- Development
            span(v-if="routeSection() == 'development'")
                div.animated.fadeInUp.delay-0-2s
                .dapp-block.animated.fadeInUp.delay-0-4s
                    .most-popular
                        h4 Development
                        DAppCard(
                            :store="store", 
                            :items="this.store.get('dappsDevelopment').slice(0, 99)"
                            :size="'small'"
                            :hoverEffect="true"
                            :promoted="true"
                        )/
            
            //- NFTs
            span(v-if="routeSection() == 'nfts'")
                div.animated.fadeInUp.delay-0-2s
                .dapp-block.animated.fadeInUp.delay-0-4s
                    .most-popular
                        h4 NFTs
                        DAppCard(
                            :store="store", 
                            :items="this.store.get('dapps').slice(0, 11)"
                            :size="'small'"
                            :hoverEffect="true"
                            :promoted="true"
                        )/
        

</template>

<style lang="scss">
.dappstore{
    position: relative;
    margin-bottom: 100px;
    .dappstore-dashboard{
        margin-bottom: 200px;
    }
    .search{
        position: relative;
        margin: 10px 0;
        .ico{
            position: absolute;
            top: 0px;
            left: 20px;
        }
        input{
            padding-left: 50px;
            margin: 0;
            width: calc(100% - 80px);
        }
    }
    .dapp-block{
        margin-bottom: 90px;
        &:hover{
            z-index: 999;
        }
    }
    // 
    .dapp-ico{
        background-color: var(--bgCardHover);
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background-size: cover;
        background-position: center center;
        border: solid 1px var(--bgCardBorder);
        align-self: center;
        position: relative !important;
        // justify-self: center;
        .cert-ico{
            position: absolute;
            right: -10px;
            bottom: -10px;
        }
    }
    // 
}
</style>