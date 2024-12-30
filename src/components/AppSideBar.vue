<template>
  <v-navigation-drawer
    v-model="isOpen"
    temporary
    :overlay="true"
    :scrim="false"
    location="left"
  >
    <v-toolbar>
      <v-toolbar-title>Menu</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon="mdi-close"
        variant="text"
        @click="isOpen = false"
      />
    </v-toolbar>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="item in menuItems"
        :key="item.id"
        :to="item.to"
        :prepend-icon="item.icon"
        @click="item.action?.(); isOpen = false"
      >
        {{ item.text }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])
const userStore = useUserStore()
const router = useRouter()

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}

const menuItems = computed(() => [
  { id: 'home', to: '/', icon: 'mdi-home', text: 'Home' },
  { id: 'about', to: '/about', icon: 'mdi-information', text: 'About' },
  ...(!userStore.currentUser ? [
    { id: 'login', to: '/login', icon: 'mdi-login', text: 'Login' },
    { id: 'register', to: '/register', icon: 'mdi-account-plus', text: 'Register' }
  ] : [
    { id: 'logout', icon: 'mdi-logout', text: 'Logout', action: handleLogout },
    { id: 'settings', to: '/settings', icon: 'mdi-cog', text: 'Settings' }
  ])
])
</script>

<style>


</style>
