<script>
import DAppStatus from './DappStatus.vue';
export default {
    props: {
        store: Object,    
        items: Object, 
        size: String,   
        hoverEffect: Boolean,
        promoted: Boolean,
    },
    data() {
        return {
            
        }
    },
    components:{
        DAppStatus,
    },
    methods: {

    },
    created(){
    },
    mounted(){

    }
}
</script>
<style lang="scss" scoped>
.dapp-card {

    --animationHoverDuration: .5s;
    --delayHover: .45s;
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 20px;
    @media screen and (min-width: 1280px) and (max-width: 1660px){
        grid-template-columns: repeat(2, auto);
    }
    @media screen and (min-width: 668px) and (max-width: 1024px){
        grid-template-columns: repeat(2, auto);
    }
    @media screen and (min-width: 1px) and (max-width: 668px){
        grid-template-columns: repeat(1, auto);
    }
    .card{
        border-radius: var(--radius);
        border: solid 1px var(--bgCardBorder);
        padding: 20px;
        max-width: calc(100% - 40px);
        min-width: calc(100% - 40px);
        width: calc(100% - 40px);
        position: relative;
        display: grid;
        gap: 20px;
        align-items: center;
        cursor: pointer;
        background-color: var(--bgCard);
        transition: background-color .25s ease-in-out;
        .grid{
            grid-template-columns: 50px 1fr;
            max-width: calc(100% - 40px);
            min-width: calc(100% - 40px);
            width: calc(100% - 40px);
            position: relative;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: grid;
            gap: 20px;
            align-items: center;
            &.grid-hover{
                position: absolute;
                width: 100%;
            }
        }
        &:hover{
            background-color: var(--bgCardHover);
        }
        //- TYPES
        &.with-image{
            width: 100%;
            transition: opacity .25s ease-in-out, 
                        background-color .25s ease-in-out,
                        transform .25s ease-in-out;
            .dapp-banner{
                transition: transform .25s ease-in-out;
                border-radius: var(--radius) var(--radius) 0 0 ;
            }
            &:hover{
                .dapp-banner{
                    // opacity: .80;
                    // transform: scale(1.05);
                }
            }
        }
        &.description{
            &:hover{
                > .short-desc{
                    opacity: 0;
                }
            }
        }
        .hover{
            position: absolute;
            background-color: var(--bgCard);
            border: solid 1px var(--bgCardBorder);
            box-shadow: 0px 0px 0px transparent;
            padding: 20px;
            border-radius: var(--radius);
            top: -1px;
            left: -1px;
            z-index: 2;
            width: calc(100% - 40px);
            height: var(--h);
            background-color: var(--bgCardHover);
            transition: background-color .25s ease-in-out;
            &:hover{
                background-color: var(--bgCardHover);
            }
            --topStart: 0;
            --topEnd: -100px;
            --h: 50px;
            &.with-desc{
                --h: 190px;
                --topStart: 0;
                --topEnd: -40px;
            }
            &.with-img{
                --h: 50px;
                --topStart: 99px;
                --topEnd: -40px;
                top: var(--topStart);
                border-radius: 0 0 var(--radius) var(--radius);
            }
            @keyframes expandHover{
                0%{height: var(--h); top: var(--topStart); left:0; background-color: var(--bgCardHover);}
                100%{height: 260px; width: calc(100% - 20px); box-shadow: var(--shadow); left: -10px; top: var(--topEnd); background-color: var(--bgCard);}
            }
            @keyframes expandHoverImg{
                0%{border-radius: 0 0 var(--radius) var(--radius); height: var(--h); top: var(--topStart); left:0; background-color: var(--bgCardHover);}
                100%{border-radius: var(--radius); height: 260px; width: calc(100% - 20px); box-shadow: var(--shadow); left: -10px; top: var(--topEnd); background-color: var(--bgCard);}
            }
            animation: expandHover var(--animationHoverDuration) ease-in-out forwards;
            animation-delay: var(--delayHover);
            &.with-img{
                animation: expandHoverImg var(--animationHoverDuration) ease-in-out forwards;
                animation-delay: calc(var(--delayHover) / 2);
            }
            .grid{
                margin-bottom: 20px;
            }
            .short-desc{
                margin-top: 20px;
            }
            .certification-status{
                margin-top: 22px;
            }
        }
        .certification-status {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            place-items: center;
            .level{
                text-align: center;
                display: grid;
                place-content: center;
                place-items: center;
                place-self: center;
                margin-top: -10px;
                .label{
                    &.active{

                    }
                    &.inactive{
                        opacity: .5;
                    }
                }
            }
            .ico-cert{
                width: 32px;
                &.active{

                }
                &.inactive{
                    filter: saturate(0);
                    opacity: .25;
                }
                svg{
                    width: 100%;
                    height: auto;
                }
            }
        }
        .short-desc{
            white-space: wrap;
            align-self: flex-start;
            height: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            // margin: 20px auto;
        }
        //- TYPES
        .ico{
            width: 48px;
            height: 48px;
            border-radius: var(--radius);
            background-color: var(--midGray);
        }
        .info{
            display: grid;
            gap: 5px;
            position: relative;
            
        }
        .row{
            position: relative;
        }
        .dapp-name{
            width: 100%;
            font-size: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .dapp-banner{
        width: calc(100% + 40px);
        height: 100px;
        background-size: cover;
        margin: -20px;
        margin-bottom:0px;
    }
    hr{
        padding: 0;
        margin: 0;
        border: none;
        border-top: solid 1px var(--bgCardBorder);
        margin: 0px 0;
    }
    .promoted-adver-warning{
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 12px;
        color: var(--textColorPrimary);
        opacity: .25;
        text-transform: uppercase;
    }
    .promoted{

        // --radius: 8%;
        border: solid 1px transparent;
        position: relative;
        background-color: transparent;
        border-radius: var(--radius);
        animation: glowShadow 3.14s linear infinite;
        animation-delay: .5s;
        overflow: hidden;
        &:hover{
            background-color: transparent;
            &:after{
                background-color: var(--bgCardHover);
            }
        }

        &::before {
            content: "";
            position: absolute;
            top: 0px;
            right: 0px;
            bottom: 0px;
            left: 0px;
            z-index: -2;
            background: conic-gradient(
                from 0deg,
                var(--bgCardBorder),
                var(--bgCardBorder),
                var(--accentPurpleTransparent),
                var(--bgCardBorder),
                var(--bgCardBorder),
            );
            background-clip: content-box;
            animation: glow 3.14s linear infinite;
            animation-delay: .5s;
        }
        &::after{
            content: "";
            position: absolute;
            top: 1px;
            right: 1px;
            bottom: 1px;
            left: 1px;
            z-index: -1;
            background: var(--bgCard);
            border-radius: var(--radius);
            transition: background-color .25s ease-in-out;
        }

        @keyframes glow {
            0% {
                transform: rotate(0deg) scale(3.5);
            }
            100% {
                transform: rotate(360deg) scale(3.5);
            }
        }
        --blurShadow: 20px;
        --collorIntensity: #7f5af011;
        --distanceMinus: -10px;
        --distancePlus: 10px;
        @keyframes glowShadow {
            0% {
                box-shadow: var(--distancePlus) var(--distanceMinus) var(--blurShadow) var(--collorIntensity) inset;
            }
            25%{
                box-shadow: var(--distancePlus) var(--distancePlus) var(--blurShadow) var(--collorIntensity) inset;
            }
            50%{
                box-shadow: var(--distanceMinus) var(--distancePlus) var(--blurShadow) var(--collorIntensity) inset;
            }
            75%{
                box-shadow: var(--distanceMinus) var(--distanceMinus) var(--blurShadow) var(--collorIntensity) inset;
            }
            100% {
                box-shadow: var(--distancePlus) var(--distanceMinus) var(--blurShadow) var(--collorIntensity) inset;
            }
        }
    }
    .promoted-tiny{

        // --radius: 8%;
        border: solid 1px transparent;
        position: relative;
        background-color: transparent;
        border-radius: var(--radius);
        animation: glowShadow 3.14s linear infinite;
        animation-delay: .5s;
        overflow: hidden;
        &:hover{
            background-color: transparent;
            overflow: visible;
            &:after, &:before{
                display: none;
                background-color: var(--bgCardHover);
            }
        }

        &::before {
            content: "";
            position: absolute;
            top: 0px;
            right: 0px;
            bottom: 0px;
            left: 0px;
            z-index: -2;
            background: conic-gradient(
                from 0deg,
                var(--bgCardBorder),
                var(--bgCardBorder),
                var(--accentPurpleTransparent),
                var(--bgCardBorder),
                var(--bgCardBorder),
            );
            background-clip: content-box;
            animation: glow 3.14s linear infinite;
            animation-delay: .5s;
        }
        &::after{
            content: "";
            position: absolute;
            top: 1px;
            right: 1px;
            bottom: 1px;
            left: 1px;
            z-index: -1;
            background: var(--bgCard);
            border-radius: var(--radius);
            transition: background-color .25s ease-in-out;
        }

        @keyframes glow {
            0% {
                transform: rotate(0deg) scale(3.5);
            }
            100% {
                transform: rotate(360deg) scale(3.5);
            }
        }
        --blurShadow: 20px;
        --collorIntensity: #7f5af011;
        --distanceMinus: -10px;
        --distancePlus: 10px;
        @keyframes glowShadow {
            0% {
                box-shadow: var(--distancePlus) var(--distanceMinus) var(--blurShadow) var(--collorIntensity) inset;
            }
            25%{
                box-shadow: var(--distancePlus) var(--distancePlus) var(--blurShadow) var(--collorIntensity) inset;
            }
            50%{
                box-shadow: var(--distanceMinus) var(--distancePlus) var(--blurShadow) var(--collorIntensity) inset;
            }
            75%{
                box-shadow: var(--distanceMinus) var(--distanceMinus) var(--blurShadow) var(--collorIntensity) inset;
            }
            100% {
                box-shadow: var(--distancePlus) var(--distanceMinus) var(--blurShadow) var(--collorIntensity) inset;
            }
        }
    }
}
</style>
<template lang="pug">
.dapp-card 

    //---- size "small"
    .card(
        v-for="dapp in items"
        v-if="size == 'small'"
        @mouseenter="dapp.hover = true"
        @mouseleave="dapp.hover = false"
        :class="(dapp.promoted ? 'promoted-tiny' : '')"
    ) 
        .grid
            .dapp-ico(:style="'background-image: url(' + dapp.ico + ');'")
            .info 
                .row
                    span.dapp-name(v-html="dapp.name")
                .row
                    DAppStatus(:status="dapp.status")/
        .promoted-adver-warning(v-if="dapp.promoted") Ad
        //- Hover
        .hover(
            v-show="dapp.hover && hoverEffect"
            :class="(dapp.promoted ? 'promoted' : '')"
        )
            .grid
                .dapp-ico(:style="'background-image: url(' + dapp.ico + ');'")
                .info 
                    .row
                        span.dapp-name(v-html="dapp.name")
                    .row
                        DAppStatus(:status="dapp.status")/
            .promoted-adver-warning(v-if="dapp.promoted") Ad
            hr.animated.fadeIn.delay-0-7s/
            .short-desc.animated.fadeIn.delay-0-6s(v-html="dapp.desc", v-show="dapp.hover")
            hr.animated.fadeIn.delay-0-7s/
            .certification-status.animated.fadeIn.delay-0-7s
                .level 
                    .ico-cert(:class="dapp.certification.l1 ? 'active' : 'inactive'")
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_641_47576)"><circle cx="14" cy="14" r="9" fill="white"/></g><path opacity="0.5" d="M14 5C15.5858 5 17.1434 5.419 18.5152 6.21457C19.887 7.01014 21.0242 8.15404 21.8117 9.53045C22.5993 10.9069 23.0091 12.4669 22.9998 14.0527C22.9906 15.6384 22.5625 17.1936 21.7589 18.5607L14 14L14 5Z" fill="#FDC300"/><path d="M15.843 16H12.329V15.216C14.24 13.809 14.8 13.326 14.8 12.752C14.8 12.346 14.429 12.143 14.037 12.143C13.512 12.143 13.106 12.353 12.791 12.682L12.224 12.024C12.679 11.499 13.372 11.261 14.023 11.261C15.017 11.261 15.808 11.821 15.808 12.752C15.808 13.55 15.15 14.243 13.897 15.125H15.843V16Z" fill="white"/><g clip-path="url(#clip0_641_47576)"><path d="M19.0271 10.4909C18.9077 10.4969 18.7876 10.5 18.6667 10.5C16.8738 10.5 15.2384 9.82598 14 8.71753C12.7615 9.82594 11.1261 10.4999 9.33333 10.4999C9.21245 10.4999 9.09229 10.4968 8.97291 10.4908C8.82741 11.0529 8.75 11.6424 8.75 12.25C8.75 15.5117 10.9809 18.2524 14 19.0295C17.0191 18.2524 19.25 15.5117 19.25 12.25C19.25 11.6424 19.1726 11.0529 19.0271 10.4909Z" fill="#FDC300" stroke="#FDC300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><path d="M14.76 16H13.616V12.128L12.736 13.032L12.088 12.352L13.768 10.664H14.76V16Z" fill="white"/><defs><filter id="filter0_d_641_47576" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="2.5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_641_47576"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_641_47576" result="shape"/></filter><clipPath id="clip0_641_47576"><rect width="14" height="14" fill="white" transform="translate(7 7)"/></clipPath></defs></svg>
                    .label(:class="dapp.certification.l1 ? 'active' : 'inactive'") basic
                .level
                    .ico-cert(:class="dapp.certification.l2 ? 'active' : 'inactive'")
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_641_47574)"><circle cx="14" cy="14" r="9" fill="white"/></g><path opacity="0.5" d="M14 5C15.5715 5 17.1157 5.41151 18.4788 6.19359C19.842 6.97566 20.9765 8.10104 21.7697 9.45775C22.5628 10.8145 22.9869 12.3552 22.9997 13.9267C23.0125 15.4982 22.6136 17.0457 21.8426 18.4151C21.0717 19.7846 19.9556 20.9283 18.6054 21.7324C17.2552 22.5366 15.7179 22.9732 14.1466 22.9988C12.5752 23.0244 11.0246 22.6381 9.6489 21.8783C8.27322 21.1185 7.12046 20.0118 6.30532 18.6682L14 14L14 5Z" fill="#3489F7"/><g clip-path="url(#clip0_641_47574)"><path d="M19.0271 10.4909C18.9077 10.4969 18.7876 10.5 18.6667 10.5C16.8738 10.5 15.2384 9.82598 14 8.71753C12.7615 9.82594 11.1261 10.4999 9.33333 10.4999C9.21245 10.4999 9.09229 10.4968 8.97291 10.4908C8.82741 11.0529 8.75 11.6424 8.75 12.25C8.75 15.5117 10.9809 18.2524 14 19.0295C17.0191 18.2524 19.25 15.5117 19.25 12.25C19.25 11.6424 19.1726 11.0529 19.0271 10.4909Z" fill="#3489F7" stroke="#3489F7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><path d="M15.843 16H12.329V15.216C14.24 13.809 14.8 13.326 14.8 12.752C14.8 12.346 14.429 12.143 14.037 12.143C13.512 12.143 13.106 12.353 12.791 12.682L12.224 12.024C12.679 11.499 13.372 11.261 14.023 11.261C15.017 11.261 15.808 11.821 15.808 12.752C15.808 13.55 15.15 14.243 13.897 15.125H15.843V16Z" fill="white"/><defs><filter id="filter0_d_641_47574" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="2.5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_641_47574"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_641_47574" result="shape"/></filter><clipPath id="clip0_641_47574"><rect width="14" height="14" fill="white" transform="translate(7 7)"/></clipPath></defs></svg>
                    .label(:class="dapp.certification.l2 ? 'active' : 'inactive'") audited
                .level
                    .ico-cert(:class="dapp.certification.l3 ? 'active' : 'inactive'")
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_641_47575)"><circle cx="14" cy="14" r="9" fill="white"/></g><circle opacity="0.5" cx="14" cy="14" r="9" fill="#2CB67D"/><g clip-path="url(#clip0_641_47575)"><path d="M19.0271 10.4909C18.9077 10.4969 18.7876 10.5 18.6667 10.5C16.8738 10.5 15.2384 9.82598 14 8.71753C12.7615 9.82594 11.1261 10.4999 9.33333 10.4999C9.21245 10.4999 9.09229 10.4968 8.97291 10.4908C8.82741 11.0529 8.75 11.6424 8.75 12.25C8.75 15.5117 10.9809 18.2524 14 19.0295C17.0191 18.2524 19.25 15.5117 19.25 12.25C19.25 11.6424 19.1726 11.0529 19.0271 10.4909Z" fill="#2CB67D" stroke="#2CB67D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><path d="M12.14 15.335L12.658 14.684C12.98 15.02 13.491 15.216 13.946 15.216C14.513 15.216 14.828 14.971 14.828 14.614C14.828 14.236 14.541 14.061 13.89 14.061C13.694 14.061 13.379 14.061 13.309 14.068V13.2C13.393 13.207 13.708 13.207 13.89 13.207C14.408 13.207 14.751 13.039 14.751 12.689C14.751 12.318 14.373 12.129 13.883 12.129C13.428 12.129 13.022 12.304 12.693 12.619L12.203 12.003C12.581 11.576 13.169 11.261 13.988 11.261C15.08 11.261 15.752 11.751 15.752 12.528C15.752 13.116 15.248 13.501 14.73 13.592C15.206 13.641 15.822 14.012 15.822 14.712C15.822 15.517 15.101 16.084 13.981 16.084C13.12 16.084 12.483 15.755 12.14 15.335Z" fill="white"/><defs><filter id="filter0_d_641_47575" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="2.5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_641_47575"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_641_47575" result="shape"/></filter><clipPath id="clip0_641_47575"><rect width="14" height="14" fill="white" transform="translate(7 7)"/></clipPath></defs></svg>
                    .label(:class="dapp.certification.l3 ? 'active' : 'inactive'") complete
        //- 
    
    //---- size "with-image"
    .card(
        v-for="dapp in items"
        v-if="size == 'with-image'" 
        :class="(size == 'with-image' ? 'with-image' : '') + (dapp.promoted ? 'promoted' : '')"
        @mouseenter="dapp.hover = true"
        @mouseleave="dapp.hover = false"
    ) 
        .dapp-banner(:style="'background-image: url(' + dapp.image + ');'")
        .grid
            .dapp-ico(:style="'background-image: url(' + dapp.ico + ');'")
            .info 
                .row
                    span.dapp-name(v-html="dapp.name")
                .row
                    DAppStatus(:status="dapp.status")/
        //- Hover
        .hover.with-img(
            v-show="dapp.hover && hoverEffect"
            :class="(dapp.promoted ? 'promoted' : '')"
        )
            .grid
                .dapp-ico(:style="'background-image: url(' + dapp.ico + ');'")
                .info 
                    .row
                        span.dapp-name(v-html="dapp.name")
                    .row
                        DAppStatus(:status="dapp.status")/
            .promoted-adver-warning(v-if="dapp.promoted") Ad
            hr.animated.fadeIn.delay-0-7s/
            .short-desc.animated.fadeIn.delay-0-6s(v-html="dapp.desc", v-show="dapp.hover")
            hr.animated.fadeIn.delay-0-7s/
            .certification-status.animated.fadeIn.delay-0-7s
                .level 
                    .ico-cert(:class="dapp.certification.l1 ? 'active' : 'inactive'")
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_641_47576)"><circle cx="14" cy="14" r="9" fill="white"/></g><path opacity="0.5" d="M14 5C15.5858 5 17.1434 5.419 18.5152 6.21457C19.887 7.01014 21.0242 8.15404 21.8117 9.53045C22.5993 10.9069 23.0091 12.4669 22.9998 14.0527C22.9906 15.6384 22.5625 17.1936 21.7589 18.5607L14 14L14 5Z" fill="#FDC300"/><path d="M15.843 16H12.329V15.216C14.24 13.809 14.8 13.326 14.8 12.752C14.8 12.346 14.429 12.143 14.037 12.143C13.512 12.143 13.106 12.353 12.791 12.682L12.224 12.024C12.679 11.499 13.372 11.261 14.023 11.261C15.017 11.261 15.808 11.821 15.808 12.752C15.808 13.55 15.15 14.243 13.897 15.125H15.843V16Z" fill="white"/><g clip-path="url(#clip0_641_47576)"><path d="M19.0271 10.4909C18.9077 10.4969 18.7876 10.5 18.6667 10.5C16.8738 10.5 15.2384 9.82598 14 8.71753C12.7615 9.82594 11.1261 10.4999 9.33333 10.4999C9.21245 10.4999 9.09229 10.4968 8.97291 10.4908C8.82741 11.0529 8.75 11.6424 8.75 12.25C8.75 15.5117 10.9809 18.2524 14 19.0295C17.0191 18.2524 19.25 15.5117 19.25 12.25C19.25 11.6424 19.1726 11.0529 19.0271 10.4909Z" fill="#FDC300" stroke="#FDC300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><path d="M14.76 16H13.616V12.128L12.736 13.032L12.088 12.352L13.768 10.664H14.76V16Z" fill="white"/><defs><filter id="filter0_d_641_47576" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="2.5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_641_47576"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_641_47576" result="shape"/></filter><clipPath id="clip0_641_47576"><rect width="14" height="14" fill="white" transform="translate(7 7)"/></clipPath></defs></svg>
                    .label(:class="dapp.certification.l1 ? 'active' : 'inactive'") basic
                .level
                    .ico-cert(:class="dapp.certification.l2 ? 'active' : 'inactive'")
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_641_47574)"><circle cx="14" cy="14" r="9" fill="white"/></g><path opacity="0.5" d="M14 5C15.5715 5 17.1157 5.41151 18.4788 6.19359C19.842 6.97566 20.9765 8.10104 21.7697 9.45775C22.5628 10.8145 22.9869 12.3552 22.9997 13.9267C23.0125 15.4982 22.6136 17.0457 21.8426 18.4151C21.0717 19.7846 19.9556 20.9283 18.6054 21.7324C17.2552 22.5366 15.7179 22.9732 14.1466 22.9988C12.5752 23.0244 11.0246 22.6381 9.6489 21.8783C8.27322 21.1185 7.12046 20.0118 6.30532 18.6682L14 14L14 5Z" fill="#3489F7"/><g clip-path="url(#clip0_641_47574)"><path d="M19.0271 10.4909C18.9077 10.4969 18.7876 10.5 18.6667 10.5C16.8738 10.5 15.2384 9.82598 14 8.71753C12.7615 9.82594 11.1261 10.4999 9.33333 10.4999C9.21245 10.4999 9.09229 10.4968 8.97291 10.4908C8.82741 11.0529 8.75 11.6424 8.75 12.25C8.75 15.5117 10.9809 18.2524 14 19.0295C17.0191 18.2524 19.25 15.5117 19.25 12.25C19.25 11.6424 19.1726 11.0529 19.0271 10.4909Z" fill="#3489F7" stroke="#3489F7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><path d="M15.843 16H12.329V15.216C14.24 13.809 14.8 13.326 14.8 12.752C14.8 12.346 14.429 12.143 14.037 12.143C13.512 12.143 13.106 12.353 12.791 12.682L12.224 12.024C12.679 11.499 13.372 11.261 14.023 11.261C15.017 11.261 15.808 11.821 15.808 12.752C15.808 13.55 15.15 14.243 13.897 15.125H15.843V16Z" fill="white"/><defs><filter id="filter0_d_641_47574" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="2.5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_641_47574"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_641_47574" result="shape"/></filter><clipPath id="clip0_641_47574"><rect width="14" height="14" fill="white" transform="translate(7 7)"/></clipPath></defs></svg>
                    .label(:class="dapp.certification.l2 ? 'active' : 'inactive'") audited
                .level
                    .ico-cert(:class="dapp.certification.l3 ? 'active' : 'inactive'")
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_641_47575)"><circle cx="14" cy="14" r="9" fill="white"/></g><circle opacity="0.5" cx="14" cy="14" r="9" fill="#2CB67D"/><g clip-path="url(#clip0_641_47575)"><path d="M19.0271 10.4909C18.9077 10.4969 18.7876 10.5 18.6667 10.5C16.8738 10.5 15.2384 9.82598 14 8.71753C12.7615 9.82594 11.1261 10.4999 9.33333 10.4999C9.21245 10.4999 9.09229 10.4968 8.97291 10.4908C8.82741 11.0529 8.75 11.6424 8.75 12.25C8.75 15.5117 10.9809 18.2524 14 19.0295C17.0191 18.2524 19.25 15.5117 19.25 12.25C19.25 11.6424 19.1726 11.0529 19.0271 10.4909Z" fill="#2CB67D" stroke="#2CB67D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><path d="M12.14 15.335L12.658 14.684C12.98 15.02 13.491 15.216 13.946 15.216C14.513 15.216 14.828 14.971 14.828 14.614C14.828 14.236 14.541 14.061 13.89 14.061C13.694 14.061 13.379 14.061 13.309 14.068V13.2C13.393 13.207 13.708 13.207 13.89 13.207C14.408 13.207 14.751 13.039 14.751 12.689C14.751 12.318 14.373 12.129 13.883 12.129C13.428 12.129 13.022 12.304 12.693 12.619L12.203 12.003C12.581 11.576 13.169 11.261 13.988 11.261C15.08 11.261 15.752 11.751 15.752 12.528C15.752 13.116 15.248 13.501 14.73 13.592C15.206 13.641 15.822 14.012 15.822 14.712C15.822 15.517 15.101 16.084 13.981 16.084C13.12 16.084 12.483 15.755 12.14 15.335Z" fill="white"/><defs><filter id="filter0_d_641_47575" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="2.5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_641_47575"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_641_47575" result="shape"/></filter><clipPath id="clip0_641_47575"><rect width="14" height="14" fill="white" transform="translate(7 7)"/></clipPath></defs></svg>
                    .label(:class="dapp.certification.l3 ? 'active' : 'inactive'") complete
        //- 
    
    //---- size "certification-details"
    .card(v-for="dapp in items", v-if="size == 'certification-details'", :class="(size == 'certification-details' ? 'certification-details ' : '') + (dapp.promoted ? 'promoted' : '')") 
        .grid
            .dapp-ico(:style="'background-image: url(' + dapp.ico + ');'")
            .info 
                .row
                    span.dapp-name(v-html="dapp.name")
                .row
                    DAppStatus(:status="dapp.status")/
        .promoted-adver-warning(v-if="dapp.promoted") Ad
        hr/
        .short-desc(v-html="dapp.desc")
        hr/
        .certification-status 
            .level 
                .ico-cert(:class="dapp.certification.l1 ? 'active' : 'inactive'")
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_641_47576)"><circle cx="14" cy="14" r="9" fill="white"/></g><path opacity="0.5" d="M14 5C15.5858 5 17.1434 5.419 18.5152 6.21457C19.887 7.01014 21.0242 8.15404 21.8117 9.53045C22.5993 10.9069 23.0091 12.4669 22.9998 14.0527C22.9906 15.6384 22.5625 17.1936 21.7589 18.5607L14 14L14 5Z" fill="#FDC300"/><path d="M15.843 16H12.329V15.216C14.24 13.809 14.8 13.326 14.8 12.752C14.8 12.346 14.429 12.143 14.037 12.143C13.512 12.143 13.106 12.353 12.791 12.682L12.224 12.024C12.679 11.499 13.372 11.261 14.023 11.261C15.017 11.261 15.808 11.821 15.808 12.752C15.808 13.55 15.15 14.243 13.897 15.125H15.843V16Z" fill="white"/><g clip-path="url(#clip0_641_47576)"><path d="M19.0271 10.4909C18.9077 10.4969 18.7876 10.5 18.6667 10.5C16.8738 10.5 15.2384 9.82598 14 8.71753C12.7615 9.82594 11.1261 10.4999 9.33333 10.4999C9.21245 10.4999 9.09229 10.4968 8.97291 10.4908C8.82741 11.0529 8.75 11.6424 8.75 12.25C8.75 15.5117 10.9809 18.2524 14 19.0295C17.0191 18.2524 19.25 15.5117 19.25 12.25C19.25 11.6424 19.1726 11.0529 19.0271 10.4909Z" fill="#FDC300" stroke="#FDC300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><path d="M14.76 16H13.616V12.128L12.736 13.032L12.088 12.352L13.768 10.664H14.76V16Z" fill="white"/><defs><filter id="filter0_d_641_47576" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="2.5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_641_47576"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_641_47576" result="shape"/></filter><clipPath id="clip0_641_47576"><rect width="14" height="14" fill="white" transform="translate(7 7)"/></clipPath></defs></svg>
                .label(:class="dapp.certification.l1 ? 'active' : 'inactive'") basic
            .level
                .ico-cert(:class="dapp.certification.l2 ? 'active' : 'inactive'")
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_641_47574)"><circle cx="14" cy="14" r="9" fill="white"/></g><path opacity="0.5" d="M14 5C15.5715 5 17.1157 5.41151 18.4788 6.19359C19.842 6.97566 20.9765 8.10104 21.7697 9.45775C22.5628 10.8145 22.9869 12.3552 22.9997 13.9267C23.0125 15.4982 22.6136 17.0457 21.8426 18.4151C21.0717 19.7846 19.9556 20.9283 18.6054 21.7324C17.2552 22.5366 15.7179 22.9732 14.1466 22.9988C12.5752 23.0244 11.0246 22.6381 9.6489 21.8783C8.27322 21.1185 7.12046 20.0118 6.30532 18.6682L14 14L14 5Z" fill="#3489F7"/><g clip-path="url(#clip0_641_47574)"><path d="M19.0271 10.4909C18.9077 10.4969 18.7876 10.5 18.6667 10.5C16.8738 10.5 15.2384 9.82598 14 8.71753C12.7615 9.82594 11.1261 10.4999 9.33333 10.4999C9.21245 10.4999 9.09229 10.4968 8.97291 10.4908C8.82741 11.0529 8.75 11.6424 8.75 12.25C8.75 15.5117 10.9809 18.2524 14 19.0295C17.0191 18.2524 19.25 15.5117 19.25 12.25C19.25 11.6424 19.1726 11.0529 19.0271 10.4909Z" fill="#3489F7" stroke="#3489F7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><path d="M15.843 16H12.329V15.216C14.24 13.809 14.8 13.326 14.8 12.752C14.8 12.346 14.429 12.143 14.037 12.143C13.512 12.143 13.106 12.353 12.791 12.682L12.224 12.024C12.679 11.499 13.372 11.261 14.023 11.261C15.017 11.261 15.808 11.821 15.808 12.752C15.808 13.55 15.15 14.243 13.897 15.125H15.843V16Z" fill="white"/><defs><filter id="filter0_d_641_47574" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="2.5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_641_47574"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_641_47574" result="shape"/></filter><clipPath id="clip0_641_47574"><rect width="14" height="14" fill="white" transform="translate(7 7)"/></clipPath></defs></svg>
                .label(:class="dapp.certification.l2 ? 'active' : 'inactive'") audited
            .level
                .ico-cert(:class="dapp.certification.l3 ? 'active' : 'inactive'")
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_641_47575)"><circle cx="14" cy="14" r="9" fill="white"/></g><circle opacity="0.5" cx="14" cy="14" r="9" fill="#2CB67D"/><g clip-path="url(#clip0_641_47575)"><path d="M19.0271 10.4909C18.9077 10.4969 18.7876 10.5 18.6667 10.5C16.8738 10.5 15.2384 9.82598 14 8.71753C12.7615 9.82594 11.1261 10.4999 9.33333 10.4999C9.21245 10.4999 9.09229 10.4968 8.97291 10.4908C8.82741 11.0529 8.75 11.6424 8.75 12.25C8.75 15.5117 10.9809 18.2524 14 19.0295C17.0191 18.2524 19.25 15.5117 19.25 12.25C19.25 11.6424 19.1726 11.0529 19.0271 10.4909Z" fill="#2CB67D" stroke="#2CB67D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><path d="M12.14 15.335L12.658 14.684C12.98 15.02 13.491 15.216 13.946 15.216C14.513 15.216 14.828 14.971 14.828 14.614C14.828 14.236 14.541 14.061 13.89 14.061C13.694 14.061 13.379 14.061 13.309 14.068V13.2C13.393 13.207 13.708 13.207 13.89 13.207C14.408 13.207 14.751 13.039 14.751 12.689C14.751 12.318 14.373 12.129 13.883 12.129C13.428 12.129 13.022 12.304 12.693 12.619L12.203 12.003C12.581 11.576 13.169 11.261 13.988 11.261C15.08 11.261 15.752 11.751 15.752 12.528C15.752 13.116 15.248 13.501 14.73 13.592C15.206 13.641 15.822 14.012 15.822 14.712C15.822 15.517 15.101 16.084 13.981 16.084C13.12 16.084 12.483 15.755 12.14 15.335Z" fill="white"/><defs><filter id="filter0_d_641_47575" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="2.5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_641_47575"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_641_47575" result="shape"/></filter><clipPath id="clip0_641_47575"><rect width="14" height="14" fill="white" transform="translate(7 7)"/></clipPath></defs></svg>
                .label(:class="dapp.certification.l3 ? 'active' : 'inactive'") complete
    
    //---- size "description"
    .card(
        v-for="dapp in items", v-if="size == 'description'"
        :class="(size == 'description' ? 'description' : '') + (dapp.promoted ? 'promoted' : '')"
        @mouseenter="dapp.hover = true"
        @mouseleave="dapp.hover = false"
    ) 
        .grid
            .dapp-ico(:style="'background-image: url(' + dapp.ico + ');'")
            .info 
                .row
                    span.dapp-name(v-html="dapp.name")
                .row
                    DAppStatus(:status="dapp.status")/
        .promoted-adver-warning(v-if="dapp.promoted") Ad
        hr/
        .short-desc(v-html="dapp.desc")
        //- Hover
        .hover.with-desc(
            v-show="dapp.hover && hoverEffect"
            :class="(dapp.promoted ? 'promoted' : '')"
        )
            .grid
                .dapp-ico(:style="'background-image: url(' + dapp.ico + ');'")
                .info 
                    .row
                        span.dapp-name(v-html="dapp.name")
                    .row
                        DAppStatus(:status="dapp.status")/
            .promoted-adver-warning(v-if="dapp.promoted") Ad
            hr/
            .short-desc(v-html="dapp.desc", v-show="dapp.hover")
            hr.animated.fadeIn.delay-0-7s/
            .certification-status.animated.fadeIn.delay-0-7s
                .level 
                    .ico-cert(:class="dapp.certification.l1 ? 'active' : 'inactive'")
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_641_47576)"><circle cx="14" cy="14" r="9" fill="white"/></g><path opacity="0.5" d="M14 5C15.5858 5 17.1434 5.419 18.5152 6.21457C19.887 7.01014 21.0242 8.15404 21.8117 9.53045C22.5993 10.9069 23.0091 12.4669 22.9998 14.0527C22.9906 15.6384 22.5625 17.1936 21.7589 18.5607L14 14L14 5Z" fill="#FDC300"/><path d="M15.843 16H12.329V15.216C14.24 13.809 14.8 13.326 14.8 12.752C14.8 12.346 14.429 12.143 14.037 12.143C13.512 12.143 13.106 12.353 12.791 12.682L12.224 12.024C12.679 11.499 13.372 11.261 14.023 11.261C15.017 11.261 15.808 11.821 15.808 12.752C15.808 13.55 15.15 14.243 13.897 15.125H15.843V16Z" fill="white"/><g clip-path="url(#clip0_641_47576)"><path d="M19.0271 10.4909C18.9077 10.4969 18.7876 10.5 18.6667 10.5C16.8738 10.5 15.2384 9.82598 14 8.71753C12.7615 9.82594 11.1261 10.4999 9.33333 10.4999C9.21245 10.4999 9.09229 10.4968 8.97291 10.4908C8.82741 11.0529 8.75 11.6424 8.75 12.25C8.75 15.5117 10.9809 18.2524 14 19.0295C17.0191 18.2524 19.25 15.5117 19.25 12.25C19.25 11.6424 19.1726 11.0529 19.0271 10.4909Z" fill="#FDC300" stroke="#FDC300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><path d="M14.76 16H13.616V12.128L12.736 13.032L12.088 12.352L13.768 10.664H14.76V16Z" fill="white"/><defs><filter id="filter0_d_641_47576" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="2.5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_641_47576"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_641_47576" result="shape"/></filter><clipPath id="clip0_641_47576"><rect width="14" height="14" fill="white" transform="translate(7 7)"/></clipPath></defs></svg>
                    .label(:class="dapp.certification.l1 ? 'active' : 'inactive'") basic
                .level
                    .ico-cert(:class="dapp.certification.l2 ? 'active' : 'inactive'")
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_641_47574)"><circle cx="14" cy="14" r="9" fill="white"/></g><path opacity="0.5" d="M14 5C15.5715 5 17.1157 5.41151 18.4788 6.19359C19.842 6.97566 20.9765 8.10104 21.7697 9.45775C22.5628 10.8145 22.9869 12.3552 22.9997 13.9267C23.0125 15.4982 22.6136 17.0457 21.8426 18.4151C21.0717 19.7846 19.9556 20.9283 18.6054 21.7324C17.2552 22.5366 15.7179 22.9732 14.1466 22.9988C12.5752 23.0244 11.0246 22.6381 9.6489 21.8783C8.27322 21.1185 7.12046 20.0118 6.30532 18.6682L14 14L14 5Z" fill="#3489F7"/><g clip-path="url(#clip0_641_47574)"><path d="M19.0271 10.4909C18.9077 10.4969 18.7876 10.5 18.6667 10.5C16.8738 10.5 15.2384 9.82598 14 8.71753C12.7615 9.82594 11.1261 10.4999 9.33333 10.4999C9.21245 10.4999 9.09229 10.4968 8.97291 10.4908C8.82741 11.0529 8.75 11.6424 8.75 12.25C8.75 15.5117 10.9809 18.2524 14 19.0295C17.0191 18.2524 19.25 15.5117 19.25 12.25C19.25 11.6424 19.1726 11.0529 19.0271 10.4909Z" fill="#3489F7" stroke="#3489F7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><path d="M15.843 16H12.329V15.216C14.24 13.809 14.8 13.326 14.8 12.752C14.8 12.346 14.429 12.143 14.037 12.143C13.512 12.143 13.106 12.353 12.791 12.682L12.224 12.024C12.679 11.499 13.372 11.261 14.023 11.261C15.017 11.261 15.808 11.821 15.808 12.752C15.808 13.55 15.15 14.243 13.897 15.125H15.843V16Z" fill="white"/><defs><filter id="filter0_d_641_47574" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="2.5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_641_47574"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_641_47574" result="shape"/></filter><clipPath id="clip0_641_47574"><rect width="14" height="14" fill="white" transform="translate(7 7)"/></clipPath></defs></svg>
                    .label(:class="dapp.certification.l2 ? 'active' : 'inactive'") audited
                .level
                    .ico-cert(:class="dapp.certification.l3 ? 'active' : 'inactive'")
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_641_47575)"><circle cx="14" cy="14" r="9" fill="white"/></g><circle opacity="0.5" cx="14" cy="14" r="9" fill="#2CB67D"/><g clip-path="url(#clip0_641_47575)"><path d="M19.0271 10.4909C18.9077 10.4969 18.7876 10.5 18.6667 10.5C16.8738 10.5 15.2384 9.82598 14 8.71753C12.7615 9.82594 11.1261 10.4999 9.33333 10.4999C9.21245 10.4999 9.09229 10.4968 8.97291 10.4908C8.82741 11.0529 8.75 11.6424 8.75 12.25C8.75 15.5117 10.9809 18.2524 14 19.0295C17.0191 18.2524 19.25 15.5117 19.25 12.25C19.25 11.6424 19.1726 11.0529 19.0271 10.4909Z" fill="#2CB67D" stroke="#2CB67D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><path d="M12.14 15.335L12.658 14.684C12.98 15.02 13.491 15.216 13.946 15.216C14.513 15.216 14.828 14.971 14.828 14.614C14.828 14.236 14.541 14.061 13.89 14.061C13.694 14.061 13.379 14.061 13.309 14.068V13.2C13.393 13.207 13.708 13.207 13.89 13.207C14.408 13.207 14.751 13.039 14.751 12.689C14.751 12.318 14.373 12.129 13.883 12.129C13.428 12.129 13.022 12.304 12.693 12.619L12.203 12.003C12.581 11.576 13.169 11.261 13.988 11.261C15.08 11.261 15.752 11.751 15.752 12.528C15.752 13.116 15.248 13.501 14.73 13.592C15.206 13.641 15.822 14.012 15.822 14.712C15.822 15.517 15.101 16.084 13.981 16.084C13.12 16.084 12.483 15.755 12.14 15.335Z" fill="white"/><defs><filter id="filter0_d_641_47575" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="2.5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_641_47575"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_641_47575" result="shape"/></filter><clipPath id="clip0_641_47575"><rect width="14" height="14" fill="white" transform="translate(7 7)"/></clipPath></defs></svg>
                    .label(:class="dapp.certification.l3 ? 'active' : 'inactive'") complete
        //- 

</template>