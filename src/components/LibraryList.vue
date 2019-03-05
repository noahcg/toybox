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
        :items="books"
        :search="search"
        :headers="headers"
        hide-actions class="elevation-0"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left font-weight-black headline">
            <v-expansion-panel>
              <v-expansion-panel-content>
                <div slot="header">{{ props.item.title }}</div>
                <p class="subheading font-weight-light">
                  Author: {{ props.item.author }}<br />
                  Category: {{ props.item.category }}<br />
                  Ownership: {{ props.item.ownership }}<br />
                  Page Count: {{ props.item.pagecount }}
                </p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </td>
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
      },
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
.theme--light.v-table {
   background: none !important;
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
</style>
