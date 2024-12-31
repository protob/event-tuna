<template>
  <v-card class="ma-2" color="transparent" elevation="0">
    <v-card-title class="text-h5 d-flex justify-space-between align-center pb-2">

      <div class="d-flex align-center">
       <span class="text-h5 mr-3">CATEGORIES</span>

        <v-btn
          color="primary"
          size="small"
          prepend-icon="mdi-plus"
          class="text-none"
          @click="showAddCategoryForm = true"
        >
          Add Category
        </v-btn>
      </div>
      <v-select
        v-model="categorySortOrder"
        :items="categorySortOptions"
        label="Sort"
        hide-details
        density="compact"
        style="max-width: 200px;"
      />
    </v-card-title>

    <v-card-text class="pt-0">


      <v-list class="categories-list">
        <v-list-item
          v-for="category in sortedCategories"
          :key="category.id"
          class="mb-4 pa-0"
        >
          <category-list-item
            :category="category"
            :is-expanded="expandedCategories.includes(category.id)"
            @add-artist="openAddArtistForm"
            @edit-category="openEditCategoryForm"
            @delete-category="confirmDeleteCategory"
            @toggle-details="toggleCategoryDetails"
            @update-artist="updateArtistEvents"
            @delete-artist="confirmDeleteArtist"
            @show-artist-events="showArtistEvents"
          />
        </v-list-item>
      </v-list>
    </v-card-text>

    <!-- Dialogs -->
    <confirmation-dialog
      v-model="showConfirmDialog"
      :title="confirmDialogTitle"
      :message="confirmDialogMessage"
      @confirm="handleConfirmDelete"
      @cancel="cancelDelete"
    />

    <category-form
      v-model="showAddCategoryForm"
      title="Add New Category"
      @save="handleAddCategory"
      @cancel="cancelAddCategory"
    />

    <edit-category-form
      v-model="showEditCategoryForm"
      :category="selectedCategory"
      @save="handleEditCategory"
      @cancel="cancelEditCategory"
    />

    <artist-form
      v-model="showAddArtistForm"
      :category-id="selectedCategoryId"
      title="Add New Artist"
      @save="handleAddArtist"
      @cancel="cancelAddArtist"
    />
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { useEventStore } from '@/stores/eventStore'
import { useSorting } from '@/composables/useSorting'
import { useArtistEvents } from '@/composables/useArtistEvents'
import CategoryListItem from './CategoryListItem.vue'
import ConfirmationDialog from './ConfirmationDialog.vue'
import CategoryForm from './CategoryForm.vue'
import EditCategoryForm from './EditCategoryForm.vue'
import ArtistForm from './ArtistForm.vue'

const categoryStore = useCategoryStore()
const eventStore = useEventStore()
const artistEvents = useArtistEvents()

const emit = defineEmits(['show-artist-events', 'artist-deleted', 'category-deleted'])

const { sortItems, sortOptions: categorySortOptions } = useSorting(['NAME'])

const categorySortOrder = ref('NAME_ASC')
const expandedCategories = ref<string[]>([])
const showConfirmDialog = ref(false)
const showAddCategoryForm = ref(false)
const showEditCategoryForm = ref(false)
const showAddArtistForm = ref(false)
const selectedCategoryId = ref('')
const selectedCategory = ref<any>(null)
const confirmDialogTitle = ref('')
const confirmDialogMessage = ref('')
const deleteType = ref<'category' | 'artist'>('category')
const deleteIds = ref<{ categoryId: string; artistId?: string }>({ categoryId: '' })

// Always sort categories by name ascending by default
const sortedCategories = computed(() => {
  return [...categoryStore.categories].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  )
})

// Watch for changes in categoryStore.categories
watch(() => categoryStore.categories, () => {
}, { deep: true })

const toggleCategoryDetails = (categoryId: string) => {
  const index = expandedCategories.value.indexOf(categoryId)
  if (index === -1) {
    expandedCategories.value.push(categoryId)
  } else {
    expandedCategories.value.splice(index, 1)
  }
}

const showArtistEvents = (artistId: string) => {
  emit('show-artist-events', artistId)
}

const updateArtistEvents = async ({ artist, events }: { artist: any; events: any[] }) => {
  if (artist && artist.id) {
    try {
      await eventStore.addEventsForArtist(artist.id, events)
      await categoryStore.updateArtistEvents(artist.id, artistEvents.getEventsByCountry(events))
      await categoryStore.fetchCategories()
      showArtistEvents(artist.id)
    } catch (error) {
      console.error('Error updating artist events:', error)
    }
  }
}

