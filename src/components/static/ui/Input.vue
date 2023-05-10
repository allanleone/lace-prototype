<script>
export default {
    data() {
        return {
        }
    },
    props: {
        text: String,
        number: Number,
        placeholder: String,
        search: Boolean,
    },
    components: {
    },
}
</script>
<style lang="scss">
// style -> @/src/scss/components/toggle.scss
</style>
<template lang="pug">
.input  
    input(type="text", :placeholder="placeholder", :value="text")
    .icon 
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class=""><path fill-rule="evenodd" clip-rule="evenodd" d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10Z" fill="url(#search_component_svg__a)"></path><defs><linearGradient id="search_component_svg__a" x1="-1.66" y1="-1.66" x2="27.643" y2="0.502" gradientUnits="userSpaceOnUse"><stop stop-color="#FF92E1"></stop><stop offset="1" stop-color="#FDC300"></stop></linearGradient></defs></svg>
</template>