<template>
  <div id="app">
    <div :class="backgroundClass" class="relative h-screen bg-cover bg-center bg-no-repeat">
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
    backgroundClass() {
      if (this.$route.path === '/') {
        return ('bg-accueil');
      } else if (this.$route.path === '/selectAgents' || this.$route.path === '/selectMoney') {
        return ('bg-settings');
      } else if (/^\/randomWeapons\/\d+$/.test(this.$route.path)) {
        return ('bg-results');
      } else {
        return ('bg-settings');
      }
    }
  }
};
</script>

<style>
/* DEBUT BG */
/* mb-xs */
@media (min-width: 320px) {
  .bg-accueil {
    background-image: url('@/assets/img/mb-bg-accueil.svg');
  }

  .bg-settings {
    background-image: url('@/assets/img/mb-bg-settings.svg');
  }

  .bg-results {
    background-image: url('@/assets/img/mb-bg-results.svg');
  }
}
/* xs */
@media (min-width: 475px){
  .bg-accueil {
    background-image: url('@/assets/img/mb-bg-accueil.svg');
  }

  .bg-settings {
    background-image: url('@/assets/img/mb-bg-settings.svg');
  }

  .bg-results {
    background-image: url('@/assets/img/mb-bg-results.svg');
  }
}

/* sm */
@media (min-width: 640px){
  .bg-accueil {
    background-image: url('@/assets/img/mb-bg-accueil.svg');
  }

  .bg-settings {
    background-image: url('@/assets/img/mb-bg-settings.svg');
  }

  .bg-results {
    background-image: url('@/assets/img/mb-bg-results.svg');
  }
}

/* md */
@media (min-width: 768px){
  .bg-accueil {
    background-image: url('@/assets/img/mb-bg-accueil.svg');
  }

  .bg-settings {
    background-image: url('@/assets/img/mb-bg-settings.svg');
  }

  .bg-results {
    background-image: url('@/assets/img/mb-bg-results.svg');
  }
}

/* lg */
@media (min-width: 1024px){
  .bg-accueil {
  background-image: url('@/assets/img/bg-accueil.svg');
  }

  .bg-settings {
    background-image: url('@/assets/img/bg-settings.svg');
  }

  .bg-results {
    background-image: url('@/assets/img/bg-results.svg');
  }
}

/* xl */
@media (min-width: 1280px){
  .bg-accueil {
  background-image: url('@/assets/img/bg-accueil.svg');
  }

  .bg-settings {
    background-image: url('@/assets/img/bg-settings.svg');
  }

  .bg-results {
    background-image: url('@/assets/img/bg-results.svg');
  }
}

/* 2xl */
@media (min-width: 1536px){
  .bg-accueil {
  background-image: url('@/assets/img/bg-accueil.svg');
  }

  .bg-settings {
    background-image: url('@/assets/img/bg-settings.svg');
  }

  .bg-results {
    background-image: url('@/assets/img/bg-results.svg');
  }
}
/* FIN BG */

/* DEBUT FONTS */
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

#app {
  font-family: 'MainFont', 'SecondaryFont', 'ThirdFont', sans-serif;
}
/* FIN FONTS */
</style>
