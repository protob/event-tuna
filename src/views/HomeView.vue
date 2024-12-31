// src/views/HomeView.vue
<template>
  <v-container fluid class="fill-height pa-0 et-main">
    <v-row no-gutters class="fill-height et-main__row">
      <v-col cols="12" md="6" class="d-flex flex-column et-categories">
        <category-list @show-artist-events="showArtistEvents" @artist-deleted="handleArtistDeleted"
                       @category-deleted="handleCategoryDeleted" />
      </v-col>
      <v-col cols="12" md="6" class="d-flex flex-column et-events">
        <event-list :key="`events-${eventListKey}`" :selected-artist-id="selectedArtistId"
                    :filtered-events="filteredEvents" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CategoryList from '@/components/CategoryList.vue'
import EventList from '@/components/EventList.vue'
import { useEventStore } from '@/stores/eventStore'

const eventStore = useEventStore()
const selectedArtistId = ref<string | null>(null)
const eventListKey = ref(0)

const showArtistEvents = (artistId: string) => {
  selectedArtistId.value = artistId
  eventListKey.value++
}

const handleArtistDeleted = async (artistId: string) => {
  if (selectedArtistId.value === artistId) {
    selectedArtistId.value = null
  }
  await refreshEventList()
}

const handleCategoryDeleted = async () => {
  selectedArtistId.value = null
  await refreshEventList()
}

const refreshEventList = async () => {
  await eventStore.fetchAllEvents()
  eventListKey.value++
}

const filteredEvents = computed(() => eventStore.filteredEvents)

onMounted(() => {
  if (!eventStore.events.length) {
    refreshEventList()
  }
})
</script>

<style scoped>
.et-main {
  background-color: #121212;
}

.et-filter {
  background-color: #1E1E1E;
}
</style>
