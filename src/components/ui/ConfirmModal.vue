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
        <div class="absolute top-0 left-0 w-full h-2 bg-secondary-rust"></div>

        <div class="flex flex-col items-center text-center">
          <!-- Icon Circle -->
          <div
            class="w-16 h-16 bg-secondary-rust/10 text-secondary-rust rounded-full flex items-center justify-center mb-4"
          >
            <slot name="icon">
              <!-- Default Alert Icon -->
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </slot>
          </div>

          <h3 class="text-2xl font-bold text-dark-green mb-2">{{ title }}</h3>
          <p class="text-gray-500 mb-8">{{ description }}</p>

          <!-- Actions -->
          <div class="w-full flex flex-col gap-3">
            <!--
              [&_a]:text-white zwingt alle eingebetteten Links dazu, weiß zu sein.
              Zusätzlich ein Slot, um RouterLinks oder andere Tags als Text zu übergeben.
            -->
            <button
              @click="$emit('confirm')"
              class="w-full py-3.5 bg-secondary-rust text-white font-bold rounded-xl hover:bg-secondary-rust/90 transition-colors shadow-sm [&_a]:text-white [&_a:hover]:text-white"
            >
              <slot name="confirm-action">
                {{ confirmText }}
              </slot>
            </button>

            <button
              @click="$emit('cancel')"
              class="w-full py-3.5 bg-gray-100 text-dark-green font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              {{ cancelText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps({
  show: { type: Boolean, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  confirmText: { type: String, required: true },
  cancelText: { type: String, required: true },
})

defineEmits(['confirm', 'cancel'])
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
