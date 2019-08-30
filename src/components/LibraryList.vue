<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col v-for="book in books" :key="book.id" md="3" sm="6" cols="12">
          <v-card height="100%">
            <v-card-text class="py-3 book-data">
              <p class="title">{{ book.title }}</p>
              <p class="subtitle-2 font-weight-regular font-italic">{{ book.author }}</p>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-icon
                class="mr-2"
                v-if="book.ownership == 'Library'"
                title="This is a library book"
              >fa-institution</v-icon>
              <v-icon
                class="mr-2"
                v-if="book.ownership == 'Own'"
                title="I own this book"
              >fa-user-circle</v-icon>
              <v-icon
                class="mr-2"
                v-if="book.readOrNot == 'No'"
                title="I haven't read this book"
              >fa-frown-o</v-icon>
              <v-icon
                class="mr-2"
                v-if="book.readOrNot == 'Yes'"
                title="I did read this book"
              >fa-smile-o</v-icon>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db } from "../main";

export default {
  data: () => ({
    books: []
  }),
  computed: {
    didYouRead() {
      const booksIRead = [];
      this.books.forEach(item => {
        if (item.readOrNot == "Yes") {
          booksIRead.push(item);
        }
      });
      return booksIRead;
    }
  },
  firestore() {
    return {
      books: db.collection("books")
    };
  }
};
</script>

<style lang="scss" scoped>
.v-card > .v-card__text {
  height: 140px !important;
}
.book-data .title {
  margin-bottom: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
}

.v-expansion-panel {
  box-shadow: none !important;
}
.v-expansion-panel__header {
  padding: 12px 0;
}
.v-expansion-panel__body {
  padding: 0 20px;
}
.theme--light.v-expansion-panel .v-expansion-panel__container,
.theme--light.v-datatable .v-datatable__actions {
  background: none !important;
}
table.v-table tbody td {
  font-size: 14px;
  font-weight: 300;
}
h4 {
  display: inline;
  left: 5px;
  position: relative;
  top: -9px;
}
</style>