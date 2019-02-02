<template>
  <b-row>
    <b-col md="5">
      <b-form-group horizontal label="Find a book" class="mb-3 text-left">
        <b-input-group>
          <b-form-input v-model="filter" placeholder="Type to Search" />
        </b-input-group>
      </b-form-group>
    </b-col>
    <b-table :fields="fields"
             :items="books"
             striped
             fixed
             :filter="filter"
             class="text-left mb-5">
      <template slot="remove" slot-scope="{ value }">
        <button class="destroy" @click="removeBook(value)">&times;</button>
      </template>
    </b-table>
  </b-row>
</template>

<script>
export default {
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'title',
          label: 'Book Title',
          sortable: true,
          class: 'bookfields title-field',
        },
        {
          key: 'author',
          label: 'Author',
          sortable: true,
          class: 'bookfields author-field',
        },
        {
          key: 'pageCount',
          label: 'Page Count',
          sortable: true,
          class: 'bookfields page-count-field',
        },
        {
          key: 'date',
          label: 'Date Read',
          sortable: true,
          class: 'bookfields date-field',
        },
        {
          key: 'remove',
          label: 'Remove',
          sortable: false,
          class: 'bookfields remove-field',
        },
      ],
      filter: null,
    };
  },
  computed: {
    sortOptions() {
      return this.fields.filter(f => f.sortable).map(f => ({ text: f.title, value: f.key }));
    },
  },
  methods: {
    removeBook(book) {
      this.$emit('bookDeleted', book);
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .bookfields {
  position: relative;
}
.destroy {
  background: none;
  border: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
  position: absolute;
  font-size: 30px;
  color: #cc9a9a;
  transition: color 0.2s ease-out;
  cursor: pointer;
}
</style>
