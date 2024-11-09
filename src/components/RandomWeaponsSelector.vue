<template>
    <div class="container mx-auto px-4 py-8 flex flex-col items-center text-center">
        <!-- Image Valorant Randomizer en haut à gauche -->
        <div class="absolute top-4 left-4">
        <a href="../accueil">
            <img src="../assets/img/valorant_randomizer.png" alt="Valorant Randomizer" class="w-64 h-auto pt-6 pl-6" />
        </a>
        </div>

        <!-- Titre WEAPONS -->
        <h1 class="text-9xl text-black-grey font-secondary-font mb-4 pt-24">WEAPONS</h1>
        
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      numberAgent: 2,
      weapons: [], // Les weapons récupérés de l'API
      result: [],
    };
  },
  mounted() {
    this.fetchAgents();
  },
  methods: {
    async fetchAgents() {
      try {
        const response = await axios.get('https://valorant-api.com/v1/weapons');
        this.weapons = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des weapons :", error);
      }
    },
    increment() {
        if (this.moneyValue < 9000) {
        this.moneyValue += 100;
        }
        if (this.moneyValue > 9000) {
        this.moneyValue = 9000;
        }
    },
    decrement() {
        if (this.moneyValue > 10) {
        this.moneyValue -= 100;
        }
        if (this.moneyValue < 10) {
        this.moneyValue = 10;
        }
    },
    randomizeAgent() {
      this.result = [];

      const weaponsCopy = [...this.weapons];
      while (this.result.length < this.numberAgent) {
        const randomIndex = Math.floor(Math.random() * weaponsCopy.length);
        const selectedWeapons = weaponsCopy.splice(randomIndex, 1)[0];
        this.result.push(selectedWeapons);
      }
    },
  },
};
</script>