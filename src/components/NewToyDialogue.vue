<template>
  <v-dialog v-model="isOpen" persistent max-width="800px">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formName }}</span>
        </v-card-title>
        <v-card-text>
          <v-container class="newbook-container" grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 md6>
                <v-text-field v-model="editedToy.name" label="Name" required />
              </v-flex>
              <v-flex xs12 md4>
                <v-select
                  @change="selectCategory($event)"
                  :items="categories"
                  v-model="editedToy.category"
                  required
                  label="Categories"
                ></v-select>
              </v-flex>
              <v-flex xs12 md4>
                <v-radio-group v-model="editedToy.radios" :mandatory="false">
                  <v-radio label="Yes" value="Yes"></v-radio>
                  <v-radio label="No" value="No"></v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue white--text" @click.native="cancel">Cancel</v-btn>
          <v-btn color="blue white--text" @click.native="addToy(editedToy)"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { db } from "../main";
export default {
  name: "NewToyDialog",
  props: ["isOpen", "newOrEdit", "editedToy"],
  data: () => ({
    valid: false,
    nameRules: [v => !!v || "Name is required"],
    categories: [
      "Active Play",
      "Arts & Crafts",
      "Baby Toys & Gifts",
      "Bath Toys",
      "Books",
      "Brainteasers",
      "Building & Construction",
      "Cars & Trucks",
      "Classic & Retro Toys",
      "Dolls & Dollhouses",
      "Early Learning Toys",
      "Games,Gear & Apparel",
      "Gift Certificates",
      "History & Geography",
      "Imaginative Play",
      "Kites",
      "Planes & Rockets",
      "Pushables",
      "Magnets & Magnetism",
      "Maker & DIY Kits",
      "Mind & Body",
      "Music,Office & Desk Toys",
      "Organic & Green Toys",
      "Outdoor Toys",
      "Party Favors & Party Fun",
      "Personalized Items",
      "Playroom and Bedroom Furnishings",
      "Plush",
      "Puzzles",
      "RC & Electronics",
      "Ride On",
      "Science & Nature",
      "STEM Toys",
      "Teaching Toys & Tools",
      "Trains & Vehicles",
      "Travel Toys",
      "Wooden Toys"
    ],
    defaultItem: {
      name: "",
      category: "",
      radios: ""
    },
    landscape: true,
    reactive: true
  }),
  computed: {
    formName() {
      return this.newOrEdit === -1 ? "New Toy" : "Edit Toy";
    }
  },
  methods: {
    addToy(toy) {
      if (this.newOrEdit > -1) {
        db.collection("toys")
          .doc(toy.id)
          .update(this.editedToy);
        this.$emit("closeDialog");
      } else {
        db.collection("toys").add(toy);
        this.$emit("closeDialog");
      }
    },
    cancel() {
      this.$emit("closeDialog");
      this.resetValidation();
    },
    selectCategory(event) {
      this.editedToy.category = event;
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>

<style lang="scss" scoped>
.newbook-container {
  padding: 0;
}
.v-card__text {
  padding-top: 0;
}
</style>