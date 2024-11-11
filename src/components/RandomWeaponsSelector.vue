<template>
  <div class="container mx-auto px-4 py-8 flex flex-col items-center text-center">
    <!-- Image Valorant Randomizer en haut à gauche -->
    <div class="absolute top-4 left-4">
      <a href="../accueil">
        <img src="../assets/img/valorant_randomizer.svg" alt="Valorant Randomizer" class="w-64 h-auto pt-6 pl-6" />
      </a>
    </div>

    <!-- Titre WEAPONS -->
    <h1 class="text-9xl text-black-grey font-secondary-font mb-4 pt-24">WEAPONS</h1>
    <div>Cost: {{ cost }}</div>

    <!-- Liste des armes -->
    <ul>
      <li v-for="item in items" :key="item.name" class="mb-4">
        <div class="relative">
          <img :src="getBackgroundImage(item.category)" alt="Background weapon category" class="w-full h-auto" />
          <span class="absolute top-0 left-1/2 transform -translate-x-1/2 pt-10 font-third-font font-regular text-xl">
            {{ getText(item.category) }}
          </span>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-40 -translate-y-12 w-68 h-68 sm:w-72 sm:h-72 md:w-76 md:h-76 lg:w-80 lg:h-80">
            <img :src="item.icon" :alt="'Image de ' + item.category" class="max-w-full max-h-full" />
          </div>
          <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-10 font-third-font font-bold uppercase text-2xl">
            {{ item.name }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: [],
      result: [],
      filter: [],
    };
  },
  async created() {
    try {
      const weaponsResponse = await this.fetchWeapons('weapons'); // Appel pour récupérer les armes
      const gearsResponse = await this.fetchWeapons('gears'); // Appel pour récupérer l'équipement
      this.items = [...weaponsResponse, ...gearsResponse];
    } catch (error) {
      console.error('Erreur de récupération des données:', error);
    }
  },
  computed: {
    cost() {
      return this.$route.params.cost;
    }
  },
  methods: {
    async fetchWeapons(type) {
      try {
        const response = await axios.get(`http://localhost:5000/api/${type}`);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        return [];
      }
    },
    getBackgroundImage(category) {
      switch (category) {
        case 'Pistols':
          return '../assets/img/weapons/bg-secondary.svg';
        default:
          return '../assets/img/weapons/bg-primary.svg';
      }
    },
    getText(category) {
      switch (category) {
        case 'Pistols':
          return 'Secondary';
        default:
          return 'Primary';
      }
    },
  },
};
</script>