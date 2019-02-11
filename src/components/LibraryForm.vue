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
      <v-dialog v-model="dialog" max-width="500px">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-layout wrap>
                  <v-flex xs12 sm6 md12>
                    <v-text-field
                      v-model="editedItem.title"
                      label="Title"
                      :rules="titleRules"
                      required
                    />
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-text-field
                      v-model="editedItem.author"
                      label="Author"
                      :rules="authorRules"
                      required
                    />
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-select @change="selectCategory($event)"
                      :items="categories"
                      v-model="editedItem.category"
                       :rules="[v => !!v || 'A category is required']"
                      required
                      label="Categories">
                    </v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editedItem.pagecount"
                      label="Page Count"
                      :rules="pagecountRules"
                      required
                    />
                  </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click.native="addBook(editedItem)">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
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
      <confirmation-dialog :is-confirmed.sync="confirm" v-on:update:confirm="confirm = $event" :deleted-book="deletingBook" />
    </v-container>
  </div>
</template>

<script>

import { db } from '../main';
import ConfirmationDialog from './ConfirmationDialog';

export default {
  components: {
    ConfirmationDialog
  },
  data: () => ({
    valid: false,
    titleRules: [
      v => !!v || 'Title is required',
    ],
    authorRules: [
      v => !!v || 'Author is required',
    ],
    pagecountRules: [
      v => !!v || 'Page count is required',
    ],
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
      {
        text: 'Actions', value: 'actions', sortable: false, align: 'center',
      },
    ],
    editedIndex: -1,
    categories: [
      'Architecture',
      'Art',
      'Biography and Autobiography',
      'Body Mind and Spirit',
      'Business and Economics',
      'Computers',
      'Cooking',
      'Crafts & Hobbies',
      'Drama',
      'Education',
      'Fiction',
      'Health and Fitness',
      'History',
      'Humor',
      'Law',
      'Literature & Fiction',
      'Miscellaneous',
      'Mystery, Thriller & Suspense',
      'Outdoors & Nature',
      'Periodicals',
      'Philosophy',
      'Photography',
      'Politics & Social Sciences',
      'Psychology',
      'Science Fiction',
      'Social Science',
      'Technology and Engineering',
      'Transportation',
      'Travel',
    ],
    editedItem: {
      title: '',
      author: '',
      category: '',
      pagecount: 0,
    },
    defaultItem: {
      title: '',
      author: '',
      category: '',
      pagecount: 0,
    },
    itemID: '',
    deletingBook: {},
  }),
  firestore() {
    return {
      books: db.collection('books'),
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Book' : 'Edit Book';
    },
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
      this.dialog = true;
    },
    confirmDelete(book) {
      this.confirm = true;
      this.deletingBook = book;
    },
    close() {
      this.resetValidation();
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.dialog = false;
      }, 0);
    },
    selectCategory(event) {
      this.editedItem.category = event;
    },
    resetValidation() {
      this.$refs.form.resetValidation();
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