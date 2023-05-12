<script>
export default {

    data() {
        return {
        }
    },
    components: {
    },
}
</script>
<style lang="scss">
.network-info-status-badge{
    cursor: pointer;
    display: inline-grid;
    place-content: center;
    padding: 0px 12px;
    height: 32px;
    border: 1.5px solid var(--midGray);
    border-radius: 16px;
    grid-template-columns: auto auto;
    background-color: var(--cream);
    border-color: var(--bgCardBorder);
    position: absolute;
    margin-left: 210px;
    margin-top: 5px;
    width: auto;
    z-index: 1;
    transition: all .25s ease-in-out;
    overflow: hidden;
    @media screen and (max-width: 1024px){
        // background-color: transparent;
        margin-left: 70px;
        padding: 0px 5px;
        height: 10px;
        &:hover{
            // background-color: var(--cream);
            margin-left: 140px;
            padding: 0px 12px;
            height: 32px;
            // margin-left: 210px;
            .status-label{
                display: inline-block;
            }
        }
    }
    @media screen and (max-width: 512px){
        margin-left: 50px;
        margin-top: -22px;
        &:hover{
            margin-left: 50px;
            padding: 0px 12px;
            margin-top: -35px;
            height: 32px;
            // margin-left: 210px;
            .status-label{
                display: inline-block;
            }
        }
    }
    .status-icon{
        width: 8px;
        height: 8px;
        border-radius: 100px;
        background-color: var(--cream);
        place-self: center;
        margin-right: 5px;
        display: none;
        @media screen and (max-width: 1024px){
            // display: block;
            // box-shadow: var(--shadow);
        }
    }
    .status-label{
        display: inline-block;
        font-size: 12px;
        font-weight: 500;
        color: var(--textColorPrimary);
        @media screen and (max-width: 1024px){
            display: none;
        }
    }
}
</style>
<template lang="pug">
.network-info-status-badge
    .status-icon
    .status-label.animated.fadeIn Preprod
</template>