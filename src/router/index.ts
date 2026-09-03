import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import DashboardView from '../views/DashboardView.vue'
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import RecipeDetailView from '../views/RecipeDetailView.vue'
import RecipesView from '../views/RecipesView.vue'
import ImpressumView from '../views/ImpressumView.vue'
import PrivacyView from '../views/PrivacyView.vue'
import ShoppingView from '../views/ShoppingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      meta: { requiresAuth: false, guestOnly: true },
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: RecipesView,
    },
    {
      path: '/recipe/:id',
      name: 'recipe-detail',
      component: RecipeDetailView,
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: ImpressumView,
      meta: { hideNav: true },
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyView,
      meta: { hideNav: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false, guestOnly: true, hideNav: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false, guestOnly: true, hideNav: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: ShoppingView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0 }
    }
  },
})

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.warn('Access denied. Redirecting to login.')
    next({ name: 'login' })
  } else if (to.meta.guestOnly && authStore.isAuthenticated) {
    console.info('User already logged in. Redirecting to dashboard.')
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

// === PWA SCROLL FIX ===
router.afterEach((to, from) => {
  if (to.path !== from.path) {
    setTimeout(() => {
      window.scrollTo(0, 0)
      document.getElementById('app')?.scrollTo(0, 0)
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }, 50)
  }
})

export default router
