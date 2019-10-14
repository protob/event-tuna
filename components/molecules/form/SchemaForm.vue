/* eslint-disable vue/require-default-prop */
<template>
  <div>
    <slot name="beforeForm"></slot>
    <form class="schema-form">
      <v-card-text>
        <v-container class="pb-0">
          <component
            :is="field.component"
            v-for="field in parsedSchema"
            :key="field.model"
            v-bind="binds(field)"
            :value="val(field)"
            @input="update(field.model, $event)"
            @update-batch="updateBatch(field.model, $event)"
          />
        </v-container>
      </v-card-text>
      <slot />
    </form>

    <slot name="afterForm"></slot>
  </div>
</template>

<script>
export default {
  props: {
    schema: {
      type: [Object, Array],
      required: true,
      validator(schema) {
        if (!Array.isArray(schema)) return true
        return (
          schema.filter((field) => !field.model && !field.schema).length === 0
        )
      }
    },
    value: {
      type: Object,
      required: true
    },
    sharedConfig: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      email: ''
    }
  },
  computed: {
    parsedSchema() {
      if (Array.isArray(this.schema)) return this.schema

      const arraySchema = []
      for (const model in this.schema) {
        arraySchema.push({
          ...this.schema[model],
          model
        })
      }

      return arraySchema
    }
  },
  methods: {
    update(property, value) {
      this.$emit('input', {
        ...this.value,
        [property]: value
      })
    },
    updateBatch(property, values) {
      this.$emit('input', {
        ...this.value,
        ...values
      })
    },
    binds(field) {
      return field.schema
        ? { schema: field.schema }
        : { ...this.sharedConfig, ...field }
    },
    val(field) {
      if (field.schema && !this.value[field.model]) {
        return {}
      }

      return this.value[field.model]
    }
  }
}
</script>
