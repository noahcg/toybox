<template>
  <div>
    <v-container>
      <v-flex md12 class="py-5">
        <v-card>
          <div class="v-card__text">
            <v-layout row wrap class="mb-4">
              <v-flex xs4 sm6 md8></v-flex>
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
            <v-data-table
              :items="beers"
              :search="search"
              :headers="headers"
              hide-actions
              class="elevation-0"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.brewery }}</td>
                <td>{{ props.item.beer }}</td>
                <td>{{ props.item.style }}</td>
                <td>{{ props.item.quantity }}</td>
                <td>{{ props.item.abv }}</td>
                <td>{{ props.item.year }}</td>
                <td>{{ props.item.fridge }}</td>
              </template>
              <v-alert
                slot="no-results"
                :value="true"
                color="error"
                icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert>
            </v-data-table>
          </div>
        </v-card>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import { db } from "../main";

export default {
  data: () => ({
    beers: [],
    search: "",
    headers: [
      {
        text: "Brewery",
        align: "left",
        sortable: true,
        value: "brewery",
        class: ["subheading", "font-weight-light", "text--darken-3"]
      },
      {
        text: "Beer",
        align: "left",
        sortable: true,
        value: "beer",
        class: ["subheading", "font-weight-light", "text--darken-3"]
      },
      {
        text: "Style",
        align: "left",
        sortable: true,
        value: "style",
        class: ["subheading", "font-weight-light", "text--darken-3"]
      },
      {
        text: "Quantity",
        align: "left",
        sortable: true,
        value: "quantity",
        class: ["subheading", "font-weight-light", "text--darken-3"]
      },
      {
        text: "ABV",
        align: "left",
        sortable: true,
        value: "abv",
        class: ["subheading", "font-weight-light", "text--darken-3"]
      },
      {
        text: "Year",
        align: "left",
        sortable: true,
        value: "year",
        class: ["subheading", "font-weight-light", "text--darken-3"]
      },
      {
        text: "Fridge",
        align: "left",
        sortable: true,
        value: "fridge",
        class: ["subheading", "font-weight-light", "text--darken-3"]
      }
    ]
  }),
  firestore() {
    return {
      beers: db.collection("beers")
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/materials";

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
table.v-table tbody td {
  font-size: 14px;
  font-weight: 300;
}
h4 {
  display: inline;
  left: 5px;
  position: relative;
  top: -9px;
}
</style>
