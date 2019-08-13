<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md6></v-flex>
      <v-flex xs12 md6>
        <!-- <h2
          class="text-xs-right font-weight-regular"
        >Last beer added on {{ this.$moment.max(this.dateArray).format("MMM Do YYYY") }}</h2>-->
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-5">
      <v-flex xs12 md3>
        <v-card>
          <v-card-title primary-title>
            <span class="title font-weight-light">Breweries</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <p class="display-2 mb-0 brown--text font-weight-black">{{ uniqueBreweries.length }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md3>
        <v-card>
          <v-card-title primary-title>
            <span class="title font-weight-light">Total Beers</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <p class="display-2 mb-0 brown--text font-weight-black">{{ totalBeerCount }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md3>
        <v-card>
          <v-card-title primary-title>
            <span class="title font-weight-light">Unique Beers</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <p class="display-2 mb-0 brown--text font-weight-black">{{ beers.length }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md3>
        <v-card>
          <v-card-title primary-title>
            <span class="title font-weight-light">Number of Styles</span>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="py-5">
            <p class="display-2 mb-0 brown--text font-weight-black">{{ uniqueStyles.length }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <h1 class="text-xs-left font-weight-regular">Breakdowns</h1>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-card class="v-card--material-stats">
          <div class="v-card__text">
            <div class="text-xs-left">
              <h3 class="title display-1 font-weight-light">
                Top Breweries
                <small></small>
              </h3>
            </div>
          </div>
          <v-card-text class="pt-4 pb-4">
            <doughnut-chart :chart-data="brewerycollection" :options="brewerycollection.options"></doughnut-chart>
          </v-card-text>
          <v-card-actions class="card-actions">
            <p class="category grey--text font-weight-light">
              <v-icon class="calendar-icon">folder_special</v-icon>Top Breweries
            </p>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card class="v-card--material-stats">
          <div class="v-card__text">
            <div class="text-xs-left">
              <h3 class="title display-1 font-weight-light">
                Top Beers
                <small></small>
              </h3>
            </div>
          </div>
          <v-card-text class="pt-4 pb-4">
            <doughnut-chart :chart-data="popularcollection" :options="popularcollection.options"></doughnut-chart>
          </v-card-text>
          <v-card-actions class="card-actions">
            <p class="category grey--text font-weight-light">
              <v-icon class="calendar-icon">stars</v-icon>Top Beers
            </p>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card class="v-card--material-stats">
          <div class="v-card__text">
            <div class="text-xs-left">
              <h3 class="title display-1 font-weight-light">
                Top Styles
                <small></small>
              </h3>
            </div>
          </div>
          <v-card-text class="pt-4 pb-4">
            <doughnut-chart :chart-data="stylecollection" :options="stylecollection.options"></doughnut-chart>
          </v-card-text>
          <v-card-actions class="card-actions">
            <p class="category grey--text font-weight-light">
              <v-icon class="calendar-icon">mdi-calendar</v-icon>Top Styles
            </p>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "../main";
import DoughnutChart from "./DoughnutChart.vue";

export default {
  name: "ReportCards",
  components: {
    DoughnutChart
  },
  data: () => ({
    beers: [],
    uniqueBreweries: [],
    uniqueBeers: [],
    uniqueStyles: [],
    brewerycollection: {},
    beercollection: {},
    stylecollection: {},
    popularcollection: {},
    compressedBreweries: [],
    compressedBeers: [],
    compressedStyles: [],
    compressedPopular: [],
    beerColors: [],
    breweryColors: [],
    styleColors: [],
    popularColors: [],
    popularBreweries: [],
    popBeerLabels: [],
    popBeerValues: []
  }),
  mounted() {
    this.$bind("beers", db.collection("beers"))
      .then(() => {
        this.separateData();
        this.fillDoughnut();
      })
      .catch(error => {
        console.log(`error in loading: ${error}`);
      });
  },
  computed: {
    totalBeerCount() {
      return this.beerCountArray.reduce((a, b) => a + b, 0).toLocaleString();
    },
    beerCountArray() {
      const beerCount = [];
      this.beers.forEach(item => {
        beerCount.push(parseInt(item.quantity, 10));
      });
      return beerCount;
    },
    breweryArray() {
      return this.beers.map(beer => {
        return beer.brewery;
      });
    },
    beerArray() {
      return this.beers.map(beer => {
        if (beer.quantity > 1) {
          return beer.beer;
        }
      });
    },
    popularBeerArray() {
      const popularBeers = [];
      this.beers.forEach(item => {
        if (item.quantity > 1) {
          popularBeers.push({ beer: item.beer, quantity: item.quantity });
        }
      });
      return popularBeers;
    },
    styleArray() {
      return this.beers.map(beer => {
        return beer.style;
      });
    }
  },
  methods: {
    separateData() {
      let findDuplicates = arr =>
        arr.filter((item, index) => arr.indexOf(item) != index);

      this.uniqueBreweries = [...new Set(this.breweryArray)];
      this.uniqueBeers = [...new Set(this.beerArray)];
      this.uniqueStyles = [...new Set(this.styleArray)];
      this.uniqueStyleLabels = [...new Set(findDuplicates(this.styleArray))];
      this.popularBreweries = [...new Set(findDuplicates(this.breweryArray))];

      this.popularBeerArray.forEach(item => {
        this.popBeerLabels.push(item.beer);
        this.popBeerValues.push(item.quantity);
      });

      // Get count of how many times an item appears in an array to create chart values
      this.compressArray(this.beerArray, this.compressedBeers);
      this.compressArray(this.breweryArray, this.compressedBreweries);
      this.compressArray(this.styleArray, this.compressedStyles);
      this.compressArray(this.popularBeerArray, this.compressedPopular);

      // Generate dynamic colors for beers
      for (let i in this.beerArray) {
        this.beerColors.push(this.dynamicColors());
      }

      // Generate dynamic colors for breweries
      for (let i in this.breweryArray) {
        this.breweryColors.push(this.dynamicColors());
      }

      // Generate dynamic colors for styles
      for (let i in this.styleArray) {
        this.styleColors.push(this.dynamicColors());
      }

      // Generate dynamic colors for popular beers
      for (let i in this.popularBeerArray) {
        this.popularColors.push(this.dynamicColors());
      }
    },
    fillDoughnut() {
      this.brewerycollection = {
        labels: this.popularBreweries,
        datasets: [
          {
            backgroundColor: this.breweryColors,
            data: this.compressedBreweries
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
      this.beercollection = {
        labels: this.uniqueBeers,
        datasets: [
          {
            backgroundColor: this.beerColors,
            data: this.compressedBeers
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
      this.stylecollection = {
        labels: this.uniqueStyleLabels,
        datasets: [
          {
            backgroundColor: this.styleColors,
            data: this.compressedStyles
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
      this.popularcollection = {
        labels: this.popBeerLabels,
        datasets: [
          {
            backgroundColor: this.popularColors,
            data: this.popBeerValues
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
        if (myCount > 1) {
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/materials";

.card-text {
  width: 100% !important;
}
.calendar-icon {
  font-size: 16px;
}

.card-actions {
  border-top: 1px solid #ccc;
  padding: 10px 20px;
  line-height: 22px;
}
</style>