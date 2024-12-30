<template>
  <v-app>
    <app-sidebar
      v-model="drawer"
      @click:outside="drawer = false"
    />
    <app-top-bar @toggle-drawer="drawer = !drawer" />

    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>

    <v-footer app class="d-flex flex-column flex-sm-row justify-center align-center pa-4">
      <span class="mb-2 mb-sm-0">{{ new Date().getFullYear() }} — <strong>Event Tuna</strong></span>
      <v-btn icon="mdi-github" variant="text" size="small" href="https://github.com/protob/event-tuna"
             target="_blank" class="ml-sm-2"></v-btn>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppTopBar from '@/components/AppTopBar.vue'
import AppSidebar from '@/components/AppSideBar.vue'

const drawer = ref(false)
</script>

<style>
</style>
