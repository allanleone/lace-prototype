import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/tokens',
      name: 'tokens',
      component: () => import('../views/Tokens.vue')
    },
    {
      path: '/nfts',
      name: 'nfts',
      component: () => import('../views/NFTs.vue')
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('../views/Activity.vue')
    },
    {
      path: '/staking',
      name: 'staking',
      component: () => import('../views/Staking.vue')
    },
    {
      path: '/dappstore',
      name: 'DAppStore',
      component: () => import('../views/DAppStore.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/Settings.vue')
    },
    {
      path: '/address-book',
      name: 'addressBook',
      component: () => import('../views/AddressBook.vue')
    }
  ]
})

export default router
