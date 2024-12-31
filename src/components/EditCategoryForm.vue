<template>
  <v-dialog v-model="dialogVisible" max-width="400" @click:outside="cancel" persistent>
    <v-card class="edit-category-form bg-grey-darken-4">
      <v-card-title class="text-h5 pa-4">Edit Category</v-card-title>
      <v-card-text class="pa-4 pt-2">
        <v-form @submit.prevent="submitForm" ref="form">
          <v-text-field
            v-model="categoryName"
            label="Category Name"
            :rules="[v => !!v || 'Category name is required']"
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
  modelValue: boolean;
  category: { id: string; name: string } | null;
}>();

const emit = defineEmits(['update:modelValue', 'save', 'cancel']);

const dialogVisible = ref(props.modelValue);
const categoryName = ref('');
const form = ref<any>(null);

watch(() => props.modelValue, (newValue) => {
  dialogVisible.value = newValue;
});

watch(() => props.category, (newValue) => {
  if (newValue) {
    categoryName.value = newValue.name;
  }
});

watch(dialogVisible, (newValue) => {
  emit('update:modelValue', newValue);
});

const submitForm = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    emit('save', categoryName.value);
    categoryName.value = '';
    dialogVisible.value = false;
  }
};

const cancel = () => {
  categoryName.value = '';
  dialogVisible.value = false;
  emit('cancel');
};
</script>

<style scoped>
.edit-category-form {
  border-radius: 8px;
}

.edit-category-form :deep(.v-card-title) {
  font-weight: 500;
  letter-spacing: 0.0125em;
}

.edit-category-form :deep(.v-btn) {
  letter-spacing: 0.0892857143em;
}

:deep(.v-overlay__scrim) {
  background-color: rgba(0, 0, 0, 0.7) !important;
}
</style>
