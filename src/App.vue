// src/App.vue

<template>
  <div id="app">
    <div :style="{ backgroundImage: `url(${backgroundImage})` }" class="relative h-screen bg-cover"> <!-- Arrière-plan dynamique -->
      <div class="absolute inset-0"> <!-- Positionne en haut à gauche de l'arrière-plan -->
        <router-view />  <!-- C'est ici que le composant correspondant à la route sera affiché -->
      </div>
    </div>
  </div>
</template>

<script>
// Importer le composant Accueil
import Accueil from './components/Accueil.vue';
import SelectNumberAgent from './components/SelectNumberAgent.vue';
import '@/assets/styles/boutons.css';

export default {
  name: 'App',
  components: {
    Accueil, SelectNumberAgent
  },
  computed: {
    backgroundImage() {
      switch (this.$route.path) {
        case '/accueil':
          return require('@/assets/img/background1.svg');
        case '/selectAgents':
          return require('@/assets/img/background2.svg');
        default:
          return require('@/assets/img/background2.svg');
      }
    }
  }
};
</script>

<style>
/*//////////////*/
/* DEBUT FONTS */
/*/////////////*/
@font-face {
    font-family: 'MainFont';
    src: url('@/assets/fonts/Valorant/VALORANT-Regular.woff') format('woff'),
         url('@/assets/fonts/Valorant/VALORANT-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
  font-family: 'SecondaryFont';
  src: url('@/assets/fonts/Tungsten/Tungsten-Bold.woff') format('woff'),
       url('@/assets/fonts/Tungsten/Tungsten-Bold.woff2') format('woff2');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'ThirdFont';
  src: url('@/assets/fonts/Aileron/Aileron-Heavy.woff') format('woff'),
       url('@/assets/fonts/Aileron/Aileron-Heavy.woff2') format('woff2');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'ThirdFont';
  src: url('@/assets/fonts/Aileron/Aileron-Light.woff') format('woff'),
       url('@/assets/fonts/Aileron/Aileron-Light.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
/*////////////*/
/* FIN FONTS */
/*///////////*/

#app {
  font-family: 'MainFont', 'SecondaryFont', 'ThirdFont', sans-serif;
}
</style>
