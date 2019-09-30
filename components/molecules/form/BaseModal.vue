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

        <!-- <div v-if="dialog"> -->
        <confirm-box
          v-if="isConfirm"
          :form-name="formName"
          @hideModal="hideModal"
        />
        <login-form
          v-else-if="isLogin"
          :form-name="formName"
          @hideModal="hideModal"
        />
        <item-form v-else :form-name="formName" @hideModal="hideModal" />
        <!-- </div> -->
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import ConfirmBox from '~/components/molecules/form/ConfirmBox'
import LoginForm from '~/components/molecules/form/LoginForm'
import ItemForm from '~/components/molecules/form/ItemForm'
export default {
  name: 'AppModal',
  components: {
    LoginForm,
    ItemForm,
    ConfirmBox
  },

  data() {
    return {
      formName: '',
      dialog: false
    }
  },
  computed: {
    isLogin() {
      return this.formName.toLowerCase().includes('login')
    },

    ...mapState({
      visible: 'modalVisible',
      isConfirm: 'isConfirm',
      modalComponent: 'modalComponent'
    })
  },
  watch: {
    visible(isVisble) {
      this.dialog = isVisble
    },
    modalComponent(formName) {
      if (!formName) return
      this.formName = formName
    }
  },
  methods: {
    ...mapMutations(['hideModal'])
  }
}
</script>
