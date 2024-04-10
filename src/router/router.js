import Login from "@/pages/Login"
import PhPayments from "@/pages/Ph-payments"

import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: '/phouse-payments',
    component: PhPayments
  },
  {
    path: '/',
    component: Login
  },
]

const router = createRouter({
  routes, 
  history: createWebHistory(process.env.BASE_URL)
})

export default router;