<template>
  <v-dialog v-model="dialogVisible" max-width="400" @click:outside="cancel" persistent>
    <v-card class="confirmation-dialog bg-grey-darken-4">
      <v-card-title class="text-h5 pa-4">{{ title }}</v-card-title>
      <v-card-text class="pa-4 pt-2 text-body-1">{{ message }}</v-card-text>
      <v-card-actions class="pa-4 pt-0">
        <v-spacer></v-spacer>
        <v-btn
          :color="cancelButtonColor"
          :variant="cancelButtonVariant"
          class="text-button mr-2"
          @click="cancel"
        >
          {{ cancelButtonText }}
        </v-btn>
        <v-btn
          :color="confirmButtonColor"
          :variant="confirmButtonVariant"
          class="text-button"
          @click="confirm"
        >
          {{ confirmButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  title: string;
  message: string;
  modelValue: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  cancelButtonColor?: string;
  confirmButtonColor?: string;
  cancelButtonVariant?: string;
  confirmButtonVariant?: string;
}>();

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

const dialogVisible = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  dialogVisible.value = newValue;
});

watch(dialogVisible, (newValue) => {
  emit('update:modelValue', newValue);
});

const confirm = () => {
  dialogVisible.value = false;
  emit('confirm');
};

const cancel = () => {
  dialogVisible.value = false;
  emit('cancel');
};

const cancelButtonText = props.cancelButtonText || 'Cancel';
const confirmButtonText = props.confirmButtonText || 'Confirm';
const cancelButtonColor = props.cancelButtonColor || 'grey-darken-1';
const confirmButtonColor = props.confirmButtonColor || 'error';
const cancelButtonVariant = props.cancelButtonVariant || 'text';
const confirmButtonVariant = props.confirmButtonVariant || 'tonal';
</script>

<style scoped>
.confirmation-dialog {
  border-radius: 8px;
}

.confirmation-dialog :deep(.v-card-title) {
  font-weight: 500;
  letter-spacing: 0.0125em;
}

.confirmation-dialog :deep(.v-card-text) {
  opacity: 0.7;
  line-height: 1.5;
}

.confirmation-dialog :deep(.v-btn) {
  letter-spacing: 0.0892857143em;
}

:deep(.v-overlay__scrim) {
  background-color: rgba(0, 0, 0, 0.7) !important;
}
</style>
