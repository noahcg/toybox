<template>
  <div>
    <v-container>
      <v-layout row wrap class="mb-4">
        <v-flex xs4 sm6 md8>
          <v-btn @click="dialog = true" color="primary" dark>
            <v-icon>library_add</v-icon>
          </v-btn>
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
      <new-book-dialog
        :is-open.sync="dialog"
        :new-or-edit="editedIndex"
        :edited-book="editedItem"
        @closeDialog="close()"
      />
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
            <td class="text-xs-left">{{ props.item.pagecount }}</td>
            <td class="text-xs-left">{{ props.item.date | moment("MM-DD-YYYY") }}</td>
            <td class="justify-center layout px-0">
              <v-btn icon class="mx-0" @click="editItem(props.item)">
                  <v-icon color="teal">edit</v-icon>
              </v-btn>
              <v-btn icon class="mx-0" @click="confirmDelete(props.item)">
                  <v-icon color="red darken-4">delete</v-icon>
              </v-btn>
            </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
      <confirmation-dialog
        :show="confirm"
        @confirmation:close="confirm = $event"
        :deleted-book="deletingBook"
      />
    </v-container>
  </div>
</template>

<script>

import { db } from '../main';
import ConfirmationDialog from './ConfirmationDialog.vue';
import NewBookDialog from './NewBookDialog.vue';

export default {
  components: {
    ConfirmationDialog,
    NewBookDialog,
  },
  data: () => ({
    valid: false,
    search: '',
    books: [],
    dialog: false,
    confirm: false,
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
      { text: 'Page Count', value: 'pagecount' },
      { text: 'Date', value: 'date' },
      {
        text: 'Actions', value: 'actions', sortable: false, align: 'center',
      },
    ],
    editedIndex: -1,
    editedItem: {
      title: '',
      author: '',
      category: '',
      pagecount: 0,
      date: '',
    },
    defaultItem: {
      title: '',
      author: '',
      category: '',
      pagecount: 0,
      date: '',
    },
    deletingBook: {},
  }),
  firestore() {
    return {
      books: db.collection('books'),
    };
  },
  methods: {
    addBook(book) {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          db.collection('books').doc(book.id).update(this.editedItem);
          this.close();
        } else {
          db.collection('books').add(book);
          this.close();
        }
      }
    },
    editItem(item) {
      this.editedIndex = this.books.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.id = item.id;
      this.dialog = true;
    },
    confirmDelete(book) {
      this.confirm = true;
      this.deletingBook = book;
    },
    close() {
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.dialog = false;
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.v-datatable thead th.column.sortable:first-child {
  min-width: 230px !important;
}
/deep/.v-datatable thead th.column.sortable:nth-child(2) {
  min-width: 180px;
}
/deep/.v-datatable thead th.column.sortable:nth-child(3) {
  min-width: 190px;
}

@media(min-width: 1024px) {
  /deep/.v-datatable thead th.column.sortable:first-child, /deep/.v-datatable thead th.column.sortable:nth-child(2), /deep/.v-datatable thead th.column.sortable:nth-child(3) {
    min-width: inherit !important;
  }
}
</style>
