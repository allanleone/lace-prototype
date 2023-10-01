<script>
import Tooltip from '../static/ui/Tooltip.vue'
import DAppCard from '../dappstore/DAppCard.vue'
export default {
    props: {
        store: Object,
        title: String,
    },
    data() {
        return {
            // theme: this.store.get("theme"),
        }
    },
    components: {
        Tooltip,
        DAppCard,
    },
    methods: {

    },
    mounted(){

    }
}
</script>
<style lang="scss">
.promoted-dapp {
    // padding: 20px 20px;
    // background: var(--bgCard);
    // border: solid 2px var(--bgCardBorder);
    margin-top: 20px;
    border-radius: var(--defaultRadius);
    .title{
        margin-bottom: 24px;
        display: none;
    }
    .dapp-card{
        grid-template-columns: 1fr;
        // max-width: 300px;
        margin: auto;
        .dapp-banner{
            height: 200px;
        }
    }
}
</style>
<template lang="pug">
.promoted-dapp
    h3.title(v-html="title")
    .dapp-block.animated.fadeInUp.delay-0-5s
        .promoted
            DAppCard(
                :store="store", 
                :items="this.store.get('dappPromoted').slice(0, 1)"
                :size="'with-image'"
                :hoverEffect="false"
                :promoted="false"
            )/
</template>