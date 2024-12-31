<template>
  <v-container fluid class="about fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-card-title class="text-h4 text-center">
            About Event Tuna
          </v-card-title>
          <v-card-text class="text-body-1">
            <p class="mb-4">
              Event Tuna is a tool for events discovery and management.
            </p>

            <p>
              Features:
            </p>

          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" to="/">
              Explore Events
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">

</script>

<style scoped>
.about {
  background-color: rgba(0, 0, 0, 0.1);

}
</style>
