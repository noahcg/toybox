<template>
  <div>
    <v-container>
      <v-layout wrap class="mb-4">
        <v-flex xs4 sm6 md8>
          <v-btn @click="dialog = true" color="grey ">
            <v-icon>fa fa-plus-square</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs8 sm6 md4>
          <v-text-field
            v-model="search"
            append-icon="fa fa-search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-flex>
      </v-layout>
      <new-book-dialog
        :is-open.sync="dialog"
        :new-or-edit="editedIndex"
        :edited-book="editedItem"
        @closeDialog="close()"
      />
      <v-data-table :headers="headers" :items="books" class="elevation-1" :search="search">
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">fa fa-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">delete</v-icon>
        </template>
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
import { db } from "../main";
import ConfirmationDialog from "./ConfirmationDialog.vue";
import NewBookDialog from "./NewBookDialog.vue";
export default {
  components: {
    ConfirmationDialog,
    NewBookDialog
  },
  data: () => ({
    valid: false,
    search: "",
    books: [],
    dialog: false,
    confirm: false,
    headers: [
      {
        text: "Title",
        align: "left",
        sortable: true,
        value: "title",
        width: "300px"
      },
      { text: "Author", value: "author" },
      { text: "Category", value: "category" },
      { text: "Ownership", value: "ownership" },
      { text: "Page Count", value: "pagecount" },
      { text: "Date", value: "date" },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "center"
      }
    ],
    editedIndex: -1,
    editedItem: {
      title: "",
      author: "",
      category: "",
      ownership: "",
      pagecount: 0,
      date: ""
    },
    defaultItem: {
      title: "",
      author: "",
      category: "",
      ownership: "",
      pagecount: 0,
      date: ""
    },
    deletingBook: {}
  }),
  firestore() {
    return {
      books: db.collection("books")
    };
  },
  methods: {
    addBook(book) {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          db.collection("books")
            .doc(book.id)
            .update(this.editedItem);
          this.close();
        } else {
          db.collection("books").add(book);
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
    }
  }
};
</script>