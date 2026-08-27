<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="login-page">
    <h2>Login</h2>
    <p>Please enter your credentials.</p>
    <!-- We will build the actual form here later -->

    <div class="actions">
      <RouterLink to="/" class="back-link">← Back to Home</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
.back-link {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  margin-top: 1rem;
  display: inline-block;
}
</style>
