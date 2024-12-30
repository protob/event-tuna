<template>
  <v-app-bar :border="1" elevation="1" bg-color="surface" class="app-bar">
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" class="mr-2" />

    <v-btn to="/" text class="font-weight-bold text-none d-none d-sm-flex"
      >Event Tuna</v-btn
    >
    <v-btn to="/about" text class="ml-2 text-none d-none d-sm-flex"
      >About</v-btn
    >

    <v-spacer />

    <date-range-filter
      v-if="isHome"
      class="mr-4 d-none d-md-flex"
      style="max-width: 400px"
    />

    <template v-if="userStore.currentUser">
      <v-menu location="bottom end">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            class="mr-2"
            variant="tonal"
            icon="mdi-translate"
            size="small"
          />
        </template>
        <v-list>
          <v-list-item
            v-for="lang in langs"
            :key="lang.code"
            :value="lang.code"
            @click="setLang(lang.code)"
          >
            {{ lang.name }}
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn icon class="mr-2 d-none d-sm-flex" to="/settings">
        <v-avatar color="primary" size="36">
          <v-icon>mdi-account</v-icon>
        </v-avatar>
      </v-btn>
      <v-btn @click="signOut" text class="d-none d-sm-flex">Logout</v-btn>
    </template>

    <v-btn v-else to="/login" text class="d-none d-sm-flex">Login</v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import DateRangeFilter from '@/components/DateRangeFilter.vue'

const emit = defineEmits(['toggle-drawer'])
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const isHome = computed(() => route.path === '/')

const langs = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'pl', name: 'Polski' },
]

const setLang = (code: string) => console.log(`Lang: ${code}`)
const signOut = () => (userStore.logout(), router.push('/login'))
</script>

<style scoped></style>
