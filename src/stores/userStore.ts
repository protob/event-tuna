import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/user'

// Use exact UUID from database seed (hasura/data.sql)
export const ADMIN_UUID = '550e8400-e29b-41d4-a716-446655440000'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User>({
    id: ADMIN_UUID,
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  })

  const login = (username: string, password: string): boolean => {
    // fixed admin account for demo
    // TODO add proper auth
    if (username === 'admin' && password === 'password') {
      currentUser.value = {
        id: ADMIN_UUID,
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin',
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      return true
    }
    return false
  }

  const register = (username: string, email: string, password: string): boolean => {
    // always use admin account for demo
    currentUser.value = {
      id: ADMIN_UUID,
      username: username,
      email: email,
      role: 'admin',
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    return true
  }

  const logout = () => {
    // Reset to admin user
    currentUser.value = {
      id: ADMIN_UUID,
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  }

  const isAuthenticated = (): boolean => {
    return currentUser.value?.id === ADMIN_UUID
  }

  return {
    currentUser,
    login,
    register,
    logout,
    isAuthenticated
  }
}, {
  persist: true
})
