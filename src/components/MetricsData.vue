<template>
  <v-container container fluid grid-list-xl>
    <v-layout row wrap mb-4>
      <v-flex xs6>
        <p class="headline mb-0 text-xs-left">By the numbers</p>
      </v-flex>
      <v-flex xs6>
        <p
          v-if="dateArray.length"
          class="title font-weight-light mb-0 text-right"
        >Last book read on {{ this.$moment.max(this.dateArray).format("MMM Do YYYY") }}</p>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-5">
      <v-flex sm6 xs12 md6 lg3>
        <v-card>
          <v-card-title primary-title>
            <span class="body-2 font-weight-light">Books You Own</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <p class="display-2 mb-0 blue--text font-weight-black">{{ myOwnBooks.length }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <v-card>
          <v-card-title primary-title>
            <span class="body-2 font-weight-light">Books You've Read</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <p class="display-2 mb-0 blue--text font-weight-black">{{ didYouRead.length }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <v-card>
          <v-card-title primary-title>
            <span class="body-2 font-weight-light">Library Books You've Checked Out</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <p class="display-2 mb-0 blue--text font-weight-black">{{ libraryBooks.length }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <v-card>
          <v-card-title primary-title>
            <span class="body-2 font-weight-light">Total Pages in Library</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <p class="display-2 mb-0 blue--text font-weight-black">{{ totalPageCount }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <v-card>
          <v-card-title primary-title>
            <span class="body-2 font-weight-light">Total Pages You've Read</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <p class="display-2 mb-0 blue--text font-weight-black">{{ totalPagesRead }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <v-card>
          <v-card-title primary-title>
            <span class="body-2 font-weight-light">Categories</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <p class="display-2 mb-0 blue--text font-weight-black">{{ uniqueCategories.length }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <v-card>
          <v-card-title primary-title>
            <span class="body-2 font-weight-light">Authors</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <p class="display-2 mb-0 blue--text font-weight-black">{{ uniqueAuthors.length }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <p class="headline mb-4 text-xs-left">Breakdowns</p>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-card class="v-card--material-stats">
          <div class="v-card__text">
            <div class="text-xs-right">
              <h3 class="title display-1 font-weight-light">
                Top Categories
                <small></small>
              </h3>
            </div>
          </div>
          <v-card-text class="pt-4 pb-4">
            <doughnut-chart :chart-data="categorycollection" :options="categorycollection.options"></doughnut-chart>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card class="v-card--material-stats">
          <div class="v-card__text">
            <div class="text-xs-right">
              <h3 class="title display-1 font-weight-light">
                Top Authors
                <small></small>
              </h3>
            </div>
          </div>
          <v-card-text class="pt-4 pb-4">
            <doughnut-chart :chart-data="authorcollection" :options="authorcollection.options"></doughnut-chart>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card class="v-card--material-stats">
          <div class="v-card__text">
            <div class="text-xs-right">
              <h3 class="title display-1 font-weight-light">
                Completed
                <small></small>
              </h3>
            </div>
          </div>
          <v-card-text class="pt-4 pb-4">
            <bar-chart
              v-if="reducedBooks.length"
              :chart-data="monthcollection"
              :options="monthcollection.options"
            ></bar-chart>
            <p v-else class="text-center">Read more books</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "../main";
import DoughnutChart from "./DoughnutChart.vue";
import BarChart from "./BarChart.vue";
export default {
  name: "ReportCards",
  components: {
    DoughnutChart,
    BarChart
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
    monthColors: []
  }),
  mounted() {
    this.$bind("books", db.collection("books"))
      .then(() => {
        this.separateData();
        this.fillDoughnut();
        this.fillBar();
      })
      .catch(error => {
        console.log(`error in loading: ${error}`);
      });
  },
  computed: {
    reducedBooks() {
      const withinThreeMonths = [];
      this.books.forEach(book => {
        if (
          this.$moment(book.date) >= this.threeMonthsAgo &&
          this.$moment(book.date) <= this.$moment(new Date())
        ) {
          withinThreeMonths.push(book);
        }
      });
      return withinThreeMonths;
    },
    totalPageCount() {
      return this.pageCountArray.reduce((a, b) => a + b, 0).toLocaleString();
    },
    totalPagesRead() {
      return this.pagesReadArray.reduce((a, b) => a + b, 0).toLocaleString();
    },
    pageCountArray() {
      const pageCount = [];
      this.books.forEach(item => {
        pageCount.push(parseInt(item.pagecount, 10));
      });
      return pageCount;
    },
    pagesReadArray() {
      const pagesRead = [];
      this.books.forEach(item => {
        if (item.readOrNot == "Yes") {
          pagesRead.push(parseInt(item.pagecount, 10));
        }
      });
      return pagesRead;
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
      return this.reducedBooks.map(book => {
        return book.date;
      });
    },
    convertedMonths() {
      return this.uniqueMonths.map(month => {
        return this.$moment(month).format("MMMM");
      });
    },
    threeMonthsAgo() {
      return this.$moment(new Date()).subtract(3, "months");
    },
    didYouRead() {
      const booksIRead = [];
      this.books.forEach(item => {
        if (item.readOrNot == "Yes") {
          booksIRead.push(item);
        }
      });
      return booksIRead;
    },
    libraryBooks() {
      const libBooks = [];
      this.books.forEach(item => {
        if (item.ownership == "Library") {
          libBooks.push(item);
        }
      });
      return libBooks;
    },
    myOwnBooks() {
      const myBooks = [];
      this.books.forEach(item => {
        if (item.ownership == "Own") {
          myBooks.push(item);
        }
      });
      return myBooks;
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
            data: this.compressedCategories
          }
        ],
        options: {
          legend: {
            labels: {
              boxWidth: 10
            }
          }
        }
      };
      this.authorcollection = {
        labels: this.uniqueAuthors,
        datasets: [
          {
            backgroundColor: this.authorColors,
            data: this.compressedAuthors
          }
        ],
        options: {
          legend: {
            labels: {
              boxWidth: 10
            }
          }
        }
      };
    },
    fillBar() {
      this.monthcollection = {
        labels: this.convertedMonths,
        datasets: [
          {
            label: "Books",
            backgroundColor: this.monthColors,
            data: this.compressedMonths
          }
        ],
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  max: Math.max(...this.compressedMonths) + 1
                }
              }
            ]
          }
        }
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
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
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
  }
};
</script>

<style lang="scss" scoped>
.grid-list-md {
  padding-top: 60px;
  padding-bottom: 30px;
}
.v-card--material-stats {
  height: 100%;
}
.card-text {
  width: 100% !important;
}
.card-actions {
  border-top: 1px solid #ccc;
  padding: 10px 20px;
  line-height: 22px;
}
</style>