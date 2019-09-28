<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">
            <font-awesome-icon
              class="white--text"
              :icon="['fas', 'plus']"
            ></font-awesome-icon>
          </v-btn>
        </template>

        <base-form @hideModal="hideModal" :formName="formName" />
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

import BaseForm from '~/components/molecules/form/BaseForm'
export default {
  name: 'AppModal',
  components: {
    BaseForm
  },

  data() {
    return {
      formName: null,
      dialog: false
    }
  },
  computed: {
    ...mapState({
      visible: 'modalVisible',
      modalComponent: 'modalComponent'
    })
  },
  methods: {
    ...mapMutations(['hideModal'])
  },
  watch: {
    visible(isVisble) {
      this.dialog = isVisble
      // this.dialog
    },
    modalComponent(formName) {
      if (!formName) return
      this.formName = formName
    }
  }
}
</script>
