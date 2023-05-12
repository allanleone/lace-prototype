<script>
import Tooltip from '../static/ui/Tooltip.vue'
export default {
    props: {
        store: Object,
        title: String,
    },
    data() {
        return {
            // theme: this.store.get("theme"),
            tooltipIsHover: [false, false, false],
            items: [
                {
                    name: "Network",
                    value: "Mainnet",
                    tooltip: ""
                },
                {
                    name: "Current version",
                    value: "1.0.15",
                    tooltip: ""
                },
                {
                    name: "Commit",
                    value: "AbbasjdhKJAJKjkashdkajsdKAJSjkahJKASHJDKBASDbmAs",
                    tooltip: ""
                }
            ]
        }
    },
    components: {
        Tooltip,
    },
    methods: {
        makeItShort(t){
            // let r = t;
            // if(t.length > 20){
            //     r = t.substr(0, 15) + "..." + t.substr(t.length - 3, t.length)
            // }
            return t;
        }
    },
    mounted(){

    }
}
</script>
<style lang="scss">
.about-lace {
    padding: 20px 20px;
    background: var(--bgCard);
    border: solid 2px var(--bgCardBorder);
    margin-top: 20px;
    border-radius: var(--defaultRadius);
    .title-faq{
        margin-bottom: 24px;
    }
    .item-about{
        display: grid;
        gap: 20px;
        grid-template-columns: .4fr .8fr 24px;
        padding: 10px;
        .name-about{
            color: var(--textColorSecondary);
        }
        .value-about{
            color: var(--textColorPrimary);
            font-size: var(--mainMenuFontSize);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: right;
            margin-right: -40px;
        }
        .copy-about{
            border-radius: 100px;
            display: grid;
            place-content: center;
            width: 24px;
            height: 24px;
            cursor: copy;
            position: relative;
            &:hover{
                background: var(--bgCardHover);
                svg, img{
                    opacity: .75;
                }
            }
            svg, img{
                width: 12px;
                height: 12px;
                opacity: .25;
                path{
                    fill: var(--textColorPrimary);
                }
            }
        }
    }
}
</style>
<template lang="pug">
.about-lace
    h3.title-about(v-html="title")
    .item-about(v-for="(item, index) in items")
        .name-about(v-html="item.name")
        .value-about(v-html="makeItShort(item.value)")
        //- .copy-about(@mouseenter="tooltipIsHover[index] = true", @mouseleave="tooltipIsHover[index] = false")
            Tooltip(:label="'Copy ' + '\"' + item.name + '\"'", :visibility="tooltipIsHover[index]")/
            <svg width="1em" height="1em" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><path fill-rule="evenodd" clip-rule="evenodd" d="M3 2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1V7a3 3 0 0 1 3-3h5V3a1 1 0 0 0-1-1H3Zm11 2V3a3 3 0 0 0-3-3H3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h1v1a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-1ZM7 6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7Z" fill="currentColor"></path></svg>
</template>