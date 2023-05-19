<script>
import QACodeAddFunds from '../components/static/AddFunds.vue';
import Table from '../components/static/Table.vue';
export default {
    data() {
        return {
            design: {
                showIcon: true,
                grid: "2fr auto",
                // columns: ['', ''],
                template: 'activity',
            },
            formattedActivity: [],
            activity: [
                {
                    thumb: "received",
                    label: "Received",
                    timestamp: "15 May 2023 14:22:35 GMT",
                    bundle: [
                        "12.00 tADA",
                        "0.0005 Lace1",
                        "4.0065 Lace2",
                    ],
                    convertedTotal: "5.44"
                },
                {
                    thumb: "delegation",
                    label: "Delegation",
                    timestamp: "15 May 2023 14:23:14 GMT",
                    bundle: [
                        "12.00 tADA",
                        "0.0005 Lace1",
                        "4.0065 Lace2",
                    ],
                    convertedTotal: "5.44"
                },
                {
                    thumb: "received",
                    label: "Received",
                    timestamp: "14 May 2023 11:22:35 GMT",
                    bundle: [
                        "12.00 tADA",
                        "0.0005 Lace1",
                        "4.0065 Lace2",
                    ],
                    convertedTotal: "5.44"
                },
                {
                    thumb: "sent",
                    label: "Sent",
                    timestamp: "14 May 2023 12:22:35 GMT",
                    bundle: [
                        "12.00 tADA",
                        "0.0005 Lace1",
                        "4.0065 Lace2",
                    ],
                    convertedTotal: "5.44"
                },
                {
                    thumb: "self",
                    label: "Self Transaction",
                    timestamp: "14 May 2023 15:22:35 GMT",
                    bundle: [
                        "12.00 tADA",
                        "0.0005 Lace1",
                        "4.0065 Lace2",
                    ],
                    convertedTotal: "5.44"
                },
            ],
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
        span Activity
        span.counter ({{ activity.length }})
    //- QACodeAddFunds/
    Table(
            :design="design"
            :data="formattedActivity"
        )/
    
</template>

<style lang="scss">
.activity{
    display: grid;
}
</style>