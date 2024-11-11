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
        <div class="text-xl text-white pt-12 font-third-font font-regular">Choose your poison</div>
        <div class="flex space-x-12 mt-16 font-third-font font-bold">
          <button class="money-button" @click="sendMoney(800)">
            <div>
              <div>
                <p>Pistol</p>
                <p>¤800</p>
              </div>
            </div>
          </button>
          <button class="money-button" @click="sendMoney(1100)">
            <div>
              <div>
                <p>Eco</p>
                <p>¤1100</p>
              </div>
            </div>
          </button>
          <button class="money-button " @click="sendMoney(2700)">
            <div>
              <div>
                <p>Low buy</p>
                <p>¤2700</p>
              </div>
            </div>
          </button>
        </div>
        <div class="flex space-x-12 mt-16 font-third-font font-bold">
          <button class="money-button">
            <div>
              <div>
                <p>Force buy</p>
                <p>¤3500</p>
              </div>
            </div>
          </button>
          <button class="money-button" @click="sendMoney(4200)">
            <div>
              <div>
                <p>Full buy</p>
                <p>¤4200</p>
              </div>
            </div>
          </button>
          <button class="money-button" @click="sendMoney(9000)">
            <div>
              <div>
                <p>Jeff buy</p>
                <p>¤9000</p>
              </div>
            </div>
          </button>
      </div>
      </div>
    </template>
    
    <script>
    
    export default {
      methods: {
        sendMoney(cost) {
          this.$router.push({ name: 'RandomWeaponsSelector', params: { cost } });
        }
      }
    };
    </script>