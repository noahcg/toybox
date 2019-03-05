<template>
  <v-container
    fluid
    grid-list-md
  >
    <v-layout row wrap>
      <v-flex xs12 md6>
        <h1 class="text-xs-left font-weight-regular">By the numbers</h1>
      </v-flex>
      <v-flex xs12 md6>
        <h2 class="text-xs-right font-weight-regular">Last book read on {{ this.$moment.max(this.dateArray).format("MMM Do YYYY") }}</h2>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-5">
      <v-flex xs12 md3>
        <v-card>
          <v-card-title primary-title>
            <span class="title font-weight-light">Books</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <p class="display-2 mb-0 blue--text font-weight-black">{{ books.length }}</p>
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
            <p class="display-2 mb-0 blue--text font-weight-black">{{ totalPageCount }}</p>
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
            <p class="display-2 mb-0 blue--text font-weight-black">{{ uniqueCategories.length }}</p>
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
            <p class="display-2 mb-0 blue--text font-weight-black">{{ uniqueAuthors.length }}</p>
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
            <doughnut-chart :chart-data="categorycollection" :options="categorycollection.options"></doughnut-chart>
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
            <doughnut-chart :chart-data="authorcollection" :options="authorcollection.options"></doughnut-chart>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card>
          <v-card-title primary-title>
            <span class="title font-weight-light">Books read per month</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <bar-chart :chart-data="monthcollection" :options="monthcollection.options"></bar-chart>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from '../main';
import DoughnutChart from './DoughnutChart.vue';
import BarChart from './BarChart.vue';

export default {
  name: 'ReportCards',
  components: {
    DoughnutChart,
    BarChart,
  },
  data: () => ({
    books: [],
    uniqueCategories: [],
    uniqueAuthors: [],
    totalPages: 0,
    categorycollection: {},
    authorcollection: {},
    compressedAuthors: [],
    compressedCategories: [],
    authorColors: [],
    categoryColors: [],
    monthcollection: {},
    uniqueMonths: [],
    compressedMonths: [],
    monthColors: [],
  }),
  mounted() {
    this.$bind('books', db.collection('books'))
      .then(() => {
        this.separateData();
        this.fillDoughnut();
        this.fillBar();
      })
      .catch((error) => {
        console.log(`error in loading: ${error}`);
      });
  },
  computed: {
    totalPageCount() {
      return this.pageCountArray.reduce((a, b) => a + b, 0).toLocaleString();
    },
    monthCount() {
      return this.getCountMap(this.monthArray);
    },
    pageCountArray() {
      const pageCount = [];
      this.books.forEach(item => {
        pageCount.push(parseInt(item.pagecount, 10));
      });
      return pageCount;
    },
    categoryArray() {
      return this.books.map(book => {
        return book.category;
      });
    },
    authorArray() {
      return this.books.map(book => {
        return book.author;
      });
    },
    dateArray() {
      return this.books.map(book => {
        return this.$moment(book.date);
      });
    },
    monthArray() {
      return this.books.map(book => {
        return book.date;
      });
    },
    convertedMonths() {
      return this.uniqueMonths.map(month => {
        return this.$moment(month).format('MMMM');
      });
    }
  },
  methods: {
    separateData() {

      // Remove duplicates in arrays
      this.uniqueCategories = [...new Set(this.categoryArray)];
      this.uniqueAuthors = [...new Set(this.authorArray)];
      this.uniqueMonths = [...new Set(this.monthArray.sort())];

      const authorCount = {};
      this.authorArray.forEach(author => {
        if (authorCount[author]) {
          authorCount[author]++;
        } else {
          authorCount[author] = 1;
        }
      });

      // Get count of how many times an item appears in an array
      this.compressArray(this.authorArray, this.compressedAuthors);
      this.compressArray(this.categoryArray, this.compressedCategories);
      this.compressArray(this.monthArray, this.compressedMonths);

      // Generate dynamic colors for authors
      for (let i in this.authorArray) {
        this.authorColors.push(this.dynamicColors());
      }

      // Generate dynamic colors for categories
      for (let i in this.categoryArray) {
        this.categoryColors.push(this.dynamicColors());
      }

      // Generate dynamic colors for months
      for (let i in this.monthArray) {
        this.monthColors.push(this.dynamicColors());
      }
    },
    fillDoughnut() {
      this.categorycollection = {
        labels: this.uniqueCategories,
        datasets: [
          {
            backgroundColor: this.categoryColors,
            data: this.compressedCategories,
          },
        ],
        options: {
          legend: {
            labels: {
              boxWidth: 10,
            },
          },
        },
      };
      this.authorcollection = {
        labels: this.uniqueAuthors,
        datasets: [
          {
            backgroundColor: this.authorColors,
            data: this.compressedAuthors,
          },
        ],
        options: {
          legend: {
            labels: {
              boxWidth: 10,
            },
          },
        },
      };
    },
    fillBar() {
      this.monthcollection = {
        labels: this.convertedMonths,
        datasets: [
          {
            label: 'Books',
            backgroundColor: this.monthColors,
            data: this.compressedMonths,
          },
        ],
        options: {
          legend: {
            display: false,
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                max: Math.max(...this.compressedMonths) + 1,
              },
            }],
          },
        },
      };
    },
    compressArray(original, compressed) {
      // make a copy of the input array
      const copy = original.slice(0);
      // first loop goes over every element
      for (let i = 0; i < original.length; i++) {
        let myCount = 0;
        // loop over every element in the copy and see if it's the same
        for (let w = 0; w < copy.length; w++) {
          if (original[i] === copy[w]) {
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
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgb(${r} ${g} ${b})`;
    },
    getCountMap(values) {
      const countMap = new Map();
      values.forEach(value => {
        if (countMap.has(value)) {
          const count = countMap.get(value);
          const newCount = count++;
          countMap.set(value, newCount);
        } else {
          countMap.set(value, 1);
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>

.card-text {
  width: 100% !important;
}
</style>
