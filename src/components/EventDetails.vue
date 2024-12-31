<template>
  <div class="event-details">
    <v-list density="compact" class="bg-transparent py-0">
      <v-list-item class="px-0 py-1" :class="{ 'list-item-odd': index % 2 !== 0 }"
                   v-for="(item, index) in [
          { icon: 'mdi-ticket-outline', label: 'Type:', value: event.type },
          { icon: 'mdi-map-marker-outline', label: 'Venue:', value: event.venue?.name },
          {
            icon: 'mdi-map-marker-outline',
            label: 'Country:',
            value: event.venue?.country,
            flag: event.venue?.country_code,
          },
          { icon: 'mdi-city', label: 'City:', value: event.venue?.city },
          { icon: 'mdi-calendar', label: 'Date:', value: formatEventDate },
          { icon: 'mdi-information-outline', label: 'About:', value: event.about },
          { icon: 'mdi-account-group-outline', label: 'Line-up:', value: formattedLineup },
        ]" :key="index">
        <template v-slot:prepend>
          <v-icon size="small" class="event-details-icon">{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title class="d-flex justify-start">
          <span class="text-subtitle-2 font-weight-bold mr-2">{{ item.label }}</span>
          <span class="text-subtitle-2">
            <template v-if="item.flag">
              <span class="mr-1">{{item.value}}</span>
              <IconCountryFlag :country="item.flag" class="ml-2" />
            </template>
            <template v-else>
              <span class="f"> {{ item.value }}</span>
            </template>
          </span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { computed} from 'vue'
import type { NormalizedEvent } from '@/types/event'

import { useDateFormatter } from '@/composables/useDateFormatter'
import IconCountryFlag from '@/components/IconCountryFlag.vue'
const props = defineProps<{
  event: NormalizedEvent
}>()

const { formatEventDate: formatDate } = useDateFormatter()

const formatEventDate = computed(() => {

  if (props.event.end_date) {
    return `${formatDate(props.event.start_date)} - ${formatDate(props.event.end_date)}`
  }
  return formatDate(props.event.start_date)
})

const formattedLineup = computed(() => {
  return props.event.event_artists
    ?.map(ea => ea.artist.name)
    .join(', ') || 'No lineup available'
})
</script>

<style scoped>
.event-details {
  /*background-color: rgba(255, 255, 255, 0.05); */
  border-radius: 4px;
  padding: 0rem;
}

.event-details-icon {
  margin-right: 0.25rem;
}

:deep(.v-list-item) {
  min-height: 36px !important;
  padding: 0 1rem!important;
}

:deep(.v-list-item__prepend) {
  margin-right: 0 !important;
}

.event-details :deep(.v-list-item__spacer) {
  width: 16px !important;
}

.list-item-odd {
  background-color: rgba(255, 255, 255, 0.025);
}
</style>
