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
    <h2>Dashboard 🔒</h2>
    <p>This is the protected area. Only authenticated users can see this.</p>

    <button @click="handleLogout" class="btn-primary">Logout</button>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 2rem;
}
</style>
