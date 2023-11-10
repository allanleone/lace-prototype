<script>

export default {
    props: {
        store: Object,
    },
    data() {
        return {
            theme: true,
            activeTab: 1,
            arch: [
                {
                    name: "Get started",
                    desc: "Enabled Lace archievements feature",
                    icon: "/assets/images/arch/trophy-dynamic-clay.png",
                    iconActive: "/assets/images/arch/trophy-dynamic-gradient.png",
                    unlocked: true,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "Dapps",
                    desc: "Navigate using the Awesome View on the DApp Store",
                    icon: "/assets/images/arch/3d-dynamic-clay.png",
                    iconActive: "/assets/images/arch/trophy-dynamic-gradient.png",
                    unlocked: false,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "Ding Dong",
                    desc: "Enabled Notifications",
                    icon: "/assets/images/arch/bell-dynamic-clay.png",
                    iconActive: "/assets/images/arch/bell-dynamic-gradient.png",
                    unlocked: false,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "Beettles",
                    desc: "Raised a bug or issue",
                    icon: "/assets/images/arch/flag-dynamic-clay.png",
                    iconActive: "/assets/images/arch/flag-dynamic-gradient.png",
                    unlocked: false,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "Early adopter",
                    desc: "Updated to beta version of the wallet",
                    icon: "/assets/images/arch/explorer-dynamic-clayx.png",
                    iconActive: "/assets/images/arch/explorer-dynamic-gradient.png",
                    unlocked: false,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "MsPaint",
                    desc: "Changed Theme",
                    icon: "/assets/images/arch/paint-kit-dynamic-clay.png",
                    iconActive: "/assets/images/arch/paint-kit-dynamic-gradient.png",
                    unlocked: true,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "Saved for later",
                    desc: "Added Lace.io to your bookmarks",
                    icon: "/assets/images/arch/heart-dynamic-clay.png",
                    iconActive: "/assets/images/arch/heart-dynamic-gradient.png",
                    unlocked: false,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "Lorem Ipsum",
                    desc: "Lorem Ipsum",
                    icon: "/assets/images/arch/setting-dynamic-clay.png",
                    iconActive: "/assets/images/arch/setting-dynamic-gradient.png",
                    unlocked: false,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "Lorem Ipsum",
                    desc: "Lorem Ipsum",
                    icon: "/assets/images/arch/scissor-dynamic-clay.png",
                    iconActive: "/assets/images/arch/scissor-dynamic-gradient.png",
                    unlocked: false,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "Lorem Ipsum",
                    desc: "Lorem Ipsum",
                    icon: "/assets/images/arch/calender-dynamic-clay.png",
                    iconActive: "/assets/images/arch/calender-dynamic-gradient.png",
                    unlocked: false,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "Lorem Ipsum",
                    desc: "Lorem Ipsum",
                    icon: "/assets/images/arch/sheild-dynamic-clay.png",
                    iconActive: "/assets/images/arch/sheild-dynamic-gradient.png",
                    unlocked: false,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "Beettles",
                    desc: "Raised a bug or issue",
                    icon: "/assets/images/arch/flag-dynamic-clay.png",
                    iconActive: "/assets/images/arch/flag-dynamic-gradient.png",
                    unlocked: true,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "Navigate using the Awesome View on the DApp Store",
                    desc: "Navigate using the Awesome View on the DApp Store",
                    icon: "/assets/images/arch/3d-dynamic-clay.png",
                    iconActive: "/assets/images/arch/trophy-dynamic-gradient.png",
                    unlocked: false,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "Enabled Notifications",
                    desc: "Enabled Notifications",
                    icon: "/assets/images/arch/bell-dynamic-clay.png",
                    iconActive: "/assets/images/arch/bell-dynamic-gradient.png",
                    unlocked: false,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "Raised a bug or issue",
                    desc: "Raised a bug or issue",
                    icon: "/assets/images/arch/flag-dynamic-clay.png",
                    iconActive: "/assets/images/arch/flag-dynamic-gradient.png",
                    unlocked: false,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "Updated to beta version of the wallet",
                    desc: "Updated to beta version of the wallet",
                    icon: "/assets/images/arch/explorer-dynamic-clayx.png",
                    iconActive: "/assets/images/arch/explorer-dynamic-gradient.png",
                    unlocked: false,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "Early adopter",
                    desc: "Updated to beta version of the wallet",
                    icon: "/assets/images/arch/explorer-dynamic-clayx.png",
                    iconActive: "/assets/images/arch/explorer-dynamic-gradient.png",
                    unlocked: true,
                    showText: false,
                },
                {
                    name: "Added Lace.io to your bookmarks",
                    desc: "Added Lace.io to your bookmarks",
                    icon: "/assets/images/arch/heart-dynamic-clay.png",
                    iconActive: "/assets/images/arch/heart-dynamic-gradient.png",
                    unlocked: false,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "Lorem Ipsum",
                    desc: "Lorem Ipsum",
                    icon: "/assets/images/arch/setting-dynamic-clay.png",
                    iconActive: "/assets/images/arch/setting-dynamic-gradient.png",
                    unlocked: false,
                    showText: false,
                    avaliable: false,
                },
                {
                    name: "Lorem Ipsum",
                    desc: "Lorem Ipsum",
                    icon: "/assets/images/arch/scissor-dynamic-clay.png",
                    iconActive: "/assets/images/arch/scissor-dynamic-gradient.png",
                    unlocked: false,
                    showText: false,
                    avaliable: false,
                },
            ]
        }
    },
    methods: {
        changeTheme(){
            if(this.theme){
                document.querySelector("html").classList.add("dark");
                document.querySelector("html").classList.remove("light");
                this.store.set({ key: 'theme', value: 'dark' })
                this.theme = false;
            }else{
                document.querySelector("html").classList.remove("dark");
                document.querySelector("html").classList.add("light");
                this.store.set({ key: 'theme', value: 'light' })
                this.theme = true;
            }
        },
        openSidedrawer(item) {
            this.store.set({ key: 'sidedrawerStorage', value: item })
            this.store.set({ key: 'sidedrawerVisible', value: true })
        },
    },
    components: {

    }
}
</script>

