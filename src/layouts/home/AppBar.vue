<template>
  <div>
    <v-app-bar id="home-app-bar" app color="white" elevation="1" height="80">
      <h1>Toybox <small>v.0.1.1</small></h1>

      <v-spacer />

      <div>
        <v-tabs class="hidden-sm-and-down" optional>
          <v-tab
            to="/"
            :ripple="false"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            text
            >Home</v-tab
          >
          <v-tab
            to="manage"
            :ripple="false"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            v-if="authStatus"
            text
            >Manage</v-tab
          >
          <v-tab
            to="toys"
            :ripple="false"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            v-if="authStatus"
            text
            >Toys</v-tab
          >
          <v-tab
            to="login"
            :ripple="false"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            v-if="!authStatus"
            text
            >Login</v-tab
          >
          <v-tab
            :ripple="false"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            v-if="authStatus"
            text
            @click="signOut"
            >Logout</v-tab
          >
        </v-tabs>
      </div>

      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
    </v-app-bar>

    <home-drawer v-model="drawer" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { auth } from "../../main";

export default {
  name: "HomeAppBar",
  components: {
    HomeDrawer: () => import("./Drawer")
  },
  data: () => ({
    drawer: null
  }),
  computed: mapState({
    authStatus: state => state.authenticated
  }),
  methods: {
    signOut() {
      auth.signOut().then(() => {
        this.$store.commit("setAuthenticated", false);
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="sass">
#home-app-bar
  .v-tabs-slider
    max-width: 24px
    margin: 0 auto

    .v-tab
      &::before
        display: none
</style>
