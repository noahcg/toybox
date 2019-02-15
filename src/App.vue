<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title class="headline text-uppercase">
        <span>My </span>
        <span class="font-weight-light">personal </span>
        <span>library</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/library" flat>Library</v-btn>
        <v-btn to="/reports" flat>Reports</v-btn>
        <v-btn v-if="!authStatus" to="/" flat>Login</v-btn>
        <v-btn v-if="authStatus" @click.native="signOut" flat>Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-card flat class="hidden-md-and-up bottom-nav">
      <v-bottom-nav
        fixed
      >
        <v-btn
          color="teal"
          flat
          value="library"
          to="/library"
        >
          <span>Library</span>
          <v-icon>library_books</v-icon>
        </v-btn>

        <v-btn
          color="teal"
          flat
          value="reports"
          to="/reports"
        >
          <span>Reports</span>
          <v-icon>bar_chart</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-card>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import { auth } from './main';

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      left: false,
    };
  },
  computed: mapState({
    authStatus: state => state.authenticated,
  }),
  methods: {
    signOut() {
      auth.signOut().then(() => {
        this.$store.commit('setAuthenticated', false);
        this.$router.push('/');
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.v-item-group.v-bottom-nav {
  bottom: 60px !important;
}
</style>

