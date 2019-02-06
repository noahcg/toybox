<template>
  <div>
    <v-container>
      <v-layout row wrap class="mb-4">
        <v-flex xs8>
          <v-btn @click="dialog = true" color="primary" dark>
            <v-icon>library_add</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs4>
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
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-layout wrap>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.author" label="Author"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-select @change="selectCategory($event)"
                    :items="categories"
                    label="Categories">
                  </v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.pagecount" label="Page Count"></v-text-field>
                </v-flex>
              </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="addBook(editedItem.title, editedItem.author, editedItem.category, editedItem.pagecount)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table :headers="headers" :items="books" :search="search" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-left">{{ props.item.author }}</td>
            <td class="text-xs-left">{{ props.item.category }}</td>
            <td class="text-xs-left">{{ props.item.pagecount }}</td>
            <td class="justify-center layout px-0">
              <v-btn icon class="mx-0" @click="editItem(props.item, props.item.id)">
                  <v-icon color="teal">edit</v-icon>
              </v-btn>
              <v-btn icon class="mx-0" @click="deleteItem(props.item.id)">
                  <v-icon color="red darken-4">delete</v-icon>
              </v-btn>
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
    search: '',
    rowspp: 10,
    books: [],
    dialog: false,
    headers: [
      {
        text: 'Title',
        align: 'left',
        sortable: true,
        value: 'title',
      },
      { text: 'Author', value: 'author' },
      { text: 'Category', value: 'category' },
      { text: 'Page Count', value: 'pagecount' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
    ],
    editedIndex: -1,
    editedItemID: '',
    categories: [
      'Architecture','Art','Biography and Autobiography','Body Mind and Spirit','Business and Economics','Computers','Cooking','Crafts & Hobbies','Drama','Education','Fiction','Health and Fitness','History','Humor','Law','Literature & Fiction','Miscellaneous', 'Mystery, Thriller & Suspense','Outdoors & Nature','Periodicals','Philosophy','Photography','Politics & Social Sciences','Psychology','Science Fiction','Social Science','Technology and Engineering','Transportation','Travel'
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
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    addBook(title, author, category, pagecount) {
      if (this.editedIndex > -1) {
        db.collection('books').doc(this.editedItemID).update(this.editedItem);
      } else {
        db.collection('books').add({ title, author, category, pagecount });
      }
      this.close();
    },
    editItem(item, id) {
      this.editedIndex = this.books.indexOf(item);
      this.editedItemID = id;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(id) {
      db.collection('books').doc(id).delete();
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    selectCategory(event) {
      this.editedItem.category = event;
    },
  },
};
</script>

<style>

</style>
