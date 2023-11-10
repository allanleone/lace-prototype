<script>
import QACodeAddFunds from '../components/static/AddFunds.vue';
import Card from '../components/3d/Card.vue';
export default {
    props: {
        store: Object,
    },
    data() {
        return {
            nfts: this.store.get("nfts"),
            angle: 10,
            zoom: 1.1,
            parallax: 2,
            shadow: 50,
            shadowOpc: .35,
            shadowBlur: 20,
            folderOpened: false,
        }
    },
    methods: {
        openSidedrawer(item) {
            this.store.set({ key: 'sidedrawerStorage', value: item })
            this.store.set({ key: 'sidedrawerVisible', value: true })
        },
        checkNft(nft) {
            let r = true;
            this.store.get("wallets").forEach((w) => {
                if (w.active == false) {
                    if (w.network == nft.network) {
                        r = false;
                    }
                }
            })
            return r;
        },
        updateStore(){
            this.store.set({key: 'tempAngle', value: this.angle})
            this.store.set({key: 'tempZoom', value: this.zoom})
            this.store.set({key: 'tempParallax', value: this.parallax })
            this.store.set({key: 'tempShadow', value: this.shadow })
            this.store.set({key: 'tempShadowOpc', value: this.shadowOpc })
            this.store.set({key: 'tempShadowBlur', value: this.shadowBlur })
        },
    },
    components: {
        QACodeAddFunds,
        Card,
    }
}
</script>

