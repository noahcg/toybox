<template>
  <b-row>
    <section class="col-md-12 mx-auto mt-5 toggle-button-container">
      <b-btn class="toggle-form-btn" v-b-toggle.collapse1 variant="primary">Add a book to the library
        <span class="when-opened">&times;</span>
        <span class="when-closed">+</span>
      </b-btn>
    </section>
    <section id="form-container" class="col-md-6 py-4 mb-5">
      <b-collapse id="collapse1" class="mt-2">
        <b-form class="text-left" @submit="addBook" @reset="onReset">
          <b-form-group id="exampleInputGroup1"
                        label="Book Title:"
                        label-for="exampleInput1">
            <b-form-input id="exampleInput1"
                          type="text"
                          v-model="newBookTitle"
                          required
                          placeholder="Enter book title">
            </b-form-input>
          </b-form-group>
          <b-form-group id="exampleInputGroup2"
                        label="Author:"
                        label-for="exampleInput2">
            <b-form-input id="exampleInput2"
                          type="text"
                          v-model="newBookAuthor"
                          required
                          placeholder="Enter author's name">
            </b-form-input>
          </b-form-group>
        <b-form-group id="exampleInputGroup3"
                        label="Number of Pages:"
                        label-for="exampleInput3">
            <b-form-input id="exampleInput3"
                          type="text"
                          v-model="newBookPageCount"
                          required
                          placeholder="Enter number of pages">
            </b-form-input>
          </b-form-group>
          <b-form-group id="exampleInputGroup4"
                        label="Date Read:"
                        label-for="exampleInput4">
            <date-pick v-model="date"
                     id="exampleInput4"
                     type="text"
                     required>
            </date-pick>
          </b-form-group>
          
          <b-button type="submit" variant="primary" class="mr-3">Add Book</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-collapse>
    </section>
    
  </b-row>
</template>

<script>

import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

const filters = {
  all(books) {
    return books;
  },
};

export default {
  name: 'BookForm',
  components: {DatePick},
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newBookTitle: '',
      newBookAuthor: '',
      newBookPageCount: '',
      editedBook: null,
      visibility: 'all',
      date: '2019-01-01',
    };
  },
  computed: {
    filteredBooks() {
      return filters[this.visibility](this.books);
    },
  },
  methods: {
    onReset(evt) {
      evt.preventDefault();
      this.newBookTitle = '';
      this.newBookAuthor = '';
      this.newBookPageCount = '';
      this.date = '2019-01-01';
    },
    addBook(evt) {
      evt.preventDefault();
      const titleValue = this.newBookTitle && this.newBookTitle.trim();
      const authorValue = this.newBookAuthor && this.newBookAuthor.trim();
      const pageCountValue = this.newBookPageCount && this.newBookPageCount.trim();
      const dateValue = this.date && this.date.trim();
      if (!titleValue && !authorValue && !pageCountValue && !dateValue) {
        return;
      }
      const book = {
        title: titleValue,
        author: authorValue,
        pageCount: pageCountValue,
        date: dateValue,
      };
      this.$emit('bookAdded', book);
      this.newBookTitle = '';
      this.newBookAuthor = '';
      this.newBookPageCount = '';
      this.date = '2019-01-01';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .toggle-button-container {
    border-bottom: 2px solid #333;
  }

  .toggle-form-btn {
    background: none;
    border: none;
    color: #333;
    float: left;
    font-size: 1.7rem;
    height: auto;
    padding: 0;
    text-align: left;

    &:focus, &:active {
      box-shadow: none !important;
      background: none !important;
      border: 0 !important;
      color: #333 !important;
    }
  }
  // #form-container {
  //   border-top: 2px solid #333;
  // }
  .collapsed > .when-opened,
  :not(.collapsed) > .when-closed {
    display: none;
  }
</style>
