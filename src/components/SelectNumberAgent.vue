<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Text:wght@100..900&family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">

  <div class="container mx-auto px-4 py-8 flex flex-col items-center text-center">

    <!-- Image Valorant Randomizer en haut à gauche -->
    <div class="absolute top-4 left-4">
    <a href="../accueil">
      <img src="../assets/img/valorant_randomizer.png" alt="Valorant Randomizer" class="w-64 h-auto pt-6 pl-6" />
    </a>
    </div>

    <!-- Titre AGENTS -->
    <h1 class="text-9xl text-black-grey font-secondary-font mb-4 pt-24">AGENTS</h1>

    <!-- Section Number of players -->
    <div v-if="result.length === 0" class="flex flex-col gap-4 items-center">
      <div class="text-xl text-white mb-4 pt-24 font-third-font font-regular">Number of players</div>

      <!-- Sélecteur de nombre d'agents -->
      <div class="flex items-center gap-4">
        <button 
          class="w-10 h-10  text-black-grey text-5xl rounded-full flex items-center justify-center pr-6 "
          @click="decrement"
        >-</button>
        <div class="w-32 h-12 flex items-center justify-center bg-black-grey text-white text-2xl font-third-font font-regular">
          {{ numberAgent }}
        </div>
        <button 
          class="w-10 h-10 text-black-grey text-5xl rounded-full flex items-center justify-center pl-6 "
          @click="increment"
        >+</button>
      </div>

        <!-- Bouton RANDOMIZE -->
        <div class="flex items-center justify-center pt-32">

          <button @click="randomizeAgent" class="call-to-action font-third-font font-bold">
              <div>
                  <div>
                      RANDOMIZE
                  </div>
              </div>
          </button>
        </div>
  </div>

    <!-- Liste des agents -->
    <div class="container mx-auto px-4 py-8 pt-30">
      <ul v-if="result.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 justify-center">
        <li v-for="(agent, index) in result" :key="agent.uuid" class="flex flex-col items-center gap-4">
          <h3 class="text-lg font-main-font text-white text-4xl">Player {{ index + 1 }}</h3>
          <img :src="agent.displayIcon" :alt="`Image de ${agent.displayName}`" class="w-42 h-42 pt-10 pb-2 " />
          <p class="font-secondary-font text-5xl uppercase">{{ agent.displayName }}</p>
        </li>
      </ul>
    </div>

    <!-- Bouton RANDOMIZE WEAPONS -->
        <div v-if="result.length > 0" class="flex items-center justify-center pt-32">
        <a href="./accueil">
          <button class="call-to-action">
              <div>
                  <div>
                      RANDOMIZE WEAPONS
                  </div>
              </div>
          </button>
        </a>
        </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      numberAgent: 1,
      agents: [], // Les agents récupérés de l'API
      result: [],
    };
  },
  mounted() {
    this.fetchAgents();
  },
  methods: {
    async fetchAgents() {
      try {
        const response = await axios.get('https://valorant-api.com/v1/agents');
        // Filtrer les agents jouables
        this.agents = response.data.data.filter(agent => agent.isPlayableCharacter);
      } catch (error) {
        console.error("Erreur lors de la récupération des agents :", error);
      }
    },
    increment() {
      if (this.numberAgent < 5) {
        this.numberAgent++;
      }
    },
    decrement() {
      if (this.numberAgent > 1) {
        this.numberAgent--;
      }
    },
    randomizeAgent() {
      this.result = [];
      if (this.numberAgent <= 0 || this.numberAgent > 5) {
        alert("Nombre d'agents incorrect");
        return;
      }

      const agentsCopy = [...this.agents];
      while (this.result.length < this.numberAgent) {
        const randomIndex = Math.floor(Math.random() * agentsCopy.length);
        const selectedAgent = agentsCopy.splice(randomIndex, 1)[0];
        this.result.push(selectedAgent);
      }
    },
  },
};
</script>

<style scoped>
.big-shoulders-stencil-text {
  font-family: "Big Shoulders Stencil Text", sans-serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
}
</style>