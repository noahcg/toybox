<template>
  <div>
    <v-container>
      <v-layout row wrap class="mb-4">
        <v-flex xs4 sm6 md8>
        </v-flex>
        <v-flex xs8 sm6 md4>
          <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-data-table
        :headers="headers"
        :items="books"
        :search="search"
        hide-actions class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.title }}</td>
          <td class="text-xs-left">{{ props.item.author }}</td>
          <td class="text-xs-left">{{ props.item.category }}</td>
          <td class="text-xs-left">{{ props.item.ownership }}</td>
          <td class="text-xs-left">{{ props.item.pagecount }}</td>
          <td class="text-xs-left">{{ props.item.date | moment("MM-DD-YYYY") }}</td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>

import { db } from '../main';

export default {
  data: () => ({
    books: [],
    search: '',
    headers: [
      {
        text: 'Title',
        align: 'left',
        sortable: true,
        value: 'title',
        width: '360px',
      },
      { text: 'Author', value: 'author' },
      { text: 'Category', value: 'category' },
      { text: 'Ownership', value: 'ownership' },
      { text: 'Page Count', value: 'pagecount' },
      { text: 'Date', value: 'date' },
    ],
  }),
  firestore() {
    return {
      books: db.collection('books'),
    };
  },
};
</script>

<style lang="scss">
.librarylist li {
  background-color: inherit !important;
}
.v-expansion-panel__header > *:not(.v-expansion-panel__header__icon) {
  order: 2;
}
.theme--light.v-sheet {
  background: none;
}
.v-expansion-panel__container > .v-expansion-panel__header .v-expansion-panel__header__icon .v-icon {
  transform: rotate(-90deg);
}
.v-expansion-panel__container--active > .v-expansion-panel__header .v-expansion-panel__header__icon .v-icon {
  transform: rotate(0deg);
}
</style>
