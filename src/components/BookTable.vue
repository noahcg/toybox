<template>
  <b-table :fields="fields" :items="books" striped>
    <template slot="actions" slot-scope="{ value }">
      <button class="destroy" @click="removeBook(value)">&times;</button>
    </template>
  </b-table>
</template>

<script>
export default {
  props: {
    books: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
        fields: ['title', 'author', 'pageCount', 'actions'],
    };
  },
  methods: {
    removeBook(book) {
      this.$emit('bookDeleted', book);
    }
  }
}
</script>

<style scoped lang="scss">
.bookTable td {
  position: relative !important;
}
.bookTable td .destroy {
  background: none;
  border: 0;
  display: none;
  top: 0;
  right: 10px;
  bottom: 0;
  margin: auto 0;
  position: absolute;
  font-size: 30px;
  color: #cc9a9a;
  transition: color 0.2s ease-out;
  cursor: pointer;
}
.bookTable td:hover .destroy {
    display: block;
}
</style>
