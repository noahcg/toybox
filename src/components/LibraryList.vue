<template>
  <div>
    <v-container fluid grid-list-md>
      <v-layout row wrap class="mb-5">
        <v-flex xs12 md4 v-for="book in books" :key="book.id">
          <v-card>
            <v-card-title primary-title class="py-4">
              <v-icon large>menu_book</v-icon>
            </v-card-title>
            <v-divider light></v-divider>
            <v-card-text class="py-3 book-data">
              <p class="subtitle-1">
                <strong>Title:</strong>
                {{ book.title }}
              </p>
              <p class="subtitle-1">
                <strong>Author:</strong>
                {{ book.author }}
              </p>
              <p class="subtitle-1">
                <strong>Category:</strong>
                {{ book.category }}
              </p>
              <p class="subtitle-1">
                <strong>Ownership:</strong>
                {{ book.ownership }}
              </p>
              <p class="subtitle-1">
                <strong>Pagecount:</strong>
                {{ book.pagecount }}
              </p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <!-- <v-flex md12>
        <v-card light>
          <div class="v-card__text">
            <v-layout row wrap class="mb-4">
              <v-flex xs4 sm6 md8></v-flex>
              <v-flex xs8 sm6 md4>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-data-table
              :items="books"
              :search="search"
              :headers="headers"
              hide-actions
              class="elevation-0"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.author }}</td>
                <td>{{ props.item.category }}</td>
                <td>{{ props.item.ownership }}</td>
                <td class="text-xs-right">{{ props.item.pagecount }}</td>
              </template>
              <v-alert
                slot="no-results"
                :value="true"
                color="error"
                icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert>
            </v-data-table>
          </div>
        </v-card>
      </v-flex>-->
    </v-container>
  </div>
</template>

<script>
import { db } from "../main";

export default {
  data: () => ({
    books: [],
    search: "",
    headers: [
      {
        text: "Title",
        align: "left",
        sortable: true,
        value: "title",
        class: ["subheading", "font-weight-light", "text--darken-3"]
      },
      {
        text: "Author",
        align: "left",
        sortable: true,
        value: "author",
        class: ["subheading", "font-weight-light", "text--darken-3"]
      },
      {
        text: "Category",
        align: "left",
        sortable: true,
        value: "category",
        class: ["subheading", "font-weight-light", "text--darken-3"]
      },
      {
        text: "Ownership",
        align: "left",
        sortable: true,
        value: "ownership",
        class: ["subheading", "font-weight-light", "text--darken-3"]
      },
      {
        text: "Page Count",
        align: "right",
        sortable: true,
        value: "pagecount",
        class: ["subheading", "font-weight-light", "text--darken-3"]
      }
    ]
  }),
  firestore() {
    return {
      books: db.collection("books")
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/materials";

.v-icon {
  display: block;
  margin: 0 auto;
  background: #eee;
  border-radius: 50%;
  padding: 15px;
}

.book-data p {
  margin-bottom: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
