<template>
  <v-dialog v-model="show" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Remove {{ deletedBeer.beer }} from fridge?</v-card-title>
      <v-card-text>Are you sure you want to remove {{ deletedBeer.beer}} from the fridge?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="cancelDialog">No</v-btn>
        <v-btn color="green darken-1" flat @click="deleteItem">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "../main";

export default {
  name: "ConfirmationDialog",
  props: ["show", "deletedBeer"],
  methods: {
    deleteItem() {
      db.collection("beers")
        .doc(this.deletedBeer.id)
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
