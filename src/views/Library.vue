<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col v-for="toy in toys" :key="toy.id" md="3" sm="6" cols="12">
          <v-card height="100%">
            <v-card-text class="py-3 book-data">
              <p class="title">{{ toy.name }}</p>
              <p class="subtitle-2 font-weight-regular font-italic">
                {{ toy.category }}
              </p>
            </v-card-text>
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
    toys: []
  }),
  computed: {
    // didYouRead() {
    //   const booksIRead = [];
    //   this.books.forEach(item => {
    //     if (item.readOrNot == "Yes") {
    //       booksIRead.push(item);
    //     }
    //   });
    //   return booksIRead;
    // }
  },
  firestore() {
    return {
      toys: db.collection("toys")
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

.cta {
  text-decoration: none;

  &:hover {
    .v-card {
      background: #ccc;
    }
  }
}
</style>