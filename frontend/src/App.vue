<template>
  <div id="app">
    <div :style="{ backgroundImage: `url(${backgroundImage})` }" class="relative h-screen bg-cover bg-center bg-no-repeat"> <!-- Arrière-plan dynamique -->
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
import SelectMoneyWeapons from './components/SelectMoneyWeapons.vue';
import RandomWeaponsSelector from './components/RandomWeaponsSelector.vue';
import '@/assets/styles/boutons.css';

export default {
  name: 'App',
  components: {
    Accueil, SelectNumberAgent, SelectMoneyWeapons, RandomWeaponsSelector
  },
  computed: {
    backgroundImage() {
      if (this.$route.path === '/accueil') {
        return require('@/assets/img/bg-accueil.svg');
      } else if (this.$route.path === '/selectAgents' || this.$route.path === '/selectMoney') {
        return require('@/assets/img/bg-settings.svg');
      } else if (/^\/randomWeapons\/\d+$/.test(this.$route.path)) {
        return require('@/assets/img/bg-results.svg');
      } else {
        return require('@/assets/img/bg-settings.svg');
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
  src: url('@/assets/fonts/Aileron/Aileron-Black.woff') format('woff'),
       url('@/assets/fonts/Aileron/Aileron-Black.woff2') format('woff2');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'ThirdFont';
  src: url('@/assets/fonts/Aileron/Aileron-SemiBold.woff') format('woff'),
       url('@/assets/fonts/Aileron/Aileron-SemiBold.woff2') format('woff2');
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
