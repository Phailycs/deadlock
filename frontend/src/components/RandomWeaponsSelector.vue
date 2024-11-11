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

    <!-- Liste des armes -->
    <div class="flex justify-center flex-wrap gap-8">
      <!-- Si une seule arme, la centrer -->
      <div v-if="randomWeapons.length === 1" class="flex justify-center">
        <div v-for="item in randomWeapons" :key="item.name" class="bg-white p-6 rounded-lg shadow-lg w-96 h-96 flex flex-col justify-between">
          <!-- Nom de la catégorie -->
          <p class="font-third-font font-bold uppercase">{{ getText(item.category) }}</p>

          <!-- Image de l'arme avec taille fixe -->
          <img :src="item.icon" :alt="'Image de ' + item.name" class="w-48 h-48 mx-auto mb-4" />

          <!-- Nom de l'arme en bas -->
          <h2 class="text-xl font-third-font font-bold uppercase mb-4">{{ item.name }}</h2>
        </div>
      </div>

      <!-- Si plusieurs armes -->
      <div v-else class="flex gap-8">
        <div v-for="item in randomWeapons" :key="item.name" class="bg-white p-6 rounded-lg shadow-lg w-96 h-96 flex flex-col justify-between">

          <!-- Nom de la catégorie -->
          <p class="font-third-font font-bold uppercase">{{ getText(item.category) }}</p>

          <!-- Image de l'arme avec taille fixe -->
          <img :src="item.icon" :alt="'Image de ' + item.name" class="w-48 h-48 mx-auto mb-4" />

          <!-- Nom de l'arme en bas -->
          <h2 class="text-black font-secondary-font text-2xl uppercase mb-4">{{ item.name }}</h2>
        </div>
      </div>
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
    };
  },
  async created() {
    try {
      const weaponsResponse = await this.fetchWeapons('weapons');
      const gearsResponse = await this.fetchWeapons('gears');
      this.items = [...weaponsResponse, ...gearsResponse];

      // Filtrer les armes par budget
      const availableWeapons = this.items.filter(item => item.cost <= this.cost);

      // Générer une combinaison d'armes respectant la règle de 1 grosse arme max
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
    async fetchWeapons(type) {
      try {
        const response = await axios.get(`http://localhost:5000/api/${type}`);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        return [];
      }
    },
    getBackgroundImage(category) {
      switch (category) {
        case 'Pistols':
          return '../assets/img/weapons/bg-secondary.svg';
        default:
          return '../assets/img/weapons/bg-primary.svg';
      }
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

  // Séparer les armes lourdes, les pistolets et les autres
  const heavyWeapons = availableWeapons.filter(weapon => this.isHeavyWeapon(weapon));
  const pistols = availableWeapons.filter(weapon => weapon.category === 'Pistols');
  const regularWeapons = availableWeapons.filter(weapon => !this.isHeavyWeapon(weapon) && weapon.category !== 'Pistols');

  // Mélanger les armes (les armes lourdes, pistols et autres séparément)
  const shuffledHeavyWeapons = heavyWeapons.sort(() => 0.5 - Math.random());
  const shuffledPistols = pistols.sort(() => 0.5 - Math.random());
  const shuffledRegularWeapons = regularWeapons.sort(() => 0.5 - Math.random());

  // Sélectionner une grosse arme (si possible)
  for (let weapon of shuffledHeavyWeapons) {
    if (heavyWeaponSelected) continue; // Ne sélectionner qu'une seule grosse arme

    if (totalCost + weapon.cost <= budget) {
      selectedWeapons.push(weapon);
      totalCost += weapon.cost;
      heavyWeaponSelected = true; // Marquer une grosse arme comme sélectionnée
      categoriesSelected.add(weapon.category); // Marquer la catégorie comme sélectionnée
      break; // Sortir une fois qu'une grosse arme est sélectionnée
    }
  }

  // Sélectionner un pistolet (si possible)
  if (!pistolSelected) {
    for (let weapon of shuffledPistols) {
      if (totalCost + weapon.cost <= budget) {
        selectedWeapons.push(weapon);
        totalCost += weapon.cost;
        pistolSelected = true; // Marquer un pistolet comme sélectionné
        categoriesSelected.add(weapon.category); // Marquer la catégorie comme sélectionnée
        break; // Sortir après avoir sélectionné un pistolet
      }
    }
  }

  // Sélectionner les autres armes (jusqu'à une arme supplémentaire, sauf pistolet et grosse arme)
  for (let weapon of shuffledRegularWeapons) {
    if (selectedWeapons.length >= 2) break; // Limiter à 2 armes au total

    if (categoriesSelected.has(weapon.category)) continue; // Éviter de sélectionner deux armes du même type

    if (totalCost + weapon.cost <= budget) {
      selectedWeapons.push(weapon);
      totalCost += weapon.cost;
      categoriesSelected.add(weapon.category); // Marquer la catégorie comme sélectionnée
    }
  }

  return selectedWeapons;
}

,
    isHeavyWeapon(weapon) {
      // Liste des types d'armes "grosse arme"
      const heavyWeaponTypes = ['Rifles', 'Heavy Weapons', 'Shotguns', 'Sniper Rifles', 'SMGs'];
      return heavyWeaponTypes.includes(weapon.type);
    }
  }
};
</script>
