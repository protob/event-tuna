<template>
  <v-list class="artist-list">
    <v-list-item
      v-for="(artist, index) in artists"
      :key="artist.id"
      class="mb-3 pa-0"
    >
      <v-card class="artist-card">
        <v-card-title class="d-flex justify-space-between py-2 px-0">
          <span class="text-h6">{{ index + 1 }}. {{ artist.name }}</span>
          <div class="d-flex align-center">
            <v-btn
              color="primary"
              size="small"
              class="text-none mr-2"
              :loading="artistEvents.updatingArtist === artist.id"
              @click="handleUpdateArtist(artist)"
            >
              Update
            </v-btn>
            <span class="event-count mr-1">{{ getArtistEventCount(artist) }}</span>
            <v-icon size="x-small" color="red" class="mr-2">mdi-map-marker</v-icon>
            <v-btn
              variant="tonal"
              size="small"
              class="text-none"
              @click="$emit('delete-artist', { categoryId, artistId: artist.id })"
            >
              <v-icon size="small">mdi-trash-can-outline</v-icon>
            </v-btn>
          </div>
        </v-card-title>

        <v-card-text class="pt-0 px-0">
          <v-btn
            color="primary"
            size="small"

            class="text-none mb-3"
            @click="$emit('show-artist-events', artist.id)"
          >
            Details
          </v-btn>

          <v-card class="events-card">
            <v-card-title class="text-subtitle-1 py-2">
              <!-- Europe only -->
              <span class="mr-2">Europe: </span>
              <span class="font-weight-bold">{{ getEventCountByCountry(artist) }}</span>
            </v-card-title>

            <v-card-text class="pa-0">
              <v-list dense class="bg-transparent">
                <v-list-item
                  v-for="event in artist.events"
                  :key="event.id"
                  class="px-4 py-1"
                >
                  <v-list-item-title class="d-flex justify-start">
                    <div class="event-country d-flex align-center">
                      <IconCountryFlag :country="event.country" class="mr-2" />
                      <span class="mr-2">{{ event.country.toUpperCase() }} :</span>
                    </div>
                    <span class="ml-2 font-weight-bold">{{ event.count }}</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import IconCountryFlag from '@/components/IconCountryFlag.vue'

const props = defineProps<{
  artists: any[]
  categoryId: string
  artistEvents: any
}>()

const emit = defineEmits(['update-artist', 'delete-artist', 'show-artist-events'])

const getArtistEventCount = (artist: any) => {
  const artistEventCount = artist.events.length
  return artistEventCount
}

const getEventCountByCountry = (artist: any) => {
  return artist.events.reduce((total: number, event: any) => total + event.count, 0)
}

const handleUpdateArtist = async (artist: any) => {
  try {
    emit('update-artist', { artist, categoryId: props.categoryId })
  } catch (error) {
    console.error('Error updating artist:', error)
  }
}
</script>

<style scoped>
.artist-list {
  background-color: transparent;
  padding: 0;
}
.artist-card {
  background-color: #1E1E1E;
}

.events-card {
  box-shadow: none;
  border-radius: 0;

}

.events-card :deep(.v-card-title) {
  background-color: #161616;
  border-radius: 2px;
}

.events-card :deep(.v-list) {
  background-color: #1E1E1E!important;
}

.event-country {
  text-transform: uppercase;
  min-width: 70px;
}
.event-count {
  margin-right: 0.15rem;
  font-size: 1rem;
}

</style>
