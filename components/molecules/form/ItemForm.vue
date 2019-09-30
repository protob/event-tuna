<template>
  <div>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title class="headline text-capitalize">
          {{ formatedName }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="text-center push-top">
          <v-btn color="white darken-1" text @click="hideModal">Close</v-btn>
        </div>
      </v-toolbar>
      <ValidationObserver ref="obs">
        <SchemaForm v-model="userData" :schema="schema">
          <!-- add item -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="getCatById"
              color="blue darken-1"
              text
              @click="editItem"
              >Modify</v-btn
            >
            <v-btn v-else color="blue darken-1" text @click="addItem"
              >Add</v-btn
            >
            <v-btn color="blue darken-1" text @click="hideModal">Close</v-btn>
          </v-card-actions>
        </SchemaForm>
      </ValidationObserver>
    </v-card>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { mapGetters } from 'vuex'
import SchemaForm from './SchemaForm'
import FormText from './FormTextField'
const ADD_ITEM_SCHEMA = {
  name: {
    component: FormText,
    label: 'Item'
  }
}

export default {
  components: { SchemaForm, ValidationObserver },
  props: ['formName'],
  data() {
    return {
      userData: {
        name: this.getEditedItemId ? this.getCatById : ''
      },
      apiResponseDialog: false
    }
  },
  computed: {
    getCatById() {
      const cat = this.$store.getters['cats/getCats'].find(
        (item) => item.id === this.getEditedItemId
      )

      if (!cat) return false
      return cat.displayName
    },
    ...mapGetters(['getEditedItemId', 'getArtistCatId', 'isArtist']),
    ...mapGetters('cats', {
      getDialogMsg: 'getDialogMsg',
      getDialogState: 'getDialogState'
      // ...
    }),

    isLogin() {
      return (
        this.formName.toLowerCase().includes('login') ||
        this.formName.toLowerCase().includes('register')
      )
    },
    formatedName() {
      return this.formName.split('_').join(' ')
    },
    schema() {
      return ADD_ITEM_SCHEMA
    }
  },

  watch: {
    isArtist(isArtist) {
      this.userData.name = ''
    },

    getEditedItemId(formName) {
      if (!formName) return

      this.userData.name = this.getCatById
    },
    // artist
    getDialogState(val) {
      this.apiResponseDialog = val
    }
  },

  mounted() {
    const cond = this.getEditedItemId && !this.isArtist
    if (cond) {
      this.userData.name = this.getCatById
    }
  },
  methods: {
    // general methods
    hideModal() {
      this.$emit('hideModal')
    },
    // add Item methods
    addItem() {
      if (this.isArtist) {
        this.addArtist()
      } else {
        this.addCat()
      }
    },

    addArtist() {
      const artistObj = {
        displayName: this.userData.name,
        catId: this.getArtistCatId,
        userId: this.$cookies.get('authId') + ''
      }

      this.$store.dispatch('cats/addArtist', artistObj)
      // force update stats
      this.$root.$emit('updateArtistStats')

      this.hideModal()
    },
    addCat() {
      const userId = this.$cookies.get('authId') + ''
      const catObj = {
        id: 'id' + this.$hashCode(this.userData.name),
        displayName: this.userData.name,
        artistsIds: [],
        artistsEvents: [],
        userId
      }
      this.$store.dispatch('cats/addCat', catObj)
      this.hideModal()
    },
    editItem() {
      const id = this.getEditedItemId
      const displayName = this.userData.name
      const catObj = { id, displayName }
      this.$store.dispatch('cats/editCat', catObj)
      this.hideModal()
    },
    // login methods
    clear() {
      this.userData = {}
      this.$nextTick(() => {
        this.$refs.obs.reset()
      })
    }
  }
}
</script>
