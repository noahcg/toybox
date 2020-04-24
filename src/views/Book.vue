<template>
  <v-container>
    <div class="pa-12">
      <section class="layout wrap mb-12">
        <v-layout row wrap class="mb-5">
          <v-flex xs12>
            <v-card :loading="overlay">
              <v-card-text class="py-5">
                <div v-if="overlay">
                  <p class="text-center mb-0">Book content is loading</p>
                </div>
                <div v-if="!overlay">
                  <p class="title">{{ book.title }}</p>
                  <p>Author: {{ book.author }}</p>
                  <p>Category: {{ book.category }}</p>
                  <p>Owner: {{ book.ownership }}</p>
                  <p>Pages: {{ book.pagecount }}</p>
                  <p>Description: {{ book.description }}</p>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </section>
    </div>
  </v-container>
</template>

<script>
import { db } from "../main";
export default {
  name: "book",
  data: () => ({
    book: [],
    overlay: true
  }),
  watch: {
    book() {
      if (this.book.length < 1) {
        this.overlay = true;
      } else {
        this.overlay = false;
      }
    }
  },
  firestore() {
    return {
      book: db.collection("toys").doc(this.$route.params.id)
    };
  }
};
</script>
