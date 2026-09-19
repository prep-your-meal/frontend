<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-[200] flex items-center justify-center bg-dark-green/60 backdrop-blur-sm px-4"
    >
      <div
        class="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
      >
        <!-- Colored Top Bar -->
        <div class="absolute top-0 left-0 w-full h-2 bg-accent-gold"></div>

        <div class="flex flex-col items-center text-center">
          <!-- Icon Circle (Elegant Star SVG instead of Emoji) -->
          <div
            class="w-16 h-16 bg-accent-gold/10 text-accent-gold rounded-full flex items-center justify-center mb-4"
          >
            <svg class="w-8 h-8 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          </div>

          <h3 class="text-2xl font-bold text-dark-green mb-2">
            {{ $t('premium.modal_title') }}
          </h3>
          <p class="text-gray-500 mb-8">
            {{ $t('premium.modal_desc') }}
          </p>

          <!-- Actions -->
          <div class="w-full flex flex-col gap-3">
            <!--
              Rusty Button: bg-secondary-rust and text-white.
              [&_a]:text-white forces any child link to remain white.
            -->
            <button
              @click="handleUpgrade"
              class="w-full py-3.5 bg-secondary-rust text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-sm [&_a]:text-white [&_a:hover]:text-white"
            >
              <slot name="upgrade-action">
                {{ $t('premium.upgrade_button') }}
              </slot>
            </button>
            <button
              @click="$emit('close')"
              class="w-full py-3.5 bg-gray-100 text-dark-green font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              {{ $t('premium.cancel_button') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

// Method to handle the upgrade process in the future
const handleUpgrade = () => {
  // TODO: Implement routing to checkout/pricing page
  // e.g., router.push('/premium') or trigger Stripe Checkout
  emit('close')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
