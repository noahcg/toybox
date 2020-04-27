<template>
  <v-dialog v-model="show" persistent max-width="290">
    <v-card>
      <v-card-title class="headline"
        >Remove {{ deletedToy.name }} from toybox?</v-card-title
      >
      <v-card-text
        >Are you sure you want to remove {{ deletedToy.name }} from the
        toybox?</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" @click="cancelDialog">No</v-btn>
        <v-btn color="green darken-1" @click="deleteItem">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "../main";
export default {
  name: "ConfirmationDialog",
  props: ["show", "deletedToy"],
  methods: {
    deleteItem() {
      db.collection("toys")
        .doc(this.deletedToy.id)
        .delete();
      // this.show = false;
      this.$emit("confirmation:close", false);
    },
    cancelDialog() {
      // this.show = false;
      this.$emit("confirmation:close", false);
    }
  }
};
</script>

<style>
</style>