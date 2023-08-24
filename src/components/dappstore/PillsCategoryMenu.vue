<script>
export default {
    data() {
        return {
            hidePrev: true,
            hideNext: false,
        }
    },
    props: {
        store: Object,
    },
    methods: {
        pillNext(){
            document.querySelector(".pill-menu").scrollLeft = document.querySelector(".pill-menu").scrollLeft + 200;
            setTimeout(()=>{
                this.hidePrev = false;
                let maxSize = document.querySelector(".pill-menu .pills").offsetWidth - document.querySelector("#lace .content").offsetWidth
                if(document.querySelector(".pill-menu").scrollLeft >= maxSize){
                    this.hideNext = true;
                }
                console.log(
                    document.querySelector(".pill-menu").scrollLeft,
                    document.querySelector(".pill-menu .pills").offsetWidth,
                    maxSize
                )
            }, 250);
        },
        pillPrev(){
            document.querySelector(".pill-menu").scrollLeft = document.querySelector(".pill-menu").scrollLeft - 200;
            setTimeout(() => {
                this.hideNext = false;
                if (document.querySelector(".pill-menu").scrollLeft <= 3) {
                    this.hidePrev = true;
                }
                let maxSize = document.querySelector(".pill-menu .pills").offsetWidth - document.querySelector("#lace .content").offsetWidth
                if (document.querySelector(".pill-menu").scrollLeft >= maxSize) {
                    this.hideNext = true;
                }
                console.log(
                    document.querySelector(".pill-menu").scrollLeft,
                    document.querySelector(".pill-menu .pills").offsetWidth,
                    maxSize
                )
            }, 250);
        }
    },
    created(){
    },
    mounted(){
        
    }
}
</script>
<style lang="scss" scoped>
.pill-menu {
    position: absolute;
    width: calc(100% - 120px);
    overflow: hidden;
    white-space: nowrap;
    padding: 20px 60px 20px 60px;
    scroll-padding: auto;
    scroll-behavior: smooth;
    margin-bottom: 50px;
    router-link, a{
        padding: 15px 20px;
        background-color: var(--bgCardHover);
        border-radius: 100px;
        margin-right: 10px;
        display: inline-flex;
        width: auto;
        &.active{
            background-color: var(--textColorSecondary);
            color: var(--white);
            .ico{
                filter: brightness(0) invert(1);
            }
        }
        .ico{
            width: 24px;
            height: auto;
            margin-right: 10px;
        }
        .label{
            display: grid;
            place-content: center;
        }
    }
}
.action-next{
    position: absolute;
    background: linear-gradient(90deg, transparent, var(--bg));
    right: 0;
    top: 17px;
    height: 66px;
    display: grid;
    place-content: center;
    padding-left: 30px;
    cursor: pointer;
    &:hover{
        .next, .prev{
            background-color: var(--bgCardActive);
        }
    }
}
.action-prev{
    position: absolute;
    background: linear-gradient(90deg, var(--bg), transparent);
    left: 0;
    top: 17px;
    height: 66px;
    display: grid;
    place-content: center;
    padding-right: 30px;
    cursor: pointer;
    &:hover{
        .next, .prev{
            background-color: var(--bgCardActive);
        }
    }
}
.action-next, .action-prev{
    z-index: 1;
}
.next, .prev{
    background-color: var(--bgCardHover);
    width: 48px;
    height: 48px;
    border-radius: 100%;
    display: grid;
    place-content: center;
}
.placeholder-pill-menu{
    height: 100px;
    z-index: -1;
}
</style>
<template lang="pug">
.action-prev(@click="pillPrev()", v-if="!hidePrev")
    .prev 
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 19L8 12L15 5" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
.action-next(@click="pillNext()", v-if="!hideNext")
    .next 
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5L16 12L9 19" stroke="#3D3B39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
.pill-menu(:style="!hideNext ? 'padding-left: 0;' : ''")
    span.pills
        router-link(v-for="cat in store.get('dappCategories')", :to="'dappstore' + cat.url", :class="cat.active ? 'active' : ''")
            .ico(v-html="cat.icon") 
            .label(v-html="cat.name")
.placeholder-pill-menu

</template>