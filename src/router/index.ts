import { createRouter, createWebHistory } from 'vue-router'
import WeeklyPlan from '../views/WeeklyPlan.vue'
import FavoritesView from '../views/FavoritesView.vue'
import MealTypeView from '../views/MealTypeView.vue'
import ConfigView from '../views/ConfigView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: WeeklyPlan },
    { path: '/categorias', name: 'categories', component: MealTypeView },
    { path: '/favoritos', name: 'favorites', component: FavoritesView },
    { path: '/configuracion', name: 'config', component: ConfigView },
  ],
})

export default router
