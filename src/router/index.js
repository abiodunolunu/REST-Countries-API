import { createRouter, createWebHistory } from 'vue-router'
import AllCountries from '../views/AllCountries.vue'
const routes = [
  {
    path: '/',
    name: 'AllCountries',
    component: AllCountries
  },
  {
    path: "/c/:countryName",
    name: 'country-detail',
    component: () => import('../views/CountryDetail.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
