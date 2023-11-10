<script>
export default {
    props: {
        store: Object,
        title: String,
    },
    data() {
        return {
            // theme: this.store.get("theme"),
        }
    },
    components: {
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
.rewards
    //- .title
        h4.title-faq
            span(v-html="title")
    .progress-card 
        .score 
            .status
                .points 134 
                .label Experience points
            .icon
                img(src="https://cliply.co/wp-content/uploads/2021/03/392103930_CROWN_EMOJI_400px.gif")
        .progress-bar
            .bg-bar
            .bg-goals
            .goals
                .goal 50
                .goal 100
                .goal 200
                .goal500
                .goal 1000
                .goal 1500
                .goal 2000
        .user-position
            .user A
            .bg
            
</template>