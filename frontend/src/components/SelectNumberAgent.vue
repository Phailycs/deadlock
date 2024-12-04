<template>
  <div class="container mx-auto px-4 py-8 flex flex-col items-center text-center">

    <!-- Image Valorant Randomizer en haut à gauche -->
    <div class="absolute top-4 left-4">
      <a href="../accueil">
        <img src="../assets/img/valorant_randomizer.svg" alt="Valorant Randomizer" class="w-64 h-auto pt-6 pl-6" />
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
            class="w-10 h-10 text-black-grey text-5xl rounded-full flex items-center justify-center pr-6 "
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
        <button @click="randomizeAgent" class="standard-button font-third-font font-bold">
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
      <ul v-if="result.length > 0" class="flex flex-wrap justify-center gap-4">
        <li v-for="(agent, index) in result" :key="agent.uuid" class="relative flex flex-col items-center gap-4 agent-item">
          <h3 class="font-main-font text-white text-4xl z-0">Player {{ index + 1 }}</h3>
          <img :src="agent.icon" :alt="`Image de ${agent.displayName}`" class="h-60 pt-4 pb-2 z-10" />
          <p class="text-white font-secondary-font text-5xl uppercase z-10">{{ agent.name }}</p>

          <!-- Bouton Try Again centré en bas -->
          <button
              v-if="agent" @click="randomizeSingleAgent(index)"
              class="try-button try-again-button z-50 font-third-font font-bold text-2xl absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div>
              <div>
                TRY AGAIN
              </div>
            </div>
          </button>
        </li>
      </ul>
    </div>

    <!-- Bouton RANDOMIZE WEAPONS -->
    <div v-if="result.length > 0" class="flex items-center justify-center pt-32">
      <a href="./selectMoney">
        <button class="standard-button font-third-font font-bold relative">
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
      agents: [],
      result: [],
    };
  },
  mounted() {
    this.fetchAgents();
    document.title = "Agents";
  },
  methods: {
    async fetchAgents() {
      try {
        const response = await axios.get('https://deadlock-backend.vercel.app/api/agents');
        this.agents = response.data.filter(agent => agent.playable);
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
    // Fonction pour régénérer un seul agent sans dupliquer ceux déjà sélectionnés
    randomizeSingleAgent(index) {
      const agentsCopy = [...this.agents];
      let newAgent;

      // Vérifier que le nouvel agent n'est pas déjà dans la sélection
      do {
        const randomIndex = Math.floor(Math.random() * agentsCopy.length);
        newAgent = agentsCopy[randomIndex];
      } while (this.result.includes(newAgent));

      // Remplacer l'agent à l'index donné
      this.result[index] = newAgent;
    }

  },
};
</script>

<style>
.agent-item:hover > .z-10 {
  filter: blur(5px);
  transition: filter 0.3s ease;
}

.agent-item:hover {
  background-color: #2B2B2B;
  transition: 0.3s ease;
  padding: 1.5%;
}

/* Afficher le bouton au survol */
.agent-item:hover .try-again-button {
  opacity: 1;
  pointer-events: auto; /* Rendre le bouton cliquable */
}
</style>