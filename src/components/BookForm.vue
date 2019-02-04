<template>
  <b-row>
    <section class="col-md-12 mx-auto mt-5 toggle-button-container">
      <b-btn class="toggle-form-btn" v-b-toggle.collapse1 variant="primary">Add a book to the library
        <span class="when-opened">&times;</span>
        <span class="when-closed">+</span>
      </b-btn>
    </section>
    <section id="form-container" class="col-md-12 py-4 mb-5">
      <b-collapse id="collapse1" class="mt-2">
        <b-form class="text-left" @submit="addBook" @reset="onReset">
          <b-row>
            <b-col>
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
                          label="Category:"
                          label-for="exampleInput3">
                <b-form-select id="exampleInput3" v-model="categorySelected" :options="categories" class="mb-3" @change="selectCategory" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="exampleInputGroup4"
                            label="Number of Pages:"
                            label-for="exampleInput4">
                <b-form-input id="exampleInput4"
                              type="text"
                              v-model="newBookPageCount"
                              required
                              placeholder="Enter number of pages">
                </b-form-input>
              </b-form-group>
              <b-form-group id="exampleInputGroup5"
                            label="Date Read:"
                            label-for="exampleInput5">
                <date-pick v-model="date"
                        id="exampleInput5"
                        :format="format"
                        :parseDate="parseDate"
                        :formatDate="formatDate"
                        :inputAttributes="{size: 32}"
                        type="text"
                        class="datePickExample"
                        required>
                </date-pick>
              </b-form-group>
            </b-col>
          </b-row>


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
import fecha from 'fecha';

const filters = {
  all(books) {
    return books;
  },
};

export default {
  name: 'BookForm',
  components: { DatePick },
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
      format: 'MMMM Do, YYYY',
      date: fecha.format(new Date(), 'MMMM Do, YYYY'),
      categorySelected: null,
      categories: [
        { value: null, text: 'Please select an option' },
        { value: 'Arts & Photography', text: 'Arts & Photography' },
        { value: 'Biographies & Memoirs', text: 'Biographies & Memoirs' },
        { value: 'Business & Investing', text: 'Business & Investing' },
        { value: 'Computers & Technology', text: 'Computers & Technology' },
        { value: 'Education & Reference', text: 'Education & Reference' },
        { value: 'Health, Fitness & Dieting', text: 'Health, Fitness & Dieting' },
        { value: 'History', text: 'History' },
        { value: 'Law', text: 'Law' },
        { value: 'Literature & Fiction', text: 'Literature & Fiction' },
        { value: 'Mystery, Thriller & Suspense', text: 'Mystery, Thriller & Suspense' },
        { value: 'Politics & Social Sciences', text: 'Politics & Social Sciences' },
        { value: 'Professional & Technical', text: 'Professional & Technical' },
        { value: 'Science & Math', text: 'Science & Math' },
        { value: 'Science Fiction & Fantasy', text: 'Science Fiction & Fantasy' },
        { value: 'Travel', text: 'Travel' },
      ],
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
      this.categorySelected = null;
      this.newBookPageCount = '';
      this.date = fecha.format(new Date(), 'MMMM Do, YYYY');
    },
    selectCategory(value, text) {
      this.categorySelected = value;
    },
    parseDate(dateString, format) {
      return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
      return fecha.format(dateObj, format);
    },
    addBook(evt) {
      evt.preventDefault();
      const titleValue = this.newBookTitle && this.newBookTitle.trim();
      const authorValue = this.newBookAuthor && this.newBookAuthor.trim();
      const categoryValue = this.categorySelected && this.categorySelected.trim();
      const pageCountValue = this.newBookPageCount && this.newBookPageCount.trim();
      const dateValue = this.date && this.date.trim();

      if (!titleValue && !authorValue && !categoryValue && !pageCountValue && !dateValue) {
        return;
      }
      const book = {
        title: titleValue,
        author: authorValue,
        category: categoryValue,
        pageCount: pageCountValue,
        date: dateValue,
      };
      this.$emit('bookAdded', book);
      this.newBookTitle = '';
      this.newBookAuthor = '';
      this.categorySelected = null;
      this.newBookPageCount = '';
      this.date = fecha.format(new Date(), 'MMMM Do, YYYY');
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

  .collapsed > .when-opened,
  :not(.collapsed) > .when-closed {
    display: none;
  }

  /deep/.datePickExample>input {
    font-size: 14px;
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 8px 40px 8px 10px;
    // padding-right: 40px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 4px;
    background: transparent;
    border: 1px solid #e0e0e0;
    // box-shadow: 0 0.1em 0.3em rgba(0,0,0,.05);
    outline: 0;
  }

</style>
