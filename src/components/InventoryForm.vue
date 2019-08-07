<template>
  <div>
    <v-container>
      <v-layout row wrap class="mb-4">
        <v-flex xs4 sm6 md8>
          <v-btn @click="dialog = true" color="#c60" class="add-beer-button">
            <v-icon>library_add</v-icon>
          </v-btn>
        </v-flex>
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
      <new-beer-dialog
        :is-open.sync="dialog"
        :new-or-edit="editedIndex"
        :edited-beer="editedItem"
        @closeDialog="close()"
      />
      <v-data-table
        :headers="headers"
        :items="beers"
        :search="search"
        :pagination.sync="pagination"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.brewery }}</td>
          <td class="text-xs-left">{{ props.item.beer }}</td>
          <td class="text-xs-left">{{ props.item.style }}</td>
          <td class="text-xs-left">{{ props.item.quantity }}</td>
          <td class="text-xs-left">{{ convertABV(props.item.abv) }}</td>
          <td class="text-xs-left">{{ props.item.year }}</td>
          <td class="text-xs-left">{{ props.item.fridge }}</td>
          <td class="justify-center layout px-0">
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="#c60">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="confirmDelete(props.item)">
              <v-icon color="#c60">delete</v-icon>
            </v-btn>
          </td>
        </template>
        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </v-data-table>
      <confirmation-dialog
        :show="confirm"
        @confirmation:close="confirm = $event"
        :deleted-beer="deletingBeer"
      />
    </v-container>
  </div>
</template>

<script>
import { db } from "../main";
import ConfirmationDialog from "./ConfirmationDialog.vue";
import NewBeerDialog from "./NewBeerDialog.vue";

export default {
  components: {
    ConfirmationDialog,
    NewBeerDialog
  },
  data: () => ({
    valid: false,
    search: "",
    beers: [],
    dialog: false,
    confirm: false,
    headers: [
      { text: "Brewery", value: "brewery" },
      { text: "Beer", value: "beer" },
      { text: "Style", value: "style" },
      { text: "Quantity", value: "quantity" },
      { text: "ABV", value: "ABV" },
      { text: "Year", value: "year" },
      { text: "Fridge", value: "fridge" },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "center"
      }
    ],
    editedIndex: -1,
    editedItem: {
      brewery: "",
      beer: "",
      style: "",
      quantity: "",
      abv: 0,
      year: "",
      fridge: ""
    },
    defaultItem: {
      brewery: "",
      beer: "",
      style: "",
      quantity: "",
      abv: 0,
      year: "",
      fridge: ""
    },
    deletingBeer: {},
    pagination: {
      rowsPerPage: 10
    }
  }),
  firestore() {
    return {
      beers: db.collection("beers")
    };
  },
  methods: {
    addBeer(beer) {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          db.collection("beers")
            .doc(beer.id)
            .update(this.editedItem);
          this.close();
        } else {
          db.collection("beers").add(beer);
          this.close();
        }
      }
    },
    editItem(item) {
      this.editedIndex = this.beers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.id = item.id;
      this.dialog = true;
    },
    confirmDelete(beer) {
      this.confirm = true;
      this.deletingBeer = beer;
    },
    close() {
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.dialog = false;
      }, 0);
    },
    convertABV(val) {
      return parseFloat(val).toFixed(2) + "%";
    }
  }
};
</script>
<style lang="scss">
.add-beer-button .v-btn__content {
  color: #fff;
}
</style>

