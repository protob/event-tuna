<template>
  <v-card width="100%" class="category-card">
    <v-card-title class="text-h6 pb-0">{{ category.name }}</v-card-title>

    <v-card-text class="pt-2">
      <v-row no-gutters class="align-center mb-2">
        <v-col cols="auto">
          <v-btn
            color="primary"
            size="small"
            class="text-none"
            @click="$emit('add-artist', category.id)"
          >
            <v-icon size="small" class="mr-1">mdi-plus</v-icon>
            Add Artist
          </v-btn>
        </v-col>

        <v-col cols="auto" class="ml-auto">
          <v-btn
            color="primary"
            size="small"
            class="text-none mr-2"
            @click="$emit('edit-category', category)"
          >
            <v-icon size="small" class="mr-1">mdi-pencil</v-icon>
            Edit
          </v-btn>
          <v-btn
            variant="tonal"
            size="small"
            class="text-none"
            @click="$emit('delete-category', category.id)"
          >
            <v-icon size="small" class="mr-1">mdi-trash-can-outline</v-icon>
            Delete
          </v-btn>
        </v-col>
      </v-row>

      <div class="mt-2 mb-2">
        <v-btn color="primary" size="small"  class="text-none mr-2" @click="toggleDetails">
          Details
        </v-btn>
        <v-icon size="small" color="grey-lighten-1" class="mr-1">
          mdi-account
        </v-icon>
        <span class="mr-2">{{ category.artists.length }}</span>
        <v-icon size="small" color="red" class="mr-1">
          mdi-map-marker
        </v-icon>
        <span>{{ totalEventCount }}</span>
      </div>

      <v-expand-transition>
        <div v-if="isExpanded" class="mt-4">
          <v-divider class="mb-4" />
          <artist-list
            :artists="category.artists"
            :category-id="category.id"
            :artist-events="artistEvents"
            @update-artist="handleArtistUpdate"
            @delete-artist="handleDeleteArtist"
            @show-artist-events="$emit('show-artist-events', $event)"
          />
        </div>
      </v-expand-transition>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ArtistList from './ArtistList.vue'
import { useArtistEvents } from '@/composables/useArtistEvents'

const props = defineProps<{
  category: any
  isExpanded: boolean
}>()

const emit = defineEmits([
  'add-artist',
  'edit-category',
  'delete-category',
  'toggle-details',
  'update-artist',
  'delete-artist',
  'show-artist-events',
])

const artistEvents = useArtistEvents()

const totalEventCount = computed(() => {
  return props.category.artists.reduce((total: number, artist: any) => {
    const artistEventCount = artist.events.length
    return total + artistEventCount
  }, 0)
})

const toggleDetails = () => {
  emit('toggle-details', props.category.id)
}

const handleArtistUpdate = async (data: any) => {
  if (data.artist && data.artist.id) {
    try {
      const events = await artistEvents.fetchAndSaveArtistEvents(
        data.artist.id,
        data.artist.name
      )
      if (events && events.length > 0) {
        emit('update-artist', { artist: data.artist, events })
      }
    } catch (error) {
      console.error('Error updating artist events:', error)
    }
  }
}

const handleDeleteArtist = (data: any) => {
  if (data.artistId && data.categoryId) {
    emit('delete-artist', { categoryId: data.categoryId, artistId: data.artistId })
  }
}
</script>

<style scoped>
.category-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #1e1e1e;

}
</style>
