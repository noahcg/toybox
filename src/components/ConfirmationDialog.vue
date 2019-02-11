<template>
  <v-dialog v-model="isConfirmed" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">
        Remove {{ deletedBook.title }} from library?
      </v-card-title>
      <v-card-text>
        Are you sure you want to remove {{ deletedBook.title}} from the library?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="cancelDialog">No</v-btn>
        <v-btn color="green darken-1" flat @click="deleteItem">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import { db } from '../main';

export default {
  name: 'ConfirmationDialog',
  props: ['isConfirmed', 'deletedBook'],
  methods: {
    deleteItem() {
      db.collection('books').doc(this.deletedBook.id).delete();
      this.$emit('update:isConfirmed', false);
    },
    cancelDialog() {
      this.$emit('update:isConfirmed', false);
    }
  }
};
</script>

<style>

</style>
