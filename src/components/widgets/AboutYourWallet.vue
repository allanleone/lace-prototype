<script>
import AboutYourWalletData from '../../json/widgets/about-your-wallet.json'
export default {
    props: {
        store: Object,
        title: String,
    },
    data() {
        return {
            // theme: this.store.get("theme"),
            items: AboutYourWalletData.items,
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
    border: solid 1px var(--bgCardBorder);
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
}
</style>
<template lang="pug">
.about-your-wallet
    h3.title-faq(v-html="title")
    .item(v-for="item in items")
        a.faq(:href="item.url", target="_blank")
            .icon-faq(v-html="item.icon")
            .info-faq
                .name-faq(v-html="item.name")
                .desc-faq(v-html="item.desc")
</template>