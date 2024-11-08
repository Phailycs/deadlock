<template>
  <div class="container mx-auto px-4 py-8 flex flex-col items-center text-center">
    <!-- Titre AGENTS -->
    <h1 class="text-5xl font-main-font text-white mb-4">AGENTS</h1>

    <!-- Section Number of players -->
    <div v-if="result.length === 0" class="flex flex-col gap-4 items-center">
      <div class="text-xl font-bold text-white mb-4">Number of players</div>

      <!-- Sélecteur de nombre d'agents -->
      <div class="flex items-center gap-4 mb-4">
        <button class="w-12 h-12 bg-gray-700 hover:bg-gray-800 text-white rounded-lg flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                @click="decrement">-</button>
        <div class="w-16 h-16 flex items-center justify-center bg-black text-white text-2xl font-bold">
          {{ numberAgent }}
        </div>
        <button class="w-12 h-12 bg-gray-700 hover:bg-gray-800 text-white rounded-lg flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                @click="increment">+</button>
      </div>

        <!-- Bouton RANDOMIZE -->
        <div class="flex items-center justify-center h-screen">

          <button @click="randomizeAgent" class="call-to-action">
              <div>
                  <div>
                      RANDOMIZE
                  </div>
              </div>
          </button>
        </div>
  </div>

    <!-- Liste des agents -->
    <div class="container mx-auto px-4 py-8">
      <ul v-if="result.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 justify-center">
        <li v-for="(agent, index) in result" :key="agent.name" class="flex flex-col items-center gap-4 py-4 px-2 border rounded-md shadow-sm hover:bg-gray-100">
          <h3 class="text-lg font-bold">Player {{ index + 1 }}</h3>
          <img :src="agent.image" alt="Image de {{ agent.name }}" class="w-16 h-16 rounded-full" />
          <p>{{ agent.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberAgent: 1,
      agents: [
        { name: "Jett",  image: "../assets/img/Jett-Avatar.png"},
        { name: "Phoenix" },
        { name: "Sage" },
        { name: "Reyna" },
        { name: "Sova" },
        { name: "Clove" },
        { name: "Viper" },
        
      ],
      result: [],
    };
  },
  methods: {
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
.call-to-action {
  height: 68px;
  background-color: transparent;
  border: none;
  position: relative;
  box-sizing: border-box;
  padding: 7px;
  cursor: pointer;
}

.call-to-action::before,
.call-to-action::after {
  content: "";
  position: absolute;
  border: 1px solid white;
  height: 30px;
  box-sizing: border-box;
  left: 0;
  right: 0;
}

.call-to-action::before {
  top: 0;
  border-bottom: none;
}

.call-to-action::after {
  bottom: 0;
  border-top: none;
}

.call-to-action > div {
  background-color: white;
  color: #0f1923;
  height: 100%;
  text-transform: uppercase;
  vertical-align: center;
  padding: 0 4em;
  font-weight: bold;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: color 0.3s ease;
}

.call-to-action > div > div {
  z-index: 1;
}

.call-to-action > div::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100px;
  background-color: red;
  transform: skew(-10deg);
  background-color: #ff4655;
  width: 120%;
  left: -130%;
  transition: left 0.3s ease;
}

.call-to-action > div::after {
  content: "";
  position: absolute;
  width: 4px;
  height: 4px;
  bottom: 0;
  right: 0;
  background-color: #0f1923;
  transition: background-color 0.3s ease;
}

.call-to-action:hover > div {
  color: white;
}

.call-to-action:hover > div::before {
  left: -10%;
}

.call-to-action:hover > div::after {
  background-color: white;
}

</style>