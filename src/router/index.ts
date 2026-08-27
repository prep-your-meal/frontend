import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      // Lazy-loading: The component is only loaded when the user visits the route
      component: () => import('../views/LandingView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      // 'guestOnly' ensures logged-in users cannot access the login page again
      meta: { requiresAuth: false, guestOnly: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      // This explicitly protects the route
      meta: { requiresAuth: true },
    },
  ],
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
