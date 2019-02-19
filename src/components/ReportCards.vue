<template>
  <v-container
    fluid
    grid-list-md
  >
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-card>
          <v-card-title primary-title>
            <div class="card-text">
              <h2 class="headline mb-0">{{ books.length }}</h2>
              <h3>Books</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card>
          <v-card-title primary-title>
            <div class="card-text">
              <h2 class="headline mb-0">{{ totalPages }}</h2>
              <h3>Pages</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card>
          <v-card-title primary-title>
            <div class="card-text">
              <h2 class="headline mb-0">{{ uniqueCategories.length }}</h2>
              <h3>Categories</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card>
          <v-card-title primary-title>
            <div class="card-text">
              <h3>Top Categories</h3>
              <v-list>
                 <template v-for="(category, index) in uniqueCategories">
                   <v-list-tile :key="index">
                     <v-list-tile-content>
                      <v-list-tile-title> {{ category }} </v-list-tile-title>
                    </v-list-tile-content>
                   </v-list-tile>
                   <v-divider :key="index"></v-divider>
                 </template>
              </v-list>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card>
          <v-card-title primary-title>
            <div class="card-text">
              <h2 class="headline mb-0">{{ uniqueAuthors.length }}</h2>
              <h3>Authors</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card>
          <v-card-title primary-title>
            <div class="card-text">
              <h3>Top Authors</h3>
              <v-list>
                 <template v-for="(author, index) in uniqueAuthors">
                   <v-list-tile :key="index">
                     <v-list-tile-content>
                      <v-list-tile-title> {{ author }} </v-list-tile-title>
                    </v-list-tile-content>
                   </v-list-tile>
                   <v-divider :key="index"></v-divider>
                 </template>
              </v-list>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from '../main';

export default {
  name: 'ReportCards',
  data: () => ({
    books: [],
    pageCountArr: [],
    categoryArray: [],
    uniqueCategories: [],
    authorArray: [],
    uniqueAuthors: [],
    totalPages: 0,
  }),
  mounted() {
    this.$bind('books', db.collection('books'))
      .then(this.separateData)
      .catch((error) => {
        console.log(`error in loading: ${error}`);
      });
  },
  methods: {
    separateData() {
      this.books.forEach((item) => {
        this.pageCountArr.push(parseInt(item.pagecount, 10));
        this.categoryArray.push(item.category);
        this.authorArray.push(item.author);
      });

      this.totalPages = this.pageCountArr.reduce((a, b) => a + b, 0).toLocaleString();

      this.uniqueCategories = [...new Set(this.categoryArray)];

      this.uniqueAuthors = [...new Set(this.authorArray)];
    },
  },
};
</script>

<style lang="scss" scoped>
.card-text {
  width: 100% !important;
}
</style>
