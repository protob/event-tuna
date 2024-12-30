import { ref, computed } from 'vue'
import { useDateFormatter } from './useDateFormatter'

export function useDateRangeFilter() {
  const { formatDate } = useDateFormatter()

  const startDate = ref<string | null>(null)
  const endDate = ref<string | null>(null)
  const startMenu = ref(false)
  const endMenu = ref(false)

  const startDateFormatted = computed(() =>
    startDate.value ? formatDate(startDate.value) : ''
  )

  const endDateFormatted = computed(() =>
    endDate.value ? formatDate(endDate.value) : ''
  )

  const onStartDateSelected = () => {
    startMenu.value = false
    if (startDate.value && endDate.value && startDate.value > endDate.value) {
      endDate.value = startDate.value
    }
  }

  const onEndDateSelected = () => {
    endMenu.value = false
    if (startDate.value && endDate.value && endDate.value < startDate.value) {
      startDate.value = endDate.value
    }
  }

  return {
    startDate,
    endDate,
    startMenu,
    endMenu,
    startDateFormatted,
    endDateFormatted,
    onStartDateSelected,
    onEndDateSelected
  }
}
