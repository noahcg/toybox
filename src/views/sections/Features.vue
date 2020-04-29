<template>
  <base-section id="features" class="secondary">
    <base-section-heading
      color="grey lighten-2"
      title="Future Ideas"
      textcolor="white--text"
    />

    <v-responsive class="mx-auto" max-width="1350">
      <v-container fluid>
        <v-row justify="center">
          <v-col
            v-for="card in cards"
            :key="card.title"
            cols="12"
            sm="4"
            md="3"
          >
            <base-info-card align="center" dark v-bind="card" />
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </base-section>
</template>

<script>
export default {
  name: "SectionFeatures",

  data: () => ({
    cards: [
      {
        icon: "mdi-update",
        title: "Automatic Updates",
        text:
          "Parent's can send out an updated inventory list from the toybox. This will be very helpful around birthdays and holidays."
      },
      {
        icon: "mdi-calendar-clock",
        title: "Coordinate",
        text:
          "Family and friends will be able to coordinate their gift purchases with each other."
      },
      {
        icon: "mdi-lightbulb-on-outline",
        title: "Toy Recommendations",
        text:
          "Toys and other gift recommendations will be generated based on the items in the toybox."
      }
    ]
  })
};
</script>
