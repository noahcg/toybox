<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <ReportCards />
    </v-layout>
  </v-container>
</template>

<script>
import ReportCards from "../components/ReportCards.vue";

export default {
  components: {
    ReportCards
  }
};
</script>
