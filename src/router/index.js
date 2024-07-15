import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import HouseView from '../views/HouseView.vue';
import FormView from '../views/FormView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    },
    {
      path: '/houses/:id',
      name: 'house',
      component: HouseView
    },
    {
      path: '/house/create',
      name: 'create',
      component: FormView
    },
    {
      path: '/houses/:id/edit',
      name: 'edit',
      component: FormView
    },
  ]
})

export default router
