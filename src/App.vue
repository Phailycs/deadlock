// src/App.vue

<template>
  <div id="app">
    <router-view />  <!-- C'est ici que le composant correspondant à la route sera affiché -->
  </div>
</template>

<script>
// Importer le composant Accueil
import Accueil from './components/Accueil.vue';
import SelectNumberAgent from './components/SelectNumberAgent.vue'; 

export default {
  name: 'App',
  components: {
    Accueil, SelectNumberAgent
  }
};
</script>
