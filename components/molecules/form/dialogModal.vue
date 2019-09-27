<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">
        <span v-if="text">{{ text }}</span>

        <font-awesome-icon
          v-else
          class="white--text"
          :icon="['fas', 'times']"
        ></font-awesome-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Delete category</v-card-title>
      <v-card-text>Are you sure?</v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="green darken-1" text @click="deleteCat">Proceed</v-btn>
        <v-btn color="red darken-1" text @click="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style lang="scss" scoped></style>
