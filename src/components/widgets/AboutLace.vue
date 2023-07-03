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
                    value: "2.0.0 alpha",
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
    .social-networks-about {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        margin: 10px auto;
        .item{
            width: 42px;
            height: 42px;
            background-color: var(--lightGray);
            border-radius: 12px;
            place-content: center;
            display: grid;
            svg{
                width: 24px;
                height: auto;
                path{
                    fill: var(--textColorPrimary);
                }
                opacity: .8;
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
    .social-networks-about 
        .item 
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><path fill-rule="evenodd" clip-rule="evenodd" d="M5 10h-.748a8.005 8.005 0 0 1 2.757-4.252A3.5 3.5 0 0 0 10.5 9h.5a1 1 0 0 1 1 1 3 3 0 1 0 6 0 1 1 0 0 1 1-1h.419c.375.927.581 1.94.581 3 0 1.061-.206 2.074-.581 3H17a3 3 0 0 0-3 3v1.748c-.64.165-1.31.252-2 .252v-2a3 3 0 0 0-3-3 1 1 0 0 1-1-1v-1a3 3 0 0 0-3-3Zm7-8a10 10 0 0 1 8.959 5.552l.003.007A9.959 9.959 0 0 1 22 12a9.96 9.96 0 0 1-1.038 4.442l-.003.006a10.032 10.032 0 0 1-5.622 4.982l-.008.003a9.985 9.985 0 0 1-4.432.507l-.016-.002C5.885 21.382 2 17.145 2 12 2 6.477 6.477 2 12 2Z" fill="currentColor"></path></svg>
        .item 
            <svg width="1em" height="1em" viewBox="0 0 23 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><path d="M23 3.017a9.736 9.736 0 0 1-2.71.715 4.589 4.589 0 0 0 2.075-2.514c-.926.53-1.94.902-2.996 1.102A4.778 4.778 0 0 0 16.69.942a4.88 4.88 0 0 0-2.996.478 4.619 4.619 0 0 0-2.073 2.135 4.389 4.389 0 0 0-.294 2.91A13.809 13.809 0 0 1 5.94 5.085a13.319 13.319 0 0 1-4.339-3.369 4.412 4.412 0 0 0-.08 4.428 4.61 4.61 0 0 0 1.541 1.638 4.847 4.847 0 0 1-2.137-.569v.059c0 1.049.377 2.065 1.067 2.877a4.756 4.756 0 0 0 2.718 1.577 4.931 4.931 0 0 1-2.131.078 4.555 4.555 0 0 0 1.679 2.258c.79.565 1.745.878 2.73.896a9.706 9.706 0 0 1-5.862 1.945c-.376 0-.752-.02-1.126-.063a13.724 13.724 0 0 0 7.232 2.04c8.681 0 13.427-6.92 13.427-12.924 0-.195-.005-.392-.014-.587a9.403 9.403 0 0 0 2.353-2.35L23 3.017Z" fill="currentColor"></path></svg>
        .item 
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><g clip-path="url(#youtube-icon_component_svg__a)"><path d="M23.498 5.963a3.067 3.067 0 0 0-.775-1.37 3.007 3.007 0 0 0-1.346-.795C19.505 3.286 12 3.286 12 3.286s-7.505 0-9.376.512c-.51.14-.975.415-1.347.794-.372.38-.64.853-.775 1.37C0 7.873 0 11.858 0 11.858s0 3.986.502 5.895c.135.517.403.99.775 1.37.372.38.837.654 1.347.795 1.871.512 9.376.512 9.376.512s7.505 0 9.377-.512c.51-.14.974-.415 1.346-.795.373-.38.64-.852.775-1.37.502-1.91.502-5.895.502-5.895s0-3.986-.502-5.894ZM9.546 15.475V8.24l6.272 3.618-6.272 3.618Z" fill="currentColor"></path></g><defs><clipPath id="youtube-icon_component_svg__a"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></svg>
        .item 
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><path d="M13.537 11.815c0 3.764-3.03 6.815-6.768 6.815S0 15.58 0 11.815C0 8.052 3.03 5 6.769 5c3.738 0 6.768 3.051 6.768 6.815ZM20.963 11.815c0 3.543-1.515 6.416-3.385 6.416-1.869 0-3.384-2.873-3.384-6.416S15.709 5.4 17.578 5.4c1.87 0 3.385 2.873 3.385 6.416M24 11.815c0 3.174-.533 5.748-1.19 5.748-.658 0-1.19-2.573-1.19-5.748 0-3.174.532-5.747 1.19-5.747.657 0 1.19 2.573 1.19 5.747Z" fill="currentColor"></path></svg>
        .item 
            <svg width="1em" height="1em" viewBox="0 0 21 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 0C4.975 0 .5 4.475.5 10a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.287-.6-1.175-1.025-1.412-.35-.188-.85-.65-.013-.663.788-.013 1.35.725 1.538 1.025.9 1.512 2.337 1.087 2.912.825.088-.65.35-1.088.638-1.338-2.225-.25-4.55-1.112-4.55-4.937 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.274.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.017 10.017 0 0 0 20.5 10c0-5.525-4.475-10-10-10Z" fill="currentColor"></path></svg>
</template>