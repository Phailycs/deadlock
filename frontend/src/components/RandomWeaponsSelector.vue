<template>
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
      <div v-for="(item, index) in randomWeapons" :key="item.name" class="relative bg-white weapons-item min-w-[20rem] min-h-[24rem] p-12 flex flex-col justify-between">
        <div class="z-10">
          <div :class="['absolute w-8 h-8 bg-red-valorant', item.category !== 'Pistols' ? 'top-0 left-0' : 'bottom-0 left-0']"></div>
          <img src="@/assets/img/weapons/logo-val.svg" :class="['absolute w-5 h-5', item.category !== 'Pistols' ? 'top-1 left-1' : 'bottom-1 left-1']">
        </div>
        
        <!-- Section en haut pour afficher la catégorie -->
        <div class="w-full text-center mb-12 z-10">
          <p class="font-third-font text-2xl" style="filter:none;">{{ getText(item.category) }}</p>
        </div>

        <!-- Conteneur de l'image de l'arme au centre -->
        <div class="flex-grow flex justify-center items-center overflow-hidden z-0">
          <img :src="item.icon" :alt="'Image de ' + item.name" class="max-h-40 max-w-full object-contain"/>
        </div>

        <!-- Section en bas pour afficher le nom de l'arme -->
        <div class="w-full text-center my-4 z-0">
          <h2 class="text-6xl font-secondary-font uppercase">{{ item.name }}</h2>
        </div>

        <!-- Bouton TRY AGAIN centré au milieu -->
        <button v-if="item" @click="randomizeSingleWeapons(index)" class="standard-button try-again-button font-third-font font-bold absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div>
            <div>TRY AGAIN</div>
          </div>
        </button>
      </div>
    </div>
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
  data() {
    return {
      items: [],
      randomWeapons: [],
      result: [],
    };
  },
  async created() {
    try {
      const weaponsResponse = await this.fetchApi('weapons');
      const gearsResponse = await this.fetchApi('gears');
      this.items = [...weaponsResponse, ...gearsResponse];

      // Filtrer les armes par budget
      const availableWeapons = this.items.filter(item => item.cost <= this.cost);

      this.randomWeapons = this.generateRandomCombination(availableWeapons, this.cost);
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
    async fetchApi(type) {
      try {
        const response = await axios.get(`https://deadlock-backend.vercel.app/api/${type}`);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        return [];
      }
    },
    sendMoney(cost) {
      this.$router.push({ name: 'RandomWeaponsSelector', params: { cost } });
    },
    getText(category) {
      switch (category) {
        case 'Pistols':
          return 'Secondary';
        default:
          return 'Primary';
      }
    },
    generateRandomCombination(availableWeapons, budget) {
      const selectedWeapons = [];
      let totalCost = 0;
      const categoriesSelected = new Set(); // Pour garder une arme par catégorie
      let heavyWeaponSelected = false; // Indicateur pour savoir si une grosse arme a été sélectionnée
      let pistolSelected = false; // Indicateur pour savoir si un pistolet a été sélectionné

      const heavyWeapons = availableWeapons.filter(weapon => this.isHeavyWeapon(weapon));
      const pistols = availableWeapons.filter(weapon => weapon.category === 'Pistols');
      const regularWeapons = availableWeapons.filter(weapon => !this.isHeavyWeapon(weapon) && weapon.category !== 'Pistols');

      const shuffledHeavyWeapons = heavyWeapons.sort(() => 0.5 - Math.random());
      const shuffledPistols = pistols.sort(() => 0.5 - Math.random());
      const shuffledRegularWeapons = regularWeapons.sort(() => 0.5 - Math.random());

      for (let weapon of shuffledHeavyWeapons) {
        if (heavyWeaponSelected) continue;
        if (totalCost + weapon.cost <= budget) {
          selectedWeapons.push(weapon);
          totalCost += weapon.cost;
          heavyWeaponSelected = true;
          categoriesSelected.add(weapon.category);
          break;
        }
      }

      if (!pistolSelected) {
        for (let weapon of shuffledPistols) {
          if (totalCost + weapon.cost <= budget) {
            selectedWeapons.push(weapon);
            totalCost += weapon.cost;
            pistolSelected = true;
            categoriesSelected.add(weapon.category);
            break;
          }
        }
      }

      for (let weapon of shuffledRegularWeapons) {
        if (selectedWeapons.length >= 2) break;
        if (categoriesSelected.has(weapon.category)) continue;
        if (totalCost + weapon.cost <= budget) {
          selectedWeapons.push(weapon);
          totalCost += weapon.cost;
          categoriesSelected.add(weapon.category);
        }
      }

      return selectedWeapons;
    },
    isHeavyWeapon(weapon) {
      const heavyWeaponTypes = ['Rifles', 'Heavy Weapons', 'Shotguns', 'Sniper Rifles', 'SMGs'];
      return heavyWeaponTypes.includes(weapon.type);
    },
    randomizeSingleWeapons(index) {
      const weaponsCopy = [...this.items];
      let newWeapon;

      // Vérifier que la nouvelle arme n'est pas déjà dans la sélection
      do {
        const randomIndex = Math.floor(Math.random() * weaponsCopy.length);
        newWeapon = weaponsCopy[randomIndex];
      } while (this.randomWeapons.includes(newWeapon));

      // Remplacer l'arme à l'index donné directement
      this.randomWeapons.splice(index, 1, newWeapon);
    }


  }
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
</style>
