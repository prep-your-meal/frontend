<template>
  <!-- Visible on mobile (flex), hidden on tablet/desktop (md:hidden) -->
  <nav
    class="flex md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 pb-[env(safe-area-inset-bottom)]"
  >
    <div class="flex justify-around items-center h-16 w-full px-2">
      <!-- 1. Discover (Route geändert auf /recipes) -->
      <RouterLink
        to="/recipes"
        class="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-primary-green transition-colors"
        active-class="text-primary-green font-medium"
      >
        <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <span class="text-[10px] uppercase tracking-wider">{{ $t('nav.discover') }}</span>
      </RouterLink>

      <!-- 2. Planner -->
      <RouterLink
        to="/dashboard"
        class="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-primary-green transition-colors"
        active-class="text-primary-green font-medium"
      >
        <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
        <span class="text-[10px] uppercase tracking-wider">{{ $t('nav.plan') }}</span>
      </RouterLink>

      <!-- 3. Shopping list -->
      <RouterLink
        to="/shopping"
        class="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-primary-green transition-colors"
        active-class="text-primary-green font-medium"
      >
        <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
        <span class="text-[10px] uppercase tracking-wider">{{ $t('nav.shopping') }}</span>
      </RouterLink>

      <!-- 4. Profile -->
      <RouterLink
        to="/profile"
        class="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-primary-green transition-colors"
        active-class="text-primary-green font-medium"
      >
        <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          ></path>
        </svg>
        <span class="text-[10px] uppercase tracking-wider">{{ $t('nav.profile') }}</span>
      </RouterLink>
    </div>
  </nav>
</template>
