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
              <h3>Categories</h3>
              <doughnut-chart :chart-data="categorycollection"></doughnut-chart>
              <!-- <v-list>
                 <template v-for="(category, index) in uniqueCategories">
                   <v-list-tile :key="index">
                     <v-list-tile-content>
                      <v-list-tile-title> {{ category }} </v-list-tile-title>
                    </v-list-tile-content>
                   </v-list-tile>
                   <v-divider :key="index"></v-divider>
                 </template>
              </v-list> -->
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
              <h3>Authors</h3>
              <doughnut-chart :chart-data="authorcollection"></doughnut-chart>
              <!-- <v-list>
                 <template v-for="(author, index) in uniqueAuthors">
                   <v-list-tile :key="index">
                     <v-list-tile-content>
                      <v-list-tile-title> {{ author }} </v-list-tile-title>
                    </v-list-tile-content>
                   </v-list-tile>
                   <v-divider :key="index"></v-divider>
                 </template>
              </v-list> -->
            </div>
          </v-card-title>
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
      var copy = original.slice(0);
    
      // first loop goes over every element
      for (var i = 0; i < original.length; i++) {
    
        var myCount = 0;	
        // loop over every element in the copy and see if it's the same
        for (var w = 0; w < copy.length; w++) {
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
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
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
