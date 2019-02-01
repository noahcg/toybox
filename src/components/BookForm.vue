<template>
  <div class="row">
    <b-form class="col-md-8 mx-auto my-5 text-left" @submit="addBook" @reset="onReset">
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
      <b-button type="submit" variant="primary" class="mr-3">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

let filters = {
  all: function (books) {
    return books;
  },
  active: function (books) {
    return books.filter(function (book) {
      return !book.completed;
    });
  },
  completed: function (books) {
    return books.filter(function (book) {
      return book.completed;
    });
  }
}

export default {
  name: 'BookForm',
  props: {
    books: {
      type: Array,
      required: true,
    }
  },
  data () {
    return {
      show: false,
      newBookTitle: '',
      newBookAuthor: '',
      newBookPageCount: '',
      editedBook: null,
      visibility: 'all',
    }
  },
  computed: {
    filteredBooks: function () {
      return filters[this.visibility](this.books)
    },
  },
  methods: {
    onReset (evt) {
      evt.preventDefault();
      this.newBookTitle = '';
      this.newBookAuthor = '';
      this.newBookPageCount = '';
    },
    addBook: function () {
      var titleValue = this.newBookTitle && this.newBookTitle.trim();
      var authorValue = this.newBookAuthor && this.newBookAuthor.trim();
      var pageCountValue = this.newBookPageCount && this.newBookPageCount.trim();
      if (!titleValue && !authorValue && !pageCountValue) {
        return
      }
      const book = {
        title: titleValue,
        author: authorValue,
        pageCount: pageCountValue,
        completed: false
      };
      this.$emit('bookAdded', book);
      this.newBookTitle = '';
      this.newBookAuthor = '';
      this.newBookPageCount = '';
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
