<template>
  <div>
    <v-row justify="center" :class="margins ? 'mx-1' : ''">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">
            <span v-if="text">{{ text }}</span>

            <font-awesome-icon
              v-else
              class="white--text"
              :icon="['fas', 'plus']"
            ></font-awesome-icon>
          </v-btn>
        </template>

        <form @submit.prevent="onSave">
          <v-card>
            <v-card-title>
              <span class="headline">Category Name</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      v-model="catName"
                      label="name"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text type="submit">Save</v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </form>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'AddCatForm',
  components: {},
  props: ['text', 'margins'],
  data() {
    return {
      dialog: false,
      catName: ''
    }
  },
  computed: {},
  mounted() {},
  methods: {
    hashCode(str) {
      return str
        .split('')
        .reduce(
          (prevHash, currVal) =>
            ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
          0
        )
    },

    onSave() {
      const id = 'Id' + this.hashCode(this.catName)
      const userId = this.$cookies.get('authId') + ''

      const singleCatObj = {
        id,
        displayName: this.catName,
        artistsIds: [],
        artistsEvents: [],
        userId
      }
      this.$store.dispatch('cats/addCat', singleCatObj)
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
