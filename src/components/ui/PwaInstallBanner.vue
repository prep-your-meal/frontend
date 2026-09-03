<template>
  <Transition name="slide-up">
    <div
      v-if="showBanner"
      class="fixed bottom-24 md:bottom-8 right-0 left-0 md:left-auto md:right-8 mx-4 md:mx-0 z-50 md:max-w-sm"
    >
      <div
        class="bg-white p-4 rounded-3xl shadow-2xl border border-gray-100 flex items-center gap-4"
      >
        <!-- Icon -->
        <div
          class="flex-shrink-0 w-12 h-12 bg-primary-green/10 rounded-2xl flex items-center justify-center"
        >
          <img
            src="@/assets/images/prepyourmeal_logo.svg"
            alt="Logo"
            class="w-8 h-8 drop-shadow-sm"
          />
        </div>

        <!-- Text -->
        <div class="flex-grow">
          <h3 class="text-sm font-bold text-dark-green">{{ $t('pwa.title') }}</h3>

          <!-- Text for Android / Chrome -->
          <p v-if="!isIos" class="text-xs text-gray-500 mt-0.5 leading-tight">
            {{ $t('pwa.android_install') }}
          </p>

          <!-- Specific text for iOS Safari rendered as HTML to preserve bold styling -->
          <p
            v-else
            class="text-xs text-gray-500 mt-0.5 leading-tight"
            v-html="$t('pwa.ios_install')"
          ></p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col gap-2 shrink-0">
          <button
            v-if="!isIos"
            @click="installApp"
            class="px-4 py-2 bg-primary-green text-white text-xs font-bold rounded-xl shadow-sm hover:bg-dark-green transition-colors"
          >
            {{ $t('pwa.install_button') }}
          </button>
          <button
            @click="dismissBanner"
            class="px-4 py-2 bg-gray-50 text-gray-500 text-xs font-bold rounded-xl hover:bg-gray-100 transition-colors"
          >
            {{ $t('pwa.later_button') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Custom interface for the non-standard install event to satisfy TypeScript strict mode
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

const showBanner = ref(false)
const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)
const isIos = ref(false)

// Check if the user is on iOS devices
const checkIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(userAgent)
}

// Check if the app is already running in PWA standalone mode
const isStandalone = () => {
  // Extend Navigator type safely to check for Apple's proprietary standalone property
  const nav = window.navigator as Navigator & { standalone?: boolean }
  return window.matchMedia('(display-mode: standalone)').matches || !!nav.standalone
}

const handleInstallPrompt = (e: Event) => {
  e.preventDefault()
  // Cast the event as our custom BeforeInstallPromptEvent type
  deferredPrompt.value = e as BeforeInstallPromptEvent
  showBanner.value = true
}

const installApp = async () => {
  if (!deferredPrompt.value) return

  // Open the native browser installation dialog
  deferredPrompt.value.prompt()

  // Wait for the user's choice outcome
  const { outcome } = await deferredPrompt.value.userChoice

  if (outcome === 'accepted') {
    console.log('User accepted the A2HS prompt')
  }

  deferredPrompt.value = null
  showBanner.value = false
}

const dismissBanner = () => {
  showBanner.value = false
}

onMounted(() => {
  if (isStandalone()) return

  isIos.value = checkIos()

  // iOS Safari doesn't support the install event. Show banner automatically as a hint after 3 seconds.
  if (isIos.value) {
    setTimeout(() => {
      showBanner.value = true
    }, 3000)
  }

  window.addEventListener('beforeinstallprompt', handleInstallPrompt)
})

onUnmounted(() => {
  window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
