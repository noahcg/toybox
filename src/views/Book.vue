<template>
  <v-container>
    <div class="pa-12">
      <section class="layout wrap mb-12">
        <div class="flex">
          <div class="container grey--text text--darken-2 container--fluid grid-list-md pa-0">
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
  </v-container>
</template>

<script>
import { db } from "../main";
export default {
  name: "book",
  data: () => ({
    book: []
  }),
  firestore() {
    return {
      book: db.collection("books").doc(this.$route.params.id)
    };
  }
};
</script>
