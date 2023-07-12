<script setup lang="ts">

//- Index ------------------------------------------------
import Structure from './views/Index.vue'
// -------------------------------------------------------

//- Store ------------------------------------------------
import { generalStore } from './stores/generalStore.js'
import { storeToRefs } from 'pinia';
const store = generalStore()
// -------------------------------------------------------

</script>

<template>
  <Structure :store="store" />
</template>

<style scoped lang="scss"></style>
