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

    <!-- Liste des armes -->
    <div class="flex justify-center flex-wrap gap-8">
      <!-- Si une seule arme, la centrer -->
      <div v-if="randomWeapons.length === 1" class="flex justify-center">
        <div v-for="item in randomWeapons" :key="item.name" class="bg-white p-6 shadow-lg w-96 h-96 flex flex-col justify-between">
          <!-- Nom de la catégorie -->
          <p class="font-third-font font-bold">{{ getText(item.category) }}</p>

          <!-- Image de l'arme avec taille fixe et maintien des proportions -->
          <img :src="item.icon" :alt="'Image de ' + item.name" class="mx-auto mb-4" />

          <!-- Nom de l'arme en bas -->
          <h2 class="text-6xl font-third-font font-bold uppercase mb-4">{{ item.name }}</h2>
        </div>
      </div>
      <!-- Si plusieurs armes -->
      <div v-else class="flex gap-8">
        <div v-for="(item, index) in randomWeapons" :key="item.name" class="bg-white agent-item py-6 shadow-lg flex flex-col justify-between m-20 largeur">

          <!-- Nom de la catégorie -->
          <p class="font-third-font font-bold py-6">{{ getText(item.category) }}</p>

          <!-- Image de l'arme avec taille fixe et maintien des proportions -->
          <img :src="item.icon" :alt="'Image de ' + item.name" class="mx-auto mb-4 py-6" />

          <!-- Nom de l'arme en bas -->
          <h2 class="text-black font-secondary-font text-6xl uppercase mb-4">{{ item.name }}</h2>
          
            <!-- Bouton TRY AGAIN pour re-randomiser les armes -->
              <button v-if="item" @click="randomizeSingleWeapons(index)" class="call-to-action font-third-font font-bold try-again-button">
                <div>
                  <div>
                    TRY AGAIN
                  </div>
                </div>
              </button>
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
.largeur {
  width: 40rem;
}

/* No change: Hides button by default */
.try-again-button {
  opacity: 0;
  pointer-events: none;
  /* ... rest of styles ... */
}

/* Show button on hover */
.agent-item:hover .try-again-button {
  opacity: 1;
  pointer-events: auto;
}

/* Apply blur to image and name on hover (within agent-item) */
.agent-item:hover > img,
.agent-item:hover h2,
.agent-item:hover p {
  filter: blur(5px) brightness(0.3); /* Applique un flou et assombrit */
  transition: filter 0.3s ease;
}

/* Cacher le bouton "Try Again" par défaut */
.try-again-button {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7); /* Fond sombre */
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.3s ease, pointer-events 0.3s ease;
}

/* Afficher le bouton au survol */
.agent-item:hover .try-again-button {
  opacity: 1;
  pointer-events: auto; /* Rendre le bouton cliquable */
}
</style>
