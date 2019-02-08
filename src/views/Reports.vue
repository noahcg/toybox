<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="text-xs-left font-weight-regular">Reports</h1>
        <p class="text-xs-left">
          This page is used to generate reports based on the books in my library.
        </p>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <ReportCards />
    </v-layout>
  </v-container>
</template>

<script>
import ReportCards from '../components/ReportCards';

export default {
  components: {
    ReportCards
  },
};
</script>
