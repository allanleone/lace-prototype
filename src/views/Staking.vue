<script lang="ts">
import QACodeAddFunds from '../components/static/AddFunds.vue';
import Input from '../components/static/ui/Input.vue';
export default {
    data() {
        return {
            stakepools: [
                {
                    thumb: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%3E%3Cpath%20fill%3D%22%234c4c4c%22%20d%3D%22M9%206L12%203L15%206L12%209ZM18%203L21%206L18%209L15%206ZM21%2024L18%2027L15%2024L18%2021ZM12%2027L9%2024L12%2021L15%2024ZM3%2012L6%209L9%2012L6%2015ZM24%209L27%2012L24%2015L21%2012ZM27%2018L24%2021L21%2018L24%2015ZM6%2021L3%2018L6%2015L9%2018Z%22%2F%3E%3Cpath%20fill%3D%22%23ccc566%22%20d%3D%22M3%209L3%203L9%203ZM21%203L27%203L27%209ZM27%2021L27%2027L21%2027ZM9%2027L3%2027L3%2021Z%22%2F%3E%3Cpath%20fill%3D%22%23e5e2b2%22%20d%3D%22M9%209L15%209L15%2015L9%2015ZM10.5%2012.8L12.8%2015L15%2012.8L12.8%2010.5ZM21%209L21%2015L15%2015L15%209ZM17.3%2010.5L15%2012.8L17.3%2015L19.5%2012.8ZM21%2021L15%2021L15%2015L21%2015ZM19.5%2017.3L17.3%2015L15%2017.3L17.3%2019.5ZM9%2021L9%2015L15%2015L15%2021ZM12.8%2019.5L15%2017.3L12.8%2015L10.5%2017.3Z%22%2F%3E%3C%2Fsvg%3E",
                    label: "RETIR",
                    address: "pool12jhasjd3i4uhahsidha",
                    ros: "15",
                    cost: "1.25% + 120ADA",
                    saturation: "12.14"
                },
                {
                    thumb: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%3E%3Cpath%20fill%3D%22%2370cc66%22%20d%3D%22M12%203L15%206L12%209L9%206ZM21%206L18%209L15%206L18%203ZM18%2027L15%2024L18%2021L21%2024ZM9%2024L12%2021L15%2024L12%2027ZM6%209L9%2012L6%2015L3%2012ZM27%2012L24%2015L21%2012L24%209ZM24%2021L21%2018L24%2015L27%2018ZM3%2018L6%2015L9%2018L6%2021ZM6%209L3%206L6%203L9%206ZM21%206L24%203L27%206L24%209ZM24%2021L27%2024L24%2027L21%2024ZM9%2024L6%2027L3%2024L6%2021Z%22%2F%3E%3Cpath%20fill%3D%22%234c4c4c%22%20d%3D%22M11.4%2015a3.6%2C3.6%200%201%2C1%207.2%2C0a3.6%2C3.6%200%201%2C1%20-7.2%2C0%22%2F%3E%3C%2Fsvg%3E",
                    label: "RETIR",
                    address: "pool12jhasjd3i4uhahsidha",
                    ros: "15",
                    cost: "1.25% + 120ADA",
                    saturation: "12.14"
                },
                {
                    thumb: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%3E%3Cpath%20fill%3D%22%23eaeaea%22%20d%3D%22M9%203L15%203L15%209ZM21%203L21%209L15%209ZM21%2027L15%2027L15%2021ZM9%2027L9%2021L15%2021ZM3%209L9%209L9%2015ZM27%209L27%2015L21%2015ZM27%2021L21%2021L21%2015ZM3%2021L3%2015L9%2015Z%22%2F%3E%3Cpath%20fill%3D%22%23643db7%22%20d%3D%22M9%206L6%209L3%206L6%203ZM24%209L21%206L24%203L27%206ZM21%2024L24%2021L27%2024L24%2027ZM6%2021L9%2024L6%2027L3%2024Z%22%2F%3E%3Cpath%20fill%3D%22%239e84d6%22%20d%3D%22M15%209L15%2013L12%209ZM21%2015L17%2015L21%2012ZM15%2021L15%2017L18%2021ZM9%2015L13%2015L9%2018Z%22%2F%3E%3C%2Fsvg%3E",
                    label: "RETIR",
                    address: "pool12jhasjd3i4uhahsidha",
                    ros: "15",
                    cost: "1.25% + 120ADA",
                    saturation: "12.14"
                },
                {
                    thumb: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%3E%3Cpath%20fill%3D%22%234c4c4c%22%20d%3D%22M9%203L15%203L15%209ZM21%203L21%209L15%209ZM21%2027L15%2027L15%2021ZM9%2027L9%2021L15%2021ZM3%209L9%209L9%2015ZM27%209L27%2015L21%2015ZM27%2021L21%2021L21%2015ZM3%2021L3%2015L9%2015Z%22%2F%3E%3Cpath%20fill%3D%22%2386cc66%22%20d%3D%22M9%203L9%209L3%209ZM27%209L21%209L21%203ZM21%2027L21%2021L27%2021ZM3%2021L9%2021L9%2027ZM9%209L15%209L15%2010L12.5%2015L9%2015ZM21%209L21%2015L20%2015L15%2012.5L15%209ZM21%2021L15%2021L15%2020L17.5%2015L21%2015ZM9%2021L9%2015L10%2015L15%2017.5L15%2021Z%22%2F%3E%3C%2Fsvg%3E",
                    label: "RETIR",
                    address: "pool12jhasjd3i4uhahsidha",
                    ros: "15",
                    cost: "1.25% + 120ADA",
                    saturation: "12.14"
                },
            ]
        }
    },
    methods: {

    },
    components: {
        QACodeAddFunds,
        Input,
    }
}
</script>

