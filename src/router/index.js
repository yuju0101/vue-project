import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/relax',
      name: 'RelaxView',
      component: () => import('../views/RelaxView.vue'),
    },
    {
      path: '/rule',
      name: 'RuleView',
      component: () => import('../views/RuleView.vue'),
    },
    {
      path: '/estimate',
      name: 'EstimateView',
      component: () => import('../views/EstimateView.vue'),
    },
    {
      path: '/estimate',
      name: 'EstimateDetailView',
      component: () => import('../views/detailPages/EstimateDetailView.vue'),
    },
    {
      path: '/resource',
      name: 'ResourceView',
      component: () => import('../views/ResourceView.vue'),
    },
  ],
})

export default router
