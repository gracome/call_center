import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import homeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
   component: homeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
