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
    </div>
</template>

<script>

export default {
  props: ['costs'],
  data() {
    return {
      weapons: [], // Les weapons récupérés de l'API
      result: []
    };
  },
  methods: {
    
  },
};
</script>