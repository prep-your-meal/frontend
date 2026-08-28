import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import DashboardView from '../views/DashboardView.vue'
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import RecipeDetailView from '../views/RecipeDetailView.vue'
import ImpressumView from '../views/ImpressumView.vue'
import PrivacyView from '../views/PrivacyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      // Lazy-loading: The component is only loaded when the user visits the route
      component: LandingView,
      meta: { requiresAuth: false },
    },
    {
      // The :id parameter will be captured and available in route.params.id
      path: '/recipe/:id',
      name: 'recipe-detail',
      component: RecipeDetailView,
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: ImpressumView,
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      // 'guestOnly' ensures logged-in users cannot access the login page again
      meta: { requiresAuth: false, guestOnly: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      // 'guestOnly' ensures logged-in users cannot access the register page again
      meta: { requiresAuth: false, guestOnly: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      // This explicitly protects the route
      meta: { requiresAuth: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Wenn der Nutzer den "Zurück"-Button nutzt, alte Position wiederherstellen
    if (savedPosition) {
      return savedPosition
    }
    // Wenn ein Anker (Hash) in der URL ist (z.B. #discover), dorthin scrollen
    else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    // Ansonsten immer sauber nach oben an den Anfang springen
    else {
      return { top: 0, behavior: 'smooth' } // 'smooth' sorgt für ein sanftes Gleiten, 'auto' für einen harten Sprung
    }
  },
})

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 1. Route requires authentication, but user is NOT logged in
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.warn('Access denied. Redirecting to login.')
    next({ name: 'login' })
  }
  // 2. Route is for guests only (e.g., login), but user IS already logged in
  else if (to.meta.guestOnly && authStore.isAuthenticated) {
    console.info('User already logged in. Redirecting to dashboard.')
    next({ name: 'dashboard' })
  }
  // 3. All checks passed, allow navigation
  else {
    next()
  }
})

export default router
