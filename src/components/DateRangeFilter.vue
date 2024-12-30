<template>
  <div class="d-flex flex-column flex-sm-row align-center">
    <v-menu
      v-model="startMenu"
      :close-on-content-click="false"
      transition="fade-transition"
      min-width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-text-field
          v-model="startDateFormatted"
          label="Start Date"
          prepend-inner-icon="mdi-calendar"
          readonly
          v-bind="props"
          density="compact"
          variant="outlined"
          bg-color="transparent"
          hide-details
          class="mb-2 mb-sm-0 mr-sm-2"
          style="min-width: 150px"
        />
      </template>
      <v-date-picker
        v-model="startDate"
        @update:modelValue="onStartDateSelected"
        :max="endDate"
      />
    </v-menu>

    <v-menu
      v-model="endMenu"
      :close-on-content-click="false"
      transition="fade-transition"
      min-width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-text-field
          v-model="endDateFormatted"
          label="End Date"
          prepend-inner-icon="mdi-calendar"
          readonly
          v-bind="props"
          density="compact"
          variant="outlined"
          bg-color="transparent"
          hide-details
          class="mb-2 mb-sm-0 mr-sm-2"
          style="min-width: 150px"
        />
      </template>
      <v-date-picker
        v-model="endDate"
        @update:modelValue="onEndDateSelected"
        :min="startDate"
      />
    </v-menu>

    <v-btn
      variant="tonal"
      icon="mdi-magnify"
      :disabled="!canApplyFilter"
      @click="applyFilter"
      size="small"
      rounded
      class="mt-2 mt-sm-0"
    />
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { useEventStore } from '@/stores/eventStore'
import { useDateRangeFilter } from '@/composables/useDateRangeFilter'

const eventStore = useEventStore()
const {
  startDate,
  endDate,
  startMenu,
  endMenu,
  startDateFormatted,
  endDateFormatted,
  onStartDateSelected,
  onEndDateSelected
} = useDateRangeFilter()

const canApplyFilter = computed(() => startDate.value && endDate.value)

const applyFilter = () => {
  if (canApplyFilter.value) {
    eventStore.filterEventsByDateRange(startDate.value, endDate.value)
  }
}
</script>

