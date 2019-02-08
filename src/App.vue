<template>
  <v-app>
    <v-toolbar app>
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
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import { auth } from './main';

export default {
  name: 'App',
  data() {
    return {
      //
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
