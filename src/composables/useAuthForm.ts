import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

export function useAuthForm(isLogin: boolean) {
  const userStore = useUserStore()
  const router = useRouter()

  const username = ref('')
  const email = ref('')
  const password = ref('')

  const handleSubmit = () => {
    if (isLogin) {
      if (userStore.login(username.value, password.value)) {
        router.push('/')
      } else {
        alert('Login failed')
      }
    } else {
      if (userStore.register(username.value, email.value, password.value)) {
        router.push('/login')
      } else {
        alert('Registration failed')
      }
    }
  }

  return {
    username,
    email,
    password,
    handleSubmit
  }
}
