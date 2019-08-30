<template>
  <v-container>
    <div class="pa-12 theme--light grey lighten-4">
      <section class="layout wrap mb-12">
        <div class="flex">
          <div class="container grey--text text--darken-2 container--fluid grid-list-md pa-0">
            <p class="title">{{ $route.params.book.title }}</p>
            <p>Author: {{ $route.params.book.author }}</p>
            <p>Category: {{ $route.params.book.category }}</p>
            <p>Owner: {{ $route.params.book.ownership }}</p>
            <p>Pages: {{ $route.params.book.pagecount }}</p>
          </div>
        </div>
      </section>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "book"
};
</script>
