<script>
import Input from '../static/ui/Input.vue'
export default {
    props: {
        store: Object,
        search: String,
    },
    data() {
        return {
            // theme: this.store.get("theme"),
        }
    },
    components: {
        Input,
    },
    methods: {

    },
    mounted(){

    }
}
</script>
<style lang="scss">

</style>
<template lang="pug">
.search
    //- Input(placeholder="Search", search="true", :value="search")/
</template>