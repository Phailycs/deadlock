// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '../components/Accueil.vue';
import SelectNumberAgent from '../components/SelectNumberAgent';
import SelectMoneyWeapons from '../components/SelectMoneyWeapons.vue';
import RandomWeaponsSelector from '../components/RandomWeaponsSelector.vue';

const routes = [
  {
    path: '/accueil',
    name: 'Accueil',
    component: Accueil,
  },
  {
    path: '/selectAgents',
    name: 'SelectNumberAgent',
    component: SelectNumberAgent,
  },
  {
    path: '/selectMoney',
    name: 'SelectMoneyWeapons',
    component: SelectMoneyWeapons,
  },
  {
    path: '/randomWeapons/:cost',
    name: 'RandomWeaponsSelector',
    component: RandomWeaponsSelector,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;