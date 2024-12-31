<template>
  <v-container fluid class="pa-0">
    <v-card class="event-list bg-transparent" elevation="0">
      <v-card-title class="d-flex justify-space-between align-center pb-2">
        <span class="text-h5">EVENTS</span>
        <v-select
          v-model="sortOrder"
          :items="sortOptions"
          label="Sort"
          density="compact"
          style="max-width: 200px"
          hide-details
        />
      </v-card-title>

      <v-card-text class="pt-0">
        <v-progress-circular
          v-if="isLoading"
          indeterminate
          color="primary"
          class="d-flex mx-auto my-4"
        />

        <v-alert v-else-if="error" type="error" class="mb-4">
          Error loading events: {{ error.message }}
        </v-alert>

        <template v-else>
          <div v-if="sortedEvents.length > 0">
            <v-list class="bg-transparent">
              <v-list-item
                v-for="(event, index) in sortedEvents"
                :key="`${event.id}-${event.updated_at}`"
                class="mb-4 pa-0"
              >
                <v-card width="100%" class="event-card">
                  <v-card-title class="d-flex justify-space-between py-2">
                    <div class="d-flex align-center">
                      <span class="text-h6">{{ event.name }}</span>
                      <v-chip
                        :color="event.category === 'Festival' ? 'purple' : 'blue'"
                        class="ml-2"
                        size="small"
                      >
                        {{ event.category }}
                      </v-chip>
                    </div>
                    <div class="d-flex align-center">
                      <v-btn
                        icon="mdi-star"
                        :color="event.is_favorite ? 'red' : 'grey'"
                        variant="text"
                        size="small"
                        @click="toggleFavorite(event.id)"
                      />
                      <v-btn
                        icon="mdi-delete"
                        color="grey"
                        variant="text"
                        size="small"
                        @click="deleteEvent(event.id)"
                      />
                    </div>
                  </v-card-title>

                  <v-card-text class="pt-0">
                    <div class="d-flex align-center justify-space-between  mb-2">
                      <div class="d-flex align-center">
<!--                        <v-icon size="small" class="mr-2">mdi-map-marker</v-icon>-->
                        <IconCountryFlag :country="event.venue?.country_code" class="mr-2" />
                        <span>{{
                            event.venue?.city
                          }}, {{ event.venue?.country_code?.toUpperCase() }}</span>


                      </div>
                      <div class="d-flex align-center">
                        <v-icon size="medium" class="mx-2">mdi-calendar</v-icon>
                        <span class="text-subtitle-">{{ formatDate(event.start_date) }}</span>
                      </div>
                    </div>

                    <div class="mt-2">
                      <v-btn
                        color="primary"
                        size="small"
                        class="mr-2 text-none"
                        @click="toggleEventDetails(event.id)"
                      >
                        Details
                      </v-btn>

                      <v-btn
                        v-if="event.url"
                        color="primary"
                        size="small"
                        class="text-none"
                        :href="event.url"
                        target="_blank"
                      >
                        Link
                      </v-btn>
                    </div>

                    <v-expand-transition>
                      <div v-if="expandedEvents.includes(event.id)" class="mt-4">
                        <v-divider class="mb-4" />
                        <EventDetails :event="event" />
                      </div>
                    </v-expand-transition>
                  </v-card-text>
                </v-card>
              </v-list-item>
            </v-list>
          </div>
          <v-card v-else class="pa-8 text-center empty-state" flat>
            <v-icon size="64" color="grey">mdi-calendar-blank</v-icon>
            <div class="text-h6 mt-4">No Events Found</div>
            <div class="text-body-2 text-grey mt-2">
              {{
                selectedArtistId
                  ? 'No events found for this artist'
                  : 'Try adjusting your filters or selecting an artist'
              }}
            </div>
          </v-card>
        </template>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import EventDetails from './EventDetails.vue'
import type { NormalizedEvent } from '@/types/event'
import { useDateFormatter } from '@/composables/useDateFormatter'
import { useEventStore } from '@/stores/eventStore'
import IconCountryFlag from '@/components/IconCountryFlag.vue'

const eventStore = useEventStore()

const props = defineProps<{
  selectedArtistId?: string
  filteredEvents: NormalizedEvent[]
}>()

const { formatDate } = useDateFormatter()
const sortOrder = ref('DATE_ASC')
const expandedEvents = ref<string[]>([])
const isLoading = ref(false)
const error = ref<Error | null>(null)

const sortOptions = [
  { title: 'Date (Newest)', value: 'DATE_DESC' },
  { title: 'Date (Oldest)', value: 'DATE_ASC' },
  { title: 'Name (A-Z)', value: 'NAME_ASC' },
  { title: 'Name (Z-A)', value: 'NAME_DESC' },
]

const events = computed(() => {
  if (props.filteredEvents.length > 0) {
    return props.filteredEvents
  }
  if (props.selectedArtistId) {
    return eventStore.getEventsByArtistId(props.selectedArtistId)
  }
  return eventStore.events
})

const sortedEvents = computed(() => {
  if (!events.value) return []

  const [field, direction] = sortOrder.value.split('_')
  return [...events.value].sort((a, b) => {
    if (field === 'DATE') {
      const dateA = new Date(a.start_date).getTime()
      const dateB = new Date(b.start_date).getTime()
      return direction === 'ASC' ? dateA - dateB : dateB - dateA
    } else {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()
      return direction === 'ASC'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA)
    }
  })
})

const toggleEventDetails = (eventId: string) => {
  const index = expandedEvents.value.indexOf(eventId)
  if (index === -1) {
    expandedEvents.value.push(eventId)
  } else {
    expandedEvents.value.splice(index, 1)
  }
}

const toggleFavorite = (eventId: string) => {
  eventStore.toggleFavorite(eventId)
}

const deleteEvent = (eventId: string) => {
  eventStore.deleteEventById(eventId)
}

onMounted(async () => {
  if (!eventStore.events.length) {
    isLoading.value = true
    try {
      await eventStore.fetchAllEvents()
    } catch (err) {
      error.value = err as Error
    } finally {
      isLoading.value = false
    }
  }
})
</script>

<style scoped>
.event-list {
  background-color: transparent;
}

.event-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #1e1e1e;
}

.empty-state {
  background-color: rgba(255, 255, 255, 0.05);
}

:deep(.v-list) {
  background-color: transparent;
  padding: 0;
}

:deep(.v-list-item) {
  margin-bottom: 1rem;
  padding: 0;
}
</style>
