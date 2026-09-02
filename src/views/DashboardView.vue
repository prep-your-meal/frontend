<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="dashboard">
    <h2>{{ $t('dashboard.title') }} 🔒</h2>
    <p>{{ $t('dashboard.protected_text') }}</p>

    <button @click="handleLogout" class="btn-primary">{{ $t('dashboard.logout') }}</button>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 2rem;
}
</style>
