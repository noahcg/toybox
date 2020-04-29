<template>
  <base-section id="my-toybox">
    <v-container>
      <v-row>
        <v-col v-for="toy in toys" :key="toy.id" cols="12" md="4">
          <base-toy-card v-bind="toy">
            <v-icon v-if="toy['radios'] == 'Yes'">mdi-thumb-up</v-icon>
            <v-icon v-else>mdi-thumb-down</v-icon>
          </base-toy-card>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
import { db } from "../../main";
export default {
  name: "SectionToybox",
  data: () => ({
    toys: []
  }),
  firestore() {
    return {
      toys: db.collection("toys")
    };
  }
};
</script>
