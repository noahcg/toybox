<template>
  <div>
    <p>You have read {{ numOfBooks }} books so far.</p>
    <v-btn @click.native="getTotalPageCount">Click Me</v-btn>
    <p>You have read {{ numOfPages }} pages so far.</p>
  </div>
</template>

<script>
import { db } from '../main';
export default {
  name: 'ReportCards',
  data: () => ({
    books: [],
    numOfBooks: '',
    numOfPages: '',
    pageCountArr: [],
  }),
  firestore() {
    return {
      books: db.collection('books'),
    };
  },
  watch: {
    numOfBooks: function() {
      return this.books.length;
    }
  },
  methods: {
    getTotalBooks() {
      this.numOfBooks = this.books.length;
    },
    getTotalPageCount() {
      this.books.forEach((item, index) => {
        this.pageCountArr.push(parseInt(item.pagecount));
      });
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      this.numOfPages = this.pageCountArr.reduce(reducer);
    },
  },
};
</script>

<style>

</style>
