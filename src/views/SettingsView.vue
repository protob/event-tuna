<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>User Settings</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar color="primary" size="40">
                    <v-icon icon="mdi-account" />
                  </v-avatar>
                </template>
                <v-list-item-title class="text-h6">{{ userStore.currentUser?.username
                  }}</v-list-item-title>
                <v-list-item-subtitle>{{ userStore.currentUser?.email }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <v-divider class="my-4"></v-divider>

            <v-form @submit.prevent="updatePassword">
              <v-text-field v-model="currentPassword" label="Current Password" type="password"
                            prepend-icon="mdi-lock-outline"></v-text-field>

              <v-text-field v-model="newPassword" label="New Password" type="password"
                            prepend-icon="mdi-lock"></v-text-field>

              <v-text-field v-model="confirmPassword" label="Confirm New Password" type="password"
                            prepend-icon="mdi-lock-check"></v-text-field>

              <v-btn color="primary" type="submit" block class="mt-4">
                Update Password
              </v-btn>
            </v-form>

            <v-divider class="my-4"></v-divider>

            <v-list>

              <v-list-item prepend-icon="mdi-translate" title="Language" />
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const updatePassword = () => {
  console.log('Password update requested:', {
    currentPassword: currentPassword.value,
    newPassword: newPassword.value,
    confirmPassword: confirmPassword.value
  })
  // Mock successful update
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
}
</script>