<template lang="pug">
.rewards
    h1.animated.fadeInUp Rewards Hub
    p.animated.fadeInUp.delay-0-5s Unlock Lace archievements, convert to Rewards points and limb ranks from beginner to expert based on your XP. Start now and watch achievements turn into exclusive NFTs and more.
    .tabs-a.animated.fadeInUp.delay-0-5s
        .tab-a(@click="activeTab = 1", :class="activeTab == 1 ? 'active' : ''") Archievements
        .tab-a(@click="activeTab = 2", :class="activeTab == 2 ? 'active' : ''") Leaderboard
        .tab-a(@click="activeTab = 3", :class="activeTab == 3 ? 'active' : ''") Reedem
        .tab-a(@click="activeTab = 0", :class="activeTab == 0 ? 'active' : ''") News & Updates
    br/
    br/
    .notifications(v-if="activeTab == 0")
        h6 
            center No new updates
        
    .arch(v-if="activeTab == 1")
        .items
            .item.animated.fadeInUp(
                v-for="(item, index) in arch"
                :class="(item.avaliable ? 'avaliable' : '') + '; ' + 'delay-1-' + (index <= 9 ? index : 9) + 's'"
                @mouseenter="item.showText = true;"
                @mouseleave="item.showText = false;"
            )
                .badge(:class="item.unlocked ? 'colored' : ''")
                    .icon
                        img(v-if="!item.unlocked", :src="item.icon")
                        img(v-if="item.unlocked", :src="item.iconActive")
                .tooltip 
                    <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path d="M22 34h4v-12h-4v12zm2-30c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 36c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z"/></svg>
                .name(v-if="item.unlocked") {{ item.name }}
                .name(v-if="!item.unlocked") ❔
                .desc(v-if="item.unlocked") {{ item.desc }}
                .desc(v-if="!item.unlocked") -

    .ranking-contacts(v-if="activeTab == 2")
        .contact.animated.fadeInUp(
            v-for="i in 10"
            :class="'delay-1-' + (i <= 9 ? i : 9) + 's'"
        )
            .ranking 
                span {{ i }}
                .icon(v-if="i == 1")
                    img(src="https://cliply.co/wp-content/uploads/2021/03/392103930_CROWN_EMOJI_400px.gif")
            .pic L
            .name Lorem Ipsum

    .exchange-points(v-if="activeTab == 3")
        .cards-featured
            .card-s.animated.fadeInUp.delay-1-1s.none(style="background-image: url('https://assets-global.website-files.com/60d83e3c6cf84748f7d0a62b/6452128aef45712f989ae9ed_Snek.png')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="https://pbs.twimg.com/profile_images/1683503226178482176/jwFeKzka_400x400.jpg")
            .card-s.animated.fadeInUp.delay-1-2s.none(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.animated.fadeInUp.delay-1-3s.none(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.animated.fadeInUp.delay-1-4s(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.animated.fadeInUp.delay-1-5s.none(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.animated.fadeInUp.delay-1-6s(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.animated.fadeInUp.delay-1-7s(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.animated.fadeInUp.delay-1-8s(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.animated.fadeInUp.delay-1-9s.none(style="background-image: url('https://assets.epoch.art/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d426c6f636b4f776c734e616e61303330.webp')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.none(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.none(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.none(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.none(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.none(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.none(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.none(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.none(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.none(style="background-image: url('https://ipfs5.jpgstoreapis.com/ipfs/QmeC8vfJjZ14mhPbkqiocEhM2ueDey4LLeqmPUQCdD5sjF')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.none(style="background-image: url('https://images.squarespace-cdn.com/content/v1/61ac9cf1e52ca44ca9f17a09/ef27c9c9-7cf2-4a07-9d46-0d75e8692644/unnamed-1.gif')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.none(style="background-image: url('https://openseauserdata.com/files/0110e851ff002208b6dd9b21987bf2da.gif')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.none(style="background-image: url('https://media.tenor.com/CIsD36vxMNkAAAAC/portalheads-wen-nfts-animation-nft-now-wen-portals.gif')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.none(style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a70e7d134500327.61d6d49b56e00.gif')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.none(style="background-image: url('https://lh3.googleusercontent.com/l-TjjfLnm_2eBLr497nO4N12YTnM1sRatCgyL-Z74ot5dLIygZYmrAQmMkZGEiClgjbaiTmrCyY_la6LkpU7CJOqzrfncuq_a0vFWw')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.none(style="background-image: url('https://assets.epoch.art/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d/7ea3e7719938f8acd700327d6c9dffd7523a02dce1d9891b5f3a452d426c6f636b4f776c734e616e61303330.webp')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            .card-s.none(style="background-image: url('https://assets.epoch.art/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017496e74726f766572747332353434.webp')")
                .hover 
                    .vlr
                        .amount 
                            span
                                h4 525
                            span
                        .alt-amount 
                            span
                                img(src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Coin-ada-big.svg/1024px-Coin-ada-big.svg.png") 
                            span
                                h5 25 
                    button.purple
                        .label Collect 
                        img(src="/assets/images/mutants.svg")
            
    br/
    br/
    br/
    br/

</template>

<style lang="scss">

</style>