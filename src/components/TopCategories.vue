<template>
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
      <bar-chart :chart-data="categorycollection" :options="categorycollection.options"></bar-chart>
    </v-card-text>
  </v-card>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
export default {
  name: "TopCategories",
  props: {
    books: {
      type: Array,
      required: true
    }
  },
  components: {
    BarChart
  },
  data: () => ({
    uniqueCategories: [],
    categorycollection: {},
    compressedCategories: [],
    categoryColors: [],
    categoryChartLabebls: [],
    categoryChartData: [],
    categoryChartScale: 0
  }),
  watch: {
    books: function() {
      this.init();
      this.fillBar();
    }
  },
  computed: {
    categoryArray() {
      return this.books.map(book => {
        return book.category;
      });
    }
  },
  methods: {
    init() {
      this.uniqueCategories = [...new Set(this.categoryArray)];

      // Generate dynamic colors for categories
      for (let i in this.uniqueCategories) {
        this.categoryColors.push(this.dynamicColors());
      }

      this.getCategoryLabels();

      let blah = [...new Set(this.categoryChartData)];

      this.categoryChartScale = parseInt(blah, 10);
    },
    getCategoryLabels() {
      // var compressed = [];
      let categories = [];

      for (var i = 0; i < this.categoryArray.length; i++) {
        categories.push(this.categoryArray[i]);
      }
      // make a copy of the input array
      var copy = categories.slice(0);

      // first loop goes over every element
      for (var i = 0; i < categories.length; i++) {
        var myCount = 0;
        // loop over every element in the copy and see if it's the same
        for (var w = 0; w < copy.length; w++) {
          if (categories[i] == copy[w]) {
            // increase amount of times duplicate is found
            myCount++;
            // sets item to undefined
            delete copy[w];
          }
        }

        if (myCount > 0) {
          var a = new Object();
          a.value = categories[i];
          a.count = myCount;

          if (a.count > 2) {
            this.categoryChartLabebls.push(a.value);
            this.categoryChartData.push(a.count);
          }
        }
      }
    },
    fillBar() {
      this.categorycollection = {
        labels: this.categoryChartLabebls,
        datasets: [
          {
            backgroundColor: this.categoryColors,
            data: this.categoryChartData
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
                  max: 6
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontSize: 10
                }
              }
            ]
          }
        }
      };
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
.v-card--material-stats {
  height: 100%;
}
</style>