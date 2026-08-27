<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import api from '../services/api'

// Define the TypeScript interface for a Recipe
interface Recipe {
  id?: number
  slug: string
  title: string
  description: string
  image?: string
  prep_time_minutes?: number
}

// State management for the API request
const recipes = ref<Recipe[]>([])
const isLoading = ref<boolean>(true)
const error = ref<string | null>(null)

// Fetch recipes automatically when the page loads
onMounted(async () => {
  try {
    isLoading.value = true
    const response = await api.get('/recipes?page=1&per_page=3')
    recipes.value = response.data.data || response.data
  } catch (err) {
    console.error('Failed to fetch recipes:', err)
    error.value = 'Could not load recipes at this time. Please ensure the backend is running.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="landing-page">
    <!-- Hero Section (Styled like your Coming Soon Placeholder) -->
    <header class="hero-container">
      <img src="@/assets/images/prepyourmeal_logo.png" alt="PrepYourMeal Logo" class="logo" />
      <h1>Intelligent meal planning with <span class="highlight">PrepYourMeal</span></h1>
      <p>
        Organize your daily food routines stress-free. Plan your meals, automate grocery runs, and
        track your macros all in one place.
      </p>

      <div class="hero-actions">
        <RouterLink to="/login" class="btn-primary">Login & Start Planning</RouterLink>
      </div>
    </header>

    <!-- Recipes Section -->
    <section class="recipes-section">
      <h2>Latest Recipes</h2>

      <!-- Loading State -->
      <div v-if="isLoading" class="state-message">
        <p>Loading delicious recipes...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="state-message error">
        <p>{{ error }}</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="recipes.length === 0" class="state-message">
        <p>No recipes found. Be the first to add one!</p>
      </div>

      <!-- Recipe Grid -->
      <div v-else class="recipe-grid">
        <article v-for="recipe in recipes" :key="recipe.slug" class="recipe-card">
          <div class="card-image">
            <img v-if="recipe.image" :src="recipe.image" :alt="recipe.title" />
            <div v-else class="image-placeholder">🍽️</div>
          </div>

          <div class="card-content">
            <h3>{{ recipe.title }}</h3>
            <p class="description">{{ recipe.description }}</p>

            <div class="card-meta">
              <span v-if="recipe.prep_time_minutes" class="badge-small">
                ⏱️ {{ recipe.prep_time_minutes }} min
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding-bottom: 4rem;
  width: 100%;
}

/* --- Hero Card (Imported from Placeholder) --- */
.hero-container {
  max-width: 750px;
  background: #ffffff;
  padding: 3.5rem 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(16, 84, 50, 0.08);
  width: 100%;
  border-top: 6px solid var(--primary-green);
  text-align: center;
  margin-top: 2rem;
}

.logo {
  max-width: 220px;
  height: auto;
  margin-bottom: 2rem;
  margin-left: auto;
  margin-right: auto;
  display: block;
  image-rendering: -webkit-optimize-contrast;
}

.badge-accent {
  display: inline-block;
  background-color: var(--accent-gold);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
}

.hero-container h1 {
  font-size: 2.4rem;
  margin-bottom: 1.2rem;
  color: var(--dark-green);
  letter-spacing: -0.02em;
}

.hero-container p {
  font-size: 1.15rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: var(--text-muted);
}

.highlight {
  font-weight: 700;
  color: var(--accent-gold);
}

.hero-actions {
  margin-top: 1rem;
}

/* --- Recipe Section & Grid --- */
.recipes-section {
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
}

.recipes-section h2 {
  font-size: 1.8rem;
  color: var(--dark-green);
  margin-bottom: 1.5rem;
  border-bottom: 3px solid var(--primary-green);
  display: inline-block;
  padding-bottom: 0.5rem;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.recipe-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.card-image {
  height: 200px;
  background-color: var(--bg-cream);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  font-size: 3rem;
}

.card-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-content h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--dark-green);
}

.description {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.badge-small {
  background-color: var(--bg-cream);
  color: var(--dark-green);
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* State Messages */
.state-message {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  color: var(--text-muted);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.state-message.error {
  color: #e53e3e;
  background: #fff5f5;
  border: 1px solid #feb2b2;
}
</style>
