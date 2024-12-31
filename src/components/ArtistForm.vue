<template>
  <v-dialog v-model="dialogVisible" max-width="400" @click:outside="cancel" persistent>
    <v-card class="artist-form bg-grey-darken-4">
      <v-card-title class="text-h5 pa-4">{{ title }}</v-card-title>
      <v-card-text class="pa-4 pt-2">
        <v-form @submit.prevent="submitForm" ref="form">
          <v-text-field
            v-model="artistName"
            label="Artist Name"
            :rules="[v => !!v || 'Artist name is required']"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-4 pt-0">
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-1" variant="text" class="text-button mr-2" @click="cancel">Cancel</v-btn>
        <v-btn color="primary" variant="tonal" class="text-button" @click="submitForm">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  title: string;
  modelValue: boolean;
  categoryId: string;
}>();

const emit = defineEmits(['update:modelValue', 'save', 'cancel']);

const dialogVisible = ref(props.modelValue);
const artistName = ref('');
const form = ref<any>(null);

watch(() => props.modelValue, (newValue) => {
  dialogVisible.value = newValue;
});

watch(dialogVisible, (newValue) => {
  emit('update:modelValue', newValue);
});

const submitForm = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    emit('save', { categoryId: props.categoryId, artistName: artistName.value });
    artistName.value = '';
    dialogVisible.value = false;
  }
};

const cancel = () => {
  artistName.value = '';
  dialogVisible.value = false;
  emit('cancel');
};
</script>

<style scoped>
.artist-form {
  border-radius: 8px;
}

.artist-form :deep(.v-card-title) {
  font-weight: 500;
  letter-spacing: 0.0125em;
}

.artist-form :deep(.v-btn) {
  letter-spacing: 0.0892857143em;
}

:deep(.v-overlay__scrim) {
  background-color: rgba(0, 0, 0, 0.7) !important;
}
</style>
