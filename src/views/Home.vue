<template>
  <div class="container">
    <BookForm :books="books" @bookAdded="bookAdded" />
    <book-table :books="books" @bookDeleted="bookDeleted" v-if="books.length" />
    <p v-else>
      No books yet. Add a book in the form above.
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import BookForm from '@/components/BookForm.vue';
import BookTable from '@/components/BookTable.vue';

const STORAGE_KEY = 'myStorageKey';
let bookStorage = {
  fetch: function () {
    let books = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    books.forEach(function (book, index) {
      book.id = index;
    });
    bookStorage.uid = books.length;
    return books;
  },
  save: function (books) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }
};

export default {
  name: 'home',
  components: {
    BookForm,
    BookTable,
  },
  data() {
    return {
      books: bookStorage.fetch(),
    }
  },
  methods: {
    bookAdded(book) {
      book.id = bookStorage.uid++;
      this.books.push(book);
    },
    bookDeleted(book) {
      this.books.splice(this.books.indexOf(book), 1);
    },
  },
  watch: {
    books: {
      handler: function (books) {
        bookStorage.save(books)
      },
      deep: true
    }
  },
};
</script>