<template lang="pug">
.nfts
    //!!!!!!!!!!!!!!!!!!! DEBUG !!!!!!!!!!!!!!!
    //- .sliders
        label
            div
                span Angle ({{ angle }} / current: {{store.get('tempAngle')}}) - [smaller = more intense]
            input(type="range", min="5", max="50", step="1" v-model="angle") 
        label
            div
                span Zoom ({{ zoom }} / current: {{store.get('tempZoom')}})
            input(type="range", min=.9, max=1.3, step="0.1", v-model="zoom") 
        label
            div
                span Parallax ({{ parallax }} / current: {{store.get('tempParallax')}}) - [smaller = more intense]
            input(type="range", min=1, max=5, step="0.01", v-model="parallax") 
        label
            div
                span Shadow Distance ({{ shadow }} / current: {{store.get('tempShadow')}}) - [smaller = more intense]
            input(type="range", min=10, max=100, step="1", v-model="shadow") 
        label
            div
                span Shadow Opacity ({{ shadowOpc }} / current: {{store.get('tempshadowOpc')}})
            input(type="range", min=0.01, max=1, step=".01", v-model="shadowOpc") 
        label
            div
                span Shadow Blur ({{ shadowBlur }} / current: {{store.get('tempshadowBlur')}})
            input(type="range", min=0, max=100, step="1", v-model="shadowBlur") 
        button.purple(style="width: 150px;", @click="updateStore()")
            span(v-if="angle == store.get('tempAngle') && zoom == store.get('tempZoom') && parallax == store.get('tempParallax') && shadow == store.get('tempShadow') && shadowOpc == store.get('tempShadowOpc') && shadowBlur == store.get('tempShadowBlur')") Updated 
            span(v-else) click to update
    //!!!!!!!!!!!!!!!!!!! DEBUG !!!!!!!!!!!!!!!

    .page-title(style="margin-bottom: 30px;")
        h1.animated.fadeInUp
            button.navigation(v-if="folderOpened", @click="folderOpened = false;")
                span 
                    .icon
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 19L3 12M3 12L10 5M3 12L21 12" stroke="#6F7786" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            span(style="display: inline-block; margin-left: 10px;") 
                span(v-html='store.translate("lace.menu.nfts")')
                span.counter(v-if="!folderOpened") ({{ nfts.length }})
                span.counter(v-if="folderOpened") &nbsp; > 
            span.animated.fadeInRight(v-if="folderOpened", style="display: inline-block; margin-left: 10px;") 
                span Favourites
                span.counter(v-if="store.get('nftsNested').items.length > 3 ?  true : false") ({{ store.get('nftsNested').items.length }})
        span.floating-add-button.animated.toggleInRight
            button(@click="openSidedrawer({action: 'nft-folder', title: 'NFT Folder', action: 'nft-create-folder'})", style="padding: 10px 20px;")
                span
                    .icon 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 13H15M12 10V16M3 17V7C3 5.89543 3.89543 5 5 5H11L13 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17Z" stroke="url(#paint0_linear_17397_113264)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="paint0_linear_17397_113264" x1="-0.293617" y1="2.4383" x2="25.9856" y2="4.93033" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"/><stop offset="1" stop-color="#FDC300"/></linearGradient></defs></svg>
                    .label(v-html="store.translate('lace.labels.create-folder')")
    //- QACodeAddFunds.add-funds(:store="store")/
    .partners.animated.fadeInUp.delay-1s
        h4 Featured
        //- 
        .partner
            .logo 
                img(src="https://dashboard-assets.dappradar.com/document/19475/labsbymutants-dapp-other-cardano-logo-166x166_497bcda0d25c23e28c9c0a4a27e9835c.png")
            .label Monster Lab - 0.5% discount on NFTs using Lace Wallet
        .know-more 
            button.tertiary Open
        //- .desc A platform with a variety of utilities for NFT projects. We offer raffles, staking and whitelist management services for Cardano NFT projects. Our main goal is to bring fun to the NFT environment.
        .scroll-feature 
            .pre 
            .post
            .cards-featured
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .card-s(style="background-image: url('https://assets.epoch.art/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d426c6f636b4f776c734e616e61303330.webp')")
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .card-s(style="background-image: url('https://assets.epoch.art/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d426c6f636b4f776c734e616e61303330.webp')")
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .card-s(style="background-image: url('https://assets.epoch.art/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d426c6f636b4f776c734e616e61303330.webp')")
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .card-s(style="background-image: url('https://assets.epoch.art/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d426c6f636b4f776c734e616e61303330.webp')")
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .card-s(style="background-image: url('https://assets.epoch.art/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d426c6f636b4f776c734e616e61303330.webp')")
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .card-s(style="background-image: url('https://assets.epoch.art/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d426c6f636b4f776c734e616e61303330.webp')")
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .card-s(style="background-image: url('https://assets.epoch.art/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d426c6f636b4f776c734e616e61303330.webp')")
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .card-s(style="background-image: url('https://assets.epoch.art/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d426c6f636b4f776c734e616e61303330.webp')")
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .card-s(style="background-image: url('https://assets.epoch.art/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d426c6f636b4f776c734e616e61303330.webp')")
                .card-s(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .card-s(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .card-s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .card-s(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .card-s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .card-s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .card-s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
            
        //- 
    .new-section.animated.fadeInUp.delay-1-5s
        h4 Your Collection
    br/
    br/
    .cards-space.animated.fadeInUp.delay-1-5s(:class="folderOpened ? 'folder-view' : ''")

        //- FOLDERS
        .nft-folder.animated.fadeInUp.delay-1s(@click="folderOpened = true;", v-if="!folderOpened && store.get('nftsNested').active")
            .nft-nested-card.animated.fadeInUp(v-for="(nft, i) in store.get('nftsNested').items.slice(0,3)")
                .poster-nested
                    .nft-thumb-image-nested(:style="'background-image: url(' + nft.thumb +')'")
                        //- .network 
                            img(:src="nft.thumbNetwork")/
            .nft-nested-card.animated.fadeInUp
                .poster-nested
                    .nft-thumb-image-nested     
                        span +{{store.get('nftsNested').items.length - 3}}
                        //- .network 
                            img(:src="nft.thumbNetwork")/
            .nft-title-nested {{store.get('nftsNested').name}}
        //- FOLDERS
        
        //- FOLDERS ALT
        //- .nft-folder.alt.animated.fadeInUp.delay-1s(@click="folderOpened = true;", v-if="!folderOpened && store.get('nftsNested').active")
            .nft-nested-card.animated.fadeInUp(v-for="(nft, i) in store.get('nftsNested').items.slice(0,3)")
                .poster-nested
                    .nft-thumb-image-nested(:style="'background-image: url(' + nft.thumb +')'")
                        //- .network 
                            img(:src="nft.thumbNetwork")/
            .nft-title-nested 
                h5(style="font-weight: bold;") {{store.get('nftsNested').name}}
                span(style="font-weight: normal;") {{store.get('nftsNested').items.length}} assets
        //- FOLDERS ALT

        //- FOLDER OPENED
        .nested-grid(v-if="folderOpened")
            .nft-folder.opened
                .nft-nested-card(v-for="(nft, i) in store.get('nftsNested').items")
                    .poster-nested
                        .nft-thumb-image-nested(:style="'background-image: url(' + nft.thumb +')'")
                            //- .network 
                                img(:src="nft.thumbNetwork")/
                    .nft-title-nested {{nft.label}}
        //- FOLDER OPENED

        //- Items
        .nft-card.animated.fadeInUp(
            v-for="(nft, i) in nfts", 
            v-show="checkNft(nft) && !folderOpened"
            :class="i < 9 ? 'delay-1-' + (i + 1) + 's' : 'delay-2s'"
            @click="openSidedrawer({action: 'NFTs', title: 'NFT detail', value: nft, action: 'nft'})"
            )
            .poster
                .nft-thumb-image(:style="'background-image: url(' + nft.thumb +')'")
                    //- .network 
                        img(:src="nft.thumbNetwork")/
            .nft-title {{ nft.label }}
        Card(:store="store", data-image="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=")
            h1(slot="header") Canyons
            p(slot="content") Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        //- Items
</template>

<style lang="scss" scoped>
.nfts{
    .cards-space{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        text-align: center;
        gap: 10px;
        &.folder-view{
            grid-template-columns: repeat(1, 1fr);
        }
        .nft-card, .nft-nested-card{
            width: auto;
            height: auto;
            position: relative;
            margin-bottom: 60px;
            cursor: pointer;
            padding: 10px;
            border-radius: var(--radius);
            transition: background-color .25s ease-in-out;
            .network{
                width: 13%;
                height: 13%;
                min-width: 16px;
                min-height: 16px;
                overflow: hidden;
                border-radius: 5px var(--radius) 5px 5px;
                position: absolute;
                top: -1px;
                right: -1px;
                background: var(--bgCard);
                aspect-ratio: 1 / 1;
                // border: solid 2px var(--bgCard);
                padding: 5px;
                img{
                    width: 100%;
                    aspect-ratio: 1 / 1;
                }
            }
            &:hover{

            }
            .poster, .poster-nested{
                width: 100%;
                aspect-ratio: 1 / 1;
                position: relative;
                transition: all .5s ease-in-out;
                background: transparent;
                border-radius: var(--radius);
                .nft-thumb-image, .nft-thumb-image-nested{
                    border-radius: var(--radius);
                    overflow: hidden;
                    box-shadow: var(--tinyShadow);
                    aspect-ratio: 1 / 1;
                    transition: background-size 1s ease-in-out;
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                    background-position: 50% 50%;
                    background-size: auto 120%;
                    background-repeat: no-repeat;
                    display: grid;
                    place-content: center;
                }
            }
            .nft-title{
                margin-top: 20px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: calc(100% - 20px);
                margin-left: 10px;
                margin-right: 10px;
                position: absolute;
            }
            &:hover{
                // background-color: var(--bgCardHover);
                z-index: 1;
                .nft-title{
                    // white-space: normal;
                }
            }
        }
        .nft-folder{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            place-content: center;
            aspect-ratio: 1 / 1;
            background-color: var(--bgCardBorder);
            border-radius: var(--radius);
            padding-left: 10px;
            padding-right: 10px;
            padding: 10px;
            gap: 0;
            transition: width .5s ease-in-out, background-color 1s ease-in-out;
            cursor: pointer;
            position: relative;
            &:before{
                content: '';
                border-radius: var(--radius);
                width: 50%;
                height: 50px;
                background-color: var(--bgCardBorder);
                z-index: -1;
                position: absolute;
                left: 0px;
                top: -20px
            }
            &.alt{
                // height: 100px;
                .nft-title-nested{
                    margin:0px;
                    width: 100%;
                    background-color: var(--bgCardBorder);
                    bottom: 0;
                    border-radius: var(--radius);
                    height: 120px;
                    z-index: 999;
                    box-shadow: 0px -20px 5px #00000010;
                    place-content: center;
                    display: grid;
                    text-align: left;
                    justify-content: flex-start;
                    span, h5{
                        padding-left: 20px;

                    }
                }
                .nft-nested-card{
                    position: absolute;
                    top: 20px;
                    left: 10px;
                    width: 90px;
                    height: 90px;
                    transform: rotate(-10deg) translate(0px, 20px) !important;
                    transition: transform .5s ease-in-out forwards;
                    &:nth-child(1){
                        left: 60px;
                        transform: rotate(20deg) translate(0px, 10px) !important;
                        z-index: 1;
                    }
                    &:nth-child(2){
                        left: 120px;
                        transform: rotate(10deg) translate(0px, 20px) !important;
                    }
                }
                &:hover{
                    .nft-nested-card{
                        transform: scale(1.1) rotate(-10deg) translate(0px, -20px);
                        &:nth-child(1){
                            left: 60px;
                            @keyframes nf1 {
                                0%{transform: rotate(-10deg) translate(0px, 20px);}
                                100%{transform: scale(1.1)  rotate(20deg) translate(0px, -10px);}
                            }
                            animation: nf1 1 ease-in-out forwards;
                            transform:  scale(1.1)  rotate(20deg) translate(0px, -10px);
                            z-index: 1;
                        }
                        &:nth-child(2){
                            left: 120px;
                            transform:  scale(1.1)  rotate(10deg) translate(0px, -20px);
                        }
                        .poster-nested{
                            transform: none;
                        }
                    }
                }
            }
            .nft-nested-card{
                margin-bottom: 0px;
                padding: 5px;
                padding-bottom: 0;
            }
            .poster-nested{
                transition: transform .25s ease-in-out;
            }
            .nft-title-nested{
                margin-top: 20px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: calc(100% - 20px);
                margin-left: 10px;
                margin-right: 10px;
                position: absolute;
                bottom: -30px;
            }
            &:hover{
                .nft-nested-card{
                    .poster-nested{
                        transform: scale(.9) !important;
                    }
                }
            }
            &.opened{
                cursor: default;
                @keyframes adjustW {
                    0%{ width: 0;}
                    100%{ width: 100%;}
                }
                align-content: start;
                align-items: start;
                align-self: start;
                width: 33%;
                height: auto;
                animation: adjustW .5s ease-in-out forwards;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: auto;
                background-color: var(--bgCard);
                gap: 20px;
                .nft-nested-card{
                    margin-bottom: 60px;
                }
                &:hover{
                    .nft-nested-card{
                        .poster-nested{
                            transform: scale(1) !important;
                        }
                    }
                }
            }

        }
    }
    .page-title{
        grid-template-columns: 1fr auto;
        display: grid;
        align-content: center;
        z-index: 1;
        margin-bottom: 20px;
        .floating-add-button{
            float: right;
            display: block;
            position: relative;
            z-index: 1;
            align-self: center;
            justify-self: right;
            button{
                width: auto;
                float: right;
                z-index: 1;
            }
        }
    }
    .nested-grid{
        display: grid;
        grid-template-columns: repeat(1, 1fr);

    }

    .sliders{
        position: fixed;
        bottom: 40px;
    }

    //

    .partners{
        padding-bottom: 180px;
        position: relative;
        .partner{
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 10px;
            place-content: center;
            margin: 20px 0;
            .logo{
                width: 24px;
                img{
                    width: 100%;
                    border-radius: 100%;
                }
            }
            .label{
                font-size: 14px;
                color: var(--textColorSecondary);
                height: auto;
                display: grid;
                align-items: center;
            }
        }
        .desc{
            font-size: 14px;
            color: var(--textColorSecondary);
            margin-top: -20px;
            margin-bottom: 20px;
        }
        .know-more {
            position: absolute;
            right: 0;
            top: 30px;
        }
        .scroll-feature {
            overflow: hidden;
            width: 100%;
            position: absolute;
            .pre, .post{
                width: 50px;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background: linear-gradient(90deg, var(--bg), #00000000);
                z-index: 1;
            }
            .post{
                left: auto;
                right: 0;
                background: linear-gradient(90deg, #00000000, var(--bg));
            }
            .cards-featured{
                @keyframes scrollLeft {
                    0%{margin-left: 0;}
                    100%{margin-left: -10000px;}
                }
                animation: scrollLeft 250s linear infinite;
                white-space: nowrap;
                display: inline-flex;
                gap: 20px;
                width: auto;
                .card-s{
                    border-radius: 20px;
                    width: 100px;
                    aspect-ratio: 3 / 4;
                    background-size: cover;
                    background-position: center center;
                }
            }
        }
    }

}
</style>