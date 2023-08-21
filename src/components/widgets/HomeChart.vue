<script>
export default {
    props: {
        store: Object,
        title: String,
    },
    data() {
        return {
            walletBalance: [
                20, 
                7, 
                150, 
                120, 
                280, 
                100, 
                600
            ],
            labels: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Yesterday",
                "Today"  
            ]
        }
    },
    components: {

    },
    methods: {

    },
    mounted(){
        const ctx = document.getElementById('HomeChart');
        const ctxC = document.getElementById('HomeChart').getContext("2d");
        const gradient = ctxC.createLinearGradient(0, 0, 0, 400);
                        gradient.addColorStop(0, 'rgba(255, 146, 225, 1)');
                        // gradient.addColorStop(1, 'rgba(253, 195, 0, .8)');
                        gradient.addColorStop(1, 'rgba(253, 195, 0, .0)');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', '', ''],
                datasets: [{
                    label: '',
                    data: [0, 200, 150, 300, 200, 400, 600],
                    tension: .35,
                    fill: true,
                    borderColor: 'transparent',
                    backgroundColor: gradient,
                    fillColor : gradient,
                    strokeColor: "#ff6c23",
                    pointColor: "#fff",
                    pointStrokeColor: "#ff6c23",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "#ff6c23",
                }]
            },
            options: {
                scales: {
                    x: {
                        display: false,
                        beginAtZero: true,
                    },
                    y: {
                        display: false,
                        beginAtZero: true,
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                plugins:{
                    legend:{
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                return label;
                            }
                        },
                        usePointStyle: false,
                        callbacks: {
                            labelPointStyle: function (context) {
                                return {
                                    pointStyle: 'triangle',
                                    rotation: 0
                                };
                            }
                        }
                    }
                },
            },
        });
        window.addEventListener('afterprint', () => {
            HomeChart.resize();
        });
    }
}
</script>
<style lang="scss" scoped>
.home-widget {
    padding: 20px 20px;
    background: var(--bgCard);
    border: solid 2px var(--bgCardBorder);
    margin-top: 20px;
    border-radius: var(--defaultRadius);
    overflow: hidden;
    hr{
        opacity: .2;
        margin: 15px 0;
    }
    .widget-title{
        display: grid;
        grid-template-columns: 32px 1fr 30px;
        gap: 10px;
        .thumb{
            display: grid;
            place-content: center;
            font-weight: 700;
            width: 32px;
            height: 32px;
            border-radius: 100px;
            background: var(--gradient);
            color: var(--white);
        }
        .name{
            align-items: center;
            display: grid;
            font-weight: bold;
        }
    }
    .chart{
        position: relative;
        width: 100%;
        height: calc(100% - 110px);
        border-radius: var(--radius);
        z-index: 1;
        cursor: default;
        .line-chart{
            width: calc(100% - 20px);
            height: calc(100% - 20px);
            max-height: none;
            margin: auto;
            z-index: 1;
            margin-top: 0px;
            margin-bottom: 10px;
        }
        .view-spectrum{
            display: flex;
            flex-direction: row;
            flex-wrap: no-wrap;
            div{
                display: inline-grid;
                cursor: pointer;
                padding: 10px 15px;
                border-radius: 5px;
                text-align: center;
                margin: 10px 5px;
                width: 25%;
                text-align: center;
                &:hover{
                    background-color: var(--bgCardHover);
                }
                &.active{
                    background-color: var(--bgCardActive);
                }

            }
        }
        .total-balance{
            position: absolute;
            top: 0;
            width: 100%;
            text-align: center;
            .balance{
                display: inline-block;
                font-size: 32px;
            }
            .coin{
                font-size: 16px;
                display: inline-block;
            }
            .positive{
                color: var(--green);
            }
            .negative{
                color: var(--dataPink);
            }
        }
        canvas{
            height: 100% !important;
            width: 100% !important;
            padding-top: 50px;
        }
    }
}
</style>
<template lang="pug">
.home-widget
    .widget-title
        .thumb A
        .name Wallet Balance
        .settings.bold
    hr/
    .chart
        canvas#HomeChart
        .view-spectrum 
            div 24h
            div.active 1W
            div 1M
            div 3M
            div MAX
        .total-balance
            .amount 
                .balance 600
                .coin 
                    span &nbsp;
                    span ADA
            .percentage 
                .positive +3%

</template>