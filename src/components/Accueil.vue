<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-red-600 text-white">
    <h1 class="text-6xl font-extrabold tracking-wider">
      <span class="text-white font-light">VALORANT</span> RANDOMIZER
    </h1>

    <div class="mt-8 flex space-x-4">
      <button @click="randomizeAgent" class="px-6 py-3 border-2 border-white text-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
        RANDOMIZE AGENTS
      </button>
      <button @click="randomizeWeapon" class="px-6 py-3 border-2 border-white text-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
        RANDOMIZE WEAPONS
      </button>
    </div>

    <div v-if="result" class="mt-8 text-center">
      <h2 class="text-3xl font-semibold">{{ result.name }}</h2>
      <p class="mt-2 text-xl">{{ result.type }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      agents: [
        { name: "Jett", type: "Duelist" },
        { name: "Phoenix", type: "Duelist" },
        { name: "Sage", type: "Sentinel" },
        { name: "Sova", type: "Initiator" },
      ],
      weapons: [
        { name: "Vandal", type: "Heu arme ?" },
        { name: "Phantom", type: "Heu arme ?" },
        { name: "Operator", type: "Heu arme ?" },
        { name: "Classic", type: "Heu arme ?" },
      ],
      result: null
    };
  },
  methods: {
    randomizeAgent() {
      const randomIndex = Math.floor(Math.random() * this.agents.length);
      this.result = this.agents[randomIndex];
    },
    randomizeWeapon() {
      const randomIndex = Math.floor(Math.random() * this.weapons.length);
      this.result = this.weapons[randomIndex];
    }
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
</style>
