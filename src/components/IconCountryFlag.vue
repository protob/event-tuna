<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  country: {
    type: String,
    required: true
  }
})

const getCountryFlag = (countryCode: string) => {
  if (!countryCode) return '';
  return countryCode.toLowerCase().trim();
}

const flagClass = computed(() => `fi fi-${getCountryFlag(props.country)}`)
</script>

<template>
  <span :class="flagClass"></span>
</template>