<template lang="pug">
.staking 
    h1.animated.fadeInUp Staking
    QACodeAddFunds.add-funds/
    .search-stake-pools.animated.fadeInUp.delay-0-6s
        h4 
            span Stake pools
            span.count (2456)
        Input.search-staking(placeholder="Search by type, token name or ID")/
    .table-staking.animated.fadeInUp.delay-0-8s
        .table-header.table-row
            .table-col
                span Pool name
            .table-col
                span ROS
            .table-col
                span Cost
            .table-col
                span Saturation
        .table-body.table-row(v-for="sp in stakepools")
            .table-col
                .data-stake
                    .thumb 
                        img(:src="sp.thumb")
                    .info
                        .label {{ sp.label }}
                        .address {{ sp.address }}
            .table-col
                .stake-ros {{ sp.ros }}%
            .table-col
                .stake-cost {{ sp.cost }}
            .table-col
                .stake-saturation 
                    .stake-status(:class="sp.saturation > 0 ? 'positive' : 'negative'")
                    div {{ sp.saturation }}%
</template>

<style lang="scss">
.staking{
    display: grid;
    .count{
        color: var(--textColorSecondary);
        font-size: var(--bodyFontSize);
        margin-left: 10px;
    }
    .search-staking{
        input{
            margin-top: 10px !important;
        }
        margin-bottom: 10px;
    }
    .table-staking{
        display: grid;
        width: 100%;
        overflow-y: hidden;
        overflow-x: auto;
        min-width: 335px;
        .table-row{
            display: grid;
            grid-template-columns: 2fr .5fr 1fr auto;
            padding: 20px 10px;
            gap: 20px;
            align-content: center;
            position: relative;
            cursor: pointer;
            border-radius: var(--radius);
            &:hover{
                background-color: var(--bgCardHover);
            }
            .table-col{
                display: grid;
                align-content: center;
            }
            .data-stake{
                display: grid;
                grid-template-columns: 40px 1fr;
                gap: 10px;
                .thumb{
                    width: 32px;
                    height: 32px;
                    overflow: hidden;
                    padding: 4px;
                    border: solid 1px var(--bgCardBorder);
                    border-radius: 100px;
                    img{
                        border-radius: 100px;
                        width: 100%;
                        height: auto;
                    }
                }
                .label{
                    color: var(--textColorPrimary);
                }
                .address{
                    color: var(--textColorSecondary);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .label, .address{
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            .stake-ros, .stake-cost, .stake-saturation{
                color: var(--textColorPrimary);
            }
            .stake-saturation{
                display: grid;
                grid-template-columns: 8px 1fr;
                gap: 10px;
                align-content: center;
                .stake-status{
                    width: 8px;
                    height: 8px;
                    background-color: #ccc;
                    border-radius: 100px;
                    display: inline-grid;
                    margin-top: 6px;
                    &.positive{
                        background-color: var(--green);
                    }
                    &.negative{
                        background-color: var(--orange);
                    }
                }
            }
        }
        @media screen and (max-width: 512px){
            width: calc(100% + 18px);
            min-width: auto;
            display: flex;
            grid-template-rows: 1fr;
            gap: 10px;
            padding: 20px 10px;
            margin: 0px -15px;
            .table-row{
                &:nth-child(2){
                    margin-left: 10px;
                }
                &:last-child{
                    margin-right: 15px;
                }
                &.table-header{
                    display: none;
                }
                .data-stake{
                    grid-template-columns: 40px 100px;
                }
                .table-col{
                    width: 100%;
                    width: 150px;
                }
                background-color: var(--bgCard);
                box-shadow: var(--tinyShadow);
                width: 150px;
                display: grid;
                grid-template-columns: 1fr;
            }
        }
        .table-header{
            &.table-row{
                color: var(--textColorSecondary);
                &:hover{
                    background-color: transparent;
                    cursor: default;
                }
            }
        }
    }
}
</style>