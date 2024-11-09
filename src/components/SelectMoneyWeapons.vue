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
    
        <!-- Section Number of players -->
        <div v-if="result.length === 0" class="flex flex-col gap-4 items-center">
          <div class="text-xl text-white mb-4 pt-24 font-third-font font-regular">Money Available</div>
    
          <!-- Sélecteur de nombre d'agents -->
          <div class="flex items-center gap-4">
            <button 
              class="w-10 h-10  text-black-grey text-5xl rounded-full flex items-center justify-center pr-6 "
              @click="decrement"
            >-</button>
            <input 
            v-model="moneyValue"
            class="w-32 h-12 flex items-center justify-center bg-black-grey text-white text-2xl font-third-font font-regular text-center"
            >
            <button 
              class="w-10 h-10 text-black-grey text-5xl rounded-full flex items-center justify-center pl-6 "
              @click="increment"
            >+</button>
          </div>
    
            <!-- Bouton RANDOMIZE -->
            <div class="flex items-center justify-center pt-32">
    
                <a href="./randomWeapons">
                    <button class="call-to-action font-third-font font-bold">
                        <div>
                            <div>
                                RANDOMIZE WEAPONS
                            </div>
                        </div>
                    </button>
                </a>
            </div>
      </div>
      </div>
    </template>
    
    <script>
    
    export default {
      data() {
        return {
          moneyValue: 50,
          agents: [], // Les agents récupérés de l'API
          result: [],
        };
      },
      methods: {
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
      },
    };
    </script>