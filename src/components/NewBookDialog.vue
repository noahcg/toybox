<template>
  <v-dialog v-model="isOpen" max-width="500px">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-layout wrap>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  v-model="editedBook.title"
                  label="Title"
                  :rules="titleRules"
                  required
                />
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  v-model="editedBook.author"
                  label="Author"
                  :rules="authorRules"
                  required
                />
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-select @change="selectCategory($event)"
                  :items="categories"
                  v-model="editedBook.category"
                    :rules="[v => !!v || 'A category is required']"
                  required
                  label="Categories">
                </v-select>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="editedBook.pagecount"
                  label="Page Count"
                  :rules="pagecountRules"
                  required
                />
              </v-flex>
            </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="addBook(editedBook)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>

import { db } from '../main';

export default {
  name: 'NewBookDialog',
  props: ['isOpen', 'newOrEdit', 'editedBook'],
  data: () => ({
    valid: false,
    titleRules: [
      v => !!v || 'Title is required',
    ],
    authorRules: [
      v => !!v || 'Author is required',
    ],
    pagecountRules: [
      v => !!v || 'Page count is required',
    ],
    categories: [
      'Architecture',
      'Art',
      'Biography and Autobiography',
      'Body Mind and Spirit',
      'Business and Economics',
      'Computers',
      'Cooking',
      'Crafts & Hobbies',
      'Drama',
      'Education',
      'Fiction',
      'Health and Fitness',
      'History',
      'Humor',
      'Law',
      'Literature & Fiction',
      'Miscellaneous',
      'Mystery, Thriller & Suspense',
      'Outdoors & Nature',
      'Periodicals',
      'Philosophy',
      'Photography',
      'Politics & Social Sciences',
      'Psychology',
      'Science Fiction',
      'Social Science',
      'Technology and Engineering',
      'Transportation',
      'Travel',
    ],
    defaultItem: {
      title: '',
      author: '',
      category: '',
      pagecount: 0,
    },
    itemID: '',
  }),
  computed: {
    formTitle() {
      return this.newOrEdit === -1 ? 'New Book' : 'Edit Book';
    },
  },
  methods: {
    addBook(book) {
      if (this.$refs.form.validate()) {
        if (this.newOrEdit > -1) {
          db.collection('books').doc(book.id).update(this.editedBook);
          this.close();
        } else {
          db.collection('books').add(book);
          this.close();
        }
      }
    },
    close() {
      this.resetValidation();
      setTimeout(() => {
        this.editedBook = Object.assign({}, this.defaultItem);
        this.$emit('update:isOpen', false);
        this.$emit('clearItem');
      }, 0);
    },
    selectCategory(event) {
      this.editedBook.category = event;
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  }
};
</script>

<style>

</style>
