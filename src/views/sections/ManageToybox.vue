<template>
  <base-section id="manage-my-toybox">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-btn @click="dialog = true" color="blue" class="white--text">
            <v-icon class="mr-3" color="white">mdi-toy-brick-plus</v-icon>Add
            Toy
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="10">
          <p class="message-to-parents" v-if="toys.length < 1">
            Awww! I don't have any toys in my toybox.
          </p>
          <v-data-table
            v-if="toys.length"
            :headers="headers"
            :items="toys"
            class="elevation-1"
            :search="search"
          >
            <template v-slot:item.action="{ item }">
              <v-btn icon class="mx-0" @click="editItem(item)">
                <v-icon>mdi-square-edit-outline</v-icon>
              </v-btn>
              <v-btn icon class="mx-0" @click="confirmDelete(item)">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <new-toy-dialog
      :is-open.sync="dialog"
      :new-or-edit="editedIndex"
      :edited-toy="editedItem"
      @closeDialog="close()"
    />

    <confirmation-dialog
      :show="confirm"
      @confirmation:close="confirm = $event"
      :deleted-toy="deletingToy"
    />
  </base-section>
</template>

<script>
import { db } from "../../main";
import NewToyDialog from "@/components/NewToyDialogue.vue";
import ConfirmationDialog from "@/components/ConfirmationDialogue.vue";
export default {
  name: "SectionManageToybox",
  components: {
    NewToyDialog,
    ConfirmationDialog
  },
  data: () => ({
    valid: false,
    search: "",
    toys: [],
    dialog: false,
    confirm: false,
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: true,
        value: "name",
        width: "200px"
      },
      { text: "Category", value: "category", width: "200px" },
      { text: "Like it?", value: "radios", width: "200px" },
      {
        text: "Actions",
        value: "action",
        sortable: false,
        align: "center"
      }
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      category: "",
      radios: ""
    },
    defaultItem: {
      name: "",
      category: "",
      radios: ""
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
      if (this.editedIndex > -1) {
        db.collection("toys")
          .doc(toy.id)
          .update(this.editedItem);
        this.close();
      } else {
        db.collection("toys").add(toy);
        this.close();
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
