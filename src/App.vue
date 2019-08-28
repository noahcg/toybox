<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>fa fa-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/library">
          <v-list-item-action>
            <v-icon>fa fa-book</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Books</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="authStatus" to="/metrics">
          <v-list-item-action>
            <v-icon>fa fa-bar-chart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Metrics</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="authStatus" to="/manage">
          <v-list-item-action>
            <v-icon>fa fa-table</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Manage</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!authStatus" to="/login">
          <v-list-item-action>
            <v-icon>fa fa-sign-in</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          to="/"
          v-if="authStatus"
          class="blue-grey--text subtitle-1 logout"
          @click.native="signOut"
        >
          <v-list-item-action>
            <v-icon>fa fa-sign-out</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Book Repo</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import { auth } from "./main";

export default {
  props: {
    source: String
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
