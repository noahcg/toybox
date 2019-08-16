<template>
  <v-app>
    <v-toolbar color="#ffcc00">
      <v-toolbar-title class="headline text-uppercase">
        <span>Dave's Beer Cellar</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/inventory" flat>Inventory</v-btn>
        <v-btn v-if="authStatus" to="/reports" flat>Reports</v-btn>
        <v-btn v-if="authStatus" to="/management" flat>Management</v-btn>
        <v-btn v-if="!authStatus" to="/login" flat>Login</v-btn>
        <v-btn v-if="authStatus" @click.native="signOut" flat>Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
    <v-card flat class="hidden-md-and-up bottom-nav">
      <v-bottom-nav fixed>
        <v-btn color="secondary" flat value="inventory" to="/inventory">
          <span>Inventory</span>
          <v-icon>local_drink</v-icon>
        </v-btn>
        <v-btn v-if="authStatus" color="secondary" flat value="reports" to="/reports">
          <span>Reports</span>
          <v-icon>assessment</v-icon>
        </v-btn>
        <v-btn v-if="authStatus" color="secondary" flat value="management" to="/management">
          <span>Management</span>
          <v-icon>assignment</v-icon>
        </v-btn>
        <v-btn v-if="!authStatus" color="secondary" flat value="login" to="/login">
          <span>Login</span>
          <v-icon>exit_to_app</v-icon>
        </v-btn>
        <v-btn v-if="authStatus" color="secondary" flat value="logout" @click.native="signOut">
          <span>Logout</span>
          <v-icon class="logout-icon">exit_to_app</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-card>
    <v-footer class="pa-3" color="#ffcc00">
      <v-spacer></v-spacer>
      <div class="footer-copy">Dave's Beer Cellar &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import { auth } from "./main";

export default {
  name: "App",
  data() {
    return {
      drawer: false,
      left: false
    };
  },
  computed: mapState({
    authStatus: state => state.authenticate.authenticated
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
<style lang="scss">
.v-item-group.v-bottom-nav {
  bottom: 60px !important;
}
.headline,
.footer-copy {
  color: #814923;
}
.theme--dark.application {
  background: #f5f2e8;
}
.v-btn:not(.v-btn--disabled):not(.v-btn--floating):not(.v-btn--icon)
  .v-btn__content
  .v-icon.logout-icon {
  transform: rotate(180deg);
}
</style>
