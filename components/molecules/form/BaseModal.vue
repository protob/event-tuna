<template>
  <div>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        :max-width="isConfirm ? '300' : '600'"
      >
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">
            <font-awesome-icon
              class="white--text"
              :icon="['fas', 'plus']"
            ></font-awesome-icon>
          </v-btn>
        </template>

        <base-confirm
          v-if="isConfirm"
          :form-name="formName"
          @hideModal="hideModal"
        />
        <base-form v-else @hideModal="hideModal" :formName="formName" />
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import BaseConfirm from '~/components/molecules/form/BaseConfirm'
import BaseForm from '~/components/molecules/form/BaseForm'
export default {
  name: 'AppModal',
  components: {
    BaseForm,
    BaseConfirm
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
      isConfirm: 'isConfirm',
      modalComponent: 'modalComponent'
    })
  },
  methods: {
    ...mapMutations(['hideModal'])
  },
  watch: {
    visible(isVisble) {
      this.dialog = isVisble
    },
    modalComponent(formName) {
      if (!formName) return
      this.formName = formName
    }
  }
}
</script>
