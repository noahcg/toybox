<template>
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
        v-if="books.length"
        :chart-data="monthcollection"
        :options="monthcollection.options"
      ></bar-chart>
      <p v-else class="text-center">Read more books</p>
    </v-card-text>
  </v-card>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
export default {
  name: "CompletedBooks",
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
    monthcollection: {},
    uniqueMonths: [],
    booksPerMonthData: [],
    monthColors: [],
    booksPerMonthLabels: []
  }),
  watch: {
    books: function() {
      this.init();
      this.fillBar();
    }
  },
  computed: {
    monthArray() {
      return this.books.map(book => {
        return book.date;
      });
    }
  },
  methods: {
    init() {
      this.uniqueMonths = [...new Set(this.monthArray.sort())];

      // Generate dynamic colors for months
      for (let i in this.monthArray) {
        this.monthColors.push(this.dynamicColors());
      }

      let mArray = [];
      this.monthArray.forEach(month => {
        mArray.push(this.$moment(month).month());
      });

      this.booksPerMonthData = this.countMonths(mArray);
      this.booksPerMonthLabels = this.getMonthLabels();

      // console.log("month data");
      // console.log(Math.max(...this.booksPerMonthData));
      // console.log(this.booksPerMonthData);
    },
    getMonthLabels() {
      var compressed = [];
      let properMonth = [];

      for (var i = 0; i < this.monthArray.length; i++) {
        properMonth.push(this.$moment(this.monthArray[i]).format("MMMM"));
      }
      // make a copy of the input array
      var copy = properMonth.slice(0);

      // first loop goes over every element
      for (var i = 0; i < properMonth.length; i++) {
        var myCount = 0;
        // loop over every element in the copy and see if it's the same
        for (var w = 0; w < copy.length; w++) {
          if (properMonth[i] == copy[w]) {
            // increase amount of times duplicate is found
            myCount++;
            // sets item to undefined
            delete copy[w];
          }
        }

        if (myCount > 0) {
          var a = new Object();
          a.value = properMonth[i];
          a.count = myCount;
          compressed.push(a.value);
        }
      }

      return compressed;
    },
    countMonths(original) {
      var compressed = [];
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
          var a = new Object();
          a.count = myCount;
          compressed.push(myCount);
        }
      }

      return compressed;
    },
    fillBar() {
      this.monthcollection = {
        labels: this.booksPerMonthLabels,
        datasets: [
          {
            label: "Books",
            backgroundColor: this.monthColors,
            data: this.booksPerMonthData
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
                  max: Math.max(...this.booksPerMonthData) + 1,
                  stepSize: 1
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