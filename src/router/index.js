// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '../components/Accueil.vue';

const routes = [
  {
    path: '/accueil',
    name: 'Accueil',
    component: Accueil,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
