<template>
  <section id="hero">
    <v-img
      :min-height="minHeight"
      :src="require('@/assets/ollie.jpg')"
      class="white--text"
      gradient="to right, rgba(5, 11, 31, .8), rgba(5, 11, 31, .8)"
    >
      <v-container class="fill-height px-4 py-12">
        <v-responsive
          class="d-flex align-center"
          height="100%"
          max-width="600"
          width="100%"
        >
          <base-heading title="LETTING MY FAMILY & FRIENDS SEE MY TOYS" />

          <base-body>
            This is a great place for everyone to be able to see all my
            wonderful toys. That way, if you decide to buy me a gift, you
            already know what I have. And what I like. All without having to
            call my parents.
          </base-body>

          <div
            :class="
              $vuetify.breakpoint.smAndDown
                ? 'flex-column align-start'
                : 'align-center'
            "
            class="d-flex flex-wrap"
          >
            <base-btn to="/login">
              Get Started Now
            </base-btn>
          </div>
        </v-responsive>
      </v-container>
    </v-img>
  </section>
</template>

<script>
export default {
  name: "SectionHero",

  provide: {
    theme: { isDark: true }
  },

  computed: {
    minHeight() {
      const height = this.$vuetify.breakpoint.mdAndUp ? "100vh" : "50vh";

      return `calc(${height} - ${this.$vuetify.application.top}px)`;
    }
  }
};
</script>
<style lang="scss">
#hero .v-image__image {
  background-position: 0 0 !important;
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>
