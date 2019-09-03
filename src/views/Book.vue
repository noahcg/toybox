<template>
  <v-container>
    <div class="pa-12">
      <section class="layout wrap mb-12">
        <div class="flex">
          <div
            v-if="!overlay"
            class="container grey--text text--darken-2 container--fluid grid-list-md pa-0 book-content"
          >
            <p class="title">{{ book.title }}</p>
            <p>Author: {{ book.author }}</p>
            <p>Category: {{ book.category }}</p>
            <p>Owner: {{ book.ownership }}</p>
            <p>Pages: {{ book.pagecount }}</p>
            <p>Description: {{ book.description }}</p>
          </div>
        </div>
      </section>
    </div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
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
      book: db.collection("books").doc(this.$route.params.id)
    };
  }
};
</script>
