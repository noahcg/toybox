<template>
  <v-container
    fluid
    grid-list-md
  >
  <h1 class="text-xs-left font-weight-regular">Stats</h1>
    <v-layout row wrap class="mb-5">
      <v-flex xs12 md3>
        <v-card>
          <v-card-title primary-title>
            <span class="title font-weight-light">Books</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <p class="display-2 mb-0 blue--text">{{ books.length }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md3>
        <v-card>
          <v-card-title primary-title>
            <span class="title font-weight-light">Pages</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <p class="display-2 mb-0 blue--text">{{ totalPages }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md3>
        <v-card>
          <v-card-title primary-title>
            <span class="title font-weight-light">Categories</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <p class="display-2 mb-0 blue--text">{{ uniqueCategories.length }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md3>
        <v-card>
          <v-card-title primary-title>
            <span class="title font-weight-light">Authors</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <p class="display-2 mb-0 blue--text">{{ uniqueAuthors.length }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <h1 class="text-xs-left font-weight-regular">Breakdowns</h1>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-card>
          <v-card-title primary-title>
            <span class="title font-weight-light">Categories</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <doughnut-chart :chart-data="categorycollection"></doughnut-chart>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card>
          <v-card-title primary-title>
            <span class="title font-weight-light">Authors</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <doughnut-chart :chart-data="authorcollection"></doughnut-chart>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from '../main';
import DoughnutChart from './CategoryChart.vue';

export default {
  name: 'ReportCards',
  components: {
    DoughnutChart,
  },
  data: () => ({
    books: [],
    pageCountArr: [],
    categoryArray: [],
    uniqueCategories: [],
    authorArray: [],
    uniqueAuthors: [],
    totalPages: 0,
    categorycollection: null,
    authorcollection: null,
    compressedAuthors: [],
    compressedCategories: [],
    authorColors: [],
    categoryColors: [],
  }),
  mounted() {
    this.$bind('books', db.collection('books'))
      .then(() => {
        this.separateData();
        this.fillData();
      })
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

      this.compressArray(this.authorArray, this.compressedAuthors);
      this.compressArray(this.categoryArray, this.compressedCategories);

      for (var i in this.authorArray) {
        this.authorColors.push(this.dynamicColors());
      }

      for (var i in this.categoryArray) {
        this.categoryColors.push(this.dynamicColors());
      }
    },
    fillData () {
      this.categorycollection = {
        labels: this.uniqueCategories,
        datasets: [
          {
            backgroundColor: this.categoryColors,
            data: this.compressedCategories,
          }
        ],
      };
      this.authorcollection = {
        labels: this.uniqueAuthors,
        datasets: [
          {
            backgroundColor: this.authorColors,
            data: this.compressedAuthors,
          }
        ],
      }
    },
    compressArray(original, compressed) {
 
      // make a copy of the input array
      let copy = original.slice(0);
    
      // first loop goes over every element
      for (let i = 0; i < original.length; i++) {
    
        let myCount = 0;	
        // loop over every element in the copy and see if it's the same
        for (let w = 0; w < copy.length; w++) {
          if (original[i] == copy[w]) {
            // increase amount of times duplicate is found
            myCount++;
            // sets item to undefined
            delete copy[w];
          }
        }
    
        if (myCount > 0) {
          compressed.push(myCount);
        }
      }
    
      return compressed;
    },
    dynamicColors() {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    }
  },
};
</script>

<style lang="scss" scoped>

.card-text {
  width: 100% !important;
}
</style>
