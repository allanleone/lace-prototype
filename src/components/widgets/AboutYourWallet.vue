<script>
export default {
    props: {
        store: Object,
        title: String,
    },
    data() {
        return {
            // theme: this.store.get("theme"),
            items: [
                {
                    name: "Glossary",
                    desc: "What is a digital asset?",
                    icon: "<svg width='20' height='17' viewBox='0 0 20 17' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M10 15.2528L9.44662 16.0857C9.78191 16.3085 10.2181 16.3085 10.5534 16.0857L10 15.2528ZM1 2.25278L0.446624 1.41985C0.167661 1.60518 0 1.91786 0 2.25278H1ZM1 15.2528H0C0 15.6213 0.202674 15.9599 0.527441 16.1341C0.852209 16.3082 1.24643 16.2896 1.55338 16.0857L1 15.2528ZM19 2.25278H20C20 1.91786 19.8323 1.60518 19.5534 1.41985L19 2.25278ZM19 15.2528L18.4466 16.0857C18.7536 16.2896 19.1478 16.3082 19.4726 16.1341C19.7973 15.9599 20 15.6213 20 15.2528H19ZM9 2.25278V15.2528H11V2.25278H9ZM1.55338 3.08571C2.53889 2.43096 3.92709 2 5.5 2V0C3.57992 0 1.7969 0.522767 0.446624 1.41985L1.55338 3.08571ZM5.5 2C7.07291 2 8.46111 2.43096 9.44662 3.08571L10.5534 1.41985C9.2031 0.522767 7.42008 0 5.5 0V2ZM1.55338 16.0857C2.53889 15.431 3.92709 15 5.5 15V13C3.57992 13 1.7969 13.5228 0.446624 14.4198L1.55338 16.0857ZM5.5 15C7.07291 15 8.46111 15.431 9.44662 16.0857L10.5534 14.4198C9.2031 13.5228 7.42008 13 5.5 13V15ZM0 2.25278V15.2528H2V2.25278H0ZM19.5534 1.41985C18.2031 0.522767 16.4201 0 14.5 0V2C16.0729 2 17.4611 2.43096 18.4466 3.08571L19.5534 1.41985ZM14.5 0C12.5799 0 10.7969 0.522767 9.44662 1.41985L10.5534 3.08571C11.5389 2.43096 12.9271 2 14.5 2V0ZM19.5534 14.4198C18.2031 13.5228 16.4201 13 14.5 13V15C16.0729 15 17.4611 15.431 18.4466 16.0857L19.5534 14.4198ZM14.5 13C12.5799 13 10.7969 13.5228 9.44662 14.4198L10.5534 16.0857C11.5389 15.431 12.9271 15 14.5 15V13ZM18 2.25278V15.2528H20V2.25278H18Z' fill='url(#paint0_linear_7199_1215)'/><defs><linearGradient id='paint0_linear_7199_1215' x1='-2.29362' y1='-1.60795' x2='23.9939' y2='0.840651' gradientUnits='userSpaceOnUse'><stop stop-color='#FF92E1'/><stop offset='1' stop-color='#FDC300'/></linearGradient></defs></svg>",
                    url: "https://www.lace.io/glossary?term=asset"
                },
                {
                    name: "FAQ",
                    desc: "How do I send and receive funds?",
                    icon: "<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M6.46441 13.5356L5.75731 14.2427L5.75731 14.2427L6.46441 13.5356ZM13.5355 13.5356L14.2426 14.2427V14.2427L13.5355 13.5356ZM7.01151 14.0827L7.71862 13.3755L7.71862 13.3755L7.01151 14.0827ZM7.99995 16.469H6.99995H7.99995ZM12.9884 14.0827L12.2813 13.3755V13.3755L12.9884 14.0827ZM11.9999 16.469H12.9999H11.9999ZM9.99995 19L9.99995 18H9.99995L9.99995 19ZM7.66347 14C7.11119 14 6.66347 14.4477 6.66347 15C6.66347 15.5523 7.11119 16 7.66347 16V14ZM12.3364 16C12.8887 16 13.3364 15.5523 13.3364 15C13.3364 14.4477 12.8887 14 12.3364 14V16ZM10.9999 1C10.9999 0.447715 10.5522 0 9.99995 0C9.44766 0 8.99995 0.447715 8.99995 1H10.9999ZM8.99995 2C8.99995 2.55228 9.44766 3 9.99995 3C10.5522 3 10.9999 2.55228 10.9999 2H8.99995ZM17.071 4.34315C17.4615 3.95262 17.4615 3.31946 17.071 2.92893C16.6805 2.53841 16.0473 2.53841 15.6568 2.92893L17.071 4.34315ZM14.9497 3.63604C14.5592 4.02656 14.5592 4.65973 14.9497 5.05025C15.3402 5.44078 15.9734 5.44078 16.3639 5.05025L14.9497 3.63604ZM19 10.9999C19.5523 10.9999 20 10.5522 20 9.99995C20 9.44766 19.5523 8.99995 19 8.99995V10.9999ZM18 8.99995C17.4477 8.99995 17 9.44766 17 9.99995C17 10.5522 17.4477 10.9999 18 10.9999V8.99995ZM2 10.9999C2.55228 10.9999 3 10.5522 3 9.99995C3 9.44766 2.55228 8.99995 2 8.99995V10.9999ZM1 8.99995C0.447715 8.99995 0 9.44766 0 9.99995C0 10.5522 0.447715 10.9999 1 10.9999V8.99995ZM3.63599 5.05025C4.02651 5.44078 4.65967 5.44078 5.0502 5.05025C5.44072 4.65973 5.44072 4.02656 5.0502 3.63604L3.63599 5.05025ZM4.34309 2.92893C3.95257 2.53841 3.3194 2.53841 2.92888 2.92893C2.53835 3.31946 2.53835 3.95262 2.92888 4.34315L4.34309 2.92893ZM7.17152 12.8285C5.60942 11.2664 5.60942 8.73369 7.17152 7.1716L5.75731 5.75738C3.41416 8.10053 3.41416 11.8995 5.75731 14.2427L7.17152 12.8285ZM7.17152 7.1716C8.73362 5.6095 11.2663 5.6095 12.8284 7.1716L14.2426 5.75738C11.8994 3.41424 8.10045 3.41424 5.75731 5.75738L7.17152 7.1716ZM12.8284 7.1716C14.3905 8.73369 14.3905 11.2664 12.8284 12.8285L14.2426 14.2427C16.5857 11.8995 16.5857 8.10053 14.2426 5.75738L12.8284 7.1716ZM5.75731 14.2427L6.3044 14.7898L7.71862 13.3755L7.17152 12.8284L5.75731 14.2427ZM6.99995 16.469V17H8.99995V16.469H6.99995ZM12.8284 12.8284L12.2813 13.3755L13.6955 14.7898L14.2426 14.2427L12.8284 12.8284ZM10.9999 16.469V17H12.9999V16.469H10.9999ZM10.9999 17C10.9999 17.5523 10.5522 18 9.99995 18L9.99995 20C11.6568 20 12.9999 18.6569 12.9999 17H10.9999ZM12.2813 13.3755C11.4609 14.196 10.9999 15.3087 10.9999 16.469H12.9999C12.9999 15.8391 13.2501 15.2351 13.6955 14.7898L12.2813 13.3755ZM6.99995 17C6.99995 18.6569 8.34309 20 9.99995 20L9.99995 18C9.44766 18 8.99995 17.5523 8.99995 17H6.99995ZM6.3044 14.7898C6.74975 15.2351 6.99995 15.8391 6.99995 16.469H8.99995C8.99995 15.3087 8.53904 14.196 7.71862 13.3755L6.3044 14.7898ZM7.66347 16H12.3364V14H7.66347V16ZM8.99995 1V2H10.9999V1H8.99995ZM15.6568 2.92893L14.9497 3.63604L16.3639 5.05025L17.071 4.34315L15.6568 2.92893ZM19 8.99995H18V10.9999H19V8.99995ZM2 8.99995H1V10.9999H2V8.99995ZM5.0502 3.63604L4.34309 2.92893L2.92888 4.34315L3.63599 5.05025L5.0502 3.63604Z' fill='url(#paint0_linear_7199_1225)'/><defs><linearGradient id='paint0_linear_7199_1225' x1='-2.29362' y1='-2.29361' x2='24.0785' y2='-0.348516' gradientUnits='userSpaceOnUse'><stop stop-color='#FF92E1'/><stop offset='1' stop-color='#FDC300'/></linearGradient></defs></svg>",
                    url: "https://www.lace.io/faq?question=how-do-i-send-and-receive-digital-assets"
                },
                {
                    name: "Videos",
                    desc: "Use Lace for secure self-custody and seamless dapp connectivity.",
                    icon: "<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path style='fill: none; stroke: var(--orange);' d='M15 10L19.5528 7.72361C20.2177 7.39116 21 7.87465 21 8.61803V15.382C21 16.1253 20.2177 16.6088 19.5528 16.2764L15 14M5 18H13C14.1046 18 15 17.1046 15 16V8C15 6.89543 14.1046 6 13 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z' stroke='url(#paint0_linear_5829_28835)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><defs><linearGradient id='paint0_linear_5829_28835' x1='-0.293618' y1='3.80426' x2='25.9013' y2='6.7023' gradientUnits='userSpaceOnUse'><stop stop-color='#FF92E1'/><stop offset='1' stop-color='#FDC300'/></linearGradient></defs></svg>",
                    url: "https://www.lace.io/learn?video=how-lace-gives-you-full-control-of-your-private-keys"
                }
            ]
        }
    },
    components: {
    },
    methods: {

    },
    mounted(){

    }
}
</script>
<style lang="scss">
.about-your-wallet {
    padding: 20px 20px;
    background: var(--bgCard);
    border: solid 2px var(--bgCardBorder);
    margin-top: 20px;
    border-radius: var(--defaultRadius);
    .title-faq{
        margin-bottom: 24px;
    }
    a.faq{
        display: grid;
        gap: 20px;
        grid-template-columns: 50px 1fr;
        padding: 10px;

        &:hover{
            background-color: var(--bgCardHover);
            border-radius: var(--defaultRadius);
        }
    }
    .icon-faq{
        display: grid;
        padding: 0px;
        background: var(--bgCard);
        border: solid 1px var(--bgCardBorder);
        border-radius: var(--defaultRadius);
        place-content: center;
        width: 50px;
        height: 50px;
        svg, img{
            width: 16px;
            height: 16px;
        }
    }
    .info-faq{
        .name-faq{
            color: var(--textColorSecondary);
        }
        .desc-faq{
            color: var(--textColorPrimary);
            font-size: var(--mainMenuFontSize);
        }
    }
    // placeholder fix:
    svg{
        path{
            fill: var(--orange);
        }
    }
}
</style>
<template lang="pug">
.about-your-wallet
    h3.title-faq(v-html="title")
    .item(v-for="(item, index) in items")
        a.faq(:href="item.url", target="_blank")
            .icon-faq(v-html="item.icon")
            .info-faq
                .name-faq(v-html="item.name")
                .desc-faq(v-html="item.desc")
</template>