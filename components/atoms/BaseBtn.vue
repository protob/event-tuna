<template>
  <v-btn
    color="primary"
    :class="cssClass"
    :disabled="disabled"
    :depressed="depressed"
    :outlined="outlined"
    :small="small"
    dark
    @click="onClick"
  >
    <font-awesome-icon
      v-if="icon"
      :class="iconClass"
      :icon="iconsMap[icon]"
    ></font-awesome-icon>
    <span class="content" :class="contentClass">
      <slot />
    </span>
  </v-btn>
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String,
      default: null
    },
    contentClass: {
      type: String,
      default: null
    },
    outlined: {
      type: String,
      default: null
    },

    depressed: {
      type: String,
      default: null
    },

    small: {
      type: String,
      default: null
    },

    icon: {
      type: String,
      default: null
    },
    cssClass: {
      type: String,
      default: 'mx-1'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null
    }
  },
  data() {
    return {
      iconsMap: {
        user: ['fas', 'user'],
        userPlus: ['fas', 'user-plus'],
        cloud: ['fas', 'cloud-download-alt'],
        plus: ['fas', 'plus'],
        edit: ['fas', 'edit'],
        x: ['fas', 'times'],
        search: ['fas', 'search'],
        calendar: ['fas', 'calendar-alt']
      }
    }
  },

  methods: {
    onClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style></style>