const confirmDeleteCategory = (categoryId: string) => {
  const category = categoryStore.categories.find(c => c.id === categoryId)
  deleteType.value = 'category'
  deleteIds.value = { categoryId }
  confirmDialogTitle.value = 'Delete Category'
  confirmDialogMessage.value = `Are you sure you want to delete the category "${category?.name}"? This will permanently delete the category and all its associated artists, events, and data.`
  showConfirmDialog.value = true
}

const confirmDeleteArtist = ({ categoryId, artistId }: { categoryId: string; artistId: string }) => {
  deleteType.value = 'artist'
  deleteIds.value = { categoryId, artistId }
  confirmDialogTitle.value = 'Delete Artist'
  confirmDialogMessage.value =
    'Are you sure you want to delete this artist and all their associated events?'
  showConfirmDialog.value = true
}

const handleConfirmDelete = async () => {
  try {
    if (deleteType.value === 'category') {
      const category = categoryStore.categories.find(c => c.id === deleteIds.value.categoryId)
      if (category) {
        const artistIds = category.artists.map(a => a.id)
        await categoryStore.deleteCategory(deleteIds.value.categoryId)
        await eventStore.clearEventsByCategory(deleteIds.value.categoryId, artistIds)
        await eventStore.fetchAllEvents()
        await categoryStore.fetchCategories()
        artistIds.forEach(artistId => {
          emit('artist-deleted', artistId)
        })
        emit('category-deleted')
      }
    } else if (deleteType.value === 'artist' && deleteIds.value.artistId) {
      await categoryStore.deleteArtist(deleteIds.value.categoryId, deleteIds.value.artistId)
      await eventStore.deleteEventsByArtistId(deleteIds.value.artistId)
      await eventStore.fetchAllEvents()
      await categoryStore.fetchCategories()
      emit('artist-deleted', deleteIds.value.artistId)
    }
  } catch (error) {
    console.error('Error during deletion:', error)
  } finally {
    showConfirmDialog.value = false
  }
}

const cancelDelete = () => {
  showConfirmDialog.value = false
}

const openAddArtistForm = (categoryId: string) => {
  selectedCategoryId.value = categoryId
  showAddArtistForm.value = true
}

const openEditCategoryForm = (category: any) => {
  selectedCategory.value = category
  showEditCategoryForm.value = true
}

const handleAddCategory = async (categoryName: string) => {
  try {
    await categoryStore.addOrUpdateCategory({ name: categoryName })
    showAddCategoryForm.value = false
  } catch (error) {
    console.error('Error adding category:', error)
  }
}

const handleEditCategory = async (categoryName: string) => {
  if (selectedCategory.value) {
    try {
      await categoryStore.addOrUpdateCategory({
        id: selectedCategory.value.id,
        name: categoryName,
      })
      showEditCategoryForm.value = false
      selectedCategory.value = null
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }
}

const handleAddArtist = async ({ categoryId, artistName }: { categoryId: string; artistName: string }) => {
  try {
    const category = await categoryStore.addOrUpdateCategory({
      id: categoryId,
      name: categoryStore.categories.find(c => c.id === categoryId)?.name || '',
      artists: [{ name: artistName }],
    })

    if ( category) {
      // Find the correct artist by name
      const artist = category.artist_categories?.find(
        ac => ac.artist.name.trim() === artistName.trim()
      )?.artist;


      if (artist) {
        const events = await artistEvents.fetchAndSaveArtistEvents(artist.id, artistName)
        if (events.length > 0) {
          await eventStore.addEventsForArtist(artist.id, events)
          await categoryStore.updateArtistEvents(artist.id, artistEvents.getEventsByCountry(events))
        }
        await eventStore.fetchAllEvents()
        await categoryStore.fetchCategories()
      }
    }
    showAddArtistForm.value = false
  } catch (error) {
    console.error('Error adding artist:', error)
  }
}

const cancelAddCategory = () => {
  showAddCategoryForm.value = false
}

const cancelEditCategory = () => {
  showEditCategoryForm.value = false
  selectedCategory.value = null
}

const cancelAddArtist = () => {
  showAddArtistForm.value = false
  selectedCategoryId.value = ''
}

onMounted(async () => {
  await categoryStore.fetchCategories()
})
</script>

<style scoped>
.categories-list {
  background-color: transparent;
  padding: 0;
}

.categories-list .v-list-item {
  margin-bottom: 1rem;
  padding: 0;
}

</style>
