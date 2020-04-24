<template>
  <div>
    <v-container>
      <v-layout wrap class="mb-4 pt-4">
        <v-flex xs6 sm6 md8 pt-2>
          <v-btn @click="dialog = true" color="blue" class="white--text">
            <v-icon class="mr-3" color="white">fa fa-plus-square</v-icon>Add Toy
          </v-btn>
        </v-flex>
        <v-flex xs12 sm6 md4>
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
        :edited-toy="editedItem"
        @closeDialog="close()"
      />
      <v-data-table
        :headers="headers"
        :items="toys"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:item.action="{ item }">
          <v-btn icon class="mx-0" @click="editItem(item)">
            <v-icon>fa fa-pencil</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="confirmDelete(item)">
            <v-icon>fa fa-trash</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <confirmation-dialog
        :show="confirm"
        @confirmation:close="confirm = $event"
        :deleted-toy="deletingToy"
      />
    </v-container>
  </div>
</template>

<script>
import { db } from "../main";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import NewBookDialog from "@/components/NewBookDialog.vue";
export default {
  components: {
    ConfirmationDialog,
    NewBookDialog
  },
  data: () => ({
    valid: false,
    search: "",
    toys: [],
    dialog: false,
    confirm: false,
    headers: [
      {
        text: "Title",
        align: "left",
        sortable: true,
        value: "title",
        width: "200px"
      },
      { text: "Author", value: "author" },
      { text: "Category", value: "category", width: "200px" },
      { text: "Ownership", value: "ownership" },
      { text: "Page Count", value: "pagecount" },
      { text: "Date", value: "date" },
      { text: "Read or Not", value: "readOrNot" },
      {
        text: "Actions",
        value: "action",
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
      description: "",
      date: "",
      readOrNot: ""
    },
    defaultItem: {
      title: "",
      author: "",
      category: "",
      ownership: "",
      pagecount: 0,
      description: "",
      date: "",
      readOrNot: ""
    },
    deletingToy: {}
  }),
  firestore() {
    return {
      toys: db.collection("toys")
    };
  },
  methods: {
    addToy(toy) {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          db.collection("toys")
            .doc(toy.id)
            .update(this.editedItem);
          this.close();
        } else {
          db.collection("toys").add(toy);
          this.close();
        }
      }
    },
    editItem(item) {
      this.editedIndex = this.toys.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.id = item.id;
      this.dialog = true;
    },
    confirmDelete(toy) {
      this.confirm = true;
      this.deletingToy = toy;
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