<script>
import QACodeAddFunds from '../components/static/AddFunds.vue';
import Table from '../components/static/Table.vue';
export default {
    props: {
        store: Object,
    },
    data() {
        return {
            design: {
                showIcon: true,
                grid: "2fr auto",
                // columns: ['', ''],
                template: 'activity',
            },
            formattedActivity: [],
            activity: this.store.get("activity"),
        }
    },
    methods: {

    },
    components: {
        QACodeAddFunds,
        Table,
    },
    mounted(){    
        //
        var options = { day: 'numeric', month: 'short', year: 'numeric' };

        var sortedActivity = this.activity.sort((a, b) => {
            var dateA = new Date(a.timestamp);
            var dateB = new Date(b.timestamp);
            return dateB - dateA; // Compare in descending order
        }).reverse();

        var result = sortedActivity.reduce((acc, obj) => {
            var date = new Date(obj.timestamp).toLocaleDateString(undefined, options);
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(obj);
            return acc;
        }, {});

        this.formattedActivity = Object.keys(result)
            .sort((a, b) => new Date(b) - new Date(a))
            .reduce((acc, key) => {
                acc[key] = result[key];
                return acc;
            }, {});

        //
    }
}
</script>

<template lang="pug">
.activity
    h1.animated.fadeInUp 
        span(v-html="store.translate('lace.menu.activity')")
        span.counter ({{ activity.length }})
    //- QACodeAddFunds.add-funds(:store="store")/
    Table(
            :design="design"
            :data="formattedActivity"
            :store="store"
        )/
    
</template>

<style lang="scss" scoped>
.activity{
    display: grid;
}
</style>