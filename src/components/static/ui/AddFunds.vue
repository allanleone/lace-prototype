<script>
import QA from './QR.vue';
export default {
    props: {
        store: Object,
    }, 
    data() {
        return {
        }
    },
    components: {
        QA,
    },
}
</script>
<style lang="scss">
.box-add-funds{
    padding: 40px 45px;
    border-radius: var(--radius);
    background-color: var(--bgCard);
    box-shadow: var(--shadow);
    width: calc(100% - 90px);
    height: auto;
    position: relative;
    display: grid;
    .welcome-group{
        display: grid;
        grid-template-columns: minmax(100px, 240px) auto;
        height: auto;
        gap: 40px;
        width: 100%;
        position: relative;
        .qr-code{
            border: 2px solid transparent;
            color: var(--text-color-primary);
            padding: 10px;
            background: linear-gradient(var(--bgCard), var(--bgCard)) padding-box,linear-gradient(to right, #ff92e1, #fdc300) border-box;
            border-radius: 12px;
            width: 100%;
            height: auto;
            place-self: center;
            max-width: 220px;
            margin: 10px;
            svg, canvas{
                width: 100%;
                height: auto;
            }
        }
        .content-add-funds{
            justify-content: left;
            .address{
                word-break: break-all;
                margin: 20px 0px;
                color: var(--textColorSecondary);
                max-width: 400px;
                text-align: left;
                font-size: var(--bodyMinFontSize);
            }
            button{
                // min-width: 200px;
            }
        }
        .subtitle-add-funds{
            margin-top: -14px;
            color: var(--textColorSecondary);
        }
    }
}
</style>
<template lang="pug">
.box-add-funds.animated.fadeIn.slow.delay-0-5s
    .welcome-group 
        .qr-code
            QA/
        .content-add-funds
            h1 Welcome
            h5.subtitle-add-funds Add funds to start
            .address addr1q86a0lr6atpagle72hx6g5c5v27hxn4k27qcwzv26r7ednvzj3tw59zn62kup4fwx2zhl454anu8wtalrusr77s4q4gs7a67m4
            button.tertiary
                span
                    .icon
                        <svg width="1em" height="1em" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><path fill-rule="evenodd" clip-rule="evenodd" d="M3 2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1V7a3 3 0 0 1 3-3h5V3a1 1 0 0 0-1-1H3Zm11 2V3a3 3 0 0 0-3-3H3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h1v1a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-1ZM7 6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7Z" fill="currentColor"></path></svg>
                    .label Copy address
                    .chevron
</template>