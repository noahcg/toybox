<template>
  <v-dialog v-model="isOpen" persistent max-width="800px">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container class="newbook-container" grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="editedBook.title"
                  label="Title"
                  :rules="titleRules"
                  required
                />
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="editedBook.author"
                  label="Author"
                  :rules="authorRules"
                  required
                />
              </v-flex>
              <v-flex xs12 md4>
                <v-select
                  @change="selectCategory($event)"
                  :items="categories"
                  v-model="editedBook.category"
                  :rules="[v => !!v || 'A category is required']"
                  required
                  label="Categories"
                ></v-select>
              </v-flex>
              <v-flex xs12 md4>
                <v-select
                  @change="selectOwnership($event)"
                  :items="ownership"
                  v-model="editedBook.ownership"
                  :rules="[v => !!v || 'An ownership is required']"
                  required
                  label="Ownership"
                ></v-select>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="editedBook.pagecount"
                  label="Page Count"
                  :rules="pagecountRules"
                  required
                />
              </v-flex>
              <v-flex xs12 class="mb-0">
                <v-textarea v-model="editedBook.description" label="Description" outlined></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-radio-group v-model="editedBook.readOrNot">
                  <template v-slot:label>
                    <div>Did you read this book, or do you just own it?</div>
                  </template>
                  <v-radio value="Yes">
                    <template v-slot:label>
                      <div>Yes, I actually read it</div>
                    </template>
                  </v-radio>
                  <v-radio value="No">
                    <template v-slot:label>
                      <div>No, I just own it</div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12 md6>
                <v-date-picker
                  v-model="editedBook.date"
                  :landscape="landscape"
                  :reactive="reactive"
                  :full-width="true"
                ></v-date-picker>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue white--text" @click.native="cancel">Cancel</v-btn>
          <v-btn color="blue white--text" @click.native="addBook(editedBook)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { db } from "../main";
export default {
  name: "NewBookDialog",
  props: ["isOpen", "newOrEdit", "editedBook"],
  data: () => ({
    valid: false,
    titleRules: [v => !!v || "Title is required"],
    authorRules: [v => !!v || "Author is required"],
    pagecountRules: [v => !!v || "Page count is required"],
    categories: [
      "Architecture",
      "Art",
      "Biography and Autobiography",
      "Body Mind and Spirit",
      "Business and Economics",
      "Computers",
      "Cooking",
      "Crafts & Hobbies",
      "Drama",
      "Education",
      "Fiction",
      "Health and Fitness",
      "History",
      "Humor",
      "Law",
      "Literature & Fiction",
      "Miscellaneous",
      "Mystery, Thriller & Suspense",
      "Outdoors & Nature",
      "Periodicals",
      "Philosophy",
      "Photography",
      "Politics & Social Sciences",
      "Psychology",
      "Science Fiction",
      "Social Science",
      "Technology and Engineering",
      "Transportation",
      "Travel"
    ],
    ownership: ["Own", "Library"],
    defaultItem: {
      title: "",
      author: "",
      category: "",
      pagecount: 0,
      description: "",
      date: "",
      readOrNot: ""
    },
    itemID: "",
    landscape: true,
    reactive: true
  }),
  computed: {
    formTitle() {
      return this.newOrEdit === -1 ? "New Book" : "Edit Book";
    }
  },
  methods: {
    addBook(book) {
      if (this.$refs.form.validate()) {
        if (this.newOrEdit > -1) {
          db.collection("books")
            .doc(book.id)
            .update(this.editedBook);
          this.$emit("closeDialog");
        } else {
          db.collection("books").add(book);
          this.$emit("closeDialog");
        }
      }
    },
    cancel() {
      this.$emit("closeDialog");
      this.resetValidation();
    },
    selectCategory(event) {
      this.editedBook.category = event;
    },
    selectOwnership(event) {
      this.editedBook.ownership = event;
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