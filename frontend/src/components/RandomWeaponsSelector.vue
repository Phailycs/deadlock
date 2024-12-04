<template>
<head>
  <title>Mon Application</title>
</head>


  <div class="container mx-auto px-4 py-8 flex flex-col items-center text-center">
    <!-- Image Valorant Randomizer en haut à gauche -->
    <div class="absolute top-4 left-4">
      <a href="../accueil">
        <img src="../assets/img/valorant_randomizer.svg" alt="Valorant Randomizer" class="w-64 h-auto pt-6 pl-6" />
      </a>
    </div>

    <!-- Titre WEAPONS -->
    <h1 class="text-9xl text-black-grey font-secondary-font mb-24 pt-4">WEAPONS</h1>

    <!-- Liste des armes -->
    <div class="flex justify-center flex-wrap gap-8">
      <!-- Encadré pour chaque arme (Secondary et Primary) -->
      <div
          v-for="(item, index) in randomWeapons"
          :key="item.name"
          class="relative weapons-item min-w-[20rem] min-h-[24rem] p-12 flex flex-col justify-between"
          :class="{
            'bg-black-grey': item.category === 'Armor',
            'bg-white': item.category !== 'Armor'
          }"
      >
        <div :class="['absolute w-8 h-8 bg-red-valorant', item.category !== 'Pistols' ? 'top-0 left-0' : 'bottom-0 left-0']">
          <img src="@/assets/img/weapons/logo-val.svg" :class="['absolute w-5 h-5', item.category !== 'Pistols' ? 'top-1 left-1' : 'bottom-1 left-1']">
        </div>

        <!-- Section en haut pour afficher la catégorie -->
        <div class="w-full text-center mb-12 z-10">
          <p class="font-third-font text-2xl" style="filter:none;" :class="{
            'text-white	': item.category === 'Armor',
            'text-black	': item.category !== 'Armor'
          }">{{ getText(item.category) }}</p>
        </div>

        <!-- Conteneur de l'image de l'arme au centre -->
        <div class="flex-grow flex justify-center items-center overflow-hidden z-0">
          <img :src="item.icon" :alt="'Image de ' + item.name" class="max-h-40 max-w-full object-contain"/>
        </div>

        <!-- Section en bas pour afficher le nom de l'arme -->
        <div class="w-full text-center my-4 z-0">
          <h2 class="text-6xl font-secondary-font uppercase" :class="{
            'text-white	': item.category === 'Armor',
            'text-black	': item.category !== 'Armor'
          }">{{ item.name }}</h2>
        </div>

        <!-- Bouton TRY AGAIN centré au milieu -->
        <button v-if="item" @click="randomizeSingleWeapons(index)" class="standard-button try-again-button font-third-font font-bold absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div>
            <div>TRY AGAIN</div>
          </div>
        </button>
      </div>
    </div>

    <!-- Option Inclure un bouclier -->
    <div class="flex items-center space-x-2 mb-6 pt-9">
      <input type="checkbox" id="includeShield" v-model="includeShield" class="w-5 h-5">
      <label for="includeShield" class="text-lg font-bold">Inclure un bouclier dans la randomisation</label>
    </div>

    <!-- Boutons pour les budgets -->
    <div class="flex space-x-12 mt-16 font-third-font font-bold">
      <button class="money-button" @click="sendMoney(800)">
        <div>
          <div><p>Pistol</p><p>¤800</p></div>
        </div>
      </button>
      <button class="money-button" @click="sendMoney(1100)">
        <div>
          <div><p>Eco</p><p>¤1100</p></div>
        </div>
      </button>
      <button class="money-button " @click="sendMoney(2700)">
        <div>
          <div><p>Low buy</p><p>¤2700</p></div>
        </div>
      </button>
      <button class="money-button" @click="sendMoney(3500)">
        <div>
          <div><p>Force buy</p><p>¤3500</p></div>
        </div>
      </button>
      <button class="money-button" @click="sendMoney(4200)">
        <div>
          <div><p>Full buy</p><p>¤4200</p></div>
        </div>
      </button>
      <button class="money-button" @click="sendMoney(9000)">
        <div>
          <div><p>Jeff buy</p><p>¤9000</p></div>
        </div>
      </button>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {

  mounted() {
    // Changer le favicon lorsque le composant est monté
    document.title = "Armes";

  },
  data() {
    return {
      items: [],
      randomWeapons: [],
      includeShield: false, // Option pour inclure ou non un bouclier
      cost: 0, // Le budget actuel
    };
  },
  async created() {
    try {
      const weaponsResponse = await this.fetchApi('weapons');
      const gearsResponse = await this.fetchApi('gears');
      console.log(weaponsResponse, gearsResponse);
      this.items = [...weaponsResponse, ...gearsResponse];

      // Calculer la première sélection d'armes pour un coût donné
      this.updateWeaponsBasedOnCost(this.cost);
    } catch (error) {
      console.error('Erreur de récupération des données:', error);
    }
  },

  watch: {
    '$route.params.cost': {
      immediate: true,
      handler(newCost) {
        this.cost = parseInt(newCost, 10) || 0;
        this.updateWeaponsBasedOnCost(this.cost);
      },
    },
  },

  methods: {
    async fetchApi(type) {
      try {
        const response = await axios.get(`https://deadlock-backend.vercel.app/api/${type}`);
        return response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return [];
      }
    },

    updateWeaponsBasedOnCost(budget) {
      const availableItems = this.items.filter(item => item.cost <= budget);

      // Séparer les armes en catégories : primaires, secondaires et boucliers
      const primaryWeapons = availableItems.filter(item => item.category !== 'Pistols' && item.category !== 'Shield');
      const secondaryWeapons = availableItems.filter(item => item.category === 'Pistols');

      // Récupérer les boucliers uniquement si l'option "Inclure un bouclier" est cochée
      const shields = this.includeShield ? availableItems.filter(item => item.category === 'Shield') : [];

      // Mélanger les armes
      const randomSecondary = this.randomizeWeapon(secondaryWeapons);
      const randomPrimary = this.randomizeWeapon(primaryWeapons);
      const randomShield = this.randomizeWeapon(shields);

      // Recréer la liste d'armes
      this.randomWeapons = [...randomSecondary, ...randomPrimary, ...randomShield];
    },
    randomizeWeapon(weaponArray) {
      if (weaponArray.length === 0) return [];
      const randomWeapon = weaponArray[Math.floor(Math.random() * weaponArray.length)];
      return [randomWeapon];
    },

    sendMoney(cost) {
      // Mettre à jour le coût actuel
      this.cost = cost;
      this.updateWeaponsBasedOnCost(cost);
    },

    getText(category) {
      switch (category) {
        case 'Pistols':
          return 'Secondary';
        case 'Shield':
          return 'Shield';
        default:
          return 'Primary';
      }
    },


    randomizeSingleWeapons(index) {
      const currentWeapon = this.randomWeapons[index];

      // Déterminer si l'arme est Primary ou Secondary
      const isSecondary = currentWeapon.category === 'Pistols';

      // Filtrer les armes sans inclure les boucliers si l'option n'est pas activée
      const filteredWeapons = this.items.filter(item => {
        if (!this.includeShield && item.category === 'Armor') {
          return false; // Exclure les boucliers si l'option est décochée
        }
        return isSecondary ? item.category === 'Pistols' : item.category !== 'Pistols';
      });

      let newWeapon;

      // Boucle pour s'assurer que la nouvelle arme est différente de l'arme actuelle
      do {
        const randomIndex = Math.floor(Math.random() * filteredWeapons.length);
        newWeapon = filteredWeapons[randomIndex];
      } while (newWeapon.name === currentWeapon.name);

      // Remplacer l'arme à l'index donné
      this.randomWeapons.splice(index, 1, newWeapon);
    }
  },
};
</script>



<style>
.weapons-item:hover {
  background-color: #2B2B2B;
  transition: 0.3s ease;
}

.weapons-item:hover > .z-10 {
  color: white;
}

/* Afficher le bouton au survol */
.weapons-item:hover .try-again-button {
  opacity: 1;
  pointer-events: auto; /* Rendre le bouton cliquable */
}

/* Appliquer un flou uniquement à l'image et au nom, sans affecter les icônes et la catégorie */
.weapons-item:hover > .z-0 {
  filter: blur(7px) brightness(0.8);
  transition: filter 0.6s ease;
  transition: color 0.3s ease;
  color: white;
}

.weapons-item .z-10 path {
  stroke: #000; /* Add a black stroke (border) */
  stroke-width: 2px; /* Specify the thickness of the border */
}
</style>

