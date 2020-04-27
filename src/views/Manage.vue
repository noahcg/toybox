<template>
  <div class="page">
    <v-row justify="center" class="mb-4">
      <v-col cols="10" class="page-title-area">
        <h1>Manage</h1>
      </v-col>
    </v-row>
    <v-row class="content-row">
      <v-col cols="12" class="page-content-area" style="background:#fff;">
        <v-row>
          <v-col>
            <v-btn @click="dialog = true" color="blue" class="white--text">
              <v-icon class="mr-3" color="white">fa fa-plus-square</v-icon>Add
              Toy
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="search"
              append-icon="fa fa-search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
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
                  <v-icon>fa fa-pencil</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="confirmDelete(item)">
                  <v-icon>fa fa-trash</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
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
  </div>
</template>

<script>
import { db } from "../main";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import NewToyDialog from "@/components/NewToyDialog.vue";
export default {
  components: {
    ConfirmationDialog,
    NewToyDialog
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
<style lang="scss" scoped>
.page-title-area {
  background: #fff;
  padding: 20px;
}
.content-row {
  height: 100%;
}
.page-content-area {
  background: #fff;
  padding: 20px;
}
h1 {
  line-height: 2.4rem;
}
</style>