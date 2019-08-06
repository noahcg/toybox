<template>
  <v-dialog v-model="isOpen" persistent max-width="800px">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container class="newbeer-container" grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="editedBeer.brewery"
                  label="Brewery"
                  :rules="breweryRules"
                  required
                />
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field v-model="editedBeer.beer" label="Beer" :rules="beerRules" required />
              </v-flex>
              <v-flex xs12 md6>
                <v-select
                  @change="selectStyle($event)"
                  :items="style"
                  v-model="editedBeer.style"
                  :rules="[v => !!v || 'A style is required']"
                  required
                  label="Style"
                ></v-select>
              </v-flex>
              <v-flex xs12 md2>
                <v-text-field
                  v-model="editedBeer.quantity"
                  label="Quantity"
                  :rules="quantityRules"
                  required
                />
              </v-flex>
              <v-flex xs12 md2>
                <v-text-field v-model="editedBeer.abv" label="ABV" :rules="abvRules" required />
              </v-flex>
              <v-flex xs12 md2>
                <v-text-field v-model="editedBeer.year" label="Year" />
              </v-flex>
              <v-flex xs12 md4>
                <v-select
                  @change="selectFridge($event)"
                  :items="fridge"
                  v-model="editedBeer.fridge"
                  :rules="[v => !!v || 'A fridge is required']"
                  required
                  label="Fridge"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" flat @click.native="cancel">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="addBeer(editedBeer)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { db } from "../main";

export default {
  name: "NewBeerDialog",
  props: ["isOpen", "newOrEdit", "editedBeer"],
  data: () => ({
    valid: false,
    breweryRules: [v => !!v || "Brewery is required"],
    beerRules: [v => !!v || "Beer is required"],
    styleRules: [v => !!v || "Style is required"],
    quantityRules: [v => !!v || "A quantity is required"],
    abvRules: [v => !!v || "ABV is required"],
    fridgeRules: [v => !!v || "A fridge is required"],
    style: [
      "Altbier",
      "Amber ale",
      "Barley wine",
      "Belgian Strong Ale",
      "Berliner Weisse",
      "Bière de Garde",
      "Bitter",
      "Blonde Ale",
      "Bock",
      "Brown ale",
      "Cream Ale",
      "Dortmunder Export",
      "Doppelbock",
      "Dunkel",
      "Dunkelweizen",
      "Eisbock",
      "Farmstead",
      "Flanders red ale",
      "Golden/Summer ale",
      "Gose",
      "Gueuze",
      "Hefeweizen",
      "Helles",
      "English IPA",
      "American IPA",
      "Specialty IPA",
      "Double IPA",
      "Kölsch",
      "Lager Wing",
      "Lambic",
      "Light ale",
      "Maibock/Helles bock",
      "Oktoberfestbier/Märzenbier",
      "Old ale",
      "Oud bruin",
      "American Pale Ale",
      "Belgian Pale Ale",
      "Pilsener/Pilsner/Pils",
      "Baltic Porter",
      "English Porter",
      "American Porter",
      "Pre-Prohibition Porter",
      "Irish Red Ale",
      "Roggenbier",
      "Saison",
      "Scotch",
      "Irish Stout",
      "Irish Extra Stout",
      "Sweet Stout",
      "Oatmeal Stout",
      "Tropical Stout",
      "Foreign Extra Stout",
      "American Stout",
      "Imperial Stout",
      "Schwarzbier",
      "Vienna lager",
      "Witbier",
      "Weissbier",
      "Weizenbock",
      "Wild",
      "Wild Saison"
    ],
    fridge: ["Left", "Center", "Right"],
    defaultItem: {
      brewery: "",
      beer: "",
      style: "",
      quantity: "",
      abv: "",
      year: "",
      fridge: ""
    },
    itemID: "",
    landscape: true,
    reactive: true
  }),
  computed: {
    formTitle() {
      return this.newOrEdit === -1 ? "New Beer" : "Edit Beer";
    }
  },
  methods: {
    addBeer(beer) {
      if (this.$refs.form.validate()) {
        if (this.newOrEdit > -1) {
          db.collection("beers")
            .doc(beer.id)
            .update(this.editedBeer);
          this.$emit("closeDialog");
        } else {
          db.collection("beers").add(beer);
          this.$emit("closeDialog");
        }
      }
    },
    cancel() {
      this.$emit("closeDialog");
      this.resetValidation();
    },
    selectStyle(event) {
      this.editedBeer.style = event;
    },
    selectFridge(event) {
      this.editedBeer.fridge = event;
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>

<style lang="scss" scoped>
.newbeer-container {
  padding: 0;
}
.v-card__text {
  padding-top: 0;
}
</style>

