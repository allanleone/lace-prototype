<script>

export default {
    props: {
        store: Object,
        status: String,
    },
    data() {
        return {

        }
    },
}
</script>
<style lang="scss" scoped>
.dappstore-status {
    width: 100%;
    height: auto;
    .status{
        display: flex;
        flex-wrap: nowrap;
        align-content: center;
        align-items: center;
        justify-content: left;
        text-align: left;
    }
    .orb{
        --orbSize: 12px;
        width: var(--orbSize);
        height: var(--orbSize);
        border-radius: 100px;
        margin-right: -2px;
        grid-template-columns: 1fr;
        align-items: center;
        align-content: center;
        display: grid;
        div{
            @keyframes pulse{
                0%{opacity: 1;}
                50%{opacity: .75;}
                100%{opacity: 1;}
            }
            width: calc(var(--orbSize) / 1.75);
            height: calc(var(--orbSize) / 1.75);
            border-radius: 100px;
            align-self: center;
            animation: pulse 3s linear infinite;
            &.na{
                background-color: var(--midGray);
            }
            &.green{
                background-color: var(--green);
            }
            &.yellow{
                background-color: var(--yellow);
            }
            &.red{
                background-color: var(--red);
            }
        }
    }
    .name{
            font-size: 12px;
        div{
            &.na{
                color: var(--midGray);
            }
            &.green{
                color: var(--green);
            }
            &.yellow{
                color: var(--yellow);
            }
            &.red{
                color: var(--red);
            }
        }
    }
}
</style>
<template lang="pug">
.dappstore-status
    .status
        .orb
            .na(v-if="status == 'na'") 
            .green(v-if="status == 'live'") 
            .yellow(v-if="status == 'dev'") 
            .red(v-if="status == 'offline'") 
        .name
            .na(v-if="status == 'na'") N/A
            .green(v-if="status == 'live'") LIVE
            .yellow(v-if="status == 'dev'") DEV
            .red(v-if="status == 'offline'") OFFLINE
</template>