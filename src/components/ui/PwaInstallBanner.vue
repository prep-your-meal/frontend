<template>
  <Transition name="slide-up">
    <!-- UI Polish: Sitzt auf dem Handy über der BottomNav (bottom-24) und auf dem Desktop unten rechts -->
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
          <h3 class="text-sm font-bold text-dark-green">PrepYourMeal App</h3>

          <!-- Text für Android / Chrome -->
          <p v-if="!isIos" class="text-xs text-gray-500 mt-0.5 leading-tight">
            Installiere die App für das beste Erlebnis auf deinem Homescreen.
          </p>

          <!-- Spezifischer Text für iOS Safari -->
          <p v-else class="text-xs text-gray-500 mt-0.5 leading-tight">
            Tippe auf <span class="font-bold text-dark-green">Teilen</span> und dann
            <span class="font-bold text-dark-green">Zum Home-Bildschirm</span>.
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col gap-2 shrink-0">
          <button
            v-if="!isIos"
            @click="installApp"
            class="px-4 py-2 bg-primary-green text-white text-xs font-bold rounded-xl shadow-sm hover:bg-dark-green transition-colors"
          >
            Laden
          </button>
          <button
            @click="dismissBanner"
            class="px-4 py-2 bg-gray-50 text-gray-500 text-xs font-bold rounded-xl hover:bg-gray-100 transition-colors"
          >
            Später
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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

const checkIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(userAgent)
}

const isStandalone = () => {
  const nav = window.navigator as Navigator & { standalone?: boolean }
  return window.matchMedia('(display-mode: standalone)').matches || !!nav.standalone
}

const handleInstallPrompt = (e: Event) => {
  e.preventDefault()
  deferredPrompt.value = e as BeforeInstallPromptEvent
  showBanner.value = true
}

const installApp = async () => {
  if (!deferredPrompt.value) return

  deferredPrompt.value.prompt()

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
