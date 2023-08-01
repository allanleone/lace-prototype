<script setup>

//- Index ------------------------------------------------
import Structure from './views/Index.vue'
// -------------------------------------------------------

//- Store ------------------------------------------------
import { generalStore } from './stores/generalStore.js'
import { storeToRefs } from 'pinia';
const store = generalStore()
// -------------------------------------------------------

//- Language ---------------------------------------------
var myHeaders = new Headers();
myHeaders.append("Authorization", "token 63445dc3-dab4-4f1d-879d-b7d23a8bc60d.6a8b80b981feecfa40149f4a04aba82c7a3d5721");
myHeaders.append("Access-Control-Allow-Origin", "*");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  // mode: "no-cors",
  redirect: 'follow'
};

// fetch("https://api.dittowords.com/v1/components?format=nested&variant&includeRichText=true", requestOptions)

// Portuguese-BR
const langArray = ['en', 'pt_br', 'jp', 'ru', 'es', 'it'];
let index = 0;

const loadLangJson = () => {

  //  -----------------------
  fetch("assets/lang/" + langArray[index] + ".json", requestOptions)
    .then(response => response.text())
    .then(result => {
      let r = JSON.parse(result);
      store.setLang({ key: langArray[index], value: r });
      index++;
      if (index < langArray.length) {
        loadLangJson();
      } else {
        // SET AS DONE /////////////////////////////////////////
        store.set({ key: 'langDoneLoading', value: true })
        ////////////////////////////////////////////////////////
      }
    })
    .catch(error => console.log('error', error));
  //  -----------------------

};

loadLangJson();
// -------------------------------------------------------
</script>

<template>
  <Structure :store="store" />
</template>

<style scoped lang="scss"></style>
