<template>
  <base-section id="theme-features">
    <base-section-heading title="Toybox Features">
      Below is a list of things I hope you all will be able to do with my
      toybox.
    </base-section-heading>

    <v-container>
      <v-row>
        <v-col v-for="(feature, i) in features" :key="i" cols="12" md="6">
          <base-avatar-card v-bind="feature" align="left" horizontal>
          </base-avatar-card>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
export default {
  name: "SectionThemeFeatures",

  data: () => ({
    features: [
      {
        title: "Look Through My Toys",
        icon: "mdi-toy-brick-search",
        text: "You can look through the list of all my toys."
      },
      {
        title: "See Which Toys I Like",
        icon: "mdi-thumb-up",
        text:
          "I occassionally grow out of toys. Find out which ones I'm into, and which ones I'm not really feeling right now."
      },
      {
        color: "primary",
        dark: true,
        title: "Manage My Toybox",
        icon: "mdi-table-cog",
        text:
          "This one's for parents only. They can add new toys, edit the toys I already have, and remove toys I no longer play with."
      },
      {
        title: "No More Guessing",
        icon: "mdi-shopping-search",
        text:
          "Take the guesswork out of shopping for me. You no longer need to call my parents to see what I already have. No more calling to see what I'm 'into' right now."
      }
    ]
  })
};
</script>
