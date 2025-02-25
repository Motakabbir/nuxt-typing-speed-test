<!-- Auth Modal Component -->
<template>
  <div v-if="isOpen" class=" inset-0 flex items-center justify-center z-50 p-4">
    <div class="absolute inset-0 bg-black opacity-50" @click="close"></div>
    <div 
      class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative z-10 max-h-[90vh]  m-auto"
      ref="modalRef"
      @keydown.esc="close"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <button 
        @click="close" 
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        ref="closeButtonRef"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span class="sr-only">Close</span>
      </button>

      <h2 id="modal-title" class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {{ isLogin ? 'Sign In' : 'Sign Up' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-gray-700 dark:text-gray-300 mb-2" for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            ref="emailInputRef"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
            :disabled="loading"
          />
        </div>

        <div>
          <label class="block text-gray-700 dark:text-gray-300 mb-2" for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
            :disabled="loading"
            minlength="6"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="loading || !isFormValid"
        >
          {{ loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up') }}
        </button>

        <p v-if="error" class="text-red-500 text-sm" role="alert">{{ error }}</p>

        <p class="text-center text-gray-600 dark:text-gray-400">
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          <button
            type="button"
            @click="toggleMode"
            class="text-amber-500 hover:text-amber-600 dark:text-gray-400 dark:hover:text-gray-300 ml-1"
            :disabled="loading"
          >
            {{ isLogin ? 'Sign Up' : 'Sign In' }}
          </button>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'auth-success'): void
}>()

const { signIn, signUp } = useAuth()
const isLogin = ref(true)
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const modalRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLElement | null>(null)
const emailInputRef = ref<HTMLElement | null>(null)

const isFormValid = computed(() => {
  return email.value.trim() !== '' && password.value.trim().length >= 6
})

// Focus management
watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    await nextTick()
    emailInputRef.value?.focus()
  }
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  error.value = ''
  email.value = ''
  password.value = ''
  nextTick(() => {
    emailInputRef.value?.focus()
  })
}

const handleSubmit = async () => {
  if (!isFormValid.value) {
    error.value = 'Please fill in all required fields'
    return
  }

  loading.value = true
  error.value = ''
  
  try {
    const result = isLogin.value 
      ? await signIn(email.value, password.value)
      : await signUp(email.value, password.value)

    if (result.error) {
      error.value = result.error
    } else {
      emit('auth-success')
      close()
    }
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const close = () => {
  emit('close')
  error.value = ''
  email.value = ''
  password.value = ''
}
</script>