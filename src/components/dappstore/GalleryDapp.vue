<script>

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
    props: {
        store: Object,
    },
    data() {
        return {
            currentSlide: 0,
            showListOfSlides: false,
            inMotion: false,
            items: [
                {
                    name: "Sunday Swap",
                    desc: "We concept, design and build innovative, decentralized software to power the next generation of global financial services.",
                    image: "/assets/dappstore/highlight-2.png",
                    ico: "https://crypto.jobs/storage/company-logos/18ZZW9IREQktAniuO6ZMBAShzJKeFzzLhYvLAJPc.png",
                    url: ""
                },
                {
                    name: "Artano",
                    desc: "NFT marketplace, with the aim to research and develop the next generation of NFTs called infinite NFTs",
                    image: "/assets/dappstore/highlight-1.png",
                    ico: "https://www.lidonation.com/storage/440/conversions/artano-logo-thumbnail.jpg",
                    url: ""
                },
                {
                    name: "Blockfrost",
                    desc: "Your gateway to the Cardano ecosystem",
                    image: "/assets/dappstore/highlight-3.png",
                    ico: "https://cardanocrowd.com/storage/images/public/images/51-ST-blockfrostlogo.png",
                    url: ""
                },
                {
                    name: "JPG.store",
                    desc: "JPG Store is the largest Cardano NFT marketplace. We believe in people, planet, & purpose before profit. ",
                    image: "/assets/dappstore/highlight-4.png",
                    ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAw1BMVEX/2yT///8AAAD/yQD/3iXStR5LS0vryiHvvAAsJgZAMwD00SJtXQ8kJCRRUVHDw8P29vZ7e3v/0QBLOwD/4yXxzyL61yOPexTGqhv/zQDgwB+6oBq0mhmkjBdkVg2qqqoLCQFKPwr/6iYUEQNcTw2ZhBV5aBHOsR0lHwSHcxMeGgRFOghNQgoRERFjY2M8NAc8PDw3Lgfr6+udnZ3//+z/6qn/3WH/0iP/1Tf/4Xf/8ML///RLQiJLRDWXdgCNbwDPogCUcZHIAAAC8UlEQVR4nO3diVbaQBSA4XAdpZHUWiWETWUTsFBo7WY39f2fquWUpVLbhjiTO3D+/wHifGYmkOiZBAERERERERERERERERERERERERGR/xlTKW1WxRjtQafPmHrjsh9tUj9pDoJtIZr65Vg2b3hV1R55usqNMANv1qtkK05ikpE3a1TyX3j2BJ9Ir+i50Ayyzs8tEZbOn+YTGXstNPurkT5P3euHxNhjYXl5AicXL1I3eQic7vsrLC9914XUHb9cm6XtfW3HX4sXYzxO7/sTKGGxrC15vOUSfLOB7xGgiKezdAk8eCpw6OfXNntACas+nkOLQBk2PFyHNoEiHs5Su8BWs6INWs8uUIZn2qD1LANFzjxbh9aBklS8upjaB0ri1S2wA2DrShv1ew6AIlFHm7XKCVDO/VmHboDS9+Ym3xFQIl+uNK6A0i77IXQGlLYfs9QdUHp1H4QOgX4IXQLlrQePE50CZah/Dt0CpT3QFjoGynSgfPvkGijduq7QOVC6jR0HSqgqzAEoYVNxluYBFFF8YJoPUJpqnxY5AfX+gJgTUPqlHQeK1pe23IB9petMbkDZKmDhYnOg0iLMCLye/BPzWEqLMCOwUHh3lLLFv9QofVBkBqbuaNeBBwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEODWA99/+PiptmezWu3m85evvgC/nVjFLbv57gnw1BHw5BQgQIAAAQIECBAgQIAAAQLcReChMrA4//li93nMqsXxtbYbNYsB3O7VrBt/HvF2cXytTZ3Ko/kAunf3z6x3f9edH76ttfOYaSx+xRIeWm/1ziq9t23EI8mhUazlC4Jmy72v1dTzBaUr90C1bdVmmTjLyxU3aqy72a/pRN3/DzJ73aijvRFu0Ijc+SLdHVR/ZeJq0puG1pv2kqoHe1HPMpW46KDYnxczzN5Vaz9tExEREREREREREREREREREREREVnqBzmmkDq6wDowAAAAAElFTkSuQmCC",
                    url: ""
                },
            ]
        }
    },
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    methods: {
        slideTo(val) {
            if(val == 'next'){
                this.currentSlide--
            }else if(val == 'prev'){
                this.currentSlide++
            }else{
                this.currentSlide = val
            }
        },
        toggleListOfSlides(action){
            if(action){
                setTimeout(() => { this.showListOfSlides = true }, 0)
            }else{
                    setTimeout(() => { this.showListOfSlides = false; }, 500)
            }
        }
    },
    mounted(){

    }
}
</script>
<style lang="scss" scoped>
.dappstore-gallery {
    position: relative;
    section#gallery{

        .carousel__slide {
            padding: 5px;
        }
        
        .carousel__viewport {
            perspective: 0px;
        }
        
        .carousel__track {
            transform-style: preserve-3d;
        }
        
        .carousel__slide--sliding {
            transition: 0.5s;
            filter: saturate(0);
        }
        
        .carousel__slide {
            // opacity: 0.9;
            // transform: rotateY(-0deg) scale(1);
            // transition: box-shadow .5s ease-in-out, filter .25s ease-in-out;
        }
        
        .carousel__slide--active ~ .carousel__slide {
            transform: rotateY(0deg) scale(1);
        }
        
        .carousel__slide--prev, .carousel__slide--next {
            opacity: 1;
            transform: rotateY(0deg) scale(.95) !important;
            // margin-left: -10px;
            // opacity: .25;
            filter: saturate(0);
            .img{
                box-shadow: 0px 0px 0px transparent;
            }
        }
        
        .carousel__slide--active {
            z-index: 1;
            opacity: 1;
            transform: rotateY(0) scale(1);
            .img{
                box-shadow: var(--shadow);
            }
            .dapp-detals{
                display: grid;
            }
        }
        .carousel__item{
            position: relative;
            width: 100%;
            height: 400px;
            transition: all .5s ease-in-out;
            .img{
                border-radius: var(--radius);
                width: calc(100% + 0px);
                height: calc(100% - 40px);
                background-size: cover;
                margin-top: 10px;
                background-position: center center;
            }
        }
    }
    section#thumbnails{
        transition: all .25s ease-in-out;
        overflow: hidden;
        &.visible{
            opacity: 1;
            height: auto;
        }
        &.hidden{
            opacity: 0;
            // height: 0;
        }
        .carousel__slide {
            padding: 5px;
        }
        
        .carousel__viewport {
            perspective: 0px;
        }
        
        .carousel__track {
            transform-style: preserve-3d;
        }
        
        .carousel__slide--sliding {
            transition: 0.5s;
        }
        
        .carousel__slide {
            opacity: 0.9;
            transform: rotateY(-0deg) scale(1);
        }
        
        .carousel__slide--active ~ .carousel__slide {
            transform: rotateY(0deg) scale(1);
        }
        
        .carousel__slide--prev {
            opacity: 1;
            transform: rotateY(-0deg) scale(1);
            opacity: .25;
            filter: saturate(0);
        }

        .carousel__slide--clone{
            opacity: 1;
            transform: rotateY(-0deg) scale(1);
            opacity: .25;
            filter: saturate(0);
        }
        
        .carousel__slide--next {
            opacity: 1;
            transform: rotateY(0deg) scale(1);
            // margin-left: -10px;
            opacity: .25;
            filter: saturate(0);
        }
        
        .carousel__slide--active {
            z-index: 1;
            opacity: 1;
            transform: rotateY(0) scale(1);
        }
        .carousel__item{
            position: relative;
            width: 100%;
            height: 80px;
            transition: all .5s ease-in-out;
            .img{
                border-radius: var(--radius);
                width: calc(100% + 0px);
                height: 100%;
                background-size: cover;
                background-position: center center;
            }
        }
    }
    .go-next, .go-prev{
        border-radius: 100%;
        width: 48px;
        height: 48px;
        border: solid 1px var(--bgCardBorder);
        background-color: var(--bgCard);
        display: grid;
        place-content: center;
        position: absolute;
        top: 180px;
        cursor: pointer;
        &:hover{
            background-color: var(--bgCardHover);
        }
        &.dark{
            svg, img{
                filter: brightness(0) invert(1);
            }
        }
    }
    .go-next{
        left: 1px;
    }
    .go-prev{
        right: 1px;
    }
    .thumbs{
        position: absolute;
        height: 100px;
        width: 100%;
        margin-top: 0px;
        display: none;
    }
    .dapp-detals{
        width: calc(100% - 20px);
        height: 100px;
        background-color: var(--bgCard);
        position: absolute;
        bottom: 30px;
        margin: 10px;
        border-radius: var(--radius);
        text-align: left;
        display: grid;
        grid-template-columns: 70px 1fr;
        align-items: center;
        padding: 15px 20px;
        animation: fadeInUp .5s ease-in-out forwards;
        animation-delay: .5s;
        opacity: 0;
        display: none;
        box-shadow: var(--tinyShadow);
        .name{
            font-weight: bold;
        }
        .desc{
            font-weight: 400;
        }
    }
}
</style>
<template lang="pug">
.dappstore-gallery
    Carousel(
        id="gallery"
        :itemsToShow="1.15"
        :wrapAround="true"
        :transition="500"
        v-model="currentSlide"
        @slide-start="toggleListOfSlides(true)"
        @slide-end="toggleListOfSlides(false)"
    )
        Slide(v-for="(slide, i) in store.get('dappFeature').slice(0, 3)", :key="slide")
            .carousel__item
                .img(:style="'background-image: url(' + slide.image + ')'")/
                .dapp-detals
                    .dapp-ico(:style="'background-image: url(' + slide.ico + ')'")
                    .data 
                        .name(v-html="slide.name") 
                        .desc(v-html="slide.desc") 
    
    .go-next(@click="slideTo('next')", :class="store.get('theme')")
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.9315 22.3459L4.04102 14.4554M4.04102 14.4554L11.9315 6.56494M4.04102 14.4554L24.3309 14.4554" stroke="#212121" stroke-width="2.25443" stroke-linecap="round" stroke-linejoin="round"/></svg>
    .go-prev(@click="slideTo('prev')", :class="store.get('theme')")
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.7247 5.65406L24.6152 13.5446M24.6152 13.5446L16.7247 21.4351M24.6152 13.5446L4.32538 13.5446" stroke="#212121" stroke-width="2.25443" stroke-linecap="round" stroke-linejoin="round"/></svg>
        
    .thumbs
        Carousel(
            id="thumbnails"
            :items-to-show="items.length * 1.5"
            :wrap-around="true"
            :transition="500"
            v-model="currentSlide"
            ref="carousel"
            :class="showListOfSlides ? 'visible' : 'hidden'"
        )
            Slide(v-for="(slide, i) in items", :key="slide")
                .carousel__item( @click="slideTo(i)")
                    .img(:style="'background-image: url(' + slide.image + ')'")/
</template>