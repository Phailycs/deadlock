// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '../components/Accueil.vue';
import SelectNumberAgent from '../components/SelectNumberAgent';

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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
