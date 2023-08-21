<template lang="pug">
.line-chart#chartContainer
    Line(
        :id="ref" 
        :options="chartOptions" 
        :data="chartData" 
    )
</template>

<script>
import { Line  } from 'vue-chartjs'
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend 
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    LineElement,
    Title,
    Legend
)

export default {
    name: 'BarChart',
    components: { Line },
    props: {
        mainData: Array,
        labels: Array,
        ref: String,
        currentPrice: String,
    },
    data() {
        return {
            chartData: {
                labels: this.labels,
                datasets: [{ data: this.mainData }],
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                position: 'top',
                fill: true,
                interaction: {
                    mode: 'index', // Enable index mode to show the hover legend for the nearest point
                    intersect: false, // Disable interaction with other elements
                },
                scales: {
                    x: {
                        display: false, // Hide the x-axis
                        fill: true,
                    },
                    y: {
                        display: false, // Hide the y-axis
                        fill: true,
                    }
                },
                plugins: {
                    legend: {
                        display: false, // Hide the legend
                    },
                    tooltip: {
                        enabled: true,
                        // position: 'top',
                        // backgroundColor: 'var(--underlay)', // Set the background color
                        // borderColor: 'transparent', // Set the border color
                        // borderWidth: 0, // Set the border width
                        titleFont: {
                            size: 16, // Set the title font size
                            weight: 'bold', // Set the title font weight
                        },
                        bodyFont: {
                            size: 16, // Set the body font size
                        },
                        callbacks: {
                            title: (tooltipItems) => {
                                // Customize the tooltip title
                                return '' + tooltipItems[0].label;
                                return ''
                            },
                            label:  (tooltipItem) => {
                                // Customize the tooltip label
                                // return ( ((tooltipItem.formattedValue) * this.currentPrice).toFixed(2) < 0 ? '-' : '+') + ((tooltipItem.formattedValue) * this.currentPrice).toFixed(2) + "%";
                                return tooltipItem.formattedValue + " ADA";
                            },
                        },
                    },
                },
                layout: {
                    padding: {
                        top: 30,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }, // Remove padding
                },
                elements: {
                    point: {
                        radius: 0, // Remove data point radius
                        hitRadius: 1, // Set hit radius to enable tooltips
                    },
                    line: {
                        borderWidth: 2, // Set line width
                        borderColor: 'green', // Set line color
                        borderRadius: 10, // Set line border radius
                        tension: 0.4, // Set line tension for rounded path
                        fill: true, // Enable fill for the line
                        backgroundColor: 'rgb(0, 0, 0)',
                        // backgroundColor: (context) => {
                        //     const ctx = context.chart.canvas.getContext('2d');
                        //     const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0); // Use canvas width for horizontal gradient
                        //     gradient.addColorStop(0, 'rgba(0, 255, 0, 0.3)'); // Start gradient color
                        //     gradient.addColorStop(1, 'rgba(0, 255, 0, 0)'); // End gradient color
                        //     return gradient;
                        // },
                    }
                },
                animation: {
                    duration: 250, // Set the duration of the line drawing animation in milliseconds
                    easing: 'Power1.easeInOut', // Set the easing function for the animation
                    indexAxis: 'x', // Draw the line from left to right
                },
            },
        }
    },
    methods: {

    },
    mounted() {

    },
}
</script>
<style lang="scss">
.line-chart{
    width: 200px;
    height: 100%;
    max-height: 60px;
    margin-left: calc(50% - 100px);
    z-index: 1;
    margin-top: 12px;
}
</style>