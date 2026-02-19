import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import HowToBuy from "./pages/HowToBuy.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/how-to-buy", component: HowToBuy },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

export default router;
