<script>
export default {
    data() {
        return {
            showIcon: false,
        }
    },
    props: {
        store: Object,
        text: String,
        number: Number,
        placeholder: String,
        search: Boolean,
        validation: Object,
    },
    components: {
    },
    methods: {
        // validateRule(type) {
        //     //
        //     let r = false;
        //     if(this.text){
        //         switch (type) {
        //             case "max-20":
        //                 if(this.text.length > 20){
        //                     r = true;
        //                 }else{
        //                     r = false;
        //                 }
        //             break;
        //             case "cardano-address":
        //                 if(this.text.length < 20){
        //                     r = true;
        //                 }else{
        //                     r = false;
        //                 }
        //             break;
        //             default:
        //                 r = false;
        //                 break;
        //         }
        //     }
        //     if(this.text){
        //         if(this.text.length > 0 && r == true){
        //             this.store.set({ key: 'sidedrawerValid', value: true });
        //         }else{
        //             this.store.set({key: 'sidedrawerValid', value: false});
        //         }
        //     }
        //     return r;
        //     //
        // }
    }
}
</script>
<style lang="scss" scoped>
// webkit reset
input:focus,textarea:focus,select:focus, input:focus-visible, button:focus-visible{
  border:1px solid #transparent;
  -webkit-box-shadow:0 0 6px #transparent;
  -moz-box-shadow:0 0 5px #transparent;
  box-shadow:0 0 5px #transparent;
  outline: none;
}
//

.input{
    position: relative;
    input[type="text"], input[type="number"]{
        border: none;
        background: var(--inputTextBg);
        border-radius: 16px;
        height: auto;
        padding: 20px;
        font-weight: 700;
        color: var(--textColorPrimary);
        width: calc(100% - 84px);
        margin-top: 24px;
        padding-left: 64px;
        margin-bottom: 20px;
        @media screen and (max-width: 1439px) {
            // width: calc(100% - 350px);
        }
        &::placeholder{
            font-weight: 400;
        }
    }
    .icon{
        position: absolute;
        top: calc(50% - 3px);
        left: 20px;
        img, svg{
            width: 24px;
            height: 24px;
        }
    }
    .error-feedback{
        position: absolute;
        color: var(--hoverDataPink);
        margin: 0 10px;
        height: 20px;
        bottom: -4px;
    }
}
</style>
<template lang="pug">
.input  
    input(:style="showIcon ? '' : 'padding-left: 20px; width: calc(100% - 40px);'", type="text", :placeholder="placeholder", :value="text", autocomplete="false")
    .icon(v-if="showIcon")
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><path fill-rule="evenodd" clip-rule="evenodd" d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10Z" fill="url(#search_component_svg__a)"></path><defs><linearGradient id="search_component_svg__a" x1="-1.66" y1="-1.66" x2="27.643" y2="0.502" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"></stop><stop offset="1" stop-color="#FDC300"></stop></linearGradient></defs></svg>
    //- .error-feedback(v-if="validation !== undefined ? true : false")
    //-     div.animated.fadeInDown(v-if="validateRule(validation.type)") {{validation.error}}
</template>