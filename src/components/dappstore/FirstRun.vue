<script>
export default {
    data() {
        return {
            selected: false,
        }
    },
    props: {
        
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
.first-run {
    display: grid;
    place-content: center;
    text-align: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    .title{
        font-weight: bold;
    }
    .subtitle{
        margin: 20px auto;
    }
    .label{
        font-size: var(--bodyFontSize);
        animation: fadeInDown .25s ease-in-out forwards;
        position: absolute;
        width: 100%;
        bottom: 40px;
    }
    .desc{
        font-size: 14px;
        color: var(--textColorSecondary);
        position: absolute;
        bottom: 30px;
        opacity: 0;
        animation: fadeOutDown .25s ease-in-out forwards;
    }
    .dappstore-cards{
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 20px auto;
        gap: 20px;
        .dappstore-card{
            position: relative;
            border-radius: var(--radius);
            width: 150px;
            height: 150px;
            border: solid 2px var(--bgCardBorder);
            display: grid;
            place-content: center;
            // transition: background-color .25s ease-in-out;
            cursor: pointer;
            &:nth-child(1){
                svg{
                    path{
                        stroke: var(--textColorPrimary) !important;
                    }
                }
            }
            &:nth-child(2){
                svg{
                    path{
                        fill: var(--textColorPrimary) !important;
                    }
                }
            }
            .icon{
                padding: 10px;
                margin-top: -40px;
                svg{
                    width: 32px;
                    height: auto;
                }
            }
            &.selected{
                border-color: var(--hoverPurple);
                background-color: var(--accentPurpleTransparent);
            }
            &:hover{
                border-color: var(--accentPurpleTransparent);
                background-color: var(--accentPurpleTransparent);
                .label{
                    animation: fadeOutUp .25s ease-in-out forwards;
                }
                .desc{
                    animation: fadeInUp .25s ease-in-out forwards;
                }
            }
            &.selected:hover{
                border-color: var(--hoverPurple);
                background-color: var(--accentPurpleTransparent);
            }
        }
    }
    button{
        margin: 20px auto;
    }
}
</style>
<template lang="pug">
.first-run 
    .splash-screen
        h2.title.animated.fadeInDown Welcome  
        .subtitle.animated.fadeIn.delay-0-2s Before we start, choose your favorite way to navigate.
        .dappstore-cards
            .dappstore-card.animated.fadeIn.delay-0-4s(@click="selected = 1", :class="selected == 1 ? 'selected' : ''")
                .select
                .help 
                .icon 
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.98562 17.9861H5.90278C8.12726 17.9861 9.93056 19.7894 9.93056 22.0139V24.0278C9.93056 26.2523 11.7339 28.0556 13.9583 28.0556C16.1828 28.0556 17.9861 29.8589 17.9861 32.0833V38.0144M11.9444 3.75903V6.90972C11.9444 9.69032 14.1986 11.9444 16.9792 11.9444H17.9861C20.2106 11.9444 22.0139 13.7477 22.0139 15.9722C22.0139 18.1967 23.8172 20 26.0417 20C28.2661 20 30.0694 18.1967 30.0694 15.9722C30.0694 13.7477 31.8727 11.9444 34.0972 11.9444L36.241 11.9444M26.0417 37.0937V32.0833C26.0417 29.8589 27.845 28.0556 30.0694 28.0556H36.241M38.125 20C38.125 30.0102 30.0102 38.125 20 38.125C9.98984 38.125 1.875 30.0102 1.875 20C1.875 9.98984 9.98984 1.875 20 1.875C30.0102 1.875 38.125 9.98984 38.125 20Z" stroke="#3D3B39" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                .label Explorer
                .desc An original way to discover DApps.
            .dappstore-card.animated.fadeIn.delay-0-6s(@click="selected = 2", :class="selected == 2 ? 'selected' : ''")
                .select
                .help 
                .icon 
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.9159 0.388672H2.12843C1.66695 0.388672 1.22438 0.571993 0.898062 0.898306C0.571749 1.22462 0.388428 1.6672 0.388428 2.12867V11.9162C0.388428 12.3776 0.571749 12.8202 0.898062 13.1465C1.22438 13.4728 1.66695 13.6562 2.12843 13.6562H11.9159C12.3755 13.6499 12.8144 13.4646 13.1394 13.1396C13.4643 12.8147 13.6497 12.3757 13.6559 11.9162V2.12867C13.6559 1.6672 13.4726 1.22462 13.1463 0.898306C12.82 0.571993 12.3774 0.388672 11.9159 0.388672V0.388672ZM10.1759 10.1762H3.91676V3.91701H10.1759V10.1762Z" fill="#3D3B39"/><path d="M11.9159 18.417H2.12843C1.66695 18.417 1.22438 18.6003 0.898062 18.9266C0.571749 19.2529 0.388428 19.6955 0.388428 20.157V29.8237C0.388428 30.2851 0.571749 30.7277 0.898062 31.054C1.22438 31.3803 1.66695 31.5637 2.12843 31.5637H11.9159C12.3774 31.5637 12.82 31.3803 13.1463 31.054C13.4726 30.7277 13.6559 30.2851 13.6559 29.8237V20.157C13.6559 19.6955 13.4726 19.2529 13.1463 18.9266C12.82 18.6003 12.3774 18.417 11.9159 18.417V18.417ZM10.1759 28.0837H3.91676V21.8245H10.1759V28.0837Z" fill="#3D3B39"/><path d="M29.8718 0.388672H20.2051C19.9766 0.388672 19.7503 0.433678 19.5392 0.521121C19.3281 0.608565 19.1363 0.736732 18.9747 0.898306C18.8131 1.05988 18.685 1.2517 18.5975 1.4628C18.5101 1.67391 18.4651 1.90017 18.4651 2.12867V11.9162C18.4651 12.1447 18.5101 12.3709 18.5975 12.582C18.685 12.7931 18.8131 12.985 18.9747 13.1465C19.1363 13.3081 19.3281 13.4363 19.5392 13.5237C19.7503 13.6112 19.9766 13.6562 20.2051 13.6562H29.8718C30.3332 13.6562 30.7758 13.4728 31.1021 13.1465C31.4284 12.8202 31.6118 12.3776 31.6118 11.9162V2.12867C31.6118 1.6672 31.4284 1.22462 31.1021 0.898306C30.7758 0.571993 30.3332 0.388672 29.8718 0.388672ZM28.0834 10.1762H21.8243V3.91701H28.0834V10.1762Z" fill="#3D3B39"/><path d="M29.8718 18.417H20.2051C19.9766 18.417 19.7503 18.462 19.5392 18.5494C19.3281 18.6369 19.1363 18.7651 18.9747 18.9266C18.8131 19.0882 18.685 19.28 18.5975 19.4911C18.5101 19.7022 18.4651 19.9285 18.4651 20.157V29.8237C18.4651 30.0522 18.5101 30.2784 18.5975 30.4895C18.685 30.7006 18.8131 30.8924 18.9747 31.054C19.1363 31.2156 19.3281 31.3438 19.5392 31.4312C19.7503 31.5187 19.9766 31.5637 20.2051 31.5637H29.8718C30.1158 31.5926 30.3632 31.5695 30.5977 31.4958C30.8322 31.4222 31.0485 31.2997 31.2322 31.1365C31.4159 30.9732 31.563 30.7729 31.6637 30.5487C31.7644 30.3245 31.8165 30.0815 31.8165 29.8357C31.8165 29.59 31.7644 29.347 31.6637 29.1228C31.563 28.8986 31.4159 28.6983 31.2322 28.535C31.0485 28.3718 30.8322 28.2493 30.5977 28.1757C30.3632 28.102 30.1158 28.0789 29.8718 28.1078H21.8243V21.8245H28.0834V24.1203C28.0545 24.3644 28.0776 24.6118 28.1513 24.8463C28.2249 25.0808 28.3474 25.297 28.5106 25.4808C28.6739 25.6645 28.8742 25.8115 29.0984 25.9123C29.3226 26.013 29.5656 26.065 29.8113 26.065C30.0571 26.065 30.3001 26.013 30.5243 25.9123C30.7485 25.8115 30.9488 25.6645 31.1121 25.4808C31.2753 25.297 31.3978 25.0808 31.4714 24.8463C31.545 24.6118 31.5682 24.3644 31.5393 24.1203V20.0845C31.5214 19.648 31.34 19.2341 31.0311 18.9252C30.7221 18.6162 30.3083 18.4348 29.8718 18.417V18.417Z" fill="#3D3B39"/></svg>
                .label Grid
                .desc An original way to discover DApps.
        button.purple.animated.fadeIn.delay-0-8s(:disabled="selected != 1 && selected != 2") Enter
        label.animated.fadeInUp.delay-1s
            input(type="checkbox", checked)/
            span Don't show this message again
</template>